import React, { useEffect, useState } from "react";

import { CONTRACT_ADDRESS } from "../../data/contractDetails";
import { ABI } from "../../data/contractDetails";
import { ethers } from "ethers";
import CashbackCard from "../cards/CashbackCard";
import ScratchCardMain from "./scratchCardModal";

export default function PayIndividualModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: any;
}) {
  const [amount, setAmount] = useState("");
  const [addresses, setAddresses] = useState("");
  const [showCashbackCard, setShowCashbackCard] = useState(false);
  const [cashback, setCashback] = useState("");

  function handleAmountChange(event: any) {
    try {
      const amountInEth = event.target.value;
      const amountInWei = ethers.utils.parseEther(amountInEth);

      console.log(amountInWei.toString());
      setAmount(amountInWei.toString());
    } catch (err) {
      console.log(err);
    }
  }

  function handleAddressesChange(event: any) {
    console.log(event.target.value);
    setAddresses(event.target.value);
  }

  function handleOnClose(e: any) {
    if (e.target.id == "container") {
      onClose();
      setShowCashbackCard(false);
    }
  }

  async function handlePayment(e: any) {
    try {
      const { ethereum }: any = window;
      e.preventDefault();

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer
        );

        let cashback: any;

        let makePayment = await connectedContract.transferToAddress(
          `${addresses}`,
          `${amount}`,
          { value: amount }
        );

        connectedContract.on("RewardTransferred", async (sender, amount) => {
          console.log("Rewards event was emitted");
          cashback = JSON.stringify(Number(amount));
          const finalCashback: string = ethers.utils.formatEther(
            Number(cashback)
          );

          console.log(finalCashback);

          setCashback(finalCashback);
        });

        await makePayment.wait();

        setShowCashbackCard(true);
        // console.log(showCashbackCard);
        // onClose();
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    console.log("Karan", showCashbackCard);
  }, [showCashbackCard]);

  if (!visible) return null;

  return (
    <div>
      {showCashbackCard ? (
        <ScratchCardMain value={cashback} onClose={handleOnClose} />
      ) : null}

      <div
        id="container"
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        onClick={handleOnClose}
      >
        {/* <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"> */}
        <div className="flex items-center justify-center h-[60vh]">
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
            <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
              <form
              // onSubmit={handleSubmit}
              >
                <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-20 place-items-center rounded-xl bg-blue-500 bg-clip-border shadow-gray-900/20">
                  <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                    Add Details
                  </h3>
                </div>

                <p className="flex justify-center items-center text-center mt-2 font-sans text-sm antialiased font-light leading-normal text-inherit mx-6">
                  Make sure that the wallet address you enter is valid and
                  registered on ModePay. Also you can not use the same name or
                  address previously associated.
                </p>

                <div className="flex flex-col gap-4 p-6">
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      // onChange={handleSetFriendName}
                      // value={formData.recipientUserName}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Benificiary's name
                    </label>
                  </div>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      onChange={handleAddressesChange}
                      // onChange={handleSetFriendAddress}
                      // value={formData.recipientWalletAddress}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Wallet address
                    </label>
                  </div>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=""
                      onChange={handleAmountChange}
                      // onChange={handleSetFriendAddress}
                      // value={formData.recipientWalletAddress}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Amount
                    </label>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                    onClick={handlePayment}
                  >
                    Pay
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
