import type { NextPage } from "next";
import { FC } from "react";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import MintButton from "./MintButton";
import Search from "./Search";

type MintModuleProps = {
  className?: string;
};

const MintModule: FC<MintModuleProps> = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <h2>Mint a Project Card</h2>
      <div className="text-gray-400 mt-2">Choose any Juicebox project.</div>
      <Search />
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
