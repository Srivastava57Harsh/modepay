"use client";

import { useEffect, useState } from "react";
import plusIcon from "../assets/plusIcon.png";

//169e7817272b42275570949b7df74ea0ec9d06d7ea7f206fa4615c8c74ee5b84

import fetchGroups from "../utils/fetchGroups";
import ChatUI from "../components/ChatUI";
//@ts-ignore
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AddGroupModal from "../components/AddGroupModal";
type allGroupType = {
	groupDesc: fetchGroupType;
};

type fetchGroupType = {
	chatId: string;
	name: string;
	desc: string;
	image: string;
	created: Date;
	creator: string;
	members: string[];
};

export default function Chats() {
	const [groupData, setGroupData] = useState<allGroupType[]>([]);
	const [showSplitModal, setShowSplitModal] = useState(false);

	const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
	const [selectedMembers, setSelectedMembers] = useState<string[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const groups: fetchGroupType[] | undefined = await fetchGroups();

				const updatedGroupData: allGroupType[] = await Promise.all(
					groups?.map(async (item: fetchGroupType) => {
						return {
							groupDesc: item,
						};
					}) || []
				);
				console.log(updatedGroupData);

				setGroupData(updatedGroupData);
			} catch (e) {
				console.log(e);
			}
		};

		fetchData();
	}, []);

	const handleGroupClick = (chatId: string, members: string[]) => {
		setSelectedChatId(chatId);
		setSelectedMembers(members);
	};

	function handleOnClose() {
		setShowSplitModal(false);
	}

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
				<ConnectButton />
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
							className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer"
							onClick={() =>
								handleGroupClick(item.groupDesc.chatId, item.groupDesc.members)
							}
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

					<div className="flex items-center justify-center">
						<img
							src={plusIcon}
							alt=""
							className="h-10 w-10"
							onClick={() => setShowSplitModal(true)}
						/>
					</div>
				</div>

				{selectedChatId && (
					<ChatUI chatId={selectedChatId} members={selectedMembers} />
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
			<AddGroupModal onClose={handleOnClose} visible={showSplitModal} />
		</div>
	);
}
