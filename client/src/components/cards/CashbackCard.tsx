import React from "react";

const CashbackCard = () => {
  return (
    <div className="card bg-slate-100 px-10 py-20 rounded-3xl">
      <h2 className="text-xl font-semibold mb-2">Total cashback received</h2>
      <p className="text-gray-600 mb-4">
        Here's how much you've earned in cashback
      </p>
      <div className="flex items-center">
        <span className="text-2xl font-bold text-green-500 mr-2">$120.00</span>
        <span className="text-sm text-gray-500">Total Cashback</span>
      </div>
    </div>
  );
};

export default CashbackCard;
