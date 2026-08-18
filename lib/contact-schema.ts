import { z } from "zod";
import { projectTypes } from "@/data/site";

/**
 * Shared between the client form and the Server Action.
 *
 * This lives outside the `"use server"` module on purpose: those files may
 * only export async functions, so constants and types exported from them are
 * stripped and arrive as `undefined` at runtime.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Merci d'indiquer votre nom.")
    .max(100, "Ce nom est trop long."),
  email: z.email("Cette adresse email ne semble pas valide.").max(180),
  phone: z
    .string()
    .trim()
    .max(30, "Ce numéro est trop long.")
    // Optional, but must look like a phone number when provided.
    .refine(
      (value) => value === "" || /^[+()\d][\d\s().-]{5,}$/.test(value),
      "Ce numéro de téléphone ne semble pas valide."
    )
    .optional()
    .default(""),
  projectType: z.enum(projectTypes, {
    message: "Merci de choisir un type de projet.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Décrivez votre projet en quelques mots (10 caractères minimum).")
    .max(3000, "Ce message est trop long (3000 caractères maximum)."),
  /** Honeypot — real people never fill this in. */
  company: z.string().max(0).optional().default(""),
});

export type ContactFields = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level messages, keyed by input name. */
  errors: Partial<Record<keyof ContactFields, string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
};
