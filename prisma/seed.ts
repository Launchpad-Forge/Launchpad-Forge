import { prisma } from '../src/lib/db';

async function main() {
  console.log('Starting DB Seed...');

  // 1. Create User
  const user = await prisma.user.upsert({
    where: { email: 'admin@launchpadforge.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@launchpadforge.com',
      passwordHash: 'dummy_hash', // Replace in production
      role: 'ADMIN',
    },
  });
  console.log(`Created user: ${user.name}`);

  // 2. Create Companies
  const company1 = await prisma.company.create({
    data: {
      name: 'TechFlow Solutions',
      website: 'techflow.io',
      industry: 'SaaS',
    }
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'Stellar E-commerce',
      website: 'stellar.co',
      industry: 'Retail',
    }
  });
  console.log('Created companies.');

  // 3. Create Contacts
  await prisma.contact.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@techflow.io',
      companyId: company1.id,
      jobTitle: 'CTO'
    }
  });
  console.log('Created contacts.');

  // 4. Create Leads
  await prisma.lead.create({
    data: {
      name: 'New Web App Project',
      companyName: 'Acme Corp',
      email: 'hello@acme.com',
      status: 'New',
      priority: 'High',
      assignedUserId: user.id
    }
  });
  console.log('Created leads.');

  // 5. Create Clients
  const client1 = await prisma.client.create({
    data: {
      companyId: company1.id,
      status: 'Active'
    }
  });

  const client2 = await prisma.client.create({
    data: {
      companyId: company2.id,
      status: 'Active'
    }
  });
  console.log('Created clients.');

  // 6. Create Projects & Tasks
  const project1 = await prisma.project.create({
    data: {
      name: 'E-Commerce Replatforming',
      clientId: client2.id,
      status: 'Active',
      budget: 25000,
      startDate: new Date(),
      expectedCompletion: new Date(Date.now() + 86400000 * 30),
      tasks: {
        create: [
          { title: 'Design wireframes', status: 'Done', priority: 'High' },
          { title: 'Setup database', status: 'In Progress' },
          { title: 'Payment integration', status: 'Todo' }
        ]
      }
    }
  });
  console.log('Created projects & tasks.');

  // 7. Create Invoices
  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-001',
      clientId: client1.id,
      status: 'Paid',
      total: 12500,
      issueDate: new Date(Date.now() - 86400000 * 5),
      payments: {
        create: [
          { amount: 12500, method: 'Bank Transfer', reference: 'REF-001' }
        ]
      }
    }
  });
  console.log('Created invoices & payments.');

  console.log('Seed Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
