"use client";

import { useEffect, useState } from "react";
import createGroup from "../utils/createGroup";
import fetchGroupChatHistory from "../utils/fetchGroupChatHIstory";

//169e7817272b42275570949b7df74ea0ec9d06d7ea7f206fa4615c8c74ee5b84

import { FaCirclePlus } from "react-icons/fa6";
import fetchGroups from "../utils/fetchGroups";
import ChatUI from "../components/ChatUI";
type messageType = {
	sender: string | undefined;
	message: string | undefined;
	timestamp: number;
};

type allGroupType = {
	groupDesc: fetchGroupType;
	messageDesc: messageType[];
};

type fetchGroupType = {
	chatId: string;
	name: string;
	desc: string;
	image: string;
	created: Date;
	creator: string;
};

export default function Chats() {
	const [account, setAccount] = useState("");
	// const groupData: allGroupType[] = [];
	const [groupData, setGroupData] = useState<allGroupType[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<messageType[] | null>(
		null
	);
	const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { ethereum }: any = window;
				const accounts = await ethereum.request({
					method: "eth_requestAccounts",
				});

				setAccount(accounts[0]);

				const groups: fetchGroupType[] | undefined = await fetchGroups();

				const updatedGroupData: allGroupType[] = await Promise.all(
					groups?.map(async (item: fetchGroupType) => {
						const groupInfo = await fetchGroupChatHistory(item.chatId);
						const tempData: messageType[] = await Promise.all(
							groupInfo?.map(async (chat: any) => {
								const sender: string = chat?.fromCAIP10;
								const senderAddress = sender.substring(7, 71);
								const data: messageType = {
									sender: senderAddress || "",
									message: chat?.messageContent || "",
									timestamp: chat?.timestamp || 0,
								};
								return data;
							}) || [] // Ensure that it is an array or use a default empty array
						);
						return {
							groupDesc: item,
							messageDesc: tempData,
						};
					}) || [] // Ensure that it is an array or use a default empty array
				);

				setGroupData(updatedGroupData);
			} catch (e) {
				console.log(e);
			}
		};

		fetchData();
	}, []);

	const handleGroupClick = (messages: messageType[], chatId: string) => {
		setSelectedGroup(messages);
		setSelectedChatId(chatId);
	};

	return (
		<div className="container mx-auto shadow-lg rounded-lg">
			<div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
				<div className="font-semibold text-2xl">ModePay</div>
				<div className="w-1/2">
					<input
						type="text"
						name=""
						id=""
						placeholder="search IRL"
						className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
					/>
				</div>
				<div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
					RA
				</div>
			</div>

			<div className="flex flex-row justify-between bg-white">
				<div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
					<div className="border-b-2 py-4 px-2">
						<input
							type="text"
							placeholder="Search chatting"
							className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
						/>
					</div>
					{groupData?.map((item, index) => (
						<div
							key={index}
							className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
							onClick={() =>
								handleGroupClick(item.messageDesc, item.groupDesc.chatId)
							}
							style={{ cursor: "pointer" }}
						>
							<div className="w-1/4">
								<img
									src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
									className="object-cover h-12 w-12 rounded-full"
									alt=""
								/>
							</div>
							<div className="w-full">
								<div className="text-lg font-semibold">
									{item.groupDesc && item.groupDesc.name}
								</div>
								<span className="text-gray-500">
									{item.groupDesc && item.groupDesc.name}
								</span>
							</div>
						</div>
					))}

					<div className="flex items-center justify-center ">
						{/* <FaCirclePlus className="h-10 w-10" /> */}
					</div>
				</div>

				{selectedGroup && (
					<ChatUI chats={selectedGroup} chatId={selectedChatId} />
				)}

				{/* Group Description */}
				<div className="w-2/5 border-l-2 px-5">
					<div className="flex flex-col">
						<div className="font-semibold text-xl py-4">Mern Stack Group</div>
						<img
							src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
							className="object-cover rounded-xl h-64"
							alt=""
						/>
						<div className="font-semibold py-4">Created 22 Sep 2021</div>
						<div className="font-light">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
							perspiciatis!
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
