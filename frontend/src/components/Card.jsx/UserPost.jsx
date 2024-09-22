import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard"; // Importing the PostCard component

const UserPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log(user.username);
                const response = await axios.get(
                    `http://localhost:3000/api/v1/posts/posts/user/${user.username}`
                );
                setPosts(response.data);
            } catch (err) {
                console.log(err);
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
                {posts.length > 0 ? (
                    posts.map((post) => <PostCard key={post._id} post={post} />)
                ) : (
                    <p className="text-center text-gray-500">No posts available</p>
                )}
            </div>
        </div>
    );
};

export default UserPost;
