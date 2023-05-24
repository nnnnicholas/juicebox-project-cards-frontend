import type { NextPage} from "next";
import {FC} from "react";
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
      <h1>Mint a Project Card</h1>
      <div className="text-gray-400">Choose any Juicebox project.</div>
      <Search />
      <MintButton/>
    </div>
  );
}

export default MintModule;
