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

    //once user is registered, log the user in using token
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.json({token, userID: user._id})
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    // //entered email
    // console.log("now searching for user with email :"+email)

    const user = await UserModel.findOne({email: email})

    // //user
    // console.log("retrieved user: "+user)

    if(!user) {
        return res.json({message : "User does not exist."})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) {
        return res.json({message : "Username or password is invalid."})
    }

    //for login functionality, we use tokens. Token represents a login session and whenever a user logs in, a token is created which is then sent back to the frontend. So whenever the user makes a request on the frontend, the token is used to prove the identity of the user. So everytime the user makes a request on the frontend, the token is sent alongwith and validated to prove the user's identity
    //Imp note: never add personal user information in the jwt token, it becomes vulnerable to misuse
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.json({token, userID: user._id})
    
})



export {router as userRouter};