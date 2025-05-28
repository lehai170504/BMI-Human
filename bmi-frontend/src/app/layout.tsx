import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900", "1000"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Calculate your BMI and get health insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 
        Để header không đè lên layout, ta cần thêm padding-top cho body (hoặc 1 div wrapper)
        với giá trị bằng chiều cao của header (giả sử header cao 80px).
        Giải thích: Header đang dùng position: fixed nên sẽ đè lên nội dung phía dưới.
        Thêm pt-20 (padding-top: 5rem ~ 80px) cho body để tránh bị che.
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased pt-20`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
