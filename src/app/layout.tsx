"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import AuthWrapper from "./components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <ThirdwebProvider 
        apiKey={process.env.NEXT_PUBLIC_THIRDWEB_API_KEY} 
        desiredChainId={1} 
      >
        <body className={inter.className}>
          <AuthWrapper>{children}</AuthWrapper>
        </body>
      </ThirdwebProvider>
    </html>
  );
}
