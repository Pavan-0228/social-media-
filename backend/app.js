import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import path from "path";

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


const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../frontend/dist");

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../frontend/dist/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
    );
})


export { app };
