import 'dotenv/config';
import 'temporal-polyfill/global';
import { prisma } from "../src/lib/db";
import { SERVICES } from "../src/lib/constants";

async function seed() {
  console.log("Seeding services...");
  const existing = await prisma.orm.public.Service.all();
  
  if (existing.length === 0) {
    for (const service of SERVICES) {
      await prisma.orm.public.Service.create({
        number: service.number,
        title: service.title,
        description: service.description,
        details: [...service.details],
      });
    }
    console.log("Successfully seeded services from constants!");
  } else {
    console.log("Services already exist, skipping seed.");
  }
}

seed().catch(console.error);
