import { prisma } from "@/lib/prisma";
import { markMessageReadAction, deleteMessageAction } from "@/app/admin/actions";
import { Trash2, MailOpen } from "lucide-react";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-3xl italic text-cream">Messages</h1>
      <p className="mt-1 text-sm text-cream/50">{messages.length} messages received.</p>

      <div className="mt-8 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-2xl border p-6 ${
              message.isRead ? "border-cream/10 bg-noir-soft" : "border-gold-soft/40 bg-noir-soft"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-cream">
                  {message.name} <span className="text-cream/40">— {message.email}</span>
                </p>
                {message.subject && <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-soft">{message.subject}</p>}
              </div>
              <div className="flex items-center gap-3">
                {!message.isRead && (
                  <form action={markMessageReadAction}>
                    <input type="hidden" name="id" value={message.id} />
                    <button type="submit" className="text-cream/50 hover:text-gold-soft" aria-label="Mark as read">
                      <MailOpen size={16} />
                    </button>
                  </form>
                )}
                <form action={deleteMessageAction}>
                  <input type="hidden" name="id" value={message.id} />
                  <button type="submit" className="text-cream/50 hover:text-italian-red-bright" aria-label="Delete message">
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-3 text-sm text-cream/70">{message.message}</p>
            <p className="mt-3 text-xs text-cream/30">{message.createdAt.toLocaleString()}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-sm text-cream/40">No messages yet.</p>}
      </div>
    </div>
  );
}
