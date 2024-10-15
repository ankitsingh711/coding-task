import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
