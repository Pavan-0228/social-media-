import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const CreatePost = () => {
    const [postData, setPostData] = useState({
        username: "",
        name: "",
        socialHandle: "",
        title: "",
        body: "",
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    // Handle text input change
    const handleChange = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle image selection and preview
    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

        // Check for file type validation
        const filteredFiles = newFiles.filter((file) =>
            validExtensions.includes(file.type)
        );

        if (filteredFiles.length !== newFiles.length) {
            setErrorMessage("Please upload only jpg, jpeg, or png files.");
            return;
        }

        // Check if the total image count exceeds 5
        if (images.length + filteredFiles.length > 5) {
            setErrorMessage("You can only upload up to 5 images.");
            return;
        }

        setErrorMessage(""); // Clear any previous error messages

        // Append new images to the existing images array
        setImages((prevImages) => [...prevImages, ...filteredFiles]);

        // Create previews for selected images and append to the existing previews
        const newPreviews = filteredFiles.map((file) =>
            URL.createObjectURL(file)
        );
        setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.username);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const formData = new FormData();

        // Append post data
        formData.append("username", user.username);
        formData.append("name", postData.name);
        formData.append("socialHandle", postData.socialHandle);
        formData.append("title", postData.title);
        formData.append("body", postData.body);

        // Append images
        images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/posts/posts",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            // Show success toast
            toast.success("Post created successfully!");

            // Reset the form fields
            setPostData({
                username: "",
                name: "",
                socialHandle: "",
                title: "",
                body: "",
            });
            setImages([]);
            setImagePreviews([]);
        } catch (error) {
            console.error("Error creating post", error);
            // Show error toast
            toast.error("Error creating post. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="container mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg max-w-3xl">
            <ToastContainer /> {/* Toast notification container */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-lg font-semibold text-purple-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={postData.name}
                        onChange={handleChange}
                        className="mt-2 block w-full border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        required
                        disabled={loading} // Disable while loading
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold text-purple-700">
                        Social Handle
                    </label>
                    <input
                        type="text"
                        name="socialHandle"
                        value={postData.socialHandle}
                        onChange={handleChange}
                        className="mt-2 block w-full border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        required
                        disabled={loading} // Disable while loading
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold text-purple-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={postData.title}
                        onChange={handleChange}
                        className="mt-2 block w-full border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        required
                        disabled={loading} // Disable while loading
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold text-purple-700">
                        Body
                    </label>
                    <textarea
                        name="body"
                        value={postData.body}
                        onChange={handleChange}
                        className="mt-2 block w-full border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        rows="4"
                        required
                        disabled={loading} // Disable while loading
                    ></textarea>
                </div>

                <div>
                    <label className="block text-lg font-semibold text-purple-700">
                        Upload Images (max 5, only jpg, jpeg, png)
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageChange}
                        className="mt-2 block w-full border-purple-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        disabled={loading} // Disable while loading
                    />
                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-2">
                            {errorMessage}
                        </p>
                    )}
                </div>

                {/* Small Image Previews */}
                <div className="mt-4 grid grid-cols-6 gap-2">
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                            <img
                                src={preview}
                                alt={`Preview ${index}`}
                                className="w-16 h-16 object-cover rounded-md shadow-md"
                            />
                        </div>
                    ))}
                </div>

                {/* Submit Button and Loading Indicator */}
                <div>
                    <button
                        type="submit"
                        className={`${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-purple-600"
                        } text-white px-6 py-2 rounded-lg shadow-md transition duration-300`}
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Creating Post..." : "Create Post"}
                    </button>
                    {loading && (
                        <div className="flex justify-center mt-4">
                            <svg
                                className="animate-spin h-5 w-5 text-purple-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
