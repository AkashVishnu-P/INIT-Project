"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getUsers = () => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("safestart_users")) || [];
  };

  const saveUsers = (users) => {
    localStorage.setItem("safestart_users", JSON.stringify(users));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const getUsers = () => {
      if (typeof window === "undefined") return [];
      return JSON.parse(localStorage.getItem("users")) || [];
    };

    const saveUsers = (users) => {
      localStorage.setItem("users", JSON.stringify(users));
    };

    function handleSubmit(e) {
      e.preventDefault();
      setError("");

      const users = getUsers();

      if (isLogin) {
        const user = users.find(
          (u) => u.email === email.trim() && u.password === password.trim()
        );
        if (user) {
          alert("Login Successful!");
        } else {
          setError("Invalid email or password!");
        }
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match!");
          return;
        }
        const userExists = users.some((u) => u.email === email.trim());
        if (userExists) {
          setError("User already exists!");
        } else {
          users.push({ email: email.trim(), password: password.trim() });
          saveUsers(users);
          alert("Account created successfully!");
          setIsLogin(true);
        }
      }
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900/90 p-10 rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center">
          <h2 className="text-3xl font-semibold mb-6 text-white tracking-tight font-sans">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-slate-700 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-slate-700 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-slate-700 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            )}
            {error && (
              <p className="text-red-500 text-sm text-center font-medium">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 mt-2 rounded-md bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-lg tracking-wide transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="mt-5 text-gray-400 text-sm">
            {isLogin ? "New user?" : "Already have an account?"}{" "}
            <span
              className="underline cursor-pointer text-blue-600 hover:text-blue-500 font-semibold"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    );
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl bg-bg-card border border-border p-8">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-text-primary">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-text-muted text-sm mt-2">
                {isLogin
                  ? "Sign in to continue your investing journey"
                  : "Start your safe investing journey today"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (Sign Up only) */}
              {!isLogin && (
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-text-secondary text-sm mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-text-secondary text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={isLogin ? "Enter password" : "Create a password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {!isLogin && (
                  <p className="text-text-muted text-xs mt-1">
                    Must be at least 6 characters
                  </p>
                )}
              </div>

              {/* Confirm Password (Sign Up only) */}
              {!isLogin && (
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-danger/10 border border-danger/20">
                  <svg className="w-5 h-5 text-danger flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-danger text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
                  </>
                ) : (
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-text-muted text-xs">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Demo Login */}
            <button
              onClick={() => {
                setEmail("demo@safestart.com");
                setPassword("demo123");
                setIsLogin(true);
              }}
              className="w-full py-3 rounded-xl bg-bg-elevated border border-border text-text-secondary font-medium hover:border-primary hover:text-text-primary transition-colors"
            >
              Use Demo Account
            </button>

            {/* Toggle Mode */}
            <p className="text-center text-text-muted text-sm mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Privacy Note */}
          <p className="text-center text-text-muted text-xs mt-6">
            By continuing, you agree to SafeStart's{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
