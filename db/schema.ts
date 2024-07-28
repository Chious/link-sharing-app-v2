import { randomUUID } from "crypto";
import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const id = () =>
  text("id")
    .primaryKey()
    .$default(() => randomUUID());

const createdAt = () =>
  text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull();

export const users = sqliteTable("users", {
  id: id(),
  createdAt: createdAt(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  userProfiles: many(userProfiles),
}));

export const userProfiles = sqliteTable("userProfiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  image: text("image"),
  links: text("links"),
  createdAt: createdAt(),
});

export const userProfilesReferences = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertUserProfiles = typeof userProfiles.$inferInsert;
export type SelectUserProfiles = typeof userProfiles.$inferSelect;
