import dotenv from "dotenv";
dotenv.config();

export const {
    PORT,
    JWT_SECRET,
    MONGO_URI
} = process.env;