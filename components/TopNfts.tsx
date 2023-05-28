import { FC, useEffect } from 'react';
import useTopNfts from '../hooks/useTopNfts';
import Preview from './Preview';
import { Project } from '../interfaces/Project';

const TopNftsComponent: FC = () => {
  const { topNfts, error } = useTopNfts();

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
    <div>
      <h1>Top NFTs</h1>
      <div className="flex">
        {topNfts.map((tokenId, index) => {
          const project: Project = {
            project_id: tokenId,
            name: "", // name is empty
          };
          
          return <Preview key={index} selectedProject={project} />;
        })}
        </div>
    </div>
  );
};

export default TopNftsComponent;
