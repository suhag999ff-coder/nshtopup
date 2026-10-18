"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Note: Firebase Auth এ আপনার এডমিন ইমেইল থাকতে হবে
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Admin Login Successful!");
      router.push("/admin/dashboard");
    } catch (error) {
      toast.error("Invalid Admin Credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-900">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-black text-center text-white mb-2">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4 mt-6">
          <div>
            <label className="text-sm font-semibold text-slate-200">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl mt-1 outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-200">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl mt-1 outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg hover:bg-primary-dark transition mt-4">Login to Dashboard</button>
        </form>
      </div>
    </div>
  );
}
