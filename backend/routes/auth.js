import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async(req,res) =>{
    
    try{
        const {name, email , password} = req.body;
        const user = await User.findOne({email});

        if (user){
            return res.status(401).json({success: false, message: 'User already exists'});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User(
            {
                name,
                email,
                password: hashPassword
            })

        await newUser.save();
        return res.status(200).json({success: true, message: 'User registered successfully'});


    }
    catch(error){
        return res.status(500).json({success: false, message: 'Error in Adding user'});

    }


})


router.post('/login', async(req,res) =>{
    
    try{
        const {email , password} = req.body;
        const user = await User.findOne({email});

        if (!user){
            return res.status(401).json({success: false, message: 'User not exist'});

        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword){
            return res.status(401).json({success: false, message: ' Wrong credentials'});

        }
        const token = jwt.sign({id: user._id}, 'secretkey', {expiresIn: '1h'});
        return res.status(200).json({success: true,token, message: 'Login successfully', token});

        
    }
    catch(error){
        return res.status(500).json({success: false, message: 'Error in Login server'});

    }


})

export default router;