'use client';
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Pages where Navbar should not be displayed
  const excludedPaths = ["/", "/auth/login", "/auth/register"];

  return (
    <html lang="en">
      <body>
        {/* Conditionally Render Navbar */}
        {!excludedPaths.includes(pathname) && <Navbar />}
        <main>{children}</main>
      </body>
    </html>
  );
}
