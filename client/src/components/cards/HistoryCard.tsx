import React from "react";
import * as ethers from "ethers";
import { useAccount, useNetwork } from "wagmi";

const HistoryCard = () => {
  const API_URL = process.env.REACT_APP_BE_URL || "http://localhost:3000/api/";
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain, chains } = useNetwork();
  const [transactions, setTransactions] = React.useState([]);

  // const chainName = chain.name;

  React.useEffect(() => {
    console.log("HEY", chain);
    const fetchTransactions = async () => {
      try {
        if (!isConnecting && !isDisconnected && address) {
          const response = await fetch(API_URL + "moralis/transactions", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "wallet-address": address,
              chain: "80001",
            },
          });

          console.log(response);

          if (response.ok) {
            const data = await response.json();
            console.log("kevin", data); // Log the actual data payload
            setTransactions(data.result);
          } else {
            console.error("Failed to fetch transactions");
          }
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [address, isConnecting, isDisconnected, chain]);

  const transactionData = [
    {
      hash: "0xabcdef123456...",
      toAddress: "0x1234567890abcdef...",
      amount: "$100.00",
    },
    {
      hash: "0xabcdef123456...",
      toAddress: "0x1234567890abcdef...",
      amount: "$100.00",
    },
    {
      hash: "0xabcdef123456...",
      toAddress: "0x1234567890abcdef...",
      amount: "$100.00",
    },
    {
      hash: "0xabcdef123456...",
      toAddress: "0x1234567890abcdef...",
      amount: "$100.00",
    },
  ];

  return (
    <div className="bg-slate-100 p-6 rounded-lg shadow-lg m-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold text-blue-500">
          Transaction History
        </h2>
        {/* Add any additional header content or actions */}
      </div>

      <div className="border-t border-gray-300 py-4">
        {/* Transaction 1 */}
        <div className="border-t border-gray-300 py-4">
          <div className="flex justify-between items-start mb-3">
            <p className="text-gray-600 mb-1">Transaction Hash:</p>
            <p className="text-gray-600 mb-1">To Address:</p>
            <p className="text-gray-600 mb-1">Amount:</p>
          </div>
          {transactions.map((transaction, index) =>
            //@ts-ignore
            transaction.to_address &&
            //@ts-ignore
            transaction.value !== null &&
            //@ts-ignore
            transaction.value !== "0" ? (
              <div
                key={index}
                className="flex justify-between items-center my-6 text-blue-600"
              >
                <div>
                  <p className="font-semibold">
                    {
                      //@ts-ignore
                      transaction.hash.substring(0, 30)
                    }
                    .....
                  </p>
                </div>
                <div>
                  <p className="font-semibold">
                    {
                      //@ts-ignore
                      transaction.to_address.substring(0, 30)
                    }
                    .....
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-blue-600">
                    {
                      //@ts-ignore
                      ethers.utils.formatEther(transaction.value)
                    }
                    &nbsp;ETH
                  </p>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
