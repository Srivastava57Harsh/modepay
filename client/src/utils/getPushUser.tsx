import * as ethers from "ethers";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

export default async function getPushUser() {
	try {
		const { ethereum }: any = window;

		const accounts = await ethereum.request({
			method: "eth_requestAccounts",
		});

		const pv = new ethers.providers.Web3Provider(ethereum);

		const signer = pv.getSigner();
		const ps = await PushAPI.initialize(signer, {
			env: CONSTANTS.ENV.STAGING,
		});

		return ps;
	} catch (e) {
		console.log(e);
	}
}
