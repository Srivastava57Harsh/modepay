import getPushUser from "./getPushUser";

type groupDesc = {
	chatId: string;
	name: string;
	desc: string;
	image: string;
	created: Date;
	creator: string;
};

export default async function fetchGroups() {
	const groupData: groupDesc[] = [];
	try {
		const pushUser = await getPushUser();

		const aliceChats = await pushUser?.chat.list("CHATS", { limit: 5 });

		const chatIds = aliceChats?.map((chat) => {
			const chatId = chat.chatId;

			const name = chat?.groupInformation?.groupName;

			const desc = chat?.groupInformation?.groupDescription;

			const image = chat?.groupInformation?.groupImage;

			const created = chat?.intentTimestamp;

			const creator = chat?.groupInformation?.groupCreator.substring(7, 71);

			const tempGroupData: groupDesc = {
				chatId: chatId || "",
				name: name || "",
				desc: desc || "",
				image: image || "",
				created: created || "",
				creator: creator || "",
			};

			groupData.push(tempGroupData);
		});

		return groupData;
	} catch (e) {
		console.log(e);
	}
}
