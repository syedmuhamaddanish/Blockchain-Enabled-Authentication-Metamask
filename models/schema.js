import { Schema, model, mongoose } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  blockchainAddress: { type: String, required: true }
});

const User = mongoose.models.User || model('User', userSchema);

export default User;
