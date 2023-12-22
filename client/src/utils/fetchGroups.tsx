import acceptChatReq from "./acceptChatReq";
import getPushUser from "./getPushUser";

type groupDesc = {
	chatId: string;
	name: string;
	desc: string;
	image: string;
	created: Date;
	creator: string;
	members: string[];
};

export default async function fetchGroups() {
	const groupData: groupDesc[] = [];
	try {
		const pushUser = await getPushUser();

		const reqChat = await pushUser?.chat.list("REQUESTS", { limit: 20 });

		await acceptChatReq(reqChat);

		const aliceChats = await pushUser?.chat.list("CHATS", { limit: 5 });

		// console.log(reqChat);

		const chatIds = aliceChats?.map((chat) => {
			const chatId = chat.chatId;

			const name = chat?.groupInformation?.groupName;

			const desc = chat?.groupInformation?.groupDescription;

			const image = chat?.groupInformation?.groupImage;

			const created = chat?.intentTimestamp;

			const creator = chat?.groupInformation?.groupCreator.substring(7, 71);

			const members: string[] = [];

			const membersArray = chat?.groupInformation?.members;
			membersArray?.map((item) => {
				const member = item?.wallet.slice(7, item.wallet.length);
				members.push(member);
			});

			const tempGroupData: groupDesc = {
				chatId: chatId || "",
				name: name || "",
				desc: desc || "",
				image: image || "",
				created: created || "",
				creator: creator || "",
				members: members || [],
			};

			groupData.push(tempGroupData);
		});

		return groupData;
	} catch (e) {
		console.log(e);
	}
}
