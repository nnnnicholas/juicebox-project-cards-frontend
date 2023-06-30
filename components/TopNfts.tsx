import { FC, useEffect } from "react";
import useTopNfts from "../hooks/useTopNfts";
import Preview from "./Preview";
import { Project } from "../interfaces/Project";
import MintButton from "./MintButton";

interface TopNftsComponentProps {
  address?: `0x${string}`;
}

const TopNftsComponent: FC<TopNftsComponentProps> = ({ address }) => {
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
      <h1>Trending Cards</h1>
      <p className="text-gray-500 mt-2">
        The top three most minted Juicebox Cards. See the full collection on{" "}
        <a
          className="underline"
          href="https://opensea.io/collection/juicebox-project-cards"
        >
          OpenSea
        </a>
        .
      </p>
      <div
        id="cardContainer"
        className="flex flex-col pt-8  items-center lg:items-stretch lg:flex-row lg:justify-space-between lg:place-content-between mt-4"
      >
        {topNfts.map(({ tokenId, mintCount }, index) => {
          const project: Project = {
            project_id: tokenId,
            name: "", // name is empty
          };
          return (
            <div
              key={index}
              className="flex flex-col justify-end min-w-[300px] max-w-[340px] mb-8 mx-2 my-0 border-solid border-2 bg-gray-100 rounded-lg border-grey-600"
            >
              <Preview
                selectedProject={project}
                className="grow w-full flex items-center pb-4"
              />
              <div className=" flex flex-col ">
                <div className="flex w-full place-content-between items-baseline">
                  <h3 className="pl-4">{ranks[index]}</h3>
                  <div className="pr-4">{mintCount} minted</div>
                </div>
                <MintButton
                  selectedProject={project}
                  address={address}
                  className="mt-4 mb-2 mx-2"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopNftsComponent;
