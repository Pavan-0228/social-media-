import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

import { userRouter } from "./routers/user.routes.js";
import { postRouter } from "./routers/post.routes.js";

app.use("/api/v1/auth", userRouter);

app.use("/api/v1/posts", postRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export { app };
