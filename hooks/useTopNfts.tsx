import { useEffect, useState } from "react";

type Nft = {
  tokenId: string;
  mintCount: number;
};

type ApiResponse = {
  nfts: Nft[];
};

type ApiError = {
  message: string;
};

const TOP_NFT_COUNT = 3;

export default function useTopNfts() {
  const [topNfts, setTopNfts] = useState<Nft[]>([]);
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

        console.log("Received NFTs from API:", data.nfts); // Logging the raw data from API

        const sortedNfts = data.nfts
          .sort((a, b) => b.mintCount - a.mintCount)
          .slice(0, TOP_NFT_COUNT);

        console.log("Top minted NFTs:", sortedNfts); // Logging the final result

        setTopNfts(sortedNfts);
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  }, []);

  return { topNfts, error };
}
