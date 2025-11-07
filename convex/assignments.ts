import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const newAssignments = mutation({
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
      throw new Error("Teacher not found");
    }

    // check this code on the piston for correctness
    // api call
  },
});
