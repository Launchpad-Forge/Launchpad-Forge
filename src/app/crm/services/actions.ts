"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getServicesAction() {
  const data = await prisma.orm.public.Service.orderBy(s => s.createdAt.asc()).all();
  return JSON.parse(JSON.stringify(data));
}

export async function createServiceAction(data: {
  title: string;
  description?: string;
  details: string[];
}) {
  const count = await prisma.orm.public.Service.aggregate(s => s.count());
  const number = String(count + 1).padStart(2, '0');
  
  await prisma.orm.public.Service.create({
    number,
    title: data.title,
    description: data.description,
    details: data.details,
  });
  
  revalidatePath("/");
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
  revalidatePath("/crm/services");
}

export async function deleteServiceAction(id: string) {
  await prisma.orm.public.Service.where({ id }).delete();
  
  revalidatePath("/");
  revalidatePath("/crm/services");
}
