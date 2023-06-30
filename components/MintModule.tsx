import { FC } from "react";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import MintButton from "./MintButton";
import Search from "./Search";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Project } from "../interfaces/Project";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
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

  // This hack solves type complaint in search params. Iffy
  const setSelectedProjectWrapper = (project: Project | null) => {
    project ? setSelectedProject(project) : null;
  };

  return (
    <div id="mint" className={`${className}`}>
      <h2 className="self-start">Mint a Project Card</h2>
      <div className="flex flex-col sm:flex-row">
        <div className="grow max-w-50 max-w-md mr-10 justify-items-start order-2 sm:order-1">
          <div className="text-gray-500 mt-2">Choose any Juicebox project.</div>
          <Search
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProjectWrapper}
          />
          {isDisconnected ? (
            <div className="pt-2.5">
              <ConnectButton accountStatus="address" />
            </div>
          ) : (
            <MintButton selectedProject={selectedProject} address={address} />
          )}
          <div className="mt-2 max-w-sm text-gray-400 text-xs">
            0.01 ETH goes to the project and 0.005 ETH goes to the {" "}
            <a href="https://juicebox.money/v2/p/465">
              <span className="underline">Metadata</span>
            </a>{" "}
            project to support future metadata development.
          </div>
        </div>
        <Preview
          selectedProject={selectedProject}
          className="grow mt-5 max-w-[300px] order-1 sm:order-2"
        />
      </div>
    </div>
  );
};

export default MintModule;
