"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stat1 = useCountUp(10000, 2000, statsVisible);
  const stat2 = useCountUp(500, 2000, statsVisible);
  const stat3 = useCountUp(95, 2000, statsVisible);

  return (
    <div className="min-h-screen bg-bg-app flex flex-col">

      <main className="flex-1">

        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden py-24 md:py-36 px-6">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center">
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
              🚀 India&apos;s First Teen Investment Simulator
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary mb-6 leading-tight tracking-tight">
              Learn Before{" "}
              <span className="relative inline-block">
                <span className="text-primary">You Earn</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-primary/40" />
              </span>
            </h1>

            <p className="text-text-secondary text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
              A flight simulator for investing — master risk before money,
              build discipline before profit. Safe, guided, and built for teens.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login"
                className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white text-base font-bold hover:bg-primary-light transition-all duration-200 shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                Start Learning Free
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/dashboard-sim"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-border text-text-secondary text-base font-semibold hover:border-primary hover:text-text-primary transition-all duration-200 flex items-center justify-center gap-2">
                Explore Platform
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-text-muted text-sm">
              {["No credit card required", "100% free to start", "Parent-approved platform"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">How It Works</h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto">Three simple steps to go from zero to confident investor.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01", icon: (
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                  title: "Learn the Basics",
                  desc: "Bite-sized lessons on stocks, ETFs, SIPs, and risk management. Built for beginners."
                },
                {
                  step: "02", icon: (
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Practice Risk-Free",
                  desc: "Trade with ₹10,000 virtual money in a real market simulator. No risk, pure experience."
                },
                {
                  step: "03", icon: (
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                  title: "Invest for Real",
                  desc: "Unlock real micro-SIPs starting at ₹10 in curated ETF baskets with parental approval."
                },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} className="relative group p-6 rounded-2xl bg-bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <div className="absolute top-5 right-5 text-4xl font-black text-border/40 select-none">{step}</div>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    {icon}
                  </div>
                  <h3 className="text-text-primary font-bold text-lg mb-2">{title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY SAFESTART ── */}
        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Why SafeStart?</h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto">Everything you need to start your investing journey — safely.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🛡️", title: "Risk-Free Simulation",
                  desc: "Trade with virtual money. Lose nothing while learning everything."
                },
                {
                  icon: "💰", title: "Micro SIP Investing",
                  desc: "Start real investing with as little as ₹10 per week. No minimums."
                },
                {
                  icon: "📦", title: "Curated ETF Baskets",
                  desc: "Hand-picked, diversified portfolios designed for young investors."
                },
                {
                  icon: "👨‍👩‍👧", title: "Parental Approval",
                  desc: "Parents stay in control. Every real transaction needs their approval."
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="p-6 rounded-2xl bg-bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                  <div className="text-3xl mb-4">{icon}</div>
                  <h3 className="text-text-primary font-bold text-base mb-2">{title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section ref={statsRef} className="py-20 px-6 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { value: `₹${stat1.toLocaleString()}+`, label: "Virtual Capital Simulated", sub: "by our users" },
                { value: `${stat2}+`, label: "Practice Trades", sub: "executed on platform" },
                { value: `${stat3}%`, label: "User Confidence Increase", sub: "after 30 days" },
              ].map(({ value, label, sub }) => (
                <div key={label} className="p-8 rounded-2xl bg-bg-card border border-border">
                  <div className="text-5xl font-extrabold text-primary mb-2">{value}</div>
                  <div className="text-text-primary font-semibold text-lg mb-1">{label}</div>
                  <div className="text-text-muted text-sm">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">What Our Users Say</h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto">Real stories from teens building real financial skills.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Priya S.", age: "17, Chennai",
                  quote: "I lost ₹2,000 on my first virtual trade. Best lesson ever. Now I understand diversification.",
                  avatar: "P"
                },
                {
                  name: "Arjun K.", age: "16, Bangalore",
                  quote: "My parents were skeptical until they saw the parental approval system. Now they invest alongside me.",
                  avatar: "A"
                },
                {
                  name: "Rhea M.", age: "18, Mumbai",
                  quote: "Started with simulation in January. By March I had my first real SIP running. SafeStart made it simple.",
                  avatar: "R"
                },
              ].map(({ name, age, quote, avatar }) => (
                <div key={name} className="p-6 rounded-2xl bg-bg-card border border-border hover:border-primary/30 transition-all duration-300 flex flex-col gap-4">
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {avatar}
                    </div>
                    <div>
                      <div className="text-text-primary font-semibold text-sm">{name}</div>
                      <div className="text-text-muted text-xs">{age}</div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative p-10 md:p-14 rounded-3xl bg-bg-card border border-primary/20 overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              <h2 className="relative text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
                Ready to start your investing journey?
              </h2>
              <p className="relative text-text-secondary text-lg mb-8 max-w-xl mx-auto">
                Join thousands of teens building financial skills today. Free to start, safe to learn.
              </p>
              <Link href="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white text-base font-bold hover:bg-primary-light transition-all duration-200 shadow-lg shadow-primary/30">
                Create Free Account
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-bg-card">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-base">S</span>
                </div>
                <span className="text-text-primary font-bold text-xl">SafeStart</span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                India&apos;s first investment simulator built for teens. Learn, practice, and invest safely — with parental oversight.
              </p>
              <div className="flex items-center gap-3 mt-5">
                {["twitter", "instagram", "github"].map((s) => (
                  <a key={s} href="#"
                    className="w-9 h-9 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-text-primary font-semibold text-sm mb-4">Platform</h4>
              <ul className="space-y-3">
                {[
                  { name: "Dashboard", href: "/dashboard-sim" },
                  { name: "Learn", href: "/learn" },
                  { name: "Marketplace", href: "/marketplace" },
                  { name: "Sign In", href: "/login" },
                ].map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-text-muted text-sm hover:text-text-primary transition-colors">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-text-primary font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-3">
                {[
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Cookie Policy", href: "/cookies" },
                  { name: "Disclaimer", href: "/disclaimer" },
                ].map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-text-muted text-sm hover:text-text-primary transition-colors">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">© 2026 SafeStart. All rights reserved.</p>
            <p className="text-text-muted text-sm">Built for teens, trusted by parents 💙</p>
          </div>
        </div>
      </footer>
    </div>
  );
}