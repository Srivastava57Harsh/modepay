import React, { useState } from "react";
import createGroup from "../utils/createGroup";

export default function AddGroupModal({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: any;
}) {
	const [addresses, setAddresses] = useState("");
	const [groupName, setGroupName] = useState("");

	function handleAddressesChange(event: any) {
		console.log(event.target.value);
		setAddresses(event.target.value);
	}

	function handleGroupName(event: any) {
		setGroupName(event.target.value);
	}

	function handleOnClose(e: any) {
		if (e.target.id == "container") onClose();
	}

	function handleCreateGroup() {
		const addressesArray = addresses
			.split(",")
			.map((address) => address.trim());
		console.log(addressesArray);
		createGroup(addressesArray, groupName);
		onClose();
	}

	if (!visible) return null;

	return (
		<div
			id="container"
			className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
			onClick={handleOnClose}
		>
			<div className="bg-white p-8 rounded-md shadow-md w-96">
				<h2 className="text-xl font-bold mb-4">Add Group</h2>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Group Name
					</label>
					<textarea
						value={groupName}
						onChange={handleGroupName}
						className="w-full h-20 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Addresses
					</label>
					<textarea
						value={addresses}
						onChange={handleAddressesChange}
						className="w-full h-20 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
					/>
				</div>

				<button
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
					onClick={handleCreateGroup}
				>
					Add Group
				</button>
			</div>
		</div>
	);
}
