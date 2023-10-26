import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserModel} from '../models/users.js'
import * as dotenv from 'dotenv'

dotenv.config();

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

router.post('/login', async (req, res) => {
    const {name, email, password} = req.body;

    const user = await UserModel.findOne({email: email})
    if(!user) {
        return res.json({message : "User does not exist."})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) {
        return res.json({message : "Username or passoword is invalid."})
    }

    //Imp note: never add personal user information in the jwt token, it becomes vulnerable to misuse
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.json({token})
    
})



export {router as userRouter};