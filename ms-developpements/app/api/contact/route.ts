import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // No email/DB provider is wired up yet — this deliberately never depends on a
  // secret env var so the app builds and runs out of the box. Logging server-side
  // is enough to receive submissions during development; plug in a provider
  // (Resend, Postmark, a DB…) here when you're ready to go live.
  console.log("[contact] Nouvelle demande:", parsed.data);

  return NextResponse.json({ ok: true });
}
