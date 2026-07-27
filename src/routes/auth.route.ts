import  express  from "express";
import {verifyToken} from "../middlewares/auth.middleware";
import { getUser,loginUser, registerUser } from "../controllers/auth.controller";
import { checkRole } from "../middlewares/role.middleware";

const router = express.Router();

// post /api/auth/register
router.post('/register', registerUser);

// post /api/auth/login
router.post('/login', loginUser);

// get /api/auth/protected
router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({message:"You have accessed a protected route"});
});

// get /api/auth/admin
router.get('/admin', verifyToken, checkRole(['admin']), (req, res) => {
    res.status(200).json({message:"You have accessed an admin route"});
});

// get /api/auth/me
router.get('/me', verifyToken, getUser);

export default router;
