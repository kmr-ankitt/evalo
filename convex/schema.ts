import { error } from "console";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(), //clerk id
    email: v.string(),
    name: v.string(),
    // isPro: v.boolean(),
    // proSince: v.optional(v.number()),
    isTeacher: v.boolean(),
    lemonSqueezyCustomerId: v.optional(v.string()),
    lemonSqueezyOrderId: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),

  teachers: defineTable({
    userId: v.string(),
    institutionName: v.string(),
    department: v.string(),
  }).index("by_user_id", ["userId"]),

  assignments: defineTable({
    teacherId: v.id("teachers"),
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
  }).index("by_teacher_id", ["teacherId"]),

  submissions: defineTable({
    assignmentId: v.id("assignments"),
    studentId: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
    submitted: v.boolean(),
    submittedAt: v.optional(v.number()),
    grade: v.optional(v.number()),
    passed: v.boolean(),
    feedback: v.optional(v.string()),
  })
    .index("by_assignment_id", ["assignmentId"])
    .index("by_student_id", ["studentId"]),

  codeExecutions: defineTable({
    userId: v.string(),
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),

  snippets: defineTable({
    userId: v.string(),
    title: v.string(),
    language: v.string(),
    code: v.string(),
    userName: v.string(), //Stores user's name for easy access
  }).index("by_user_id", ["userId"]),

  snippetComments: defineTable({
    snippetId: v.id("snippets"),
    userId: v.string(),
    userName: v.string(),
    content: v.string(), // This will store the HTML content
  }).index("by_snippet_id", ["snippetId"]),

  stars: defineTable({
    userId: v.string(),
    snippetId: v.id("snippets"),
  })
    .index("by_snippet_id", ["snippetId"])
    .index("by_user_id", ["userId"])
    .index("by_user_id_and_snippet_id", ["userId", "snippetId"]),
});
