import { Post } from "../models/post.model.js";
import { uploadToS3 } from "../utils/cloudinary.js";

export const createPost = async (req, res) => {
    try {
        const { username, name, socialHandle, title, body } = req.body;

        const imageUrls = [];

        for (const file of req.files) {
            const s3Result = await uploadToS3(
                file.path,
                `images/${Date.now()}-${file.originalname}`
            );
            if (s3Result) {
                imageUrls.push(s3Result); // Add the public URL to the array
            } else {
                return res
                    .status(500)
                    .json({ message: "Error uploading images" });
            }
        }

        const newPost = new Post({
            username,
            name,
            socialHandle,
            title,
            body,
            images: imageUrls,
        });

        await newPost.save();

        res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params; 

        const userPosts = await Post.find({ username }).sort({ createdAt: -1 });

        if (userPosts.length === 0) {
            return res
                .status(204)
                .json({ message: "No posts found for this user" });
        }

        res.status(200).json(userPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user posts", error });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        await post.delete();

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
};