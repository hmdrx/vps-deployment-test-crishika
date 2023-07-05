import mongoose, { Document } from 'mongoose';

export interface IQuestionAttempt extends Document {
  user: mongoose.Types.ObjectId;
  question: mongoose.Types.ObjectId;
  answer: string;
}

// Define a schema for the read collection
const questionAttemptSchema = new mongoose.Schema<IQuestionAttempt>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id must be there'],
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: [true, 'Question id must be there'],
    },
    answer: String,
  },
  {
    timestamps: true,
    strictQuery: true,
  }
);

// Define a model for the read collection
const QuestionAttemptModel = mongoose.model<IQuestionAttempt>(
  'QuestionAttempt',
  questionAttemptSchema
);

export default QuestionAttemptModel;
