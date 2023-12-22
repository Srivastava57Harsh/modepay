"use client";

import { useEffect, useState } from "react";
import plusIcon from "../assets/plusIcon.png";

//169e7817272b42275570949b7df74ea0ec9d06d7ea7f206fa4615c8c74ee5b84

import fetchGroups from "../utils/fetchGroups";
import ChatUI from "../components/ChatUI";
//@ts-ignore
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AddGroupModal from "../components/AddGroupModal";
import { useAccount } from "wagmi";
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
	const [refreshGroup, setRefreshGroup] = useState(false);

	const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
	const [selectedMembers, setSelectedMembers] = useState<string[] | null>(null);

	const { address } = useAccount();

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
	}, [refreshGroup, address]);

	const handleGroupClick = (chatId: string, members: string[]) => {
		setSelectedChatId(chatId);
		console.log(chatId);
		setSelectedMembers(members);
	};

	function handleOnClose() {
		setShowSplitModal(false);
	}

	function toggleRefreshGroup() {
		setRefreshGroup(!refreshGroup);
	}

	return (
		<div className="">
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
			<div className="shadow-lg rounded-lg w-full h-full max-h-full max-w-full">
				<div className="py-5 flex items-center justify-center text-2xl font-bold mx-auto text-center border-b-2 border-gray-400">
					<p className="text-center w-5/6">Your Groups</p>
					<button
						className="rounded-lg bg-blue-500 p-2 text-lg text-white font-medium"
						onClick={() => setShowSplitModal(true)}
					>
						Create group
					</button>
				</div>
				<div className="flex flex-row justify-between bg-white w-full h-full">
					<div className="flex flex-col w-1/4 border-r-2 overflow-y-auto">
						<div className="border-b-2 py-4 px-2">
							<input
								type="text"
								placeholder="Search chats"
								className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
							/>
						</div>
						{groupData?.map((item, index) => (
							<div
								key={index}
								className="flex flex-row py-4 px-4 justify-around gap-x-2 items-center border-b-2 cursor-pointer"
								onClick={() =>
									handleGroupClick(
										item.groupDesc.chatId,
										item.groupDesc.members
									)
								}
							>
								<div className="w-1/4">
									<img
										src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
										className="object-cover h-12 w-12 rounded-full"
										alt=""
									/>
								</div>
								<div className="flex flex-col w-full">
									<div className="text-lg font-semibold">
										{item.groupDesc && item.groupDesc.name}
									</div>
									<span className="text-gray-500 text-sm">
										{item.groupDesc && item.groupDesc.name}
									</span>
								</div>
							</div>
						))}
					</div>
					<div className="w-1/2">
						{selectedChatId && (
							<ChatUI chatId={selectedChatId} members={selectedMembers} />
						)}
					</div>
					{/* Group Description */}
					{groupData?.map((item, index) => {
						console.log(item.groupDesc.created);
						if (item.groupDesc.chatId === selectedChatId) {
							return (
								<div className="w-1/4 border-l-2 px-5 h-full" key={index}>
									<div className="flex flex-col">
										<div className="font-semibold text-xl py-4">
											{item.groupDesc.name}
										</div>

										<img
											src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
											className="object-cover rounded-xl h-64"
											alt=""
										/>

										<div className="font-semibold py-4">
											Created on{" "}
											{item.groupDesc.created.toLocaleString().substring(0, 10)}
										</div>
										<div className="font-light">{item.groupDesc.desc}</div>
									</div>
								</div>
							);
						}
						return null;
					})}
				</div>
				<AddGroupModal
					onClose={handleOnClose}
					visible={showSplitModal}
					toggleRefreshGroup={toggleRefreshGroup}
				/>
			</div>
		</div>
	);
}
