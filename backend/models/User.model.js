import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  blocks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Block',
    default: []
  }]
},
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;

