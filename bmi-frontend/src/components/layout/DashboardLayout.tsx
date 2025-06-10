"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const menu = [
  { name: "Profile", path: "/profile" },
  { name: "Calendar", path: "/bmi-calendar" },
  { name: "BMI", path: "/bmi-gold" },
  { name: "Calo", path: "/calo-calculator" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoggedIn = useSelector((state: any) => state.auth.isAuthenticated);
  const user = useSelector((state: any) => state.auth.user);

  if (!isLoggedIn) {    
    return <div>Bạn chưa đăng nhập!</div>;
  }

  return (
    <div className={`flex bg-gray-100 font-nunito`}>
      {/* Sidebar co theo chiều cao nội dung */}  
      <aside className={`w-64 bg-white shadow-lg p-6 hidden md:flex flex-col justify-between`}>
        <div>
          <img src="/avatar.png" alt="Avatar" className="w-12 h-12 object-cover" />
          <h2 className={`text-2xl font-bold text-gray-800 mb-6`}>{user.name}</h2>
          <ul className="space-y-2">
            {menu.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`block px-4 py-2 rounded-lg transition-all ${
                    pathname === item.path
                      ? 'bg-blue-100 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        

        {/* Optional: User Info at Bottom */}
        <div className={`border-t border-gray-200 pt-4 text-sm text-gray-500 mt-6`}>
          <Link href="/login" className="text-red-500 hover:text-red-600 mt-2">Đăng xuất</Link>
        </div>
        
      </aside>  

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
