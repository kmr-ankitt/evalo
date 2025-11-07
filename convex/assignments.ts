import { LANGUAGE_CONFIG } from "./../src/app/(root)/_constants/index";
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const newAssignments = mutation({
  args: {
    teacherId: v.string(),
    title: v.string(),
    description: v.string(),
    solution: v.string(),
    language: v.string(),
    createdAt: v.number(),
    compileTime: v.optional(v.number()),
    testCases: v.array(
      v.object({
        input: v.string(),
        output: v.string(),
      })
    ),
    dueDate: v.number(),
  },
  handler: async (ctx, args) => {
    // before creating the assignment check if the teacher exists
    const teacher = await ctx.db
      .query("teachers")
      .filter((q) => q.eq("userId", args.teacherId))
      .first();

    if (!teacher) {
      console.log("Teacher not found");
      return { success: false };
    }

    let startTime = Date.now();
    let endTime = 0;

    try {
      const runtime = LANGUAGE_CONFIG[args.language].pistonRuntime;
      const response = await fetch(`https://emkc.org/api/v2/piston/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,
          files: [{ content: args.solution }],
        }),
      });

      const data = await response.json();
      console.log("Data back from piston", data);

      // Handle api level errors
      if (data.message) {
        // set({
        //   error: data.message,
        //   executionResult: { code, output: "", error: data.message },
        // });
        return;
      }

      // handle compilation errors
      if (data.comile && data.compile.code !== 0) {
        const error = data.compile.stderr || data.compile.output;
        // set({
        //   error,
        //   executionResult: { code, output: "", error },
        // });

        return;
      }

      // handle runtime errors
      if (data.run && data.run.code !== 0) {
        const error = data.run.stderr || data.run.output;
        // set({
        //   error,
        //   executionResult: { code, output: "", error },
        // });

        return;
      }

      endTime = Date.now();
      console.log(`Code executed in ${endTime - startTime} ms`);

      const assignmentId = await ctx.db.insert("assignments", {
        teacherId: teacher._id,
        title: args.title,
        description: args.description,
        solution: args.solution,
        language: args.language,
        createdAt: Date.now(),
        compileTime: args.compileTime,
        testCases: args.testCases,
        dueDate: args.dueDate,
      });

      return { assignmentId, success: true };
    } catch (error) {
      console.error("Error creating assignment:", error);
      return { success: false };
    }
  },
});
