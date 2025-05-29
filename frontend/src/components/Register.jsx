import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Registration failed");
            }
            alert("Registration successful!");
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-color">
            <div className="w-full max-w-md p-8 space-y-6 bg-third-color rounded-3xl shadow-md">
                <h2 className="text-3xl font-extrabold text-center text-white">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-amber-100">
                            Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-amber-100">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full  px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-fourth-color rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-white">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;