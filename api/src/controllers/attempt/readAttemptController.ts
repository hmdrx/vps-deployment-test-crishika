import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import QuestionAttemptModel from '../../models/attempt/questionAttempt.model';
import ReadAttemptModel, {
  IReadAttempt,
} from '../../models/attempt/readAttempt.model';
import AppError from '../../utils/AppError';

import catchAsync from '../../utils/catchAsync';

export const createReadAttempt = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const reads = req.body.readAttempted.map((read: IReadAttempt) => {
      // Create a new document from the read object
      const doc = new ReadAttemptModel({ ...read, user: req.user._id });
      // Validate the document and get the error object
      const error = doc.validateSync();
      // If there is no error, return the updateOne operation
      if (!error) {
        return {
          updateOne: {
            filter: { user: req.user._id, question: read.question },
            update: {
              $set: {
                important: read.important,
              },
            },
            upsert: true,
          },
        };
      } else {
        return null;
      }
    });
    // Filter out any null values from the reads array
    const validReads = reads.filter((read: Object | null) => read !== null);
    const alldata = await ReadAttemptModel.bulkWrite(validReads);

    res.status(201).json({
      alldata,
    });
  }
);

export const getAllReadAttempt = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const allReadAttempt = await ReadAttemptModel.find({
      user: req.user._id,
    });

    res.status(201).json({
      length: allReadAttempt.length,
      allReadAttempt,
    });
  }
);

export const deleteAllReadAttempt = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allReadAttempt = await ReadAttemptModel.find({
      user: req.user._id,
    });
    if (allReadAttempt.length === 0) {
      return next(
        new AppError('No documents found to delete or already deleted', 404)
      );
    }
    await ReadAttemptModel.deleteMany({ user: req.user._id });

    res.status(204).end();
  }
);

//GET INCORRECT/SKIPPED QUESTION ATTEMPT TO READ
export const getIncorrectOrSkippedQuestionAttempt = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const attempt = await QuestionAttemptModel.find({ user: req.user._id });
    if (!attempt) {
      return next(new AppError('there is no attempt to read again', 404));
    }
    let attemptedIds;
    if (req.body.attemptedIds) {
      attemptedIds = req.body.attemptedIds.map(
        (id: string) => new mongoose.Types.ObjectId(id)
      );
    }

    const questions = await QuestionAttemptModel.aggregate()
      .lookup({
        from: 'questions',
        localField: 'question',
        foreignField: '_id',
        as: 'question',
      })
      .unwind('$question')
      .match({
        user: req.user._id,
        _id: { $nin: attemptedIds || [] },
        answer: { $exists: req.query.incorrect === 'true' },
        $expr: {
          $cond: {
            if: req.query.incorrect === 'true',
            then: { $ne: ['$answer', '$question.correctAns'] },
            else: true,
          },
        },
        'question.subjectCode': +req.query.subjectCode!,
      })
      .sample(+req.query.amount! || 10)
      .project({
        // _id: '$question._id',
        questionId: '$question._id',
        subjectCode: '$question.subjectCode',
        question: '$question.question',
        correctAns: '$question.correctAns',
        userAnswer: '$answer',
      });

    res.status(200).json({
      length: questions.length,
      questions,
    });
  }
);
