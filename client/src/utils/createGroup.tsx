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
			members: walletAddresses,
			admins: [],
			private: false,
		});
		console.log(newGroup);
	} catch (e) {
		console.log(e);
	}
}
