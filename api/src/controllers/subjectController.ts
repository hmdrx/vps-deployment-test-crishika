import { NextFunction, Request, Response } from 'express';

import Subject from '../models/subject.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';

export const createSubject = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newCat = await Subject.create(req.body);

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
    const subject = await Subject.findById(req.params.id);

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
    const subjects = await Subject.find().select('subject code image -_id');

    res.status(200).json({
      length: subjects.length,
      subjects,
    });
  }
);
export const updateSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let subject = await Subject.findById(req.params.id);

    if (!subject) {
      return next(new AppError('no such subject found to update', 404));
    }

    subject.subject = req.body.subject;
    if (req.body.code) {
      subject.code = req.body.code;
    }
    subject.save();

    res.status(200).json({
      status: 'success',
      data: {
        subject,
      },
    });
  }
);
export const deleteSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return next(new AppError('there is no to delete', 404));
    }

    await Subject.findByIdAndDelete(req.params.id);

    res.status(204).end();
  }
);
export const deleteAllSubject = catchAsync(
  async (_req: Request, res: Response, next: NextFunction) => {
    const subjects = await Subject.find();

    if (!subjects) {
      return next(new AppError('there is no categories to delete', 404));
    }

    await Subject.deleteMany();

    res.status(204).end();
  }
);
