import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import AnimatedBackground from '@/components/AnimatedBackground';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wishing - Birthday Celebration App",
  description: "Celebrate birthdays with personalized pages and messages.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col relative" style={{ width: '100%' }}>
        <ClerkProvider>
          <AnimatedBackground particleCount={40} />
          <main className="relative z-10 flex-grow">
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}

