'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getPortfolioProjectsAction() {
  const data = await prisma.orm.public.PortfolioProject.orderBy(p => p.createdAt.asc()).all();
  return JSON.parse(JSON.stringify(data));
}

export async function createPortfolioProjectAction(data: {
  title: string;
  subtitle: string;
  label: string;
  gradient: string;
  items: { icon: string, label: string }[];
}) {
  const result = await prisma.orm.public.PortfolioProject.create({
    title: data.title,
    subtitle: data.subtitle,
    label: data.label,
    gradient: data.gradient,
    items: data.items,
  });
  revalidatePath("/");
  revalidatePath("/crm/portfolio");
  return result;
}

export async function updatePortfolioProjectAction(id: string, data: {
  title: string;
  subtitle: string;
  label: string;
  gradient: string;
  items: { icon: string, label: string }[];
}) {
  const result = await prisma.orm.public.PortfolioProject.where({ id }).update({
    title: data.title,
    subtitle: data.subtitle,
    label: data.label,
    gradient: data.gradient,
    items: data.items,
  });
  revalidatePath("/");
  revalidatePath("/crm/portfolio");
  return result;
}

export async function deletePortfolioProjectAction(id: string) {
  const result = await prisma.orm.public.PortfolioProject.where({ id }).delete();
  revalidatePath("/");
  revalidatePath("/crm/portfolio");
  return result;
}
