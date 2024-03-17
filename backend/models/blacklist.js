import mongoose from "mongoose";
const BlacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);
export const BlackList = mongoose.model("blacklist", BlacklistSchema);