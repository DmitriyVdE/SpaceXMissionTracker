import mongoose from 'mongoose';

let user = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
  },
  preferences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Preferences'
  },
  confirm_token: {
    type: String,
    required: false
  }
},{
  timestamps: true
})

module.exports = mongoose.model("User", user);