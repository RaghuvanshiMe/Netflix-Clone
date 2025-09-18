import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async(req, res)=>{
    try {
        const {email, password} = req.body; 
        if(!email || !password){
            return res.status(401).json({
                message:"invalid data",
                success:false
            })
        }   
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"User not found",
                success:false
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid credentials",
                success:false
            })
        }
        
        const token = await jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"});
        return res.status(200).cookie("token", token).json({
            message:`Welcome back ${user.username}`,
            user,
            success:true,
            token
        });
    } catch (error) {
        console.log(error);
    }
}

export const logout = async(req, res)=>{
    try {
        return res.status(200).cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "strict"
        }).json({
            message:"Logout successful",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const register = async(req, res)=>{
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message:"invalid data",
                success:false
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"This email is already in use",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message:"Account is created successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
