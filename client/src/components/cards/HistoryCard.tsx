import React from "react";

const HistoryCard = () => {
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
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Transaction History</h2>
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
          {transactionData.map((transaction, index) => (
            <div key={index} className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold">{transaction.hash}</p>
              </div>
              <div>
                <p className="font-semibold">{transaction.toAddress}</p>
              </div>
              <div>
                <p className="font-semibold text-green-500">
                  {transaction.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
