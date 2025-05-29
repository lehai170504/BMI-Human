"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/themecontext";

const menu = [
  { name: "Profile", path: "/profile" },
  { name: "History", path: "/history" },
  { name: "Settings", path: "/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <div className={`flex ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} font-nunito`}>
      {/* Sidebar co theo chiều cao nội dung */}  
      <aside className={`w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6 hidden md:flex flex-col justify-between`}>
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-6`}>
            Dashboard
          </h2>
          <ul className="space-y-2">
            {menu.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`block px-4 py-2 rounded-lg transition-all ${
                    pathname === item.path
                      ? theme === 'dark' 
                        ? 'bg-gray-700 text-white font-semibold'
                        : 'bg-blue-100 text-blue-600 font-semibold'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
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
        <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-6`}>
          <Link href="/login" className="text-red-500 hover:text-red-600 mt-2">Đăng xuất</Link>
        </div>
        
      </aside>  

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
