"use client";

import React from "react";
import { Trophy, Star } from "lucide-react";

type Student = {
  id: string;
  name: string;
  avatar?: string;
  solved: number;
  accuracy?: number; // 0-100
};

type Props = {
  students?: Student[];
};

export default function Leaderboard({ students }: Props) {
  const mock: Student[] = [
    { id: "s1", name: "Riya", solved: 42, accuracy: 92 },
    { id: "s2", name: "Siya", solved: 38, accuracy: 88 },
    { id: "s3", name: "janvi", solved: 35, accuracy: 90 },
    { id: "s4", name: "ankit", solved: 31, accuracy: 85 },
    { id: "s5", name: "rahul", solved: 29, accuracy: 80 },
    
  ];

  const list = (students ?? mock)
    .slice()
    .sort((a, b) => b.solved - a.solved)
    .slice(0, 10);

  return (
    <div className="mt-0 bg-[#0a0a0f]/70 p-4 rounded-lg w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" /> Top 5 Students
        </h3>
        <div className="text-sm text-gray-300">Ranked by questions solved</div>
      </div>

      <ol className="mt-3 space-y-2 overflow-y-auto max-h-[420px] pr-2">
        {list.map((s, idx) => (
          <li
            key={s.id}
            className="flex items-center justify-between bg-gray-900/50 p-2 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center text-white font-semibold">
                {idx < 3 ? (idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉") : <span className="text-sm">{idx + 1}</span>}
              </div>

              <div>
                <div className="font-medium text-white">{s.name}</div>
                <div className="text-xs text-gray-400">Solved: {s.solved} • Accuracy: {s.accuracy ?? "—"}%</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-200 flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-300" /> {s.solved}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
