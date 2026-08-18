import { projectTypes } from "@/data/site";

/**
 * Contact form validation.
 *
 * Hand-rolled rather than schema-library based: the form has five fields, and
 * this runs in the browser, so pulling a validator into the client bundle would
 * cost more than the rules are worth.
 */

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+()\d][\d\s().-]{5,}$/;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const phone = fields.phone.trim();
  const message = fields.message.trim();

  if (name.length < 2) errors.name = "Merci d'indiquer votre nom.";
  else if (name.length > 100) errors.name = "Ce nom est trop long.";

  if (!EMAIL.test(email)) errors.email = "Cette adresse email ne semble pas valide.";
  else if (email.length > 180) errors.email = "Cette adresse email est trop longue.";

  // Optional, but must look like a phone number when provided.
  if (phone !== "") {
    if (phone.length > 30) errors.phone = "Ce numéro est trop long.";
    else if (!PHONE.test(phone)) errors.phone = "Ce numéro de téléphone ne semble pas valide.";
  }

  if (!(projectTypes as readonly string[]).includes(fields.projectType)) {
    errors.projectType = "Merci de choisir un type de projet.";
  }

  if (message.length < 10) {
    errors.message = "Décrivez votre projet en quelques mots (10 caractères minimum).";
  } else if (message.length > 3000) {
    errors.message = "Ce message est trop long (3000 caractères maximum).";
  }

  return errors;
}

/** Human-readable enquiry, used for the WhatsApp and email hand-off. */
export function formatEnquiry(fields: ContactFields): string {
  return [
    "Nouvelle demande — BMS Agency",
    "",
    `Nom : ${fields.name.trim()}`,
    `Email : ${fields.email.trim()}`,
    `Téléphone : ${fields.phone.trim() || "—"}`,
    `Type de projet : ${fields.projectType}`,
    "",
    fields.message.trim(),
  ].join("\n");
}
