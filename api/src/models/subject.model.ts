import mongoose, { Document } from 'mongoose';

interface ISubject extends Document {
  subject: string;
  code: number;
  image: string;
}

// Define a schema for the category collection
const subjectSchema = new mongoose.Schema<ISubject>({
  subject: {
    type: String,
    required: [true, 'Must add category'],
  },
  code: Number,
  image: String,
});

// Define a model for the category collection
const SubjectModel = mongoose.model<ISubject>('Subject', subjectSchema);
export default SubjectModel;
