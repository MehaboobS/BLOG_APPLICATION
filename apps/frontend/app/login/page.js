"use client";
import { useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import PopupModal from "../../components/PopupModal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      setPopup({
        type: "success",
        title: "Login successful",
        message: "Welcome back. Your dashboard is ready.",
        confirmLabel: "Continue",
        onClose: () => {
          setPopup(null);
          router.push("/dashboard");
        }
      });
    } catch {
      setPopup({
        type: "error",
        title: "Login failed",
        message: "Invalid email or password. Please try again.",
        confirmLabel: "Try Again",
        onClose: () => setPopup(null)
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-slate-950 via-cyan-950 to-teal-950">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <input
          type="email"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          required
          className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-200"
        >
          Login
        </button>

        {/* Extra */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Register
          </span>
        </p>
      </form>

      <PopupModal
        open={Boolean(popup)}
        type={popup?.type || "info"}
        title={popup?.title}
        message={popup?.message}
        confirmLabel={popup?.confirmLabel || "Okay"}
        onClose={popup?.onClose}
      />
    </div>
  );
}