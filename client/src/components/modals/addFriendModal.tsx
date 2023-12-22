import React from "react";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AddFriendProps = {
  value: boolean;
};

export default function AddFriend({ value }: AddFriendProps) {
  const API_URL = process.env.REACT_APP_BE_URL || "http://localhost:3000/api/";

  const { address } = useAccount();

  const [formData, setFormData] = React.useState({
    selfWalletAddress: address,
    recipientWalletAddress: "",
    recipientUserName: "",
  });

  const [modal, setModal] = React.useState(value);

  const handleSetFriendName = (e: any) => {
    setFormData({ ...formData, recipientUserName: e.target.value });
  };

  const handleSetFriendAddress = (e: any) => {
    setFormData({ ...formData, recipientWalletAddress: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    // console.log( address);

    if (address) {
      if (
        formData.recipientUserName.length > 0 &&
        formData.recipientWalletAddress.length > 0
      ) {
        e.preventDefault();

        console.log(formData);
        console.log(API_URL);

        try {
          const response = await fetch(API_URL + "user/addFriend", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const responseData = await response.json();

          console.log(responseData);

          if (responseData.status === 200) {
            //   window.location.href = "/dashboard";
            toast("Friend added succesfully");
            // toast("Friend added succesfully");
            setModal(false);
          }
        } catch (error) {
          //@ts-ignore
          console.error("Error signing up:", error.message);
        }
      } else {
        e.preventDefault();
        alert("Entries can not be empty!");
      }
    } else {
      toast("Please connect your wallet in order to proceed!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      alert("Please connect your wallet in order to proceed!");
    }
  };

  return (
    <>
      {" "}
      {modal ? (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="flex items-center justify-center h-[60vh]">
              <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
                <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
                  <form onSubmit={handleSubmit}>
                    <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-20 place-items-center rounded-xl bg-blue-500 bg-clip-border shadow-gray-900/20">
                      <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                        Add Friend
                      </h3>
                    </div>

                    <p className="flex justify-center items-center text-center mt-2 font-sans text-sm antialiased font-light leading-normal text-inherit mx-6">
                      Make sure that the wallet address you enter is valid and
                      registered on ModePay. Also you can not use the same name
                      or address previously associated.
                    </p>

                    <div className="flex flex-col gap-4 p-6">
                      <div className="relative h-11 w-full min-w-[200px]">
                        <input
                          className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=" "
                          onChange={handleSetFriendName}
                          value={formData.recipientUserName}
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Friend name
                        </label>
                      </div>
                      <div className="relative h-11 w-full min-w-[200px]">
                        <input
                          className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=" "
                          onChange={handleSetFriendAddress}
                          value={formData.recipientWalletAddress}
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Wallet address
                        </label>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <button
                        className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="p-6 pt-0 -mt-4">
                      <button
                        className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => {
                          setModal(false);
                          window.location.href = "/dashboard";
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
