import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserModel} from '../models/users.js'

const router = express.Router();

router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    const user = await UserModel.findOne({email: email})
    if(user) {
        return res.json({message : "User already exists."})
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new UserModel({email : email, password: hashedPwd, name:name})
    await newUser.save();

    res.json({message: "User registered successfully"});
});



export {router as userRouter};