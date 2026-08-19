import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères."),
  company: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email("Adresse email invalide."),
  phone: z.string().trim().optional().or(z.literal("")),
  projectType: z.string().trim().min(1, "Sélectionnez un type de projet."),
  message: z.string().trim().min(10, "Votre message doit contenir au moins 10 caractères."),
});

export type ContactPayload = z.infer<typeof contactSchema>;
