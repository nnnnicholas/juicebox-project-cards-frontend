import { FC, useEffect } from "react";
import useTopNfts from "../hooks/useTopNfts";
import Preview from "./Preview";
import { Project } from "../interfaces/Project";
import MintButton from "./MintButton";

const TopNftsComponent: FC = () => {
  const { topNfts, error } = useTopNfts();
  const ranks = ["🏆 1st Place", "🥈 2nd Place", "🥉 3rd Place"];

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!topNfts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grow">
      <h1>Most popular</h1>
      <p className="text-gray-500 mt-2">
        The top three most minted Juicebox Cards.
      </p>
      <div className="flex flex-col pt-8 justify-center items-center lg:flex-row lg:justify-space-between lg:items-stretch lg:place-content-between mt-4">
        {topNfts.map(({ tokenId, mintCount }, index) => {
          const project: Project = {
            project_id: tokenId,
            name: "", // name is empty
          };
          return (
            <div
              key={index}
              className="w-78 max-w-[300px] pb-8 flex flex-col lg:py-0 lg:justify-between content-center"
            >
              <div className="flex w-full place-content-between items-baseline">
                <h3>{ranks[index]}</h3>
                <div>{mintCount} minted</div>
              </div>
              <Preview selectedProject={project} className="py-4 w-full" />
              <MintButton selectedProject={project} className="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopNftsComponent;
