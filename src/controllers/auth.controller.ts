import {Response, Request} from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface authRequest extends Request {
    user?: any;
}   


export const registerUser = async (req: Request, res: Response):Promise<any> => {
    try{
        const {email, password, role ,firstName, lastName ,username,phone,age} = req.body;
        if (!email || !password || !firstName || !lastName || !username || !phone || !age){
            return res.status(400).json({message:"Please provide all required fields"})
        }

        const existingUser = await User.findOne({phone})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser =await User.create(
            {
                email,
                password:hashedPassword,
                role: role || 'user',
                firstName,
                lastName,
                username,
                phone,
                age
            }
        )

        return res.status(201).json({message:"User created successfully", user:newUser})

    }catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }   
}

export const loginUser = async (req: Request, res: Response):Promise<any> => {
    try{
    const {identifier, password} = req.body;
    if (!identifier || !password){
        return res.status(400).json({message:"Please provide identifier and password"})
    }

    const user = await User.findOne({$or:[
        {username:identifier },
        {email:identifier}
    ]})
    if (!user){
        return res.status(400).json({message:"Invalid username or password"})
    }

    const isMatch  = await bcrypt.compare(password, user.password)
    if (!isMatch){
        return res.status(400).json({message:"Invalid username or password"})
    }

    const token = jwt.sign(
        { userId: user._id , role: user.role},
        process.env.JWT_SECRET || "hjhkghggg8854",
        { expiresIn: '1h' });

    return res.status(200).json({ message: "Login successful", token , user:user});

    }catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const getUser = async (req: authRequest, res: Response):Promise<any> => {
    try{
    const userId = req.user?.userId;
    const user = await User.findById(userId).select('-password');
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    return res.status(200).json({message:"User found", user})

    }catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}