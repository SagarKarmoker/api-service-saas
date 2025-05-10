import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    apiKey: {
        type: String,
        required: true,
        unique: true
    },
    expairesAt: {
        type: Date,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    hitCount: {
        type: Number,
        default: 0
    },
    lastUsedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const Api = mongoose.model('Api', apiSchema);
export default Api;