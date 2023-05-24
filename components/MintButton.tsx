import type { NextPage, FC } from "next";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";

const MintButton: FC = () => {
  return (
    <button
      type="button"
      className="rounded-md bg-mintOrange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Mint for 0.01 ETH
    </button>
  );
};

export default MintButton;
