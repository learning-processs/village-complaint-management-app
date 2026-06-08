// src/pages/auth/Register.jsx

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AutContext } from "../../context/AutContext";

const Register = () => {
  const { register, loading } = useContext(AutContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    village: "",
  });

  // ─────────────────────────────────────────
  // Handle input change
  // ─────────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ─────────────────────────────────────────
  // Handle form submit
  // ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check passwords match
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      village: formData.village,
    });

    if (result.success) {
      toast.success("Account created successfully!");
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">GraamSeva</h1>
          <p className="text-gray-500 mt-1">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ramesh Kumar"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ramesh@gmail.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Village */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Village Name
            </label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              placeholder="Rampur"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
