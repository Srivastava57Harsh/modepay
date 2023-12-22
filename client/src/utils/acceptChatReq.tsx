import getPushUser from "./getPushUser";
export default async function acceptChatReq(chatIds: any) {
	try {
		const user: any = await getPushUser();
		chatIds.map(async (item: any) => {
			const acceptRequest = await user.chat.accept(item.chatId);
			console.log(acceptRequest);
		});
	} catch (e) {
		console.log(e);
	}
}
