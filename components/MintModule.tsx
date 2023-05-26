import { FC } from "react";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import MintButton from "./MintButton";
import Search from "./Search";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Project } from "../interfaces/Project";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
const Preview = dynamic(() => import("./Preview"), { ssr: false });

type MintModuleProps = {
  className?: string;
};

const MintModule: FC<MintModuleProps> = ({ className = "" }) => {
  const initialProject: Project = {
    project_id: "1",
    name: "Juicebox",
  };

  const [selectedProject, setSelectedProject] =
    useState<Project>(initialProject);

  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <div className={`${className}`}>
      <h2>Mint a Project Card</h2>
      <div className="flex w-full flex-col sm:flex-row">
        <div className="flex-grow mr-10 justify-items-start order-2 sm:order-1">
          <div className="text-gray-500 mt-2">Choose any Juicebox project.</div>
          <Search
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
          {isDisconnected ? (
            <ConnectButton accountStatus="address" />
          ) : (
            <MintButton selectedProject={selectedProject} />
          )}
          <div className="mt-2 text-gray-400 text-xs">
            Proceeds go to the{" "}
            <a href="https://juicebox.money/v2/p/465">
              <span className="italic underline">metadata</span>
            </a>{" "}
            project.
          </div>
        </div>
        <Preview
          selectedProject={selectedProject}
          className="mt-5 order-1 sm:order-2"
        />
      </div>
    </div>
  );
};

export default MintModule;