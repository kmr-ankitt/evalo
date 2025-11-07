"use client";

import React, { useMemo, useState } from "react";
import { Star } from "lucide-react";

type Student = {
  id: string;
  name: string;
  avatar?: string;
  solved: number; // number of questions solved overall
  accuracy?: number;
  lastSolvedAt?: string; // ISO timestamp of most recent solved activity
};

type Props = {
  students?: Student[];
};

type Filter = "all" | "week" | "month";

export default function StudentList({ students }: Props) {
  // Mock data for demo; replace with real data from backend when available
  const mock: Student[] = [
    { id: "s1", name: "Riya", solved: 42, accuracy: 92, lastSolvedAt: new Date().toISOString() },
    { id: "s2", name: "Siya", solved: 38, accuracy: 88, lastSolvedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "s3", name: "Janvi", solved: 35, accuracy: 90, lastSolvedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "s4", name: "Ankit", solved: 31, accuracy: 85, lastSolvedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "s5", name: "Rahul", solved: 29, accuracy: 80, lastSolvedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "s6", name: "Meera", solved: 24, accuracy: 78, lastSolvedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "s7", name: "Vikram", solved: 18, accuracy: 70, lastSolvedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "s8", name: "Pooja", solved: 12, accuracy: 65, lastSolvedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString() },
  ];

  const [filter, setFilter] = useState<Filter>("all");
  const now = Date.now();

  // Filtered list based on timeframe
  const list = useMemo(() => {
    const source = students ?? mock;
    return source
      .filter((s) => {
        if (filter === "all") return true;
        if (!s.lastSolvedAt) return false;
        const then = new Date(s.lastSolvedAt).getTime();
        const days = (now - then) / (1000 * 60 * 60 * 24);
        // This week: <=7 days; Last month: <=30 days
        if (filter === "week") return days <= 7;
        if (filter === "month") return days <= 30;
        return true;
      })
      .slice()
      .sort((a, b) => b.solved - a.solved);
  }, [students, mock, filter, now]);

  const totalStudents = (students ?? mock).length;
  const activeCount = list.length;

  function relativeTime(iso?: string) {
    if (!iso) return "—";
    const d = new Date(iso).getTime();
    const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return "Today";
    if (diff === 1) return "1 day ago";
    return `${diff} days ago`;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Students List</h3>
          <div className="text-sm text-gray-400">Showing {activeCount} of {totalStudents} students</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-sm rounded ${filter === "all" ? "bg-emerald-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("week")}
              className={`px-3 py-1 text-sm rounded ${filter === "week" ? "bg-emerald-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              This week
            </button>
            <button
              onClick={() => setFilter("month")}
              className={`px-3 py-1 text-sm rounded ${filter === "month" ? "bg-emerald-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              Last month
            </button>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
            className="sm:hidden bg-gray-800 text-gray-200 p-1 rounded"
          >
            <option value="all">All</option>
            <option value="week">This week</option>
            <option value="month">Last month</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {list.map((s) => (
          <div key={s.id} className="bg-[#0a0a0f]/60 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white font-semibold text-lg">
                {s.name.split(" ").map((n) => n[0]).slice(0,2).join("")}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-white">{s.name}</div>
                  <div className="text-xs text-gray-400">{relativeTime(s.lastSolvedAt)}</div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-200 flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-300" />
                      <span className="font-semibold">{s.solved}</span>
                      <span className="text-xs text-gray-400">questions solved</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Accuracy: {s.accuracy ?? "—"}%</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-200">{Math.min(100, Math.round((s.solved / 100) * 100))}%</div>
                    <div className="text-xs text-gray-400">engagement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
