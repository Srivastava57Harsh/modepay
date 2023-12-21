import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import {
  createUser,
  createGroup,
  fetchUsers,
  checkUser,
  addWallet,
  fetchGroups,
  addFriend,
  addTransaction,
} from './controller';
import {
  AddWalletValidator,
  GroupInfoValidator,
  addFriendValidator,
  signUpValidator,
  addTransactionValidator,
} from './validator';
const userRouter = Router();

async function handleSignUp(req: Request, res: Response) {
  try {
    const result = await createUser(req.body);
    if (result.bool) {
      res.status(201).json({
        message: 'Success',
      });
    } else {
      throw {
        status: 400,
        message: result.message,
      };
    }
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleAddFriend(req: Request, res: Response) {
  try {
    const response = await addFriend(req.body);
    if (response.bool) {
      res.status(201).json({
        message: response.message,
      });
    } else {
      throw {
        status: 400,
        message: response.message,
      };
    }
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleCheckUser(req: Request, res: Response) {
  try {
    const result = await checkUser(req.body.walletAddress);
    res.status(201).json({
      flag: result.bool,
      message: result.message,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleCreateGroup(req: Request, res: Response) {
  try {
    const result = await createGroup(req.body);

    res.status(200).json({
      message: 'Success',
      data: result,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleFetchUsers(req: Request, res: Response) {
  try {
    const user = await fetchUsers();
    res.status(200).json({
      message: 'Success',
      data: user,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleFetchGroups(req: Request, res: Response) {
  try {
    const user = await fetchGroups();
    res.status(200).json({
      message: 'Success',
      data: user,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleAddWallet(req: Request, res: Response) {
  try {
    const user = await addWallet(req.body);
    res.status(200).json({
      message: 'Success',
      data: user,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleAddTransaction(req: Request, res: Response) {
  try {
    const user = await addTransaction(req.body.transaction, req.body.sender);
    res.status(200).json({
      message: 'Success',
      data: user,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

userRouter.post('/signUp', signUpValidator, handleSignUp);
userRouter.post('/addFriend', addFriendValidator, handleAddFriend);
userRouter.post('/checkUser', handleCheckUser);
userRouter.post('/createGroup', GroupInfoValidator, handleCreateGroup);
userRouter.get('/fetchUsers', handleFetchUsers);
userRouter.get('/fetchGroups', handleFetchGroups);
userRouter.post('/addWallet', AddWalletValidator, handleAddWallet);
userRouter.post('/addTransaction', addTransactionValidator, handleAddTransaction);

export default userRouter;
