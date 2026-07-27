import {Request, Response , NextFunction, RequestHandler} from "express";
import jwt from "jsonwebtoken";

interface authRequest extends Request {
    user?: any;
}

export const checkRole = (role : string[]) =>{
    return (req: authRequest, res: Response, next: NextFunction) : void => {
        const userRole = req.user?.role;
        if (!role.includes(userRole)) {
            res.status(403).json({ message: "Insufficient permissions" });
            return;
        }
        next();
    };
}