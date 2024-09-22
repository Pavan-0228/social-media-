import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50, // Optional: to limit name length
        },
        socialHandle: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50, // Optional: to limit social handle length
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 100,
        },
        body: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
