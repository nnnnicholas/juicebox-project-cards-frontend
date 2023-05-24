import type { NextPage } from "next";
import { FC } from "react";
import Image from "next/image";
import { useState } from "react";
import { Project } from "../interfaces/Project";

interface PreviewProps {
  selectedProject: Project | null;
}

const Preview: FC<PreviewProps> = ({ selectedProject }) => {
  return <></>;
};

export default Preview;
