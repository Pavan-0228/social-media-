import React, { useState } from "react";
import { FaHeart, FaComment, FaShareAlt } from "react-icons/fa"; // Icons for heart, comment, and share

const PostCard = ({ post }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [comment, setComment] = useState(""); // State for new comment
    const [comments, setComments] = useState(post.comments || []); // Existing comments
    const [shareMessage, setShareMessage] = useState(""); // For feedback when sharing

    const handleDoubleClick = () => {
        setLiked(true);
        setShowHeart(true);

        setTimeout(() => {
            setShowHeart(false);
        }, 1000);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment("");
        }
    };

    const handleShare = () => {
        const postUrl = `https://yourwebsite.com/post/${post._id}`;
        navigator.clipboard.writeText(postUrl).then(() => {
            setShareMessage("Link copied to clipboard!");
            setTimeout(() => setShareMessage(""), 2000); // Clear message after 2 seconds
        });
    };

    return (
        <div
            key={post._id}
            className="relative bg-white rounded-lg shadow-md max-w-lg mx-auto overflow-hidden"
            onDoubleClick={handleDoubleClick}
        >
            {/* Heart Animation */}
            {showHeart && (
                <div className="absolute inset-0 flex justify-center items-center z-10">
                    <FaHeart className="text-red-500 opacity-75 text-6xl animate-ping" />
                    <FaHeart className="text-red-600 text-6xl absolute" />
                </div>
            )}

            {/* Post Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-3">
                    <img
                        src={`https://ui-avatars.com/api/?name=${post.name}`}
                        alt={post.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">{post.name}</p>
                        <p className="text-gray-500 text-sm">
                            @{post.socialHandle}
                        </p>
                    </div>
                </div>
            </div>

            {/* Post Image Carousel */}
            <div className="relative">
                {post.images.length > 0 && (
                    <img
                        src={post.images[currentIndex]}
                        alt="Post Image"
                        className="w-full h-96 object-cover transition-all duration-500 ease-in-out"
                        style={{ maxHeight: "400px" }}
                        loading="lazy"
                    />
                )}
                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
                    onClick={handlePrev}
                >
                    &lt;
                </button>
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
                    onClick={handleNext}
                >
                    &gt;
                </button>
            </div>

            {/* Post Actions */}
            <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                        <button
                            className={`${
                                liked ? "text-red-600" : "text-gray-600"
                            } hover:text-red-600`}
                        >
                            <FaHeart />
                        </button>
                        <button className="text-gray-600 hover:text-blue-600">
                            <FaComment />
                        </button>
                        <button
                            className="text-gray-600 hover:text-green-600"
                            onClick={handleShare}
                        >
                            <FaShareAlt />
                        </button>
                    </div>
                </div>

                {/* Share Message */}
                {shareMessage && (
                    <p className="text-green-600 text-sm">{shareMessage}</p>
                )}

                {/* Post Content */}
                <p>
                    <span className="font-semibold">{post.name} </span>
                    {post.body}
                </p>
                <p className="text-gray-500 text-sm">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                </p>
            </div>

            {/* Comments Section */}
            <div className="p-4">
                <h3 className="font-semibold">Comments</h3>
                <ul className="space-y-2 mb-4">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <li key={index} className="border-b py-1">
                                {comment}
                            </li>
                        ))
                    ) : (
                        <li>No comments yet</li>
                    )}
                </ul>
                <form onSubmit={handleCommentSubmit} className="flex space-x-2">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="border rounded w-full px-3 py-1"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostCard;
