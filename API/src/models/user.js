import mongoose from 'mongoose'

let user = new mongoose.Schema({
  username: {
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
    ref: 'Preferences',
    required: false
  },
  confirmToken: {
    type: String,
    required: false
  }
},{
  timestamps: true
})

export default mongoose.model("User", user)