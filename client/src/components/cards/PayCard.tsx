import React from "react";

const PayCard = () => {
  return (
    <div className="card bg-slate-100 py-20 px-10 rounded-2xl">
      <h2 className="text-xl font-semibold mb-2">Pay someone</h2>
      <p className="text-gray-600 mb-4">
        Send money to your contacts or
        <br />
        an wallet address securely.
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
        Pay Now
      </button>
    </div>
  );
};

export default PayCard;
