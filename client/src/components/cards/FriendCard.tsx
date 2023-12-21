import React, { useState } from "react";
import AddFriend from "../modals/addFriendModal";

const FriendCard = () => {
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

  const friendsData = [
    {
      name: "Karan",
      walletAddress: "0x12345jdahjga67890",
    },
    {
      name: "Ankit",
      walletAddress: "0x12345jdahjga67890",
    },
    {
      name: "Harsh",
      walletAddress: "0x12345jdahjga67890",
    },
  ];

  const minifyAddress = (address: string) => {
    return address.slice(0, 4) + "..." + address.slice(-4);
  };

  return (
    <div className="card w-96 bg-sky-100 px-10 py-10 rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <p>
          <span className="text-2xl font-bold text-black mr-2">Friends</span>
        </p>
        <button
          className="flex gap-x-1 text-green-500 px-2 py-1 rounded-3xl border-2 border-green-500 hover:text-green-600 items-center"
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
          Add Friends
        </button>
      </div>
      <div className="mt-2">
        {friendsData.map((friend) => (
          <div
            className="flex items-center justify-between mb-2"
            key={friend.name}
          >
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                <span className="text-gray-800 font-bold">
                  {friend.name[0]}
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold">{friend.name}</h3>
                <span className="text-xs text-gray-500">
                  {minifyAddress(friend.walletAddress)}
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
