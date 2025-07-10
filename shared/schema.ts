import { pgTable, text, serial, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const vcs = pgTable("vcs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  firm: text("firm").notNull(),
  bio: text("bio").notNull(),
  email: text("email").notNull(),
  website: text("website"),
  twitter: text("twitter"),
  imageUrl: text("image_url"),
  isVerified: boolean("is_verified").default(false),
  investmentStages: jsonb("investment_stages").$type<string[]>().notNull(),
  sectors: jsonb("sectors").$type<string[]>().notNull(),
  checkSizeMin: text("check_size_min"),
  checkSizeMax: text("check_size_max"),
  geographicFocus: jsonb("geographic_focus").$type<string[]>().notNull(),
  portfolioCompanies: jsonb("portfolio_companies").$type<string[]>().default([]),
});

export const insertVCSchema = createInsertSchema(vcs).omit({
  id: true,
});

export type InsertVC = z.infer<typeof insertVCSchema>;
export type VC = typeof vcs.$inferSelect;

// Industries/Sectors enum for filtering
export const INDUSTRIES = [
  "Fintech",
  "Healthcare",
  "Enterprise Software",
  "Consumer",
  "Automotive",
  "Fashion",
  "E-commerce",
  "Cybersecurity",
  "AI/ML",
  "Biotech",
  "Climate Tech",
  "EdTech",
  "PropTech",
  "Gaming",
  "Marketplace",
  "Infrastructure",
  "Data Services",
  "DevTools",
  "Hardware",
  "Robotics"
] as const;

export const INVESTMENT_STAGES = [
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
  "Growth",
  "Late Stage"
] as const;

export const CHECK_SIZES = [
  "Under $100K",
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M - $10M",
  "$10M+"
] as const;

export const GEOGRAPHIC_REGIONS = [
  "North America",
  "Europe",
  "Asia",
  "Global",
  "Latin America",
  "Middle East",
  "Africa",
  "Australia"
] as const;
