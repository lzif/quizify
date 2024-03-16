import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";

export const quiz = pgTable("quiz", {
  quizId: serial("quiz_id").primaryKey().notNull(),
  quizName: varchar("quiz_name", { length: 100 }).notNull(),
  userId: integer("id").references(() => users.id),
});

export const multiplechoice = pgTable("multiplechoice", {
  mcId: serial("mc_id").primaryKey().notNull(),
  quizId: integer("quiz_id").references(() => quiz.quizId),
  question: varchar("question", { length: 255 }).notNull(),
  choices: text("choices").array().notNull(),
  correctChoice: integer("correct_choice").notNull(),
});

export const shortentry = pgTable("shortentry", {
  seId: serial("se_id").primaryKey().notNull(),
  quizId: integer("quiz_id").references(() => quiz.quizId),
  question: varchar("question", { length: 255 }).notNull(),
});

export const rearrange = pgTable("rearrange", {
  reId: serial("re_id").primaryKey().notNull(),
  quizId: integer("quiz_id").references(() => quiz.quizId),
  questionOrder: integer("question_order").array().notNull(),
});

export const matchmaking = pgTable("matchmaking", {
  mmId: serial("mm_id").primaryKey().notNull(),
  quizId: integer("quiz_id").references(() => quiz.quizId),
  items: text("items").array().notNull(),
});

export const draganddrop = pgTable("draganddrop", {
  ddId: serial("dd_id").primaryKey().notNull(),
  quizId: integer("quiz_id").references(() => quiz.quizId),
  items: text("items").array().notNull(),
});

export const categorize = pgTable("categorize", {
  catId: serial("cat_id").primaryKey().notNull(),
  quizId: integer("quiz_id").references(() => quiz.quizId),
  categories: text("categories").array().notNull(),
  items: text("items").array().notNull(),
});

export const pictureanswers = pgTable("pictureanswers", {
  paId: serial("pa_id").primaryKey().notNull(),
  quizId: integer("quiz_id").references(() => quiz.quizId),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  answer: text("answer").notNull(),
});

export const essay = pgTable("essay", {
  essayId: serial("essay_id").primaryKey().notNull(),
  quizId: integer("quiz_id").references(() => quiz.quizId),
  question: varchar("question", { length: 255 }).notNull(),
});

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }),
    avatar: varchar("avatar", { length: 255 }),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  },
  (table) => {
    return {
      usersEmailKey: unique("users_email_key").on(table.email),
    };
  }
);
