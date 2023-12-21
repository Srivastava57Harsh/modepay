import getPushUser from "./getPushUser";

export default async function createGroup(
	walletAddresses: string[] | null,
	groupName: string
) {
	try {
		console.log(walletAddresses);
		const user: any = await getPushUser();
		console.log(user);
		const newGroup = await user.chat.group.create(groupName, {
			description: "Group Description",
			image: "groupImage",
			members: [
				"0xF776c57B14A029794c21538a54b4Cbdc1978aF82",
				"0x8832fe66Aa71D7446175ecd3B1E133B1Eb252562",
			],
			admins: [],
			private: false,
		});
		console.log(newGroup);
	} catch (e) {
		console.log(e);
	}
}
