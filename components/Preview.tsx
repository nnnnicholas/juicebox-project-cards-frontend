import { FC, useState, useEffect, useMemo } from "react";
import { Project } from "../interfaces/Project";
import { useJbProjectsTokenUri } from "../resources/generated";

interface PreviewProps {
  selectedProject: Project | null;
  className?: string;
}

const JBPROJECTS_ADDRESS = "0xD8B4359143eda5B2d763E127Ed27c77addBc47d3";
const IPFS_PREFIX = "ipfs://";
const IPFS_GATEWAY_PREFIX = "https://ipfs.io/ipfs/";
const BASE64_PREFIX = "data:application/json;base64,";
const SVG_BASE64_PREFIX = "data:image/svg+xml;base64,";

const gatewayUri = (uri: string) => {
  if (uri.startsWith(IPFS_PREFIX)) {
    return uri.replace(IPFS_PREFIX, IPFS_GATEWAY_PREFIX);
  } else {
    return uri;
  }
};

const Preview: FC<PreviewProps> = ({ selectedProject, className }) => {
  const tokenId = selectedProject ? BigInt(selectedProject.project_id) : null;

  const {
    data: tokenUri,
    status,
    error,
  } = useJbProjectsTokenUri({
    address: JBPROJECTS_ADDRESS,
    args: tokenId ? [tokenId] : [BigInt(1)],
  });

  const [imageBlob, setImageBlob] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadataAndImage = async (uri: string) => {
      try {
        const metadataResponse = await fetch(gatewayUri(uri));
        const metadata = await metadataResponse.json();
        const imageUri = metadata.image;
        const imageResponse = await fetch(gatewayUri(imageUri));
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);

        setImageBlob(imageUrl);
      } catch (error) {
        console.error("Error fetching metadata and image:", error);
      }
    };

    if (
      tokenUri &&
      (tokenUri.startsWith("http") || tokenUri.startsWith("ipfs://"))
    ) {
      fetchMetadataAndImage(tokenUri);
    }

    if (tokenUri && tokenUri.startsWith(BASE64_PREFIX)) {
      const base64Encoded = tokenUri.replace(BASE64_PREFIX, "");
      const decoded = base64Decode(base64Encoded);
      const json = JSON.parse(decoded);

      if (json.image && json.image.startsWith(SVG_BASE64_PREFIX)) {
        const imageBase64Encoded = json.image.replace(SVG_BASE64_PREFIX, "");

        const img = new Image();
        img.src = `data:image/svg+xml;base64,${imageBase64Encoded}`;

        img.onload = function () {
          const pixelRatio = window.devicePixelRatio || 1;
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth * pixelRatio; // Multiply by pixel ratio
          canvas.height = img.naturalHeight * pixelRatio; // Multiply by pixel ratio
        
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            console.error("Unable to get 2D context");
            return;
          }
        
          ctx.scale(pixelRatio, pixelRatio); // Scale everything drawn on canvas by the pixel ratio
          ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight); // Draw with original dimensions
        
          const pngUrl = canvas.toDataURL();
          setImageBlob(pngUrl);
        };        
      } else if (json.image) {
        fetchMetadataAndImage(json.image);
      }
    }
  }, [tokenUri]);

  function base64Decode(input: string): string {
    const buffer = Buffer.from(input, "base64");
    const decoded = buffer.toString("utf8");

    return decoded;
  }

  if (status === "error") {
    console.log(error?.message);
    return <p>Error Loading</p>;
  }

  return (
    <div className={`${className || ""}`}>
      {imageBlob && <img style={{width: '100%', height: 'auto'}} src={imageBlob} alt="Preview" />}
    </div>
  );  
};

export default Preview;
