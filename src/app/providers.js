"use client";

import { AuthProvider } from "@/context/AuthContext";
import { PortfolioProvider } from "@/context/PortfolioContext";
import ChatBot from "@/components/ChatBot";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <PortfolioProvider>
        {children}
        <ChatBot />
      </PortfolioProvider>
    </AuthProvider>
  );
}
