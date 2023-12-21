"use client";
import sendMessage from "../utils/sendMessage";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import fetchGroupChatHistory from "../utils/fetchGroupChatHIstory";
import CreateSplitModal from "./modals/CreateSplitModal";

import chatPlusIcon from "../assets/chatPlusIcon.png";
type MessageType = {
	sender: string | undefined;
	message: string | undefined;
	timestamp: number;
};

export default function ChatUI({ chatId }: { chatId: string | null }) {
	const [message, setMessage] = useState("");
	const [allChat, setAllChat] = useState<MessageType[] | null>(null);
	const [toggleRefresh, setToggleRefresh] = useState(true);
	const [showSplitModal, setShowSplitModal] = useState(false);

	const { address } = useAccount();

	async function sendMessageHandler() {
		chatId && message && (await sendMessage(chatId, message));
		setMessage("");
		setToggleRefresh(!toggleRefresh);
	}

	function handleOnClose() {
		setShowSplitModal(false);
	}

	useEffect(() => {
		async function fetchData() {
			const groupInfo = await fetchGroupChatHistory(chatId);
			const tempData: MessageType[] = await Promise.all(
				groupInfo?.map(async (chat: any) => {
					const sender: string = chat?.fromCAIP10;
					const senderAddress = sender.substring(7, 71);
					const data: MessageType = {
						sender: senderAddress || "",
						message: chat?.messageContent || "",
						timestamp: chat?.timestamp || 0,
					};

					return data;
				}) || []
			);
			tempData?.sort(
				(a: MessageType, b: MessageType) => a.timestamp - b.timestamp
			);
			setAllChat(tempData);
		}
		fetchData();
	}, [chatId, toggleRefresh]);

	return (
		<div className="w-full px-5 flex flex-col justify-between">
			<div className="flex flex-col mt-5">
				{allChat?.map((item: MessageType) => {
					const firstFive: string = item.sender?.slice(0, 5) || "";
					const lastFive: string = item.sender?.slice(-5) || "";
					const displayAddr: string = `${firstFive}...${lastFive}`;

					return item.sender === address ? (
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
									<div className="text-black ">{displayAddr}</div>
									{item.message}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className="flex w-full bg-gray-300 rounded-xl ">
				<input
					className="w-full bg-gray-300 outline-none mx-5 my-4"
					type="text"
					placeholder="Type your message here..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<div className="flex items-center justify-center mr-2">
					<img
						src={chatPlusIcon}
						alt=""
						className="h-8 w-12 cursor-pointer"
						onClick={() => setShowSplitModal(true)}
					/>
				</div>
				<button
					className="rounded bg-blue-800 px-5 h-full text-white hover:bg-blue-900 active:bg-blue-950"
					onClick={() => {
						sendMessageHandler();
					}}
				>
					Send
				</button>
			</div>
			<CreateSplitModal onClose={handleOnClose} visible={showSplitModal} />
		</div>
	);
}
