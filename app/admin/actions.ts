"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { ADMIN_COOKIE_NAME, checkPasscode, createSessionToken } from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const passcode = String(formData.get("passcode") ?? "");

  if (!checkPasscode(passcode)) {
    redirect("/admin/login?error=1");
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}

function parseProductForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    priceCents: formData.get("priceCents"),
    imageQuery: formData.get("imageQuery"),
    categoryId: formData.get("categoryId"),
    isSignature: formData.get("isSignature") === "on",
    isAvailable: formData.get("isAvailable") === "on",
    order: formData.get("order") || 0,
  });
}

export async function createProductAction(formData: FormData) {
  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    redirect("/admin/menu/new?error=1");
  }

  await prisma.product.create({ data: parsed.data });

  revalidatePath("/admin/menu");
  revalidatePath("/");
  redirect("/admin/menu");
}

export async function updateProductAction(id: string, formData: FormData) {
  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    redirect(`/admin/menu/${id}/edit?error=1`);
  }

  await prisma.product.update({ where: { id }, data: parsed.data });

  revalidatePath("/admin/menu");
  revalidatePath("/");
  redirect("/admin/menu");
}

export async function deleteProductAction(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/menu");
  revalidatePath("/");
}

export async function updateReservationStatusAction(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED"
    | "COMPLETED";
  await prisma.reservation.update({ where: { id }, data: { status } });
  revalidatePath("/admin/reservations");
}

export async function deleteReservationAction(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.reservation.delete({ where: { id } });
  revalidatePath("/admin/reservations");
}

export async function markMessageReadAction(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}

export async function updateContentAction(formData: FormData) {
  const value = String(formData.get("story") ?? "").trim();
  if (!value) return;

  await prisma.restaurantContent.upsert({
    where: { key: "story" },
    update: { value },
    create: { key: "story", value },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
