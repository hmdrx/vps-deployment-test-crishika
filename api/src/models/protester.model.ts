import mongoose, { Document } from 'mongoose';

// Define an interface for the user document
export declare interface IProtester extends Document {
  name: string;
  sentMail: boolean;
}

// Define a schema for the user collection
const protesterSchema = new mongoose.Schema<IProtester>(
  {
    name: { type: String, required: [true, 'Please enter name.'] },

    sentMail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strictQuery: true,
  }
);

// Define a model for the user collection
const ProtesterModel = mongoose.model<IProtester>('Protester', protesterSchema);
export default ProtesterModel;
