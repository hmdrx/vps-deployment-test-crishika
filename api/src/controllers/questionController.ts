import { NextFunction, Request, Response } from 'express';

import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import QuestionModel, { IQuestion } from '../models/question.model';
// import ReadAttempt from '../models/attempt/readAttempt.model';
// import QuestionAttempt from '../models/attempt/questionAttempt.model';
import mongoose from 'mongoose';

export const createQuestion = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newQues = await QuestionModel.create(req.body);

    res.status(200).json({
      status: 'success',
      message: 'created',
      data: {
        question: newQues,
      },
    });
  }
);

export const getQuestion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ques = await QuestionModel.findById(req.params.id);
    if (!ques) {
      return next(new AppError('there is no question', 402));
    }
    res.status(200).json({
      status: 'success',
      data: {
        question: ques,
      },
    });
  }
);

export const getAllQuestion = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    let allQuestion;

    if (req.query.amount) {
      allQuestion = await QuestionModel.find().limit(+req.query.amount);
    } else {
      console.log('im working');
      allQuestion = await QuestionModel.find();
    }

    res.status(200).json({
      status: 'success',
      length: allQuestion.length,
      questions: allQuestion,
    });
  }
);
export const updateQuestion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const questionId = await QuestionModel.findById(req.params.id);

    if (!questionId)
      next(new AppError('there is no question with this id', 404));

    const updatedQuestion = await QuestionModel.updateOne(
      { _id: questionId },
      req.body
    );

    res.status(200).json({
      status: 'success',
      data: {
        question: updatedQuestion,
      },
    });
  }
);

export const deleteQuestion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const questionId = (await QuestionModel.findById(
      req.params.id
    )) as IQuestion;
    if (!questionId) next(new AppError('no question found to delete', 404));

    await QuestionModel.findOneAndDelete(questionId._id);
    res.status(204).json({
      status: 'success',
      message: 'deleted',
    });
  }
);
export const deleteAllQuestion = catchAsync(
  async (_req: Request, res: Response, next: NextFunction) => {
    const questions = await QuestionModel.find({});

    if (questions.length === 0) {
      return next(new AppError('no question found to delete', 404));
    }

    await QuestionModel.deleteMany({});

    res.status(204).json({
      status: 'success',
    });
  }
);

// USER CONTROLLER
export const getPracticeQuestion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (+req.query.amount! > 30) {
      return next(new AppError('Question amount max 30 allowed', 400));
    }
    let attemptedIds;
    if (req.body.attemptedIds) {
      attemptedIds = req.body.attemptedIds.map(
        (id: string) => new mongoose.Types.ObjectId(id)
      );
    }

    const allQuestion = await QuestionModel.aggregate()
      .lookup({
        from: 'questionattempts',
        localField: '_id',
        foreignField: 'question',
        as: 'attempts',
      })
      .match({
        subjectCode: +req.query.subjectCode!,
        _id: { $nin: attemptedIds || [] },
        $or: [
          { attempts: { $size: 0 } },
          { 'attempts.user': { $ne: req.user._id } },
        ],
      })
      .sample(+req.query.amount! || 10)
      .project({
        attempts: 0,
        difficulty: 0,
        __v: 0,
      });

    res.status(200).json({
      status: 'success',
      length: allQuestion.length,
      questions: allQuestion,
    });
  }
);
export const getReadQuestion = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    let attemptedIds;
    if (req.body.attemptedIds) {
      attemptedIds = req.body.attemptedIds.map(
        (id: string) => new mongoose.Types.ObjectId(id)
      );
    }

    const allQuestion = await QuestionModel.aggregate()
      .lookup({
        from: 'readattempts',
        localField: '_id',
        foreignField: 'question',
        as: 'attempts',
      })
      .match({
        subjectCode: +req.query.subjectCode!,
        _id: { $nin: attemptedIds || [] },
        $or: [
          { attempts: { $size: 0 } },
          { 'attempts.user': { $ne: req.user._id } },
        ],
      })
      .project({
        attempts: 0,
        difficulty: 0,
        options: 0,
        subjectCode: 0,
        __v: 0,
      })
      .sample(10);

    // const allQuestion = await Question.find({
    //   _id: {
    //     $nin: req.query.practice
    //       ? await QuestionAttempt.find({ user: req.user._id }).distinct(
    //           'question'
    //         )
    //       : await ReadAttempt.find({ user: req.user._id }).distinct('question'),
    //   },
    // });

    res.status(200).json({
      length: allQuestion.length,
      questions: allQuestion,
    });
  }
);
