"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(null);

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/login"];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Load user from localStorage on mount
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem("safestart_currentUser");
            if (savedUser) {
                const parsed = JSON.parse(savedUser);
                setUser(parsed);
            }
        } catch (e) {
            console.error("Failed to load user:", e);
            localStorage.removeItem("safestart_currentUser");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Redirect to login if not authenticated and trying to access a protected route
    useEffect(() => {
        if (isLoading) return; // Wait until we've checked localStorage

        const isPublicRoute = PUBLIC_ROUTES.some(
            (route) => pathname === route || pathname.startsWith("/api/")
        );

        if (!user && !isPublicRoute) {
            router.replace("/login");
        }
    }, [user, isLoading, pathname, router]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("safestart_currentUser", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("safestart_currentUser");
        localStorage.removeItem("safestart_accountMode");
        router.replace("/login");
    };

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
