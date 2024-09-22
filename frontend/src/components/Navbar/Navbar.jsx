import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    return (
        <nav className="bg-purple-900 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or App Name */}
                <Link to="/all-posts" className="text-white text-2xl font-bold">
                    BlogApp
                </Link>

                {/* Links */}
                <div className="space-x-6 text-lg">
                    <Link
                        to="/all-posts"
                        className="text-gray-300 hover:text-white transition duration-300"
                    >
                        View All Posts
                    </Link>
                    <Link
                        to="/my-posts"
                        className="text-gray-300 hover:text-white transition duration-300"
                    >
                        View My Posts
                    </Link>
                </div>

                {/* Add Post Button */}
                <div className="flex space-x-4">
                    <Link to="/add-post">
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-500 transition duration-300">
                            Add Post
                        </button>
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-500 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
