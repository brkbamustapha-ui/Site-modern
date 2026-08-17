import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().min(6, "Please enter a valid phone number.").max(30),
  date: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Please choose a valid date.",
  }),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Please choose a valid time."),
  guests: z.coerce.number().int().min(1, "At least 1 guest.").max(20, "For groups above 20, please call us."),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.email("Please enter a valid email address."),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please write a slightly longer message.").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const productSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(140)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and dashes only."),
  description: z.string().trim().min(5).max(600),
  priceCents: z.coerce.number().int().min(0).max(1_000_000),
  imageQuery: z.string().trim().max(120).optional().or(z.literal("")),
  categoryId: z.string().min(1, "Please choose a category."),
  tags: z.array(z.string()).optional().default([]),
  isSignature: z.coerce.boolean().optional().default(false),
  isAvailable: z.coerce.boolean().optional().default(true),
  order: z.coerce.number().int().optional().default(0),
});

export type ProductInput = z.infer<typeof productSchema>;
