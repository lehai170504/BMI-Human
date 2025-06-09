'use client'

import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/redux/features/Auth/authSlice";

export default function Header() {
  const isLoggedIn = useSelector((state: any) => state.auth.isAuthenticated);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow-lg py-3 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <img
              src="/BMI_LogoRemove.png"
              alt="BMI Logo"
              className="w-12 h-12 object-cover"
            />
          </Link>
          <h1 className="text-2xl md:text-3xl font-nunito font-bold flex items-center gap-2 drop-shadow">
            BMI Calculator <span className="text-blue-500">AI</span>
          </h1>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Combined Navigation + Auth Buttons */}
        <nav
          className={`flex flex-col md:flex-row md:flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto
            bg-white md:bg-transparent rounded-lg md:rounded-none
            shadow-md md:shadow-none
            absolute md:static top-full left-0 md:top-auto md:left-auto
            md:translate-y-0 transition-transform duration-300
            ${
              menuOpen
                ? "translate-y-0 opacity-100 visible"
                : "-translate-y-20 opacity-0 invisible"
            }
            md:opacity-100 md:visible
            px-4 md:px-0 py-4 md:py-0
            z-40
          `}
        >
          {/* Navigation Links */}
          {[ 
            { href: "/", label: "Trang chủ" },
            { href: "/bmi-calculator", label: "Tính BMI" },
            { href: "/contact", label: "Liên hệ" },
          ].map(({ href, label }) => (
            <Link key={href} href={href}>
              <button
                onClick={handleLinkClick}
                className="bg-white/90 text-blue-600 font-nunito px-4 py-2 rounded-xl shadow hover:bg-blue-100 hover:scale-105 transition"
              >
                {label}
              </button>
            </Link>
          ))}

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <>
              <Link href="/profile">
                <button
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 bg-white/90 text-blue-600 font-nunito px-4 py-2 rounded-xl shadow hover:bg-blue-100 hover:scale-105 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.755 6.879 2.047M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Trang cá nhân - {user?.name || "User"}
                </button>
              </Link>

              <button
                onClick={() => {
                  Swal.fire({
                    icon: "warning",
                    title: "Xác nhận",
                    text: "Bạn có chắc chắn muốn đăng xuất không?",
                    showCancelButton: true,
                    confirmButtonText: "Đăng xuất", 
                    confirmButtonColor: "#3085d6"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(logout());
                      setMenuOpen(false);
                      router.push("/login");
                    }
                  });
                }}
                className="flex items-center gap-2 bg-blue-600 text-white font-nunito px-4 py-2 rounded-xl shadow hover:bg-blue-700 hover:scale-105 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 bg-white/90 text-blue-600 font-nunito px-4 py-2 rounded-xl shadow hover:bg-blue-100 hover:scale-105 transition"
                >
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.755 6.879 2.047M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Đăng nhập
                </button>
              </Link>
              <Link href="/register">
                <button
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 bg-white/90 text-pink-600 font-nunito px-4 py-2 rounded-xl shadow hover:bg-pink-100 hover:scale-105 transition"
                >
                  <svg
                    className="w-5 h-5 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                  Đăng ký
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
