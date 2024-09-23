import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set up CORS options
app.use(cors({
    origin: process.env.CORS_ORIGIN,   // Set your CORS origin
    credentials: true
}));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routers
import { userRouter } from "./routers/user.routes.js";
import { postRouter } from "./routers/post.routes.js";

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/posts", postRouter);

// Serve static files from the frontend
const buildPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(buildPath));

// Fallback route to serve the React app
app.get("/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../frontend/dist/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

export { app };
