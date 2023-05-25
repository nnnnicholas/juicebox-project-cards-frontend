import { FC } from "react";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import MintButton from "./MintButton";
import Search from "./Search";
import { Project } from "../interfaces/Project";
import dynamic from "next/dynamic";
const Preview = dynamic(() => import("./Preview"), { ssr: false });

type MintModuleProps = {
  className?: string;
};

const MintModule: FC<MintModuleProps> = ({ className = "" }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className={`${className}`}>
      <h2>Mint a Project Card</h2>
      <div className="text-gray-400 mt-2">Choose any Juicebox project.</div>
      <Search
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      <Preview selectedProject={selectedProject} />
      <MintButton />
      <div className=" mt-2 text-gray-300 text-xs">
        Proceeds go to the{" "}
        <a href="https://juicebox.money/v2/p/465">
          <span className="italic underline">metadata</span>
        </a>{" "}
        project.
      </div>
    </div>
  );
};

export default MintModule;
