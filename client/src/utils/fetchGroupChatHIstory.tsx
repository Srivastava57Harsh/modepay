import getPushUser from "./getPushUser";
import { CONSTANTS } from "@pushprotocol/restapi";

export default async function fetchGroupChatHistory(chatId: string) {
	try {
		const pushUser = await getPushUser();
		const history = await pushUser?.chat.history(chatId, { limit: 5 });
		// console.log(history);
		return history;

		// const stream = await pushUser?.initStream([CONSTANTS.STREAM.CHAT], {
		// 	filter: {
		// 		chats: [chatId],
		// 	},
		// 	connection: {
		// 		retries: 3,
		// 	},
		// 	raw: false,
		// });

		// stream?.on(CONSTANTS.STREAM.CHAT, async (data) => {
		// 	const his = await pushUser?.chat.history(chatId, { limit: 20 });
		// 	console.log(his);
		// });
		// stream?.connect();
	} catch (e) {
		console.log(e);
	}
}
