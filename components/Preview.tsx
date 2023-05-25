import type { NextPage } from "next";
import { FC } from "react";
import Image from "next/image";
import { useState } from "react";
import { Project } from "../interfaces/Project";
import { mainnet } from "wagmi/chains";
import { useJbProjectsTokenUri } from "../resources/generated";

interface PreviewProps {
  selectedProject: Project | null;
}

const Preview: FC<PreviewProps> = ({ selectedProject }) => {
  const tokenId = selectedProject ? BigInt(selectedProject.id) : undefined;

  const {
    data: tokenUri,
    status,
    error,
  } = useJbProjectsTokenUri({
    args: tokenId ? [tokenId] : undefined,
  });

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error') return <p>Error: {error?.message}</p>;

  return (
    <div>
      {tokenUri && <p>Token URI: {tokenUri}</p>}
    </div>
  );
};

export default Preview;
