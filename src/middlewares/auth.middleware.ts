import {Request, Response , NextFunction, RequestHandler} from "express";
import jwt from "jsonwebtoken";

interface authRequest extends Request {
    user?: any;
}   

export const verifyToken : RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({message:"No token provided"});
        return;
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as authRequest).user = decoded;
        next();
    }catch(error){
        res.status(401).json({message:"Invalid token"});
    }
}