import getPushUser from "./getPushUser";

export default async function sendMessage(
	bobAccount: string | null,
	message: string
) {
	//bobAccount can be wallet address or group chat id
	try {
		const user: any = await getPushUser();
		console.log(bobAccount, message);

		const aliceMessagesBob = await user.chat.send(bobAccount, {
			type: "Text",
			content: message,
		});

		console.log(aliceMessagesBob);
	} catch (e) {
		console.log(e);
	}
}
