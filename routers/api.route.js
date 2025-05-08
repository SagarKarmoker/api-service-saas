import { Router } from "express";
import { createApiKey, getApiKeyByUserId, revokeApiKey } from "../controllers/api.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const apiRouter = Router();

apiRouter.post('/create', authMiddleware, createApiKey);
apiRouter.get('/my-keys', authMiddleware, getApiKeyByUserId);
apiRouter.delete('/delete', authMiddleware, revokeApiKey);

export default apiRouter;