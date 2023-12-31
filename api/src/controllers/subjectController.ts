import { NextFunction, Request, Response } from 'express';

import SubjectModel from '../models/subject.model';
import QuestionModel from '../models/question.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';

export const createSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { subject, code } = req.body;
    const existsSub = await SubjectModel.findOne({
      $or: [{ subject }, { code }],
    });
    console.log(existsSub);
    if (existsSub) {
      return next(new AppError('Subject or Subject code already exists.', 409));
    }
    const newCat = await SubjectModel.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        category: newCat,
      },
    });
  }
);
export const getSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const subject = await SubjectModel.findById(req.params.id);

    if (!subject) {
      return next(new AppError('there is no subject with this id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        subject,
      },
    });
  }
);
export const getAllSubject = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const subjects = await SubjectModel.find();

    res.status(200).json({
      length: subjects.length,
      subjects,
    });
  }
);
export const updateSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let subject = await SubjectModel.findById(req.params.id);

    if (!subject) {
      return next(new AppError('no such subject found to update', 404));
    }

    const updatedSub = await SubjectModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        subject: updatedSub,
      },
    });
  }
);
export const deleteSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const subject = await SubjectModel.findById(req.params.id);

    if (!subject) {
      return next(new AppError('there is no to delete', 404));
    }

    await SubjectModel.findByIdAndDelete(req.params.id);

    res.status(204).end();
  }
);
export const deleteAllSubject = catchAsync(
  async (_req: Request, res: Response, next: NextFunction) => {
    const subjects = await SubjectModel.find();

    if (!subjects) {
      return next(new AppError('there is no categories to delete', 404));
    }

    await SubjectModel.deleteMany();

    res.status(204).end();
  }
);

// get only question available subjects
export const getAvailableSubject = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const subjectCodesWithQuestions = await QuestionModel.distinct(
      'subjectCode'
    );
    const subjects = await SubjectModel.find({
      code: { $in: subjectCodesWithQuestions },
    });

    res.status(200).json({
      length: subjects.length,
      subjects,
    });
  }
);
