import express from 'express'
import mongoose from 'mongoose'
import { UserTasksModel } from "../models/userTasks.js";
import { UserModel } from '../models/users.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        //get the tasks belonging to the user
        const response = await UserTasksModel.find({ userOwner : req.body.userID})
        res.json(response)
    } 
    catch(err){
        res.json(err);
    }
})

//another way to achieve above is this : 
// router.get("/savedTasks", async (req, res) => {
//     try{
//         const user = await UserModel.findById(req.body.userID)
//         const savedTasks = await UserTasksModel.find({
//             _id: { $in: user.savedTasks},
//         })
//         res.json({ savedTasks })
//     }
//     catch(err){
//         res.json(err);
//     }
// })

router.post("/", async (req, res) => {
    //save new task and associate it to user
    const {userID, ...taskData} = req.body;
    const item = new UserTasksModel({
        ...taskData,
        userOwner: userID
    });
    try{
        const savedItem = await item.save();

        const user = await UserModel.findById(userID)
        user.savedTasks.push(savedItem);
        await user.save();

        res.json({ savedItem, savedTasks: user.savedTasks})
    } 
    catch(err){
        res.json(err);
    }
})

//alternate way : save new task using post and associate it to the user using put

//can I have multiple get/post requests on same url?

// router.put("/", async (req, res) => {
//     try{
//         const user = await UserModel.findById(req.body.userID)
//         user.savedTasks.push(item);
//         await user.save();
//         res.json({ savedTasks: user.savedTasks})

//     }
//     catch(err){
//         res.json(err)
//     }
    
// })


export {router as userTasksRouter};

