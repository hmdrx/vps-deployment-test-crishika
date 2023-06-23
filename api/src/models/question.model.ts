import mongoose, { Document } from 'mongoose';

// Define an interface for the question document
export interface IQuestion extends Document {
  question: string;
  correctAns: string;
  options: string[];
  subjectCode: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Define a schema for the question collection
const questionSchema = new mongoose.Schema<IQuestion>({
  question: {
    type: String,
    required: [true, 'Please enter question'],
  },
  correctAns: {
    type: String,
    required: [true, 'Please add correct answer'],
  },
  options: {
    type: [String],
    required: [true, 'Please add atleast one other option'],
  },
  subjectCode: {
    type: Number,
    required: [true, 'Please add subject'],
  },
  difficulty: {
    type: String,
    default: 'easy',
    enum: ['easy', 'medium', 'hard'],
  },
});

// Define a model for the question collection
const Question = mongoose.model<IQuestion>('Question', questionSchema);
export default Question;
