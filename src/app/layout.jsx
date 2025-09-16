"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import theme from "@/components/shared/theme";
import { ThemeProvider } from "@/utils/context/ThemeContext";
import { AuthProvider } from "@/utils/context/AuthContext";
import { ToastContainer } from "react-toastify";
import { IdleTimer } from "@/components/auth/IdleTimer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`bg-background text-primary font-poppins dark:bg-dark-background dark:text-primary`}>
      <body>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <IdleTimer />
          <AuthProvider>
          <div className="min-h-screen bg-background dark:bg-background/95 text-primary dark:text-primary font-poppins">
            <Navbar />
            <div className="pt-14 bg-background text-primary font-poppins dark:bg-dark-background dark:text-dark-primary">
              {children}
            </div>
          </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
