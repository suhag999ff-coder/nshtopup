"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      // Save user to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: form.name,
        email: form.email,
        role: "user",
        walletBalance: 0,
        createdAt: new Date(),
      });
      toast.success("Registration Successful!");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border">
        <h1 className="text-3xl font-black text-center text-primary mb-8">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="w-full border p-3 rounded-xl" placeholder="Full Name" required />
          <input type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="w-full border p-3 rounded-xl" placeholder="Email" required />
          <input type="password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} className="w-full border p-3 rounded-xl" placeholder="Password" required />
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold">Register</button>
        </form>
        <p className="text-center text-sm mt-6">Already have an account? <Link href="/login" className="text-primary font-bold">Login</Link></p>
      </div>
    </div>
  );
}