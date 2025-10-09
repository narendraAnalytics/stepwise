import { integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerkId: varchar({ length: 255 }).notNull().unique(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  profileImage: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const solutionsTable = pgTable("solutions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  clerkId: varchar({ length: 255 }).notNull(),
  problemNumber: integer().notNull().default(0),
  problemType: varchar({ length: 50 }).notNull(), // 'image' or 'text'
  problemContent: text().notNull(), // original problem text or base64 image
  mimeType: varchar({ length: 100 }), // for images
  solution: text().notNull(), // the AI-generated solution
  createdAt: timestamp().defaultNow().notNull(),
});
