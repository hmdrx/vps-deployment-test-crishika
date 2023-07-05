import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the user document
export declare interface IUser extends Document {
  name: string;
  mobile: number;
  email: string;
  gender: 'male' | 'female' | 'other';
  degree: string;
  degreeStatus: string;
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
  mobile: { type: Number, required: [true, 'Please enter mobile.'] },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  email: String,
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
const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
