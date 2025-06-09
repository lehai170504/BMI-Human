import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Roboto } from "next/font/google";
import Providers from "./providers";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Calculate your BMI and get health insights",
  icons: {
    icon: "/BMI-LogoRemove.png",
    shortcut: "/BMI-LogoRemove.png",
    apple: "/BMI-LogoRemove.png",
  },
  openGraph: {
    images: [
      {
        url: "/BMI-LogoRemove.png",
        width: 512,
        height: 512,
        alt: "BMI Calculator Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: ["/BMI-LogoRemove.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={roboto.className}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/BMI-LogoRemove.png" />
        <meta property="og:image" content="/BMI-LogoRemove.png" />
        <meta property="og:image:alt" content="BMI Calculator Logo" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="/BMI-LogoRemove.png" />
      </head>   
      <body
        className={`antialiased pt-20`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />  
        </Providers>
      </body>
    </html>
  );
}
