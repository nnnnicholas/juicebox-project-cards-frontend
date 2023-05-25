# Juicebox Project Cards Frontend

A frontend for the [Juicebox Project Cards contract](https://github.com/nnnnicholas/juicebox-project-cards):

> Juicebox Project Cards are a fun way to keep track of the health of your favorite Juicebox projects, right inside your own wallet! Project Cards are ERC-1155 NFT editions. Each project card corresponds to a specific project on the Juicebox Protocol. Project Cards display the same metadata as the canonical Juicebox Project NFT. Project cards display up-to-date treasury statistics for the corresponding project. If project owners customize their project metadata, the project cards will automatically update accordingly.

## Installation

1. `pnpm i` Install dependencies
2. `pnpm wagmi generate` Create Typescript bindings for contracts
3. `pnpm dev` Start dev server
4. Deploy with Vercel. Don't forget to upload env vars. NEXT_PUBLIC_ETHERSCAN_API_KEY (get one at https://etherscan.io) and WC_PROJECT_ID (create a WalletConnect project ID here https://cloud.walletconnect.com/app)
