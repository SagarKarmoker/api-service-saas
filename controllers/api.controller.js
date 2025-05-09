import bcrypt from "bcryptjs";
import Api from "../models/api.model.js";
import { generateApiKey, generateExpirationDate } from "../utils/api.utils.js";

export async function createApiKey(req, res, next) {
    try {
        const { validDays } = req.body;

        if (!validDays && validDays !== 0) return res.status(400).json({ message: "Valid days is required" });

        const apiKey = generateApiKey();
        const expairesAt = generateExpirationDate(validDays);

        // hased api key if required
        // const hashedApiKey = await bcrypt.hash(apiKey, 10);

        const newApiKey = await Api.create({
            userId: req.user.id,
            apiKey,
            expairesAt,
            isDeleted: false,
            deletedAt: null,
            hitCount: 0
        })

        await newApiKey.save();

        if (expairesAt < new Date()) return res.status(400).json({ message: "Invalid valid days" });
        if (!newApiKey) return res.status(400).json({ message: "Api key not created" });

        if (validDays === 0) {
            res.status(201).json({
                message: "Api key created successfully",
                data: {
                    apiKey
                }
            })
        }

        res.status(201).json({
            message: "Api key created successfully",
            data: {
                apiKey,
                expairesAt
            }
        })
    } catch (error) {
        next(error);
    }
}

export async function getApiKeyByUserId(req, res, next) {
    try {
        const allApiKeys = await Api.find({
            userId: req.user.id,
            isDeleted: false
        })

        if (!allApiKeys) return res.status(404).json({ message: "Api keys not found" });

        res.status(200).json({
            message: "Api keys found successfully",
            data: {
                allApiKeys
            }
        })
    } catch (error) {
        next(error);
    }
}

export async function revokeApiKey(req, res, next) {
    try {
        const apiKeyId = req.params.id;

        if (!apiKeyId) return res.status(400).json({ message: "Api key ID is required" });

        const apiKey = await Api.findById(apiKeyId);

        if (!apiKey) return res.status(404).json({ message: "Api key not found" });

        apiKey.isDeleted = true;
        apiKey.deletedAt = new Date();

        await apiKey.save();

        res.status(200).json({
            message: "Api key revoked successfully",
        })
    } catch (error) {
        next(error);
    }
}