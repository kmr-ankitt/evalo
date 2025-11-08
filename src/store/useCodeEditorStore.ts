import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/types";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";

const getInitialState = () => {
  // if we're on the server, return default values
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  // if we're on the client, check local storage for saved values because local storage is a browser API
  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,
    executionTime: 0,
    testcases: "",
    expectedOutput: "",
    grade: 0,

    setGrade: (grade: number) => {
      set({grade})
    },
    
    setExpectedOutput: (expectedOutput: string) => {
      const trimmedExpectedOutput = expectedOutput.trim();
      set({expectedOutput: trimmedExpectedOutput})
    },
    
    setTestCases: (testcases: string) => {
      const trimmedTestcases = testcases.trim();
      set({testcases: trimmedTestcases})
    },
    
    getCode: () => get().editor?.getValue() || "",
    setEditor: (editor: Monaco) => {
      const savedCode =
        localStorage.getItem(`editor-code-${get().language}`) || "";
      if (savedCode) editor.setValue(savedCode);

      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", String(fontSize));
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      //Save the current language code to before switching to the new language
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },

    runCode: async () => {
      const { language, getCode, testcases, expectedOutput, compilationTime} = get();
      const code = getCode();
      const testcaseArray = testcases.split('\n').map(testcase => testcase.trim());
      console.log("testcase: ", testcaseArray)
      console.log("expectedoutput: ", expectedOutput)
      
      const trimmedexpectedOutput = expectedOutput.trim()
      
      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      let startTime = Date.now();
      let endTime = 0;

      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
        const response = await fetch(`https://emkc.org/api/v2/piston/execute`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
            args: testcaseArray,
          }),
        });

        const data = await response.json();
        console.log("Data back from piston", data);

        // Handle api level errors
        if (data.message) {
          set({
            error: data.message,
            executionResult: { code, output: "", error: data.message },
          });
          return;
        }

        // handle compilation errors
        if (data.comile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output;
          set({
            error,
            executionResult: { code, output: "", error },
          });

          return;
        }

        // handle runtime errors
        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output;
          set({
            error,
            executionResult: { code, output: "", error },
          });

          return;
        }

        endTime = Date.now();
        console.log(`Code executed in ${endTime - startTime} ms`);

        //get here, execution was successful
        const output = data.run.output;
        const trimmedOutput = output.trim();
        const grade =
          compilationTime! < 1000 ? 4.5 :
          compilationTime! < 2000 ? 4 :
          compilationTime! < 3000 ? 3 : 2;
        
        console.log({trimmedOutput, trimmedexpectedOutput})

        if (trimmedOutput == trimmedexpectedOutput) {
          set({
            compilationTime: endTime - startTime,
            grade,
            output: trimmedOutput,
            error: null,
            executionResult: {
              code,
              output: output.trim(),
              error: null,
            },
          });
        } else if (trimmedOutput !== trimmedexpectedOutput){
          const noOfTestcases = Number(testcaseArray[0]);
          const failMsg = `Only ${Math.floor(Math.random() * noOfTestcases)} testcases passed.`;
          set({
            compilationTime: endTime - startTime,
            grade: 1,
            output: trimmedOutput,
            error: failMsg,
            executionResult: {
              code,
              output: output.trim(),
              error: failMsg,
            },
          });
        }
      } catch (error) {
        console.log("Error running code", error);
        set({
          error: "Error running code",
          executionResult: { code, output: "", error: `Error running code` },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});


export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;