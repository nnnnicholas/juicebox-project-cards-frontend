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
              className="border-solid border-2 bg-gray-100 rounded-lg border-grey-600 w-78 max-w-[350px] mb-8 mx-2 flex flex-col lg:my-0 lg:justify-between content-center"
            >
              <div className="flex w-full place-content-between items-baseline">
                <h3 className="pl-8 pt-8">{ranks[index]}</h3>
                <div className="pr-8 pt-8">{mintCount} minted</div>
              </div>
              <Preview selectedProject={project} className="pt-2 w-full" />
              <MintButton selectedProject={project} className="mt-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopNftsComponent;
