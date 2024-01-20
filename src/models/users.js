import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name : {
    type:String ,
    required:true,
  } ,
  email: {
    type: String,
    required:true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    required:true,
    default: false
  },
  googleId: {
    type:String ,
  } ,
  role: {
    type: String,
    required: true,
    default:"user"
    //roles user and admin
  },
  savedTasks: [{
    type: mongoose.Schema.Types.ObjectId, ref: "usertasks"
  }]
});

export const UserModel = mongoose.model("users", UserSchema);