import mongoose, { Document } from 'mongoose';

// Define an interface for the read document
export interface IReadAttempt extends Document {
  user: mongoose.Types.ObjectId;
  question: mongoose.Types.ObjectId;
  important: boolean;
}

const readAttemptSchema = new mongoose.Schema<IReadAttempt>(
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
    important: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    strictQuery: true,
  }
);

const ReadAttempt = mongoose.model<IReadAttempt>(
  'ReadAttempt',
  readAttemptSchema
);
export default ReadAttempt;
