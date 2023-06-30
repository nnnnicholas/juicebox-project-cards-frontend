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

const MINT_PRICE = 15000000000000000;

interface MintProps {
  selectedProject: Project | null;
  address: `0x${string}` | undefined;
  className?: string;
}
const MintButton: FC<MintProps> = ({
  selectedProject,
  address,
  className = "",
}) => {
  const projectId = selectedProject
    ? BigInt(selectedProject.project_id)
    : undefined;
  const JBPROJECTCARDS_ADDRESS = "0x78a975a504404e1bf94ff3982f048191fabe4f2c";

  const args: [bigint, string, string] =
    projectId && address
      ? [projectId, address, address]
      : [
          BigInt(0),
          "0x0000000000000000000000000000000000000000",
          "0x0000000000000000000000000000000000000000",
        ];

  const { config, error } = usePrepareContractWrite({
    address: JBPROJECTCARDS_ADDRESS,
    abi: [
      {
        name: "mint",
        type: "function",
        stateMutability: "payable",
        inputs: [
          { internalType: "uint256", name: "projectId", type: "uint256" },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "address",
            name: "tipBeneficiary",
            type: "address",
          },
        ],
        outputs: [],
      },
    ],
    functionName: "mint",
    args: args,
    value: BigInt(MINT_PRICE),
    enabled: Boolean(projectId && address),
  });

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  return (
    <button
      type="button"
      className={`mt-2 cursor-pointer rounded-md bg-mintOrange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ${className}`}
      onClick={() => {
        if(write) write();
      }}
      disabled={!write || isLoading || !address || !projectId}
    >
      {isLoading ? "Minting..." : "Mint for 0.015 ETH"}
    </button>
  );
};

export default MintButton;
