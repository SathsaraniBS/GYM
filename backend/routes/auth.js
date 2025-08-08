import exprees from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
const router = exprees.Router();

router.post('/login',async (req, res) => {

    try {
        const { name ,email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            user: newUser,
        });
        
    } catch (error) {
        
    }
});

export default router;