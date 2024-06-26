import { pgTable, serial,varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';


//books table
export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    year: integer('year').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// types
export type TIBook = typeof books.$inferInsert;
export type TSBook = typeof books.$inferSelect;