import mongoose, { Document } from 'mongoose';

export declare interface IInquiry extends Document {
  name: string;
  email: string;
  message: string;
}

const inquirySchema = new mongoose.Schema<IInquiry>({
  name: {
    type: String,
    required: [true, 'Please enter a name.'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email.'],
  },
  message: {
    type: String,
    required: [true, 'Please enter a message.'],
    maxlength: [1000, 'Message cannot exceed 1000 characters.'],
  },
});

// Define a model for the user collection
const InquiryModel = mongoose.model<IInquiry>('Contact', inquirySchema);
export default InquiryModel;
