import { FC, useState, useEffect } from "react";
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

  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadataAndImage = async (uri: string) => {
      try {
        const metadataResponse = await fetch(gatewayUri(uri));
        const metadata = await metadataResponse.json();
        const imageUri = metadata.image;
        const imageResponse = await fetch(gatewayUri(imageUri));
        // const svgText = await imageResponse.text();
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);

        // setSvgContent(svgText);
        setSvgContent(null);
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
        const svgText = base64Decode(imageBase64Encoded);
        let svgWithStyle = `<style>body{margin:0;}svg{width:100%;height:100%;}</style>${svgText}`;
        setImageBlob(null);
        setSvgContent(svgWithStyle);
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
      {imageBlob && <img src={imageBlob} alt="Preview" />}
      {svgContent && (
        <iframe
          title="SVG Preview"
          srcDoc={svgContent}
          style={{ border: "none", width: "100%", height: "auto" }}
          scrolling="no" 
          
        />
      )}
    </div>
  );
};

export default Preview;
