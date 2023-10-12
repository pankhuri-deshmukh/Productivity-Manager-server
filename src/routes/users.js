import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (res, req) => {
    
});

export {router as userRouter};