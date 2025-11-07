"use client";

import React, { useMemo, useState } from "react";
import { dsaQuestions } from "../../../../convex/moduleData";

type RawQ = {
  id: number;
  title: string;
  description?: string;
  difficulty?: string;
  tags?: string[];
};

type Q = {
  id: string;
  title: string;
  description?: string;
  difficulty: string;
};

function badgeClass(diff: string) {
  const d = (diff || "").toLowerCase();
  if (d === "easy") return "bg-emerald-600 text-emerald-50";
  if (d === "medium") return "bg-amber-600 text-amber-50";
  if (d === "hard") return "bg-rose-600 text-rose-50";
  return "bg-gray-600 text-gray-50";
}

export default function Module() {
  const questions: Q[] = useMemo(() => {
    return (dsaQuestions as RawQ[]).map((q) => ({ id: `q-${q.id}`, title: q.title, description: q.description, difficulty: q.difficulty ?? "Other" }));
  }, []);

  const [cart, setCart] = useState<Q[]>([]);

  const add = (q: Q) => setCart((c) => (c.find((x) => x.id === q.id) ? c : [...c, q]));
  const remove = (id: string) => setCart((c) => c.filter((x) => x.id !== id));
  const clear = () => setCart([]);
  const createAssignment = () => alert(`Create assignment with: ${cart.map((c) => c.title).join(", ")}`);

  return (
    <div className="mb-6 lg:flex lg:gap-6">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">DSA Question Pool</h2>
          <div className="text-sm text-gray-400">Total: {questions.length}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-[#0a0a0f]/60 p-4 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-white font-medium">{q.title}</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${badgeClass(q.difficulty)}`}>{q.difficulty}</div>
                </div>

                {q.description && <div className="mt-2 text-sm text-gray-400 line-clamp-3">{q.description}</div>}
              </div>

              
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}
