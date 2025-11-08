"use client"

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { CheckCircle, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type QuestionsSectionProps = {
  title?: string;
  description?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  className?: string;
  testCase?: string;
  expectedOutput?: string;
};

export default function QuestionsSection({
  title,
  description,
  difficulty,
  className,
  testCase,
  expectedOutput,
}: QuestionsSectionProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { setTestCases } = useCodeEditorStore();
  const difficultyColor =
    difficulty === "Easy"
      ? "bg-green-500"
      : difficulty === "Medium"
      ? "bg-amber-500"
      : "bg-red-500";

  useEffect(() => {
    setTestCases(testCase || "");
  }, [testCase]);

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section
      className={`relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.04] p-6 ${className}`}
    >
      <div className="flex items-start">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-sm text-gray-400 whitespace-pre-line">{description}</p>

          {testCase && (
            <>
              <h2 className="mt-6 text-white font-semibold">Test Case</h2>
              <div className="mt-2 relative">
                <pre className="text-sm text-gray-300 bg-white/5 border border-white/10 rounded-lg p-3 whitespace-pre-line">
                  {testCase}
                </pre>

                <button
                  onClick={() => copyText(testCase)}
                  className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {expectedOutput && (
            <>
              <h2 className="mt-6 text-white font-semibold">Expected Output</h2>
              <div className="mt-2 relative">
                <pre className="text-sm text-gray-300 bg-white/5 border border-white/10 rounded-lg p-3 whitespace-pre-line">
                  {expectedOutput}
                </pre>
              </div>
            </>
          )}
        </div>

        {difficulty && (
          <span
            className={`ml-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white ${difficultyColor}`}
          >
            {difficulty}
          </span>
        )}
      </div>
    </section>
  );
}