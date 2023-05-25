import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "../interfaces/Project";
import { mainnet } from "wagmi/chains";
import { useJbProjectsTokenUri } from "../resources/generated";
import { log } from "console";

interface PreviewProps {
  selectedProject: Project | null;
  className?: string;
}

const JBPROJECTS_ADDRESS = "0xD8B4359143eda5B2d763E127Ed27c77addBc47d3";
const IPFS_PREFIX = "ipfs://";
const IPFS_GATEWAY_PREFIX = "https://ipfs.io/ipfs/";
const BASE64_PREFIX = "data:application/json;base64,";
const SVG_BASE64_PREFIX = "data:image/svg+xml;base64,";

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

  const [imageDecoded, setImageDecoded] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<string | null>(null);

  useEffect(() => {
    // Add gateway to ipfs uris
    const gatewayUri = (uri: string) => {
      if (uri.startsWith(IPFS_PREFIX)) {
        return uri.replace(IPFS_PREFIX, IPFS_GATEWAY_PREFIX);
      } else {
        return uri;
      }
    };

    const fetchMetadataAndImage = async (uri: string) => {
      try {
        // Fetch metadata
        const metadataResponse = await fetch(gatewayUri(uri));
        const metadata = await metadataResponse.json();

        // Fetch image from metadata
        const imageUri = metadata.image;
        const imageResponse = await fetch(gatewayUri(imageUri));
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);

        // Set the decoded image URL
        setImageDecoded(null);
        setImageBlob(imageUrl);
      } catch (error) {
        console.error("Error fetching metadata and image:", error);
      }
    };

    // Handle http:// and IPFS
    if (
      tokenUri &&
      (tokenUri.startsWith("http") || tokenUri.startsWith("ipfs://"))
    ) {
      fetchMetadataAndImage(tokenUri);
    }

    // Handle base64 encoded svg
    if (tokenUri && tokenUri.startsWith(BASE64_PREFIX)) {
      const base64Encoded = tokenUri.replace(BASE64_PREFIX, "");
      const decoded = base64Decode(base64Encoded);
      const json = JSON.parse(decoded);
      if (json.image && json.image.startsWith(SVG_BASE64_PREFIX)) {
        const imageBase64Encoded = json.image.replace(SVG_BASE64_PREFIX, "");
        setImageBlob(null);
        setImageDecoded(base64Decode(imageBase64Encoded));
        console.log(base64Decode(imageBase64Encoded));
      } else if (json.image) {
        fetchMetadataAndImage(json.image);
      }
    }
  }, [tokenUri]);

  // if (status === "loading") return <p>Loading...</p>;
  if (status === "error") {
    console.log(error?.message);
    return <p>Error Loading</p>;
  }

  function base64Decode(input: string): string {
    // Convert the base64 string back to bytes
    const buffer = Buffer.from(input, 'base64');

    // Convert those bytes back into a string
    const decoded = buffer.toString('utf8');

    return decoded;
}


  return (
    <div className={`${className || ""}`}>
      {imageDecoded && (
        <svg dangerouslySetInnerHTML={{ __html: imageDecoded }} />
      )}
      {imageBlob && (
        <Image src={imageBlob} width={300} height={300} alt="Preview" />
      )}
    </div>
  );
};

export default Preview;
