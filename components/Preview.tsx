import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "../interfaces/Project";
import { mainnet } from "wagmi/chains";
import { useJbProjectsTokenUri } from "../resources/generated";

interface PreviewProps {
  selectedProject: Project | null;
  className?: string;
}

const JBPROJECTS_ADDRESS = "0xD8B4359143eda5B2d763E127Ed27c77addBc47d3";

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

  // Log when image changes
  // useEffect(() => {
  //   console.log(imageDecoded);
  // }, [imageDecoded]);

  // useEffect(() => {
  //   console.log(tokenUri);
  // }, [tokenUri]);

  useEffect(() => {
    console.log(imageBlob);
  }, [imageBlob]);

  useEffect(() => {
    // Add gateway to ipfs uris
    const gatewayUri = (uri: string) => {
      if (uri.startsWith("ipfs://")) {
        return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
        console.log(uri);
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
    if (tokenUri && tokenUri.startsWith("data:application/json;base64,")) {
      const base64Encoded = tokenUri.replace(
        "data:application/json;base64,",
        ""
      );
      const decoded = atob(base64Encoded);
      const json = JSON.parse(decoded);
      if (json.image && json.image.startsWith("data:image/svg+xml;base64,")) {
        const imageBase64Encoded = json.image.replace(
          "data:image/svg+xml;base64,",
          ""
        );
        setImageBlob(null);
        setImageDecoded(atob(imageBase64Encoded));
      } else if (json.image) {
        fetchMetadataAndImage(json.image);
      }
    }
  }, [tokenUri]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") {
    console.log(error?.message);
    return <p>Error Loading</p>;
  }

  return (
    <div className={`${className}`}>
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
