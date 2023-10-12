import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    username: {type:String, required:true}
});

export const UserModel = mongoose.model("users", UserSchema);