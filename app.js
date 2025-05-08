import express from "express"
import morgan from "morgan"
import connectDB from "./config/db.config.js";
import userAuthRouter from "./routers/user.route.js";
import apiRouter from "./routers/api.route.js";
import { PORT } from "./config/env.js";

const app = express();

// Middleware
app.use(morgan('dev')); // Log requests to the console in development format
app.use(express.json()); // Parse JSON bodies

// connect to db
connectDB();

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API Service' });
});

// Routes
app.use('/api/v1/auth', userAuthRouter);
app.use('/api/v1/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});