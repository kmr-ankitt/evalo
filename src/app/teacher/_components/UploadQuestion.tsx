"use client";

import React, { useState } from "react";
import { BoxSelectIcon, Upload } from "lucide-react";

type QuestionItem = {
  id: string;
  title: string;
  description?: string;
  file?: File | null;
  testCases?: string;
  difficulty?: "easy" | "medium" | "hard";
  language?: "cpp" | "java" | "c" | "python" | "javascript" | "go" | "rust";
  deadline?: string; // ISO datetime-local string
};

export default function UploadQuestion() {
  const [items, setItems] = useState<QuestionItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [testCases, setTestCases] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [language, setLanguage] = useState<"cpp" | "java" | "c" | "python" | "javascript" | "go" | "rust">("javascript");

  function addQuestion() {
    if (!title.trim()) return;

    const newItem: QuestionItem = {
      id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
      title: title.trim(),
      description: description.trim(),
      testCases: testCases.trim(),
      difficulty,
      language,
      file,
      deadline: deadline || undefined,
    };

    setItems((s) => [newItem, ...s]);
    // reset form
    setTitle("");
    setDescription("");
    setDeadline("");
    setFile(null);
    setTestCases("");
    setDifficulty("medium");
    setLanguage("javascript");
  }

  function removeItem(id: string) {
    setItems((s) => s.filter((it) => it.id !== id));
  }

  async function submitAll() {
    if (items.length === 0) return;
    console.log("Submitting items:", items);
    for (const it of items) {
      const fd = new FormData();
      fd.append("title", it.title);
      fd.append("description", it.description || "");
      fd.append("testCases", it.testCases || "");
  fd.append("language", it.language || "");
      if (it.deadline) fd.append("deadline", it.deadline);
      if (it.file) fd.append("file", it.file, it.file.name);
      // await fetch('/api/teacher/questions', { method: 'POST', body: fd })
    }

    setItems([]);
    alert("Questions prepared for upload (see console). Implement API to persist files.");
  }


  return (
    <div className="w-full">
      <div className="bg-[#0a0a0f]/70 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white">Add Question</h2>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as "easy" | "medium" | "hard")}
                className="appearance-none bg-gray-800 text-white px-3 py-2 pr-8 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              {/* chevron */}
              <svg
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="appearance-none bg-gray-800 text-white px-3 py-2 pr-8 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
              </select>

              <svg
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>


        <div className="mt-4 grid grid-cols-1 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question title"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description (optional)"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 min-h-[80px]"
          />

          <textarea
            value={testCases}
            onChange={(e) => setTestCases(e.target.value)}
            placeholder="Test cases (one per line or JSON)"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 min-h-[80px]"
          />

          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-3">
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-sm text-gray-200 rounded border border-gray-700 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Solution</span>
              </label>

              <input
                id="file-upload"
                key={file ? file.name : "file-input"}
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="sr-only"
              />

              {file ? (
                <span className="text-sm text-gray-300">{file.name}</span>
              ) : (
                <span className="text-sm text-gray-400">No file selected</span>
              )}
            </div>

            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={addQuestion}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
            >
              Add to Question
            </button>

            <button
              onClick={() => {
                setTitle("");
                setDescription("");
                setDeadline("");
                setFile(null);
                setTestCases("");
                setDifficulty("medium");
                setLanguage("javascript");
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-white"> Questions ({items.length})</h3>

        {items.length === 0 && (
          <div className="mt-3 text-gray-400">No questions added yet.</div>
        )}

        <ul className="mt-3 space-y-3">
          {items.map((it) => (
            <li key={it.id} className="bg-gray-900/60 p-3 rounded-lg flex justify-between items-start">
              <div>
                <div className="font-semibold text-white">{it.title}</div>
                {it.description && <div className="text-sm text-gray-300">{it.description}</div>}
                {it.testCases && (
                  <div className="text-sm text-gray-300 mt-2">
                    <div className="font-medium text-xs text-gray-400">Test cases</div>
                    <pre className="whitespace-pre-wrap text-xs text-gray-300 mt-1">{it.testCases}</pre>
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-2">
                  {it.deadline ? `Deadline: ${new Date(it.deadline).toLocaleString()}` : "No deadline"}
                </div>
                {it.file && <div className="text-xs text-gray-300 mt-1">File: {it.file.name}</div>}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => removeItem(it.id)}
                  className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-sm"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={submitAll}
            disabled={items.length === 0}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white disabled:opacity-50"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}




