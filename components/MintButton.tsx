import type { NextPage } from "next";
import { FC } from "react";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import { useJbProjectCardsMint } from "../resources/generated";
import { Project } from "../interfaces/Project";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

interface MintProps {
  selectedProject: Project | null;
}
const MintButton: FC<MintProps> = ({ selectedProject }) => {
  const projectId = selectedProject
    ? BigInt(selectedProject.project_id)
    : undefined;
  const JBPROJECTCARDS_ADDRESS = "0xe601Eae33A0109147a6F3CD5F81997233d42FEDD";

  const { config } = usePrepareContractWrite({
    address: JBPROJECTCARDS_ADDRESS,
    abi: [
      {
        name: "mint",
        type: "function",
        stateMutability: "payable",
        inputs: [
          { internalType: "uint256", name: "projectId", type: "uint256" },
        ],
        outputs: [],
      },
    ],
    functionName: "mint",
    args: [BigInt(projectId ? projectId: 0)],
    value: BigInt(10000000000000000),
    enabled: Boolean(projectId),
  });

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  // const {data, status} = useJbProjectCardsMint({
  //   value: projectId!,
  // });

  return (
    <button
      type="button"
      className="mt-2 rounded-md bg-mintOrange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => {
        write?.();
      }}
      disabled={!write || isLoading}
    >
      {isLoading ? "Minting..." : "Mint for 0.01 ETH"}
    </button>
  );
};

export default MintButton;
