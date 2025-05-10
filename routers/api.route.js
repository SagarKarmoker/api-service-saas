import { Router } from "express";
import { createApiKey, getApiKeyByUserId, revokeApiKey } from "../controllers/api.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { apiKeyMiddleware } from "../middlewares/api.middleware.js";

const apiRouter = Router();

apiRouter.post('/create', authMiddleware, createApiKey);
apiRouter.get('/my-keys', authMiddleware, getApiKeyByUserId);
apiRouter.delete('/delete/:id', authMiddleware, revokeApiKey);

// usage of api key
apiRouter.get("/", apiKeyMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "API key is valid",
        data: {
            message: "You are authorized to access this route",
        }
    })
})

export default apiRouter;