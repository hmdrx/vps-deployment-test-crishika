import { Request, Response } from 'express';
import InquiryModel from '../models/inquiry.model';
import catchAsync from '../utils/catchAsync';

export const createInquiry = catchAsync(
  async (
    req: Request<{}, {}, { name: string; email: string; message: string }>,
    res: Response
  ) => {
    const { name, email, message } = req.body;

    await InquiryModel.create({
      name,
      email,
      message,
    });
    res.status(201).json({
      message: 'Message sent successfully',
    });
  }
);
