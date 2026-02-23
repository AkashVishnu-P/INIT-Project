"use client";

import { useState, useEffect } from "react";
import AppNavbar from "@/components/AppNavbar";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        if (data.success) {
          setLeaderboard(data.leaderboard);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to load leaderboard data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankColor = (rank) => {
    if (rank === 1) return "bg-yellow-400 text-yellow-900";
    if (rank === 2) return "bg-gray-300 text-gray-800";
    if (rank === 3) return "bg-yellow-600 text-yellow-100";
    return "bg-bg-elevated text-text-muted";
  };

  return (
    <div className="min-h-screen bg-bg-app">
      <AppNavbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="order-2 md:order-1 bg-bg-card border border-border rounded-2xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
              {leaderboard.length > 1 && (
                <>
                  <div className="w-24 h-24 rounded-full bg-gray-300/20 mx-auto flex items-center justify-center text-4xl font-bold text-gray-400 mb-3">
                    {leaderboard[1].name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{leaderboard[1].name}</h3>
                  <p className="text-text-muted">2nd Place</p>
                  <p className={`text-2xl font-bold mt-2 ${leaderboard[1].pnl >= 0 ? "text-success" : "text-danger"}`}>
                    {leaderboard[1].pnlPercent.toFixed(2)}%
                  </p>
                </>
              )}
            </div>

            <div className="order-1 md:order-2 bg-bg-card border-2 border-yellow-400 rounded-t-2xl p-8 text-center shadow-lg shadow-yellow-400/10 transform hover:-translate-y-4 transition-transform duration-300">
              {leaderboard.length > 0 && (
                <>
                  <div className="w-32 h-32 rounded-full bg-yellow-400/20 mx-auto flex items-center justify-center text-5xl font-bold text-yellow-400 mb-4">
                    {leaderboard[0].name.charAt(0).toUpperCase()}
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary">{leaderboard[0].name}</h2>
                  <p className="text-yellow-400 font-semibold">1st Place</p>
                  <p className={`text-3xl font-bold mt-2 ${leaderboard[0].pnl >= 0 ? "text-success" : "text-danger"}`}>
                    {leaderboard[0].pnlPercent.toFixed(2)}%
                  </p>
                </>
              )}
            </div>

            <div className="order-3 md:order-3 bg-bg-card border border-border rounded-2xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
              {leaderboard.length > 2 && (
                <>
                  <div className="w-24 h-24 rounded-full bg-yellow-600/20 mx-auto flex items-center justify-center text-4xl font-bold text-yellow-700 mb-3">
                    {leaderboard[2].name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{leaderboard[2].name}</h3>
                  <p className="text-yellow-700">3rd Place</p>
                  <p className={`text-2xl font-bold mt-2 ${leaderboard[2].pnl >= 0 ? "text-success" : "text-danger"}`}>
                    {leaderboard[2].pnlPercent.toFixed(2)}%
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="bg-bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-text-primary">Full Rankings</h2>
          </div>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-text-muted mt-2">Loading rankings...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-danger">{error}</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bg-elevated">
                  <th className="p-4 text-xs text-text-muted font-semibold uppercase tracking-wider">Rank</th>
                  <th className="p-4 text-xs text-text-muted font-semibold uppercase tracking-wider">Player</th>
                  <th className="p-4 text-xs text-text-muted font-semibold uppercase tracking-wider text-right">Total Value</th>
                  <th className="p-4 text-xs text-text-muted font-semibold uppercase tracking-wider text-right">P&L (%)</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player, index) => (
                  <tr key={player.id} className="border-t border-border hover:bg-bg-elevated transition-colors">
                    <td className="p-4">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${getRankColor(index + 1)}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                          {player.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-medium text-text-primary">{player.name}</p>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono text-text-primary">
                      ₹{player.totalValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className={`p-4 text-right font-mono font-semibold ${player.pnlPercent >= 0 ? "text-success" : "text-danger"}`}>
                      {player.pnlPercent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}
