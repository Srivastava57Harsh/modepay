import React, { useEffect, useState } from "react";
import { useContractWrite, useContractRead } from "wagmi";
import { CONTRACT_ADDRESS } from "../../data/contractDetails";
import { ABI } from "../../data/contractDetails";
import sendMessage from "../../utils/sendMessage";
import { ethers } from "ethers";

export default function CreateSplitModal({
	visible,
	onClose,
	chatId,
	members,
	toggleRefreshCallback,
}: {
	visible: boolean;
	onClose: any;
	chatId: any;
	members: string[] | null;
	toggleRefreshCallback: () => void;
}) {
	const [amount, setAmount] = useState("");
	const [reason, setReason] = useState("");

	const [refreshSplitCount, setRefreshSplitCount] = useState(true);

	function handleAmountChange(event: any) {
		console.log(event.target.value);
		const amountInEth = event.target.value;
		const amountInWei = ethers.utils.parseEther(amountInEth);
		console.log(amountInWei.toString());
		setAmount(amountInWei.toString());
	}

	function handleReasonChange(event: any) {
		console.log(event.target.value);
		setReason(event.target.value);
	}

	function handleOnClose(e: any) {
		if (e.target.id == "container") onClose();
	}

	if (!visible) return null;

	async function createSplit() {
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
				console.log(chatId);

				console.log("members : ", members);
				console.log(chatId, amount, reason, members);
				// write({
				// 	args: [parseInt(chatId), amount, reason, members],
				// });
				let splits;

				await connectedContract
					.getSplitCount(`${chatId}`)
					.then((result: any) => {
						splits = `${result}`;
					});

				let createSplit = await connectedContract.createSplit(
					`${chatId}`,
					`${amount}`,
					`${reason}`,
					members
				);

				await createSplit.wait();

				console.log(splits);

				await sendMessage(chatId, `**$$**${splits}`);
				toggleRefreshCallback();
				setRefreshSplitCount(!refreshSplitCount);
				onClose();
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div
			id="container"
			className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
			onClick={handleOnClose}
		>
			<div className="bg-white p-8 rounded-md shadow-md w-96">
				<h2 className="text-xl font-bold mb-4">Split Payment</h2>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Total Amount (in ETH)
					</label>
					<input
						type="text"
						onChange={handleAmountChange}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Description of Expense
					</label>
					<textarea
						value={reason}
						onChange={handleReasonChange}
						className="w-full h-20 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
					/>
				</div>

				<button
					onClick={createSplit}
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
				>
					Split Expense
				</button>
			</div>
		</div>
	);
}
