"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { SERVICES_CATALOG } from "@/lib/constants";

export async function getServicesAction() {
  try {
    const data = await prisma.orm.public.Service.orderBy(s => s.createdAt.asc()).all();
    if (data && data.length > 0) {
      return JSON.parse(JSON.stringify(data));
    }
  } catch (err) {
    console.warn("Service query failed, falling back to static catalog:", err);
  }

  // Fallback to centralized catalog if DB is empty or during first boot
  return SERVICES_CATALOG.map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
    description: s.description,
    details: s.whatsIncluded,
    icon: s.icon,
  }));
}

export async function seedCatalogServicesAction() {
  try {
    for (const s of SERVICES_CATALOG) {
      await prisma.orm.public.Service.create({
        number: s.number,
        title: s.title,
        description: s.description,
        details: s.whatsIncluded,
        icon: s.icon,
      });
    }
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/crm/services");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createServiceAction(data: {
  title: string;
  description?: string;
  details: string[];
}) {
  const agg = await prisma.orm.public.Service.aggregate(s => ({ total: s.count() }));
  const count = (agg as { total: number }).total ?? 0;
  const number = String(count + 1).padStart(2, '0');
  
  await prisma.orm.public.Service.create({
    number,
    title: data.title,
    description: data.description,
    details: data.details,
  });
  
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/crm/services");
}

export async function updateServiceAction(id: string, data: {
  title: string;
  description?: string;
  details: string[];
}) {
  await prisma.orm.public.Service.where({ id }).update({
    title: data.title,
    description: data.description,
    details: data.details,
  });
  
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/crm/services");
}

export async function deleteServiceAction(id: string) {
  await prisma.orm.public.Service.where({ id }).delete();
  
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/crm/services");
}
