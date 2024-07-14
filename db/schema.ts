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
  userLinks: many(userLinks),
  userProfiles: many(userProfiles),
}));

export const links = sqliteTable("links", {
  id: id(),
  userId: text("userId").notNull(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
});

export const userLinks = sqliteTable("userLinks", {
  id: id(),
  userId: text("userId").notNull(),
  links: text("links").notNull().$type<string[]>(),
  createdAt: createdAt(),
});

export const linksRelations = relations(links, ({ one }) => ({
  user: one(users, {
    fields: [links.userId],
    references: [users.id],
  }),

  userLinks: one(userLinks, {
    fields: [links.userId],
    references: [userLinks.userId],
  }),
}));

export const userProfiles = sqliteTable("userProfiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  image: text("image"),
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

export type InsertLinks = typeof links.$inferInsert;
export type SelectLinks = typeof links.$inferSelect;

export type InsertUserLinks = typeof userLinks.$inferInsert;
export type SelectUserLinks = typeof userLinks.$inferSelect;

export type InsertUserProfiles = typeof userProfiles.$inferInsert;
export type SelectUserProfiles = typeof userProfiles.$inferSelect;
