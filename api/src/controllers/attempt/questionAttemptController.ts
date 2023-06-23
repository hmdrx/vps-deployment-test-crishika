import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import QuestionAttempt, {
  IQuestionAttempt,
} from '../../models/attempt/questionAttempt.model';
import AppError from '../../utils/AppError';

import catchAsync from '../../utils/catchAsync';

export const createQuestionAttempt = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const questions = req.body.questionAttempted.map(
      (question: IQuestionAttempt) => {
        // Create a new document from the read object
        const doc = new QuestionAttempt({ ...question, user: req.user._id });
        // Validate the document and get the error object
        const error = doc.validateSync();
        // If there is no error, return the updateOne operation
        if (!error) {
          let update = {};

          if (question.answer) {
            update = {
              $set: {
                answer: question.answer,
              },
            };
          } else {
            update = {
              $unset: {
                answer: '',
              },
            };
          }

          return {
            updateOne: {
              filter: { user: req.user._id, question: question.question },
              update,
              upsert: true,
              // setOnInsert: true,
            },
          };
        } else {
          return null;
        }
      }
    );
    // Filter out any null values from the reads array
    const validQuestionAttempt = questions.filter(
      (read: any | null) => read !== null
    );
    const alldata = await QuestionAttempt.bulkWrite(validQuestionAttempt);

    res.status(201).json({
      alldata,
    });
  }
);

export const getAllQuestionAttempt = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const allQuestionAttempt = await QuestionAttempt.find({
      user: req.user._id,
    });

    res.status(200).json({
      length: allQuestionAttempt.length,
      allQuestionAttempt,
    });
  }
);
export const deleteAllQuestionAttempt = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allQuestionAttempt = await QuestionAttempt.find({
      user: req.user._id,
    });
    if (allQuestionAttempt.length === 0) {
      return next(
        new AppError('No documents found to delete or already deleted', 404)
      );
    }
    await QuestionAttempt.deleteMany({ user: req.user._id });

    res.status(204).end();
  }
);

//GET WRONG/SKIPPED QUESTION ATTEMPT TO PRACTICE
export const getIncorrectQuestionAttempt = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const read = await QuestionAttempt.find({
      user: req.user._id,
    });
    if (!read) {
      return next(
        new AppError('there is no attempted question to show report', 404)
      );
    }

    let attemptedIds;
    if (req.body.attemptedIds) {
      attemptedIds = req.body.attemptedIds.map(
        (id: string) => new mongoose.Types.ObjectId(id)
      );
    }

    const questions = await QuestionAttempt.aggregate()
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
        questionId: '$question._id',
        question: '$question.question',
        options: '$question.options',
        correctAns: '$question.correctAns',
        userAnswer: '$answer',
        subjectCode: '$question.subjectCode',
      });

    res.status(200).json({
      length: questions.length,
      questions,
    });
  }
);
