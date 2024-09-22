import mongoose from "mongoose";

const connectDB = async () => {
    const NAME = "Social-media";

    try {
        const conn = await mongoose.connect(
            `${process.env.MONGO_URI}/${NAME}`);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`fail to connect: ${error.message}`);
        process.exit(1);
    }
};

export { connectDB };