import { useState, useEffect } from "react";
//@ts-ignore
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useRouter } from "next/router";

export default function Landing() {
  //   const { address, isConnected } = useAccount();
  const [userExists, setUserExists] = useState(null);
  //   const router = useRouter();

  const handleRegister = () => {
    window.location.href = "/register";
  };

  //   useEffect(() => {
  //     // Function to send the API request
  //     const checkUserOnBackend = async () => {
  //     //   try {
  //         // const response = await fetch(
  //         //   "https://0fa9-14-195-9-98.ngrok-free.app/api/user/checkUser",
  //         //   {
  //         //     method: "POST",
  //         //     headers: {
  //         //       "Content-Type": "application/json",
  //         //     },
  //         //     body: JSON.stringify({ walletAddress: address }),
  //         //   }
  //         // );

  //     //     if (response.ok) {
  //     //       const result = await response.json();
  //     //       setUserExists(result.flag); // Assuming flag is a boolean indicating user existence

  //     //       if (result.flag) {
  //     //         router.push("/dashboard");
  //     //       } else {
  //     //         router.push("/register");
  //     //       }
  //     //     } else {
  //     //       console.error("Failed to check user on the backend");
  //     //     }
  //     //   } catch (error) {
  //     //     console.error("Error while checking user on the backend", error);
  //     //   }
  //     // };

  //     // Check user on the backend if the wallet is connected
  //     if (isConnected) {
  //       checkUserOnBackend();
  //     }
  //   }, [address, isConnected]);

  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-2 md:px-6">
        <header className="mb-4 flex items-center justify-between py-4 md:py-8">
          {/* <link
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
            aria-label="logo"
          >
            <GiSplitCross className="w-14 h-14 text-black" />
            Blockwise
          </link> */}

          <div className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl">
            ModePay
          </div>

          <div className="flex items-center space-x-3">
            <ConnectButton />
            {/* <link
              href="/register"
              className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
            >
              Join Us
            </link> */}
          </div>

          {/* <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Menu
          </button> */}
        </header>

        <section className="min-h-96 relative flex overflow-hidden rounded-lg">
          <div className="wide-first-div flex items-center justify-between">
            <div className="items-left sm:max-w-xl lg:max-w-3xl">
              <h1 className="mb-8 text-left text-4xl font-bold text-black sm:text-6xl md:mb-12 lg:text-6xl 2xl:text-8xl">
                Manage on-chain payments with ease!
              </h1>
              <p className="mb-4 text-xl text-blue-600 sm:text-5xl md:mb-14 font-semibold">
                Receive a cashback for every transaction you make....
              </p>
              <button
                className="bg-blue-500 text-white px-3 py-2 md:px-6 md:py-3 rounded-md hover:bg-blue-600 mt-2 md:ml-2 font-bold md:text-xl"
                onClick={handleRegister}
              >
                Get Started
              </button>
            </div>
            <img
              src="/8248695.png"
              alt="Random Money"
              className="object-cover ml-36  h-full hidden md:block "
            />
          </div>
        </section>
      </div>
    </div>
  );
}
