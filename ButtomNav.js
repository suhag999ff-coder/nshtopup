"use client";
import { Home, Package, PlusCircle, Wallet, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Orders", icon: Package, path: "/orders" },
    { name: "Add Money", icon: PlusCircle, path: "/wallet", isCenter: true },
    { name: "Wallet", icon: Wallet, path: "/wallet" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-end justify-between px-2 pb-safe">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}
            className={`flex flex-col items-center justify-center py-2 ${item.isCenter ? "-mt-6" : ""} ${pathname === item.path ? "text-primary" : "text-gray-500"}`}>
            {item.isCenter ? (
              <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg ring-4 ring-white">
                <item.icon size={26} />
              </div>
            ) : (
              <item.icon size={22} />
            )}
            <span className="text-[10px] font-semibold mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
