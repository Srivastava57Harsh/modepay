interface User {
  username: string;
  wallets: Object;
  friends: Object;
  walletAddress: string;
}

export interface AddFriend {
  selfWalletAddress: string;
  recipientUserName: string;
  recipientWalletAddress: string;
}

export interface NewWalletPayload {
  phone: number;
  walletName: string;
  walletAddress: string;
}

export interface GroupInfo {
  groupName: string;
  users: [];
}

export default User;
