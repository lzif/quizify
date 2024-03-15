-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "quiz" (
	"quiz_id" serial PRIMARY KEY NOT NULL,
	"quiz_name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiplechoice" (
	"mc_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer,
	"question" varchar(255) NOT NULL,
	"choices" text[] NOT NULL,
	"correct_choice" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shortentry" (
	"se_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer,
	"question" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rearrange" (
	"re_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer,
	"question_order" integer[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matchmaking" (
	"mm_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer,
	"items" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "draganddrop" (
	"dd_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer,
	"items" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categorize" (
	"cat_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer,
	"categories" text[] NOT NULL,
	"items" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pictureanswers" (
	"pa_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer,
	"image_url" varchar(255) NOT NULL,
	"answer" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "essay" (
	"essay_id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer,
	"question" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"google_id" varchar(255) NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_google_id_key" UNIQUE("google_id"),
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiplechoice" ADD CONSTRAINT "multiplechoice_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shortentry" ADD CONSTRAINT "shortentry_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rearrange" ADD CONSTRAINT "rearrange_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matchmaking" ADD CONSTRAINT "matchmaking_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "draganddrop" ADD CONSTRAINT "draganddrop_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categorize" ADD CONSTRAINT "categorize_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pictureanswers" ADD CONSTRAINT "pictureanswers_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "essay" ADD CONSTRAINT "essay_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("quiz_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/