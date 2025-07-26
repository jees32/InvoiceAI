import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create two users
  const user1 = await prisma.user.create({
    data: {
      id: 'user-1',
      email: 'arjun.sharma@example.com',
      firstName: 'Arjun',
      lastName: 'Sharma',
      imageUrl: '',
    },
  });
  const user2 = await prisma.user.create({
    data: {
      id: 'user-2',
      email: 'priya.patel@example.com',
      firstName: 'Priya',
      lastName: 'Patel',
      imageUrl: '',
    },
  });

  // Create profiles for each user
  const profile1 = await prisma.profile.create({
    data: {
      companyName: 'Sharma Constructions',
      gstNumber: '27AAECS1234F1ZV',
      address: 'Mumbai, Maharashtra',
      contactNumber: '9876543210',
      supportNumber: '1800123456',
      logoUrl: '',
      defaultTax: 18,
      userId: user1.id,
    },
  });
  const profile2 = await prisma.profile.create({
    data: {
      companyName: 'Patel Builders',
      gstNumber: '24AAECP1234G1ZV',
      address: 'Ahmedabad, Gujarat',
      contactNumber: '9123456780',
      supportNumber: '1800654321',
      logoUrl: '',
      defaultTax: 18,
      userId: user2.id,
    },
  });

  // Create products for each user
  await prisma.product.createMany({
    data: [
      { name: 'Cement (50kg bag)', sku: 'CEM-50', price: 380, inventory: 100, tax: 18, userId: user1.id },
      { name: 'TMT Steel Bar (12mm)', sku: 'TMT-12', price: 600, inventory: 200, tax: 18, userId: user1.id },
      { name: 'Bricks (1000 units)', sku: 'BRK-1000', price: 7000, inventory: 50, tax: 5, userId: user1.id },
      { name: 'Cement (50kg bag)', sku: 'CEM-50-P', price: 390, inventory: 80, tax: 18, userId: user2.id },
      { name: 'Sand (1 ton)', sku: 'SND-1T', price: 1200, inventory: 40, tax: 5, userId: user2.id },
      { name: 'Aggregate (1 ton)', sku: 'AGG-1T', price: 1500, inventory: 60, tax: 5, userId: user2.id },
    ],
  });

  // Create invoices for each user
  await prisma.invoice.createMany({
    data: [
      {
        id: 'inv-1',
        invoiceNumber: 'INV-2024-001',
        customerName: 'Ravi Kumar',
        customerEmail: 'ravi.kumar@example.com',
        customerPhone: '9001234567',
        customerAddress: 'Delhi',
        issueDate: new Date('2024-07-01'),
        dueDate: new Date('2024-07-10'),
        status: 'Paid',
        subtotal: 10000,
        totalGst: 1800,
        totalAmount: 11800,
        userId: user1.id,
        profileId: profile1.id,
      },
      {
        id: 'inv-2',
        invoiceNumber: 'INV-2024-002',
        customerName: 'Sunita Singh',
        customerEmail: 'sunita.singh@example.com',
        customerPhone: '9012345678',
        customerAddress: 'Pune',
        issueDate: new Date('2024-07-05'),
        dueDate: new Date('2024-07-15'),
        status: 'Pending',
        subtotal: 8000,
        totalGst: 1440,
        totalAmount: 9440,
        userId: user1.id,
        profileId: profile1.id,
      },
      {
        id: 'inv-3',
        invoiceNumber: 'INV-2024-003',
        customerName: 'Amit Joshi',
        customerEmail: 'amit.joshi@example.com',
        customerPhone: '9023456789',
        customerAddress: 'Surat',
        issueDate: new Date('2024-07-03'),
        dueDate: new Date('2024-07-12'),
        status: 'Paid',
        subtotal: 12000,
        totalGst: 2160,
        totalAmount: 14160,
        userId: user2.id,
        profileId: profile2.id,
      },
      {
        id: 'inv-4',
        invoiceNumber: 'INV-2024-004',
        customerName: 'Neha Mehta',
        customerEmail: 'neha.mehta@example.com',
        customerPhone: '9034567890',
        customerAddress: 'Vadodara',
        issueDate: new Date('2024-07-06'),
        dueDate: new Date('2024-07-16'),
        status: 'Pending',
        subtotal: 9500,
        totalGst: 1710,
        totalAmount: 11210,
        userId: user2.id,
        profileId: profile2.id,
      },
    ],
  });

  // Optionally, add invoice items for each invoice if needed
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 