import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("teachers")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
  },
});
