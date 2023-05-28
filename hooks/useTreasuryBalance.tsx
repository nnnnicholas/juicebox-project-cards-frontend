import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

const TERMINAL_STORE_ADDRESS = "0x77b0A81AeB61d08C0b23c739969d22c5C9950336";
const PRIMARY_ETH_TERMINAL_ADDRESS =
  "0xFA391De95Fcbcd3157268B91d8c7af083E607A5C";
const METADATA_PROJECT_ID = "465";

const terminalStoreAbi = [
  {
    inputs: [
      {
        internalType: "contract IJBSingleTokenPaymentTerminal",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const useTreasuryBalance = () => {
  const { data, isError, isLoading } = useContractRead({
    address: TERMINAL_STORE_ADDRESS,
    abi: terminalStoreAbi,
    functionName: "balanceOf",
    args: [PRIMARY_ETH_TERMINAL_ADDRESS, BigInt(METADATA_PROJECT_ID)],
  });

  const [treasuryBalance, setTreasuryBalance] = useState(0);

  useEffect(()=>{
    isError && console.log("useTreasuryBalance error", isError)
  });
  
  useEffect(() => {
    if (data) {
      setTreasuryBalance(Number(data) / 10 ** 18);
    }
  }, [data]);

  return { treasuryBalance, isError, isLoading };
};
