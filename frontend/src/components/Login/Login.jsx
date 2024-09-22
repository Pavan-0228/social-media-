import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const url = "http://localhost:3000/api/v1/auth/login";
        const data =
            email !== "" ? { email, password } : { username, password };

        try {
            const res = await axios.post(url, data);
            const user = res.data;
            if (res.status === 200) {
                if (res.data.accessToken) {
                    // Save tokens in localStorage and cookies
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem('user', JSON.stringify(user.user));
                    Cookies.set("accessToken", res.data.accessToken);

                // Show success message
                toast.success("Login successful!");


                setTimeout(() => {

                    navigate("/all-posts");
                }, 1000);
                }
            } else {
                // Show error message if the status code is not 201
                toast.error(res.data.message || "Login failed");
            }
        }
            catch (err) {
                // Display error toast for server errors
                toast.error(err.response.data.message ||"Server error occurred. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form>
                    {email !== "" && (
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 w-full border rounded"
                                placeholder="Enter your email"
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Enter your password"
                        />
                    </div>
                </form>
                <button
                    type="button"
                    onClick={login}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Log In
                </button>
                <p className="mt-2">Do not have an account?</p>
                <Link
                    to="/signup"
                    className="text-blue-500 hover:underline flex"
                >
                    Register
                </Link>
            </div>
            {/* Toast container to display messages */}
            <ToastContainer />
        </div>
    );
}

export default Login;
