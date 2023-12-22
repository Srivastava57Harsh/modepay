"use client";
import sendMessage from "../utils/sendMessage";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import fetchGroupChatHistory from "../utils/fetchGroupChatHIstory";
import CreateSplitModal from "./modals/CreateSplitModal";
import { useContractRead } from "wagmi";
import { CONTRACT_ADDRESS } from "../data/contractDetails";
import { ABI } from "../data/contractDetails";

import chatPlusIcon from "../assets/chatPlusIcon.png";
import { ethers } from "ethers";
type MessageType = {
  sender: string | undefined;
  message: string | undefined;
  timestamp: number;
  splitId: number;
  reason: string;
  perShare: number;
  hasPaid: boolean;
  amountLeft: number;
};

export default function ChatUI({
  chatId,
  members,
}: {
  chatId: any;
  members: string[] | null;
}) {
  const [message, setMessage] = useState("");
  const [allChat, setAllChat] = useState<MessageType[] | null>(null);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [showSplitModal, setShowSplitModal] = useState(false);

  const { address } = useAccount();

  function toggleRefreshCallback() {
    setToggleRefresh(!toggleRefresh);
  }

  async function sendMessageHandler() {
    chatId && message && (await sendMessage(chatId, message));
    setMessage("");
    toggleRefreshCallback();
  }

  function handleOnClose() {
    setShowSplitModal(false);
  }
  async function settleSplit(splitId: any, perShare: number) {
    try {
      const { ethereum }: any = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ABI,
          signer
        );
        let makePayment = await connectedContract.makePayment(
          `${chatId}`,
          `${splitId}`,
          { value: perShare }
        );

        await makePayment.wait();
        toggleRefreshCallback();
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const { ethereum }: any = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ABI,
            signer
          );

          const groupInfo = await fetchGroupChatHistory(chatId);
          const tempData: MessageType[] = await Promise.all(
            groupInfo?.map(async (chat: any) => {
              const sender: string = chat?.fromCAIP10;
              const senderAddress = sender.substring(7, 71);
              let splitId = -1;
              let reason = "";
              let perShare = 0;
              let hasPaid = false;
              let amountLeft = 0;

              if (chat?.messageContent?.substring(0, 6) === "**$$**") {
                splitId = chat?.messageContent?.substring(6, 7);
                console.log(splitId);
                console.log(chatId);
                await connectedContract
                  .getReason(`${chatId}`, `${splitId}`)
                  .then((result: any) => {
                    reason = `${result}`;
                  });

                console.log(reason);

                await connectedContract
                  .getPerShare(`${chatId}`, `${splitId}`)
                  .then((result: any) => {
                    perShare = Number(result);
                  });

                console.log(perShare);

                await connectedContract
                  .hasPaid(`${chatId}`, `${splitId}`, `${address}`)
                  .then((result: any) => {
                    hasPaid = result;
                  });

                console.log(hasPaid);

                await connectedContract
                  .getAmountLeft(`${chatId}`, `${splitId}`)
                  .then((result: any) => {
                    amountLeft = Number(result);
                  });

                console.log(amountLeft);
              }

              const data: MessageType = {
                sender: senderAddress || "",
                message: chat?.messageContent || "",
                timestamp: chat?.timestamp || 0,
                splitId: splitId,
                reason: reason,
                perShare: perShare,
                hasPaid: hasPaid,
                amountLeft: amountLeft,
              };

              return data;
            }) || []
          );
          tempData?.sort(
            (a: MessageType, b: MessageType) => a.timestamp - b.timestamp
          );
          setAllChat(tempData);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [chatId, toggleRefresh]);

  return (
    <div className="w-full px-5 flex flex-col justify-around h-full">
      <div className="flex flex-col mt-5 h-full">
        {allChat?.map((item: MessageType) => {
          const firstFive: string = item.sender?.slice(0, 5) || "";
          const lastFive: string = item.sender?.slice(-5) || "";
          const displayAddr: string = `${firstFive}...${lastFive}`;
          console.log(item.message?.substring(6, 7));

          return item.sender === address ? (
            item?.message?.substring(0, 6) === "**$$**" ? (
              <div
                className="flex justify-end items-center mb-4"
                key={item.timestamp}
              >
                <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl ">
                  <div className="text-white font-extrabold text-center">
                    {item.reason}
                  </div>
                  <div className="text-white font-semibold">
                    {item.amountLeft > 0.0
                      ? `${ethers.utils.formatEther(
                          item.amountLeft.toString()
                        )} ETH Left`
                      : "Amount Paid"}{" "}
                  </div>
                </div>

                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>
            ) : (
              <div
                className="flex justify-end items-center mb-4"
                key={item.timestamp}
              >
                <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  {item.message}
                </div>

                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>
            )
          ) : item?.message?.substring(0, 6) === "**$$**" ? (
            <div
              className="flex justify-start items-center mb-4"
              key={item.timestamp}
            >
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
              <div className="flex flex-col">
                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl ">
                  <div className="text-black text-sm">{displayAddr}</div>
                  <div className="text-white font-extrabold text-center mt-2">
                    {item.reason}
                  </div>
                  <div className="text-white font-semibold mt-1 mb-1 text-center">
                    {ethers.utils.formatEther(item.perShare.toString())} ETH
                  </div>
                  <div className="flex items-center justify-center">
                    {item.hasPaid ? (
                      <div className="text-white font-semibold">
                        Already Paid
                      </div>
                    ) : (
                      <button
                        className=" rounded-xl py-1 bg-blue-600 px-6 h-full text-white hover:bg-blue-900 active:bg-blue-950"
                        onClick={() => {
                          settleSplit(item.splitId, item.perShare);
                        }}
                      >
                        Pay
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex justify-start items-center mb-4"
              key={item.timestamp}
            >
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
              <div className="flex flex-col">
                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                  <div className="text-black text-sm mb-2">{displayAddr}</div>
                  {item.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex w-full bg-slate-50 border-2 rounded-xl my-2">
        <input
          className="w-full bg-slate-50 outline-none mx-5 my-4"
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center justify-center mr-2">
          {/* <img
            src={chatPlusIcon}
            alt=""
            className="h-8 w-12 cursor-pointer"
            onClick={() => setShowSplitModal(true)}
          />
		   */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-12 cursor-pointer text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => setShowSplitModal(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <button
          className="rounded-r-xl bg-blue-500 px-5 h-full w-max border-2 border-blue-500 text-white hover:bg-blue-900 active:bg-blue-950"
          onClick={() => {
            sendMessageHandler();
          }}
        >
          Send
        </button>
      </div>
      <CreateSplitModal
        onClose={handleOnClose}
        visible={showSplitModal}
        chatId={chatId}
        members={members}
        toggleRefreshCallback={toggleRefreshCallback}
      />
    </div>
  );
}
