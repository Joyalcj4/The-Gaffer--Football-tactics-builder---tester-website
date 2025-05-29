import { useState } from 'react';
import { useNavigate,} from 'react-router-dom'; // <-- add Link here
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://gaffer-backend.onrender.com/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // similar to withCredentials: true in axios
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Login failed");
            }
            const data = await response.json();
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("token", data.token);
            alert('Login successful!');
            navigate("/");
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-color">
            <div className="w-full max-w-md p-8 bg-third-color rounded-lg shadow-md">
                <h2 className="mb-6 text-3xl font-extrabold text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-amber-100"
                        >
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-amber-100"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-fourth-color rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-500">
                    Don't have an account?{' '}
                    <button onClick={()=> navigate('/register')} className="text-blue-500 hover:underline">
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;