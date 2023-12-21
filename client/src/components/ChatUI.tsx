"use client";
import sendMessage from "../utils/sendMessage";

import { useEffect, useState } from "react";

type MessageType = {
	sender: string | undefined;
	message: string | undefined;
	timestamp: number;
};

type ChatUIProps = {
	chats: MessageType[];
	chatId: string | null;
};

export default function ChatUI({ chats, chatId }: ChatUIProps) {
	const [message, setMessage] = useState("");
	const [account, setAccount] = useState<string | undefined>();
	console.log(chats);
	chats.sort((a: MessageType, b: MessageType) => a.timestamp - b.timestamp);

	useEffect(() => {
		async function fetchAccount() {
			try {
				const { ethereum }: any = window;
				const accounts = await ethereum.request({
					method: "eth_requestAccounts",
				});

				setAccount(accounts[0]);
			} catch (e) {
				console.log(e);
			}
		}
		fetchAccount();
	}, []);

	async function sendMessageHandler() {
		sendMessage(chatId, message);
	}

	return (
		<div className="w-full px-5 flex flex-col justify-between">
			<div className="flex flex-col mt-5">
				{chats.map((item: MessageType) => {
					const firstFive: string = item.sender?.slice(0, 5) || "";
					const lastFive: string = item.sender?.slice(-5) || "";
					const displayAddr: string = `${firstFive}...${lastFive}`;

					return item.sender === account ? (
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
				<button
					className="rounded bg-blue-800 px-5 h-full text-white hover:bg-blue-900 active:bg-blue-950"
					onClick={() => {
						sendMessageHandler();
					}}
				>
					Send
				</button>
			</div>
		</div>
	);
}