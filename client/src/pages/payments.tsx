//Karan write code
//@ts-ignore
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import PayIndividualModal from "../components/modals/payIndividualModal";
export default function Payments() {
	const [individualModalOpen, setIndividualModalOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);

	function handleOnClose() {
		setShowModal(false);
	}

	return (
		<>
			{" "}
			<div className="bg-white pb-6 sm:pb-8 lg:pb-0">
				<div className="mx-auto max-w-screen-2xl px-2 md:px-6">
					<header className="mb-4 flex items-center justify-between py-4 md:py-8">
						<div className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl">
							<a href="/" className="cursor-pointer">
								ModePay
							</a>
						</div>

						<div className="flex items-center space-x-3">
							<ConnectButton />
						</div>
					</header>
				</div>
			</div>
			<h1 className="-mt-8 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-blue-600 flex justify-center items-center">
				Onchain payments made easy.
			</h1>
			<p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 flex justify-center items-center">
				Explore two of our best way to settle on chain debts and splits!
			</p>
			<section className="mt-10 mx-80 flex gap-20 justify-center items-center">
				<div
					onClick={() => setShowModal(true)}
					className=" cursor-pointer hover:shadow-2xl relative flex flex-col text-gray-700 bg-blue-100 shadow-lg bg-clip-border rounded-xl w-96 max-h-[370px] 2xl:max-h-[450px]"
				>
					<div className="relative mx-8 mt-8 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
						<img src="/single.jpg" alt="profile-picture" />
					</div>
					<div className="p-6 text-center">
						<h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-700">
							Pay to an Individual
						</h4>
					</div>
					<div className="flex justify-center p-6 pt-2 gap-7">
						<a
							href="#facebook"
							className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400"
						>
							<i className="fab fa-facebook" aria-hidden="true"></i>
						</a>
						<a
							href="#twitter"
							className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-light-blue-600 to-light-blue-400"
						>
							<i className="fab fa-twitter" aria-hidden="true"></i>
						</a>
						<a
							href="#instagram"
							className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-purple-600 to-purple-400"
						>
							<i className="fab fa-instagram" aria-hidden="true"></i>
						</a>
					</div>
				</div>

				<div
					onClick={() => [(window.location.href = "/chats")]}
					className=" cursor-pointer hover:shadow-2xl relative flex flex-col text-gray-700 bg-blue-100 shadow-lg bg-clip-border rounded-xl w-96 max-h-[370px] 2xl:max-h-[450px]"
				>
					<div className="relative mx-8 mt-8 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
						<img src="/group.jpg" alt="profile-picture" />
					</div>
					<div className="p-6 text-center">
						<h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-700">
							Settle splits in group
						</h4>
					</div>
					<div className="flex justify-center p-6 pt-2 gap-7">
						<a
							href="#facebook"
							className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400"
						>
							<i className="fab fa-facebook" aria-hidden="true"></i>
						</a>
						<a
							href="#twitter"
							className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-light-blue-600 to-light-blue-400"
						>
							<i className="fab fa-twitter" aria-hidden="true"></i>
						</a>
						<a
							href="#instagram"
							className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-purple-600 to-purple-400"
						>
							<i className="fab fa-instagram" aria-hidden="true"></i>
						</a>
					</div>
				</div>
			</section>
			<PayIndividualModal onClose={handleOnClose} visible={showModal} />
			{/* <CreateGroupModal onClose={handleOnClose} visible={showModal} /> */}
		</>
	);
}
