'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";

export async function getPortfolioProjectsAction() {
  try {
    const data = await prisma.orm.public.PortfolioProject.orderBy(p => p.createdAt.asc()).all();
    if (data && data.length > 0) {
      return JSON.parse(JSON.stringify(data));
    }
  } catch (err) {
    console.warn("PortfolioProject query failed, falling back to static projects:", err);
  }

  // Fallback to centralized projects if DB is empty or during first boot
  return PORTFOLIO_PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    label: p.label,
    gradient: p.gradient,
    items: p.items,
  }));
}

export async function seedCatalogPortfolioAction() {
  try {
    for (const p of PORTFOLIO_PROJECTS) {
      await prisma.orm.public.PortfolioProject.create({
        title: p.title,
        subtitle: p.subtitle,
        label: p.label,
        gradient: p.gradient,
        items: p.items,
      });
    }
    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath("/crm/portfolio");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createPortfolioProjectAction(data: {
  title: string;
  subtitle: string;
  label: string;
  gradient: string;
  items: { icon: string; label: string }[];
}) {
  const result = await prisma.orm.public.PortfolioProject.create({
    title: data.title,
    subtitle: data.subtitle,
    label: data.label,
    gradient: data.gradient,
    items: data.items,
  });
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/crm/portfolio");
  return result;
}

export async function updatePortfolioProjectAction(id: string, data: {
  title: string;
  subtitle: string;
  label: string;
  gradient: string;
  items: { icon: string; label: string }[];
}) {
  const result = await prisma.orm.public.PortfolioProject.where({ id }).update({
    title: data.title,
    subtitle: data.subtitle,
    label: data.label,
    gradient: data.gradient,
    items: data.items,
  });
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/crm/portfolio");
  return result;
}

export async function deletePortfolioProjectAction(id: string) {
  const result = await prisma.orm.public.PortfolioProject.where({ id }).delete();
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/crm/portfolio");
  return result;
}
