"use client";

import { useRef } from "react";
import { Trash2 } from "lucide-react";

const STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;

export function ReservationRowActions({
  id,
  status,
  updateAction,
  deleteAction,
}: {
  id: string;
  status: string;
  updateAction: (formData: FormData) => void | Promise<void>;
  deleteAction: (formData: FormData) => void | Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex items-center justify-end gap-3">
      <form ref={formRef} action={updateAction}>
        <input type="hidden" name="id" value={id} />
        <select
          name="status"
          defaultValue={status}
          onChange={() => formRef.current?.requestSubmit()}
          className="rounded-lg border border-cream/15 bg-noir px-2 py-1.5 text-xs text-cream focus:border-gold-soft focus:outline-none"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s} className="bg-noir">
              {s}
            </option>
          ))}
        </select>
      </form>
      <form action={deleteAction}>
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="text-cream/50 hover:text-italian-red-bright">
          <Trash2 size={15} />
        </button>
      </form>
    </div>
  );
}
