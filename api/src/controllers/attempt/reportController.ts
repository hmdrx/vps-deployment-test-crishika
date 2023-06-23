import { NextFunction, Request, Response } from 'express';
import QuestionAttempt from '../../models/attempt/questionAttempt.model';
import ReadAttempt from '../../models/attempt/readAttempt.model';
import catchAsync from '../../utils/catchAsync';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatDate(date: Date) {
  const monthName = months[date.getMonth()];

  return `${date.getDate()} ${monthName}`;
}
// function formatDate(date: Date) {
//   return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(
//     date.getDate()
//   )}`;
// }

// function padNumber(number: number) {
//   return number.toString().padStart(2, '0');
// }

const piplineFunc = (userId: string) => {
  const currentDate = new Date();
  const lastWeekDate = new Date();
  lastWeekDate.setDate(currentDate.getDate() - 7);

  return [
    {
      $match: {
        createdAt: { $gte: lastWeekDate },
        user: userId,
      },
    },
    {
      $group: {
        _id: {
          day: { $dayOfMonth: '$createdAt' },
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        day: '$_id.day',
        month: '$_id.month',
        year: '$_id.year',
        count: 1,
      },
    },
  ];
};

const getWeeklyProgress = <
  T extends { day: number; month: number; year: number; count: number }
>(
  document: T[]
) => {
  const currentDate = new Date();

  const data: Record<string, number> = {};

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() - i);

    const attempts = document.find(
      r =>
        r.day === date.getDate() &&
        r.month === date.getMonth() + 1 &&
        r.year === date.getFullYear()
    );

    const docCount = attempts ? attempts.count : 0;
    if (i === 0) {
      data['Today'] = docCount;
    } else if (i === 1) {
      data['Yesterday'] = docCount;
    } else {
      data[formatDate(date)] = docCount;
    }
    // data[formatDate(date)] = docCount;
  }
  return data;
};

const getQuestionAttemptReportFunc = (userId: string) => {
  const data = QuestionAttempt.aggregate()
    .match({ user: userId })
    .lookup({
      from: 'questions',
      localField: 'question',
      foreignField: '_id',
      as: 'question',
    })
    .unwind('$question')
    .group({
      _id: '$question.subjectCode',

      correctCount: {
        $sum: {
          $cond: [{ $eq: ['$answer', '$question.correctAns'] }, 1, 0],
        },
      },
      incorrectCount: {
        $sum: {
          $cond: [
            {
              $and: [
                { $ne: [{ $type: '$answer' }, 'missing'] },
                { $ne: ['$answer', '$question.correctAns'] },
              ],
            },
            1,
            0,
          ],
        },
      },
      skippedCount: {
        $sum: {
          $cond: [
            {
              $or: [
                { $eq: ['$answer', null] },
                { $eq: [{ $type: '$answer' }, 'missing'] },
              ],
            },
            1,
            0,
          ],
        },
      },
    })
    .sort({ _id: 1 })
    .group({
      _id: null,

      totalCorrectCount: {
        $sum: '$correctCount',
      },
      totalIncorrectCount: {
        $sum: '$incorrectCount',
      },
      totalSkippedCount: {
        $sum: '$skippedCount',
      },
      practiceSubject: {
        $push: {
          subjectCode: '$_id',
          correctCount: '$correctCount',
          incorrectCount: '$incorrectCount',
          skippedCount: '$skippedCount',
        },
      },
    })
    .project({
      _id: 0,
    });

  return data;
};

const getReadAttemptReportFunc = (userId: string) => {
  const data = ReadAttempt.aggregate()
    .match({
      user: userId,
    })
    .lookup({
      from: 'questions',
      localField: 'question',
      foreignField: '_id',
      as: 'question',
    })
    .unwind('$question')
    .group({
      _id: '$question.subjectCode',
      readCount: {
        $sum: 1,
      },
      importantReadCount: {
        $sum: {
          $cond: [{ $eq: ['$important', true] }, 1, 0],
        },
      },
    })
    .match({
      $or: [{ readCount: { $gt: 0 } }, { importantReadCount: { $gt: 0 } }],
    })
    .sort({ _id: 1 })
    .group({
      _id: null,
      totalReadCount: { $sum: '$readCount' },
      totalImportantReadCount: { $sum: '$importantReadCount' },
      readSubject: {
        $push: {
          subjectCode: '$_id',
          readCount: '$readCount',
          importantReadCount: '$importantReadCount',
        },
      },
    })
    .project({ _id: 0 });

  return data;
};

// -------------- PRACTICE---------------------
export const getQuestionAttemptReport = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const report = await getQuestionAttemptReportFunc(req.user._id);
    res.status(200).json({
      ...report[0],
    });
  }
);

export const getLastSevenDaysQuestionAttemptProgress = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const pipeline = piplineFunc(req.user._id);
    const questionResults = await QuestionAttempt.aggregate(pipeline);
    const data = getWeeklyProgress(questionResults);
    res.status(200).json({
      data,
    });
  }
);

// -------------- READ---------------------
export const getReadAttemptReport = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const report = await getReadAttemptReportFunc(req.user._id);
    res.status(200).json({
      report,
    });
  }
);

export const getLastSevenDaysReadAttemptProgress = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const pipeline = piplineFunc(req.user._id);
    const readResults = await ReadAttempt.aggregate(pipeline);
    const data = getWeeklyProgress(readResults);
    res.status(200).json({
      data,
    });
  }
);

// ----------------- COMBINED ----------------------------
export const getQuestionAttemptReportAndProgress = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const pipeline = piplineFunc(req.user._id);
    const questionResults = await QuestionAttempt.aggregate(pipeline);
    const data = getWeeklyProgress(questionResults);
    const report = await getQuestionAttemptReportFunc(req.user._id);
    res.status(200).json({
      ...report[0],
      practiceWeeklyProgress: data,
    });
  }
);

export const getReadReportAndProgress = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const report = await getReadAttemptReportFunc(req.user._id);
    const pipeline = piplineFunc(req.user._id);
    const readResults = await ReadAttempt.aggregate(pipeline);
    const data = getWeeklyProgress(readResults);
    res.status(200).json({
      ...report[0],
      readWeeklyProgress: data,
    });
  }
);

export const getAllReportAtOnce = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    //question
    const questionPipeline = piplineFunc(req.user._id);
    const questionResults = await QuestionAttempt.aggregate(questionPipeline);
    const questionData = getWeeklyProgress(questionResults);
    const questionReport = await getQuestionAttemptReportFunc(req.user._id);

    // Read
    const readReport = await getReadAttemptReportFunc(req.user._id);
    const readPipeline = piplineFunc(req.user._id);
    const readResults = await ReadAttempt.aggregate(readPipeline);
    const readData = getWeeklyProgress(readResults);

    res.status(200).json({
      // question: {
      //   report: questionReport[0],
      //   progress: questionData,
      // },
      // read: {
      //   report: readReport[0],
      //   progress: readData,
      // },
      ...questionReport[0],
      practiceWeeklyProgress: questionData,
      ...readReport[0],
      readWeeklyProgress: readData,
    });
  }
);
