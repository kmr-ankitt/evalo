import { LANGUAGE_CONFIG } from "./../src/app/(root)/_constants/index";
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const newAssignments = mutation({
  args: {
    teacherId: v.id("teachers"),
    title: v.string(),
    description: v.string(),
    solution: v.string(),
    language: v.string(),
    createdAt: v.number(),
    testCase: v.string(),
    dueDate: v.number(),
    compileTime: v.number(),
  },
  handler: async (ctx, args) => {
    // before creating the assignment check if the teacher exists
    const teacher = await ctx.db.get(args.teacherId);
    if (!teacher) {
      console.log("Teacher not found");
      return { success: false, error: "Teacher not found" };
    }

    try {
      const assignmentId = await ctx.db.insert("assignments", {
        teacherId: args.teacherId,
        title: args.title,
        description: args.description,
        solution: args.solution,
        language: args.language,
        createdAt: args.createdAt,
        testCase: args.testCase,
        dueDate: args.dueDate,
        compileTime: args.compileTime,

        expectedOutput: "", // Placeholder, can be set later
      });

      return { success: true, assignmentId };
      // return { assignmentId, success: true };
    } catch (error) {
      console.error("Error creating assignment:", error);
      return { success: false };
    }
  },
});
