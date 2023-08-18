import { NextFunction, Request, Response } from 'express';
import ProtesterModel from '../models/protester.model';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';

export const createProtester = catchAsync(
  async (req: Request<{}, {}, { name: string }>, res: Response) => {
    const { name } = req.body;
    const protester = await ProtesterModel.create({
      name,
    });
    res.status(201).json({
      message: 'Intiated protest',
      protester,
    });
  }
);
export const updateProtester = catchAsync(
  async (req: Request, res: Response) => {
    const { _id, ...others } = req.body;

    const protester = await ProtesterModel.findByIdAndUpdate(
      _id,
      {
        ...others,
      },
      { new: true }
    );
    res.status(200).json({
      message: 'Confirmed protest',
      protester,
    });
  }
);
export const deleteProtester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    if (!_id) {
      return next(new AppError('Plz provide id', 400));
    }

    const protester = await ProtesterModel.findById(_id);
    if (!protester) {
      return next(new AppError('No protester found!', 404));
    }
    if (protester?.sentMail === true) {
      return next(new AppError('You already confirmed as email sent!', 400));
    }
    await ProtesterModel.findByIdAndDelete(_id);
    res.status(204).json({
      message: 'Deleted protester',
    });
  }
);
export const getAllProtester = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const protester = await ProtesterModel.find();

    res.status(200).json({
      length: protester.length,
      protester,
    });
  }
);
