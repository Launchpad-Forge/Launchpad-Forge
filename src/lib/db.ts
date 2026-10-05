import 'temporal-polyfill/global';
import { supabase } from '@prisma/orm-extension-supabase/runtime';
import type { RuntimeContract as Contract } from './prisma-contract';
import { orm } from '@prisma/orm-postgres/orm-client';
import contractJson from '../../prisma/schema.json' with { type: 'json' };

const globalForPrisma = globalThis as unknown as {
  db: Awaited<ReturnType<typeof supabase<Contract>>> | undefined;
};

const db = globalForPrisma.db ?? await supabase<Contract>({
  contractJson,
  url: process.env.DATABASE_URL,
  jwksUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/.well-known/jwks.json`,
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.db = db;
}

// Export a service-role bound db to match previous postgres() behaviour
// To enforce RLS per-user, use: await db.asUser(jwt)
export const prisma = db.asServiceRole();

// Supabase rc.13 transactions expose a query context, unlike the Postgres facade.
// Build an ORM pinned to that context so all operations use the same connection.
export async function crmTransaction<T>(fn: (tx: { orm: typeof prisma.orm }) => Promise<T>) {
  return prisma.transaction(context => fn({ orm: orm<Contract>({ context: db.context, runtime: context }) }));
}
// Triggering reload...
