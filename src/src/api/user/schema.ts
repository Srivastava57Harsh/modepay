import * as yup from 'yup';

const signUp = {
  username: yup.string().required(),
  walletAddress: yup.string().required(),
};

const addFriend = {
  selfWalletAddress: yup.string().required(),
  recipientUserName: yup.string().required(),
  recipientWalletAddress: yup.string().required(),
};

const createGroup = {
  groupName: yup.string().required(),
  users: yup.array().required(),
};

const addWallet = {
  phone: yup.number().required(),
  walletName: yup.string().required(),
  walletAddress: yup.string().required(),
};

const transaction = {
  hash: yup.string().required(),
  to: yup.string().required(),
  amount: yup.string().required(),
};

export const signUpSchema = new yup.ObjectSchema(signUp);
export const addFriendSchema = new yup.ObjectSchema(addFriend);
export const createGroupSchema = new yup.ObjectSchema(createGroup);
export const addWalletSchema = new yup.ObjectSchema(addWallet);
export const transactionSchema = new yup.ObjectSchema(transaction);
