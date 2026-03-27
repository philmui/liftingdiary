import { integer, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const exercises = pgTable("exercises", {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
});

export const workouts = pgTable("workouts", {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  startedAt: timestamp('started_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const workoutExercises = pgTable("workout_exercises", {
  id: serial('id').primaryKey(),
  workoutId: integer('workout_id').notNull().references(() => workouts.id, { onDelete: "cascade" }),
  exerciseId: integer('exercise_id').notNull().references(() => exercises.id),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const sets = pgTable("sets", {
  id: serial('id').primaryKey(),
  workoutExerciseId: integer('workout_exercise_id').notNull().references(() => workoutExercises.id, { onDelete: "cascade" }),
  setNumber: integer('set_number').notNull(),
  reps: integer('reps'),
  weightLbs: numeric('weight_lbs', { precision: 6, scale: 2 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Relations
export const workoutRelations = relations(workouts, ({ many }) => ({
    workoutExercises: many(workoutExercises),
}));

export const exercisesRelations = relations(exercises, ({ many }) => ({
    workoutExercises: many(workoutExercises),
}));
