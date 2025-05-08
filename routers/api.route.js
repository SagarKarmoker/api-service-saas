import { Router } from "express";
import { createApiKey, getApiKeyByUserId, revokeApiKey } from "../controllers/api.controller.js";

const apiRouter = Router();

apiRouter.post('/create', createApiKey);
apiRouter.get('/my-keys', getApiKeyByUserId);
apiRouter.delete('/delete', revokeApiKey);

export default apiRouter;