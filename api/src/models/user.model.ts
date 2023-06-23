import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the user document
export declare interface IUser extends Document {
  name: string;
  email: string;
  mobile: number;
  degree: string;
  degreeStatus: 'passout' | 'persuing';
  college: string;
  role: 'user' | 'admin' | 'tutor';
  password: string;
  verified: boolean;
  active: boolean;
  otp?: number;
  otp_valid?: number;
}

// Define a schema for the user collection
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: [true, 'Please enter name.'] },
  email: { type: String, required: [true, 'Please enter email.'] },
  mobile: Number,
  degree: String,
  degreeStatus: {
    type: String,
    enum: ['persuing', 'passout'],
  },
  college: String,
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'tutor'],
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: 8,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  otp: {
    type: Number,
  },
  otp_valid: {
    type: Number,
    default: 3,
  },
});

// Define a pre-save hook to hash the password
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

// Define a model for the user collection
const User = mongoose.model<IUser>('User', userSchema);
export default User;
