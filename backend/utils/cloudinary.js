import AWS from "aws-sdk";
import fs from "fs";
import path from "path";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const uploadToS3 = async (localFilePath, fileName) => {
    const fileContent = fs.readFileSync(localFilePath);

    // Get the file extension to set the content type
    const fileExtension = path.extname(fileName).toLowerCase();
    let contentType;

    switch (fileExtension) {
        case ".jpg":
        case ".jpeg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".gif":
            contentType = "image/gif";
            break;
        default:
            contentType = "application/octet-stream"; // Default to binary
            break;
    }

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME, // Bucket name
        Key: fileName, // Ensure this is unique (e.g., `images/${Date.now()}-${fileName}`)
        Body: fileContent,
        ACL: "public-read", // Set ACL to public-read
        ContentType: contentType, // Set content type
    };

    // Uploading files to the bucket
    try {
        const data = await s3.upload(params).promise();
        // Delete the locally saved file
        fs.unlinkSync(localFilePath);
        console.log(data); // This is the public URL
        return data.Location; // Return the file URL in S3
    } catch (error) {
        fs.unlinkSync(localFilePath); // Clean up the file even if upload fails
        throw new Error("Error uploading file to S3");
    }
};

export { uploadToS3 };
