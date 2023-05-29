import { useEffect, useState } from "react";

type Nft = {
  tokenId: string;
};

type ApiResponse = {
  nfts: Nft[];
};

type ApiError = {
  message: string;
};

const TOP_NFT_COUNT = 3;

export default function useTopNfts() {
  const [topNfts, setTopNfts] = useState<{ tokenId: string, mintCount: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/topnfts")
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data: ApiError) => {
            throw new Error(
              data.message ||
                `API responded with HTTP status ${response.status}`
            );
          });
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        if (!Array.isArray(data.nfts)) {
          throw new Error("Expected data.nfts to be an array");
        }

        const counts: Record<string, number> = {};

        for (const nft of data.nfts) {
            if (typeof nft?.tokenId !== "string") {
                throw new Error("Expected nft.id.tokenId to be a string");
            }
            
            const tokenId = nft?.tokenId;

          if (counts[tokenId]) {
            counts[tokenId]++;
          } else {
            counts[tokenId] = 1;
          }
        }

        const sortedCounts = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, TOP_NFT_COUNT)
          .map(([tokenId, mintCount]) => ({ tokenId, mintCount }));

        setTopNfts(sortedCounts);
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  }, []);

  return { topNfts, error };
}
