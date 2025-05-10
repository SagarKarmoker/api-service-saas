import Api from "../models/api.model.js";

export async function apiKeyMiddleware(req, res, next) {
    try {
        // Get API key from request headers
        const apiKey = req.headers['x-api-key'];

        // Check if API key exists
        if (!apiKey) {
            return res.status(401).json({
                success: false,
                message: 'API key is missing'
            });
        }

        // Check if API key is valid
        const isValidApiKey = await Api.findOne({ apiKey, 
            isDeleted: false,
         });
        if (!isValidApiKey) {
            return res.status(403).json({
                success: false,
                message: 'Invalid API key'
            });
        }

        // Check if API key is expired
        if (isValidApiKey.expairesAt && isValidApiKey.expairesAt < new Date()) {
            return res.status(403).json({
                success: false,
                message: 'API key has expired'
            });
        }

        // increase api key usage count and last used time
        isValidApiKey.hitCount++;
        isValidApiKey.lastUsedAt = new Date();
        await isValidApiKey.save();

        // If validation passes, proceed to next middleware
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error at ApiKey Middleware' 
        });
    }
}