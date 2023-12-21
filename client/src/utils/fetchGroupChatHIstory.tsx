import getPushUser from "./getPushUser";
import { CONSTANTS } from "@pushprotocol/restapi";

export default async function fetchGroupChatHistory(chatId: any) {
	try {
		const pushUser = await getPushUser();
		let history = await pushUser?.chat.history(chatId, { limit: 5 });
		// console.log(history);

		const stream = await pushUser?.initStream([CONSTANTS.STREAM.CHAT], {
			filter: {
				chats: [chatId],
			},
			connection: {
				retries: 3,
			},
			raw: false,
		});

		stream?.on(CONSTANTS.STREAM.CHAT, async (data) => {
			history = await pushUser?.chat.history(chatId, { limit: 5 });
			// console.log(his);
		});
		stream?.connect();
		return history;
	} catch (e) {
		console.log(e);
	}
}
