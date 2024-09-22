import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard"; // Importing the PostCard component

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${backendUrl}/api/v1/posts/posts`
                );
                setPosts(response.data);
            } catch (err) {
                setError("Error fetching posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto mt-8 p-6">
            <h1 className="text-2xl font-bold mb-4">Feed</h1>
            <div className="space-y-6">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default PostsList;
