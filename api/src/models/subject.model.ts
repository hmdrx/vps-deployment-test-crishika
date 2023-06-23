import mongoose, { Document } from 'mongoose';

interface SubjectDocument extends Document {
  subject: string;
  code: number;
}

// Define a schema for the category collection
const subjectSchema = new mongoose.Schema<SubjectDocument>({
  subject: {
    type: String,
    required: [true, 'Must add category'],
  },
  code: Number,
});

// Define a model for the category collection
const Subject = mongoose.model<SubjectDocument>('Subject', subjectSchema);
export default Subject;
