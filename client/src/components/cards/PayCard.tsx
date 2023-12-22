import React from "react";

const PayCard = () => {
  return (
    <div className="card bg-slate-100 py-10 px-10 rounded-2xl shadow-lg min-h-[520px] max-h-[520px] ">
      <a href="#">
        <img className="rounded-t-lg" src="/payment.jpg" width="300px" />
      </a>
      {/* <h2 className="text-xl font-semibold my-2">Pay someone</h2> */}
      <p className="text-gray-600 my-4">
        Send/Receive money to your contacts or a
        <br />
        wallet address securely. Manage
        <br />
        payments splits via groups!
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        onClick={() => {
          window.location.href = "/payments";
        }}
      >
        Pay / Receive
      </button>
    </div>
  );
};

export default PayCard;
