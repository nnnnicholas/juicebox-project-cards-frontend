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

  useEffect(() => {
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
        setImageDecoded(atob(imageBase64Encoded));
      }
    }
  }, [tokenUri]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error?.message}</p>;

  return (
    <div className={`${className}`}>
      {imageDecoded && (
        <svg dangerouslySetInnerHTML={{ __html: imageDecoded }} />
      )}
    </div>
  );
};

export default Preview;
