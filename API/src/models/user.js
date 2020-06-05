import config from "config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      default: 'normal'
    },
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    preferences: {
      setting1: {
        type: String,
        required: false,
      }
    },
    // Add token with issue datetime and expiration datetime 
    confirmToken: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// encrypt password before save
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified || !user.isNew) {
    // don't rehash if it's an old user
    next();
  } else {
    bcrypt.hash(user.password, config.get("saltingRounds"), function (err, hash) {
      if (err) {
        console.log("Error hashing password for user", user.username);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

export default mongoose.model("User", userSchema);
