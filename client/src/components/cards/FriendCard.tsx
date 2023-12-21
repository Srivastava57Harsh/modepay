import React, { useEffect, useState } from "react";
import AddFriend from "../modals/addFriendModal";
import { useAccount } from "wagmi";

const FriendCard = () => {
  const API_URL = process.env.REACT_APP_BE_URL || "http://localhost:3000/api/";
  const { address } = useAccount();
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [userFriend, setUserFriend] = useState([]);

  // const friendsData = [
  //   {
  //     name: "Karan",
  //     walletAddress: "0x12345jdahjga67890",
  //   },
  //   {
  //     name: "Ankit",
  //     walletAddress: "0x12345jdahjga67890",
  //   },
  //   {
  //     name: "Harsh",
  //     walletAddress: "0x12345jdahjga67890",
  //   },
  // ];

  const minifyAddress = (address: string) => {
    return address.slice(0, 4) + "..." + address.slice(-4);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(API_URL + "user/fetchUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const userArray = responseData.data;

      userArray.map((user: any) => {
        if (user.wallets.primary_wallet === address) {
          console.log(user.friends);
          const friendsData = Object.entries(user.friends).map(
            ([name, walletAddress]) => ({
              name,
              walletAddress,
            })
          );

          // console.log(friendsData);
          //@ts-ignore
          setUserFriend(friendsData);
        }
      });
    };

    fetchUsers();
  }, []);

  return (
    <div className="card w-96 bg-sky-100 px-10 py-10 rounded-3xl shadow-lg min-h-[520px] max-h-[520px]">
      <a href="#" className="flex justify-center items-center">
        <img className="rounded-t-lg" src="/user.png" width="260px" />
      </a>
      <div className="flex justify-center items-center mb-4">
        {/* <p>
          <span className="text-2xl font-bold text-black mr-2">Friends</span>
        </p> */}

        <button
          className="mt-5 flex gap-x-1 text-blue-500 px-2 py-1 rounded-3xl border-2 border-blue-500 hover:text-blue-800 items-center"
          onClick={() => setIsAddFriendModalOpen(true)}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M12 4v16m8-8H4"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
          Add Friends&nbsp;
        </button>
      </div>
      <div className="mt-6">
        {userFriend.map((friend) => (
          <div
            className="flex items-center justify-between mb-2"
            key={
              //@ts-ignore
              friend.name
            }
          >
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                <span className="text-gray-800 font-bold">
                  {
                    //@ts-ignore
                    friend.name[0]
                  }
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold">
                  {
                    //@ts-ignore
                    friend.name
                  }
                </h3>
                <span className="text-xs text-gray-500">
                  {
                    //@ts-ignore
                    minifyAddress(friend.walletAddress)
                  }
                </span>
              </div>
            </div>
            <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-600">
              Pay
            </button>
          </div>
        ))}
      </div>

      {isAddFriendModalOpen && (
        <>
          <AddFriend value={true} />
        </>
      )}
    </div>
  );
};

export default FriendCard;
