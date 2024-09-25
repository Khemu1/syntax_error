import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create roles if they don't exist
  await prisma.role.upsert({
    where: { name: "owner" },
    update: {},
    create: { name: "owner" },
  });
  await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: { name: "admin" },
  });
  await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: { name: "user" },
  });

  // Emails and password hash
  const ownerEmail = "owner@example.com";
  const ownerEmail2 = "owner2@example.com"; // New owner email
  const adminEmail = "admin@example.com";
  const adminEmail1 = "admin1@example.com";
  const hashedPassword = await bcrypt.hash("password", 10);

  // Find roles
  const ownerRole = await prisma.role.findUnique({ where: { name: "owner" } });
  const adminRole = await prisma.role.findUnique({ where: { name: "admin" } });

  // Create or update users
  const owner = await prisma.user.upsert({
    where: { email: ownerEmail },
    update: {},
    create: {
      email: ownerEmail,
      username: "owner",
      passwordHash: hashedPassword,
    },
  });

  const owner2 = await prisma.user.upsert({
    where: { email: ownerEmail2 },
    update: {},
    create: {
      email: ownerEmail2,
      username: "owner2", // New owner username
      passwordHash: hashedPassword,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      username: "admin",
      passwordHash: hashedPassword,
    },
  });

  const admin1 = await prisma.user.upsert({
    where: { email: adminEmail1 },
    update: {},
    create: {
      email: adminEmail1,
      username: "admin1",
      passwordHash: hashedPassword,
    },
  });

  // Link users to roles (userRole)
  if (ownerRole && owner) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: owner.id,
          roleId: ownerRole.id,
        },
      },
      update: {},
      create: {
        userId: owner.id,
        roleId: ownerRole.id,
      },
    });
  }

  if (ownerRole && owner2) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: owner2.id,
          roleId: ownerRole.id,
        },
      },
      update: {},
      create: {
        userId: owner2.id,
        roleId: ownerRole.id,
      },
    });
  }

  if (adminRole && admin) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: admin.id,
          roleId: adminRole.id,
        },
      },
      update: {},
      create: {
        userId: admin.id,
        roleId: adminRole.id,
      },
    });
  }

  if (adminRole && admin1) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: admin1.id,
          roleId: adminRole.id,
        },
      },
      update: {},
      create: {
        userId: admin1.id,
        roleId: adminRole.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
