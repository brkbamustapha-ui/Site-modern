"use server";

import {
  contactSchema,
  type ContactState,
} from "@/lib/contact-schema";

/**
 * Contact form handler.
 *
 * Validation runs on the server because Server Actions are reachable by direct
 * POST — client-side checks are a convenience, never the gate.
 *
 * ⚠️ TO GO LIVE: replace the delivery block below with a real transport
 * (Resend / SendGrid / SMTP) or a CRM webhook. Right now a valid submission is
 * logged server-side and acknowledged, so the UI is fully exercisable without
 * putting credentials in the repo.
 *
 * Note: this module may only export async functions — the shared types and the
 * initial state live in lib/contact-schema.ts for that reason.
 */
export async function submitContact(
  _previous: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    projectType: formData.get("projectType") ?? "",
    message: formData.get("message") ?? "",
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactState["errors"];
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return {
      status: "error",
      message: "Merci de corriger les champs signalés.",
      errors,
    };
  }

  // Silently accept bots so they get no signal about the honeypot.
  if (parsed.data.company) {
    return {
      status: "success",
      message: "Merci, votre demande a bien été envoyée.",
      errors: {},
    };
  }

  try {
    // --- Replace this block with your real delivery ------------------
    console.info("[BMS] Nouvelle demande de contact", {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || "—",
      projectType: parsed.data.projectType,
      messageLength: parsed.data.message.length,
      receivedAt: new Date().toISOString(),
    });
    // -----------------------------------------------------------------

    return {
      status: "success",
      message:
        "Merci, votre demande est bien arrivée. Nous revenons vers vous sous 24 heures ouvrées.",
      errors: {},
    };
  } catch {
    return {
      status: "error",
      message:
        "L'envoi a échoué. Vous pouvez nous joindre directement par téléphone ou WhatsApp.",
      errors: {},
    };
  }
}
