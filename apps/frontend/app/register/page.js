"use client";
import { useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";
import PopupModal from "../../components/PopupModal";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [popup, setPopup] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      setPopup({
        type: "success",
        title: "Registration successful",
        message: "Your account has been created. You can now sign in.",
        confirmLabel: "Go to Login",
        onClose: () => {
          setPopup(null);
          router.push("/login");
        }
      });
    } catch {
      setPopup({
        type: "error",
        title: "Registration failed",
        message: "We could not create your account. Please try again.",
        confirmLabel: "Close",
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
          Create Account 🚀
        </h2>

        {/* Name */}
        <input
          type="text"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          type="email"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          required
          className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Create a password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition duration-200"
        >
          Register
        </button>

        {/* Extra */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-green-600 cursor-pointer font-medium"
          >
            Login
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