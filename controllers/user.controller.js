import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config/env.js";

export async function signUp(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            })
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "User already exists"
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user._id
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


export async function signIn(req, res) {
    try {
        const { username, email, password } = req.body;

        if ((!username && !password) || (!email &&!password)) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            })
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "User does not exist"
            })
        }

        // compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                error: "Invalid credentials"
            })
        }

        // create token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "1d"
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}