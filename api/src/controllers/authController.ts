import User, { IUser } from '../models/user.model';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import sendMail from '../services/mail';
import generateOTP from '../services/otp';
import { tempOtpVerification } from '../services/mailTemplates';
import { NextFunction, Request, Response } from 'express';

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password !== req.body.confirmPassword)
      return next(new AppError(`Password doesn't match`, 401));

    const exitsUser = await User.findOne({ email: req.body.email });

    if (exitsUser) {
      return next(new AppError('already registered with us plz login', 400));
    }

    const generatedOtp = generateOTP(5);

    await sendMail({
      to: req.body.email,
      subject: 'Email Verification',
      otp: generatedOtp,
      template: tempOtpVerification,
    });
    const user = await User.create({ ...req.body, otp: generatedOtp });
    const { role, password, otp, ...others } = user;

    res.status(200).json({
      status: 'success',
      message:
        'OTP sent to your email. (if not found in Inbox pls look into Spam)',
      user: others,
    });
  }
);

export const verification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let user: IUser;
    user = (await User.findOne({ email: req.body.email })) as IUser;
    if (!user)
      return next(new AppError('No email exists for otp verification', 401));

    if (user.otp_valid && user.otp_valid > 1) {
      if (+req.body.otp === user.otp) {
        // user.verified = true;
        // user.otp = undefined;
        // user.otp_valid = undefined;
        // user = await user.save({ validateBeforeSave: false });
        user = (await User.findByIdAndUpdate(
          user._id,
          {
            verified: true,
            otp: undefined,
            otp_valid: undefined,
          },
          { new: true }
        )) as IUser;
        const { role, password, otp, ...others } = user;

        const id = user._id;
        const JWT_SECRETE: string = process.env.JWT_SECRETE!;
        const token = jwt.sign({ id }, JWT_SECRETE, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(200).json({
          status: 'success',
          message: 'OTP verification successful.',
          token: token,
          data: {
            user: others,
          },
        });
      } else if (user.otp_valid) {
        user.otp_valid--;
        user = await user.save({ validateBeforeSave: false });
        return next(new AppError('pls enter valid otp!', 400));
      }
    } else if (user.otp_valid === 1) {
      if (+req.body.otp === user.otp) {
        user.verified = true;
        user.otp = undefined;
        user.otp_valid = undefined;

        user = await user.save({ validateBeforeSave: false });
        const { role, password, otp, ...others } = user;

        const id = user._id;
        const token = jwt.sign({ id }, process.env.JWT_SECRETE!, {
          expiresIn: process.env.JWT_EXPIRES_IN!,
        });

        res.status(200).json({
          status: 'success',
          message: 'OTP verification successful.',
          token: token,
          data: {
            user: others,
          },
        });
      } else {
        await User.findOneAndDelete({ email: req.body.email });
        return next(
          new AppError('You exceed the limit pls try again later!', 401)
        );
      }
    }
  }
);

export const resendOtp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let user;
    user = await User.findOne({ email: req.body.email });

    if (!user)
      return next(
        new AppError('No email exists how can I resend otp! bolo', 401)
      );

    if (user.verified) return next(new AppError('already verified!', 401));

    const generatedOtp = generateOTP(6);

    await sendMail({
      to: req.body.email,
      subject: 'Email Verification',
      otp: generatedOtp,
      template: tempOtpVerification,
    });
    await User.findOneAndUpdate({ email: user.email }, { otp: generatedOtp });

    res.status(200).json({
      status: 'success',
      message: 'otp resent successfully!',
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError('pls provide email & password', 400));

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError(`seems you didn't register yet`, 400));
    }
    if (!user.active)
      return next(
        new AppError('Your account is deleted! mail us to reactivate', 401)
      );

    if (!(await bcrypt.compare(password, user.password)))
      return next(new AppError('Incorrect email or password', 401));

    const id = user._id;

    const token = jwt.sign({ id }, process.env.JWT_SECRETE!, {
      expiresIn: process.env.JWT_EXPIRES_IN!,
    });

    // res.cookie('jwt', token);
    res.status(200).json({
      token,
      user,
    });
  }
);

export const protect = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return next(new AppError('you are not logged in', 401));
    const decoded = jwt.verify(token, process.env.JWT_SECRETE!) as {
      id: string;
    };
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
      return next(
        new AppError('user belonging to this token does no longer exists', 401)
      );
    req.user = currentUser;
    next();
  }
);

export const restrictTo = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`You don't have permission to perform this action`, 403)
      );
    }
    next();
  };
};
