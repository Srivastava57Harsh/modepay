// import React, { useState } from "react";
// import createGroup from "../utils/createGroup";

// export default function AddGroupModal({
// 	visible,
// 	onClose,
// 	toggleRefreshGroup,
// }: {
// 	visible: boolean;
// 	onClose: any;
// 	toggleRefreshGroup: any;
// }) {
// 	const [addresses, setAddresses] = useState("");
// 	const [groupName, setGroupName] = useState("");

// 	function handleAddressesChange(event: any) {
// 		console.log(event.target.value);
// 		setAddresses(event.target.value);
// 	}

// 	function handleGroupName(event: any) {
// 		setGroupName(event.target.value);
// 	}

// 	function handleOnClose(e: any) {
// 		if (e.target.id == "container") onClose();
// 	}

// 	function handleCreateGroup() {
// 		const addressesArray = addresses
// 			.split(",")
// 			.map((address) => address.trim());
// 		console.log(addressesArray);
// 		createGroup(addressesArray, groupName);
// 		toggleRefreshGroup();
// 		onClose();
// 	}

// 	if (!visible) return null;

// 	return (
// 		<div
// 			id="container"
// 			className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
// 			onClick={handleOnClose}
// 		>
// 			<div className="bg-white p-8 rounded-md shadow-md w-96">
// 				<h2 className="text-xl font-bold mb-4">Add Group</h2>

// 				<div className="mb-4">
// 					<label className="block text-gray-700 text-sm font-bold mb-2">
// 						Group Name
// 					</label>
// 					<textarea
// 						value={groupName}
// 						onChange={handleGroupName}
// 						className="w-full h-20 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
// 					/>
// 				</div>

// 				<div className="mb-4">
// 					<label className="block text-gray-700 text-sm font-bold mb-2">
// 						Addresses
// 					</label>
// 					<textarea
// 						value={addresses}
// 						onChange={handleAddressesChange}
// 						className="w-full h-20 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
// 					/>
// 				</div>

// 				<button
// 					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
// 					onClick={handleCreateGroup}
// 				>
// 					Add Group
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import createGroup from "../utils/createGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddGroupModal({
  visible,
  onClose,
  toggleRefreshGroup,
}: {
  visible: boolean;
  onClose: any;
  toggleRefreshGroup: any;
}) {
  const API_URL = process.env.REACT_APP_BE_URL || "http://localhost:3000/api/";
  const { address } = useAccount();
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [userFriend, setUserFriend] = useState([]);

  const [showlist, setShowlist] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  function handleGroupNameChange(event: any) {
    // console.log(event.target.value);
    setGroupName(event.target.value);
  }

  function handleDescriptionChange(event: any) {
    // console.log(event.target.value);
    setDescription(event.target.value);
  }

  function handleCreateGroup(
    addressesArray: string[],
    groupName: string,
    description: string
  ) {
    createGroup(addressesArray, groupName, description);
    toggleRefreshGroup();
    onClose();
    toast("Group Created");
  }

  function handleOnClose(e: any) {
    if (e.target.id == "container") onClose();
  }

  //   function createSplit() {
  //     console.log("members : ", members);
  //     write({
  //       args: [parseInt(chatId), amount, reason, members],
  //     });
  //     console.log(JSON.stringify(data));
  //   }

  function handleCheckboxChange(address: string) {
    // Check if the address is already selected
    const isSelected = selectedFriends.includes(address);

    if (isSelected) {
      // If selected, remove it from the array
      setSelectedFriends((prevSelected) =>
        prevSelected.filter((friendAddress) => friendAddress !== address)
      );
    } else {
      // If not selected, add it to the array
      setSelectedFriends((prevSelected) => [...prevSelected, address]);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (groupName.length > 0 && selectedFriends.length > 0) {
      console.log(selectedFriends, groupName);
      handleCreateGroup(selectedFriends, groupName, description);
    } else {
      alert(
        "Please enter the group name and make sure that you have atleast one member selected"
      );
    }
  };

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

  if (!visible) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      onClick={handleOnClose}
    >
      {/* <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"> */}
      <div className="flex items-center justify-center h-[60vh]">
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
            <form onSubmit={handleSubmit}>
              <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-20 place-items-center rounded-xl bg-blue-500 bg-clip-border shadow-gray-900/20">
                <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                  Create Group
                </h3>
              </div>

              <p className="flex justify-center items-center text-center mt-2 font-sans text-sm antialiased font-light leading-normal text-inherit mx-6">
                Provide the group name and add your friends whom you wish to
                add.
              </p>

              <div className="flex flex-col gap-4 p-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    onChange={handleGroupNameChange}
                    value={groupName}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Group Name
                  </label>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    onChange={handleDescriptionChange}
                    value={groupName}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Group Description
                  </label>
                </div>
              </div>

              <section className="flex justify-center items-center">
                <button
                  id="dropdownSearchButton"
                  data-dropdown-toggle="dropdownSearch"
                  data-dropdown-placement="bottom"
                  className=" text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600  w-full mx-6"
                  type="button"
                  onClick={() => {
                    setShowlist(!showlist);
                  }}
                >
                  Select Friends
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
              </section>

              {showlist ? (
                <section className="flex justify-center items-center my-2">
                  <ul className="text-sm font-medium text-black rounded-l w-full mx-4">
                    {userFriend.map((friend: any) => (
                      <li
                        className="w-full border-b border-gray-200 rounded-t-lg "
                        key={friend.walletAddress}
                      >
                        <div className="flex items-center ps-3">
                          <input
                            id="vue-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 "
                            onChange={() =>
                              handleCheckboxChange(friend.walletAddress)
                            }
                          />
                          <label
                            htmlFor="vue-checkbox"
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 flex"
                          >
                            {friend.name}
                            <div className="flex flex-grow justify-end items-end text-right ml-auto mr-4">
                              {minifyAddress(friend.walletAddress)}
                            </div>
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <div className="p-6 pt-0">
                <button
                  className="mt-2 block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
