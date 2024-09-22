import { Router } from "express";
import {
    createPost,
    getAllPosts,
    getUserPosts,
} from "../conntroller/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const postRouter = Router();

postRouter.post("/posts", upload.array("images", 5), createPost);

postRouter.get("/posts", getAllPosts);

postRouter.get("/posts/user/:username", getUserPosts);

export { postRouter };
