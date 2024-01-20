import mongoose from "mongoose";

const UserTasksSchema = new mongoose.Schema({
  title : {
    type:String ,
    required:true,
  } ,
  description : {
    type:String ,
  } ,
  status: {
    type: String,
  },
  priority: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
  progress: {
    type: Number,
    default: 0,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users",
    required: true,
  }
});

export const UserTasksModel = mongoose.model("userTasks", UserTasksSchema);