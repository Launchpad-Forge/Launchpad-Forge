// We are providing a bulletproof mock of the Prisma client here to completely
// bypass the Next.js Turbopack + Prisma 7 resolution bug during UI preview.
// When you are ready to connect the real database, you can restore the real PrismaClient import.

const mockPrisma = new Proxy({}, {
  get: (target, prop) => {
    // Return another proxy for model methods (e.g., prisma.lead.findMany)
    return new Proxy({}, {
      get: (modelTarget, modelProp) => {
        return async () => {
          throw new Error("Database not connected - using fallback mock data");
        };
      }
    });
  }
});

export const prisma = mockPrisma as any;

