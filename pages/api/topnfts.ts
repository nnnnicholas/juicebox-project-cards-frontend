// pages/api/topnfts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Network, Alchemy } from 'alchemy-sdk';

// Setup Alchemy
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const options = {
  omitMetadata: false,
  limit: 300,
};

// Define the contract address constant
const JUICEBOX_PROJECT_CARDS_ADDRESS = "0xe601Eae33A0109147a6F3CD5F81997233d42FEDD";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const nfts = await alchemy.nft.getNftsForContract(JUICEBOX_PROJECT_CARDS_ADDRESS, options);
    res.status(200).json(nfts);
  } catch (err) {
    // Assert `err` to be of type `Error`
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
}
