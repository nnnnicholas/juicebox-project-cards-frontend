import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "../interfaces/Project";
import { mainnet } from "wagmi/chains";
import { useJbProjectsTokenUri } from "../resources/generated";

interface PreviewProps {
  selectedProject: Project | null;
}

const JBPROJECTS_ADDRESS = "0xD8B4359143eda5B2d763E127Ed27c77addBc47d3";

const Preview: FC<PreviewProps> = ({ selectedProject }) => {
  const tokenId = selectedProject ? BigInt(selectedProject.project_id) : null;

  const {
    data: tokenUri,
    status,
    error,
  } = useJbProjectsTokenUri({
    address: JBPROJECTS_ADDRESS,
    args: tokenId ? [tokenId] : [BigInt(1)],
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error?.message}</p>;

  return <div>{tokenUri && <p>Token URI: {tokenUri}</p>}</div>;
};

export default Preview;
