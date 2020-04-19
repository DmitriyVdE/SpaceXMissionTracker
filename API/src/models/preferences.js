import mongoose from 'mongoose';

let preferences = new mongoose.Schema({
  setting1: {
    type: String,
    required: false
  }
},{
  timestamps: true
})

module.exports = mongoose.model("Preferences", preferences);