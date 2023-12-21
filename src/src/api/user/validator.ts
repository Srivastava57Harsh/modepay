import { NextFunction, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { addFriendSchema, addWalletSchema, createGroupSchema, signUpSchema, transactionSchema } from './schema';

export async function signUpValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await signUpSchema.validate(req.body, { stripUnknown: true });
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}

export async function addFriendValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await addFriendSchema.validate(req.body, { stripUnknown: true });
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}

export async function GroupInfoValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await createGroupSchema.validate(req.body, { stripUnknown: true });
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}

export async function AddWalletValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await addWalletSchema.validate(req.body, { stripUnknown: true });
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}

export async function addTransactionValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await transactionSchema.validate(req.body, { stripUnknown: true });
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}

// export async function getProfileValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
//   try {
//     req.body = await getProfileSchema.validate(req.headers);
//     next();
//   } catch (e) {
//     LoggerInstance.error(e);
//     res.status(422).json({
//       message: 'Token Required',
//       error: e.errors.map(error => error),
//     });
//   }
// }
