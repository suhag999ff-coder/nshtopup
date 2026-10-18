"use client";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [logo, setLogo] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch Logo from Firestore
    const fetchLogo = async () => {
      try {
        const docSnap = await getDoc(doc(db, "settings", "global"));
        if (docSnap.exists() && docSnap.data().siteLogo) {
          setLogo(docSnap.data().siteLogo);
        }
      } catch (error) {}
    };
    fetchLogo();

    // Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {logo ? (
            <img src={logo} alt="NSH TOPUP" className="h-8 md:h-10 object-contain" />
          ) : (
            <span className="text-xl font-black text-primary tracking-tighter">NSH TOPUP</span>
          )}
        </Link>
        
        <div className="flex items-center gap-3">
          <button className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition">
            <ShoppingCart size={20} />
          </button>
          {user ? (
            <Link href="/profile" className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition">
              <User size={20} />
            </Link>
          ) : (
            <Link href="/login" className="bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}