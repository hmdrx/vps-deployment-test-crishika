import User, { IUser } from '../models/user.model';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import bcrypt from 'bcrypt';
import generateOTP from '../services/otp';
import sendMail from '../services/mail';
import jwt from 'jsonwebtoken';
import { tempResetPasswordOtp } from '../services/mailTemplates';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

export const myProfile = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
      user: req.user,
    });
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      user,
    });
  }
);
export const getAllUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    console.log(req.headers);
    const users = await User.find({});
    res.status(200).json({
      length: users.length,
      users,
    });
  }
);
export const updateMe = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { _id } = req.user;

    const { role, password, otp, otp_valid, verified, active, ...others } =
      req.body;

    let updatedUser = await User.findByIdAndUpdate(_id, others, {
      new: true,
    });

    res.status(200).json({
      user: updatedUser,
    });
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id, password } = req.user;

    if (
      !req.body.password ||
      !req.body.newPassword ||
      !req.body.confirmPassword
    )
      return next(new AppError('Please enter each password field', 401));

    if (req.body.newPassword !== req.body.confirmPassword)
      return next(new AppError(`Password doesn't match`, 401));

    if (!(await bcrypt.compare(req.body.password, password)))
      return next(new AppError('Pls enter correct old password', 401));

    let updateUser = (await User.findById(_id)) as IUser;

    updateUser.password = req.body.newPassword;
    await updateUser.save();

    res.status(200).json({
      message: 'password updated successfully!',
    });
  }
);

export const resetAppPasswordSendOtp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { mobile } = req.body;

    const user = await User.findOne({ mobile: +mobile });
    if (!user)
      return next(
        new AppError(
          'there is no user with this mobile plz enter correct mobile number',
          401
        )
      );

    const generatedOtp = generateOTP(4);

    const resetPasswordToken = jwt.sign(
      { otp: generatedOtp },
      process.env.JWT_SECRETE,
      {
        expiresIn: '10m',
      }
    );

    try {
      await axios.post(
        'https://www.fast2sms.com/dev/bulkV2',
        {
          variables_values: generatedOtp,
          route: 'otp',
          numbers: req.body.mobile,
        },
        {
          headers: {
            Authorization: process.env.FAST_TO_SMS_API_KEY,
          },
        }
      );
    } catch (error) {
      console.log(error);
      return next(new AppError('Unable to send sms', 400));
    }

    res.status(200).json({
      message: 'OTP sent successfully.',
      token: resetPasswordToken,
    });
  }
);
export const resetPasswordSendOtp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return next(
        new AppError(
          'there is no user with this email plz enter correct email',
          401
        )
      );

    const generatedOtp = generateOTP(5);

    await sendMail({
      to: req.body.email,
      subject: 'Reset Password',
      otp: generatedOtp,
      template: tempResetPasswordOtp,
    });

    await User.findByIdAndUpdate(user._id, { otp: generatedOtp });

    res.status(200).json({
      status: 'success',
      message:
        'OTP sent into your mail to reset password. if not found plz check spam.',
    });
  }
);

export const resetAppPasswordOtpValidation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { mobile, otp } = req.body;

    let user = await User.findOne({ mobile: +mobile });
    if (!user) return next(new AppError('Invalid access. user not found', 401));

    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer')
    ) {
      return next(new AppError('bad request', 400));
    }

    const resetToken = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRETE) as {
      otp: string;
    };

    if (otp !== decoded.otp) {
      return next(new AppError('Invalid otp', 400));
    }

    res.status(200).json({
      message: 'OTP verified!',
    });
  }
);
export const resetPasswordOtpValidation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;

    let user = await User.findOne({ email });
    if (!user) return next(new AppError('Invalid access. user not found', 401));

    if (user.otp !== otp)
      return next(new AppError('Invalid otp. Pls enter valid otp', 403));
    if (user.otp === otp) {
      await User.findByIdAndUpdate(user._id, { otp: undefined });
    }

    res.status(200).json({
      status: 'success',
      message: 'OTP verified!',
    });
  }
);
export const resetAppPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { mobile, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword)
      return next(new AppError(`Password doesn't match`, 401));

    let user = await User.findOne({ mobile: +mobile });
    if (!user) return next(new AppError('Invalid input. user not found', 401));

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      message: 'Password reset successful!',
    });
  }
);
export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword)
      return next(new AppError(`Password doesn't match`, 401));

    let user = await User.findOne({ email });
    if (!user) return next(new AppError('Invalid input. user not found', 401));

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'new password set successfully!',
    });
  }
);

export const deleteMe = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    await User.findByIdAndUpdate(req.user._id, { active: false });
    res.status(200).json({
      status: 'success',
      message: 'We have deleted you account!',
    });
  }
);

export const reactiveUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const user = (await User.findById(id)) as IUser;
    if (!user) return next(new AppError('there is no user with this id', 404));

    if (!user.active) {
      await User.findByIdAndUpdate(id, { active: true });
    }

    res.status(200).json({
      status: 'success',
      message: 'Account reactivated!',
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
    });
  }
);

export const deleteAllUser = catchAsync(
  async (_req: Request, res: Response, next: NextFunction) => {
    // const users = await User.find();
    const users = await User.find({ role: 'user' });
    if (users.length === 0)
      return next(new AppError('no users to delete', 404));
    await User.deleteMany({ role: 'user' });
    // await User.deleteMany();
    res.status(204).json({
      status: 'success',
    });
  }
);
