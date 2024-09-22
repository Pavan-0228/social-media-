import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import PostForm from "./components/PostForm/PostForm";
import PostsList from "./components/Card.jsx/PostList";
import UserPost from "./components/Card.jsx/UserPost";

function App() {
    return (
        <Router>
            {/* Navbar is placed outside the Routes so it's visible on all pages */}
            <Navbar />

            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected route */}
                <Route
                    path="/add-post"
                    element={<ProtectedRoute element={<PostForm />} />}
                />
                <Route
                    path="/all-posts"
                    element={<ProtectedRoute element={<PostsList />} />}
                />
                <Route
                    path="/my-posts"
                    element={<ProtectedRoute element={<UserPost />} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
