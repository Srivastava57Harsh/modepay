import React, { useEffect, useState } from "react";
import { CONTRACT_ADDRESS } from "../../data/contractDetails";
import { ABI } from "../../data/contractDetails";
import { ethers } from "ethers";

const CashbackCard = () => {
	const [cashback, setCashback] = useState(0);
	useEffect(() => {
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

					let getCashback: number = 0;

					await connectedContract.getCashBack().then((result: any) => {
						getCashback = result;
					});

					setCashback(getCashback);
				}
			} catch (err) {
				console.log(err);
			}
		}
		createSplit();
	}, []);
	return (
		<div className="bg-slate-100 px-10 py-11 rounded-3xl shadow-lg min-h-[520px] max-h-[520px]">
			<a href="#" className="flex justify-center items-center">
				<img className="rounded-t-lg" src="/money.jpg" width="300px" />
			</a>
			<h2 className="text-xl font-semibold mt-6">Total cashback received</h2>
			<p className="text-gray-600 mb-4">
				Here's how much you've earned in cashback
			</p>
			<div className="flex items-center">
				<span className="text-2xl font-bold text-blue-500 mr-2">
					{ethers.utils.formatEther(cashback.toString()).substring(0, 8)} ETH
				</span>
				<span className="text-lg text-gray-500">Total Cashback</span>
			</div>
		</div>
	);
};

export default CashbackCard;
