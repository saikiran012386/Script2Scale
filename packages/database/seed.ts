import fs from "fs";
import path from "path";

function loadEnvFile() {
  const envPaths = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(__dirname, ".env"),
    path.resolve(__dirname, "../../.env")
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const idx = trimmed.indexOf("=");
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim().replace(/(^["']|["']$)/g, "");
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
      break;
    }
  }
}
loadEnvFile();

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/script2scale?schema=public";
}

import { prisma } from "./client";
import crypto from "crypto";

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { hash, salt };
}

async function main() {
  console.log("Seeding database with authentication credentials...");

  const defaultPassword = "Password123!";
  const { hash, salt } = hashPassword(defaultPassword);

  try {
    // 1. Seed sample client record
    const sampleClient = await prisma.client.upsert({
      where: { email: "john@acme.com" },
      update: { status: "ACTIVE" },
      create: {
        name: "John Doe",
        companyName: "Acme Corp",
        email: "john@acme.com",
        phone: "+15550199",
        status: "ACTIVE"
      }
    });

    // 2. Seed SECOND client (NeoTech Inc)
    const sampleClient2 = await prisma.client.upsert({
      where: { email: "sarah@neotech.io" },
      update: { status: "ACTIVE" },
      create: {
        name: "Sarah Smith",
        companyName: "NeoTech Inc",
        email: "sarah@neotech.io",
        phone: "+15550244",
        status: "ACTIVE"
      }
    });

    // 3. Seed OWNER admin user (owner@script2scale.com)
    await prisma.user.upsert({
      where: { email: "owner@script2scale.com" },
      update: {
        passwordHash: hash,
        salt: salt,
        role: "OWNER"
      },
      create: {
        name: "Script2Scale Owner",
        email: "owner@script2scale.com",
        passwordHash: hash,
        salt: salt,
        role: "OWNER"
      }
    });

    // Also seed admin@script2scale.com alias
    await prisma.user.upsert({
      where: { email: "admin@script2scale.com" },
      update: {
        passwordHash: hash,
        salt: salt,
        role: "OWNER"
      },
      create: {
        name: "Admin User",
        email: "admin@script2scale.com",
        passwordHash: hash,
        salt: salt,
        role: "OWNER"
      }
    });

    // 4. Seed CLIENT user (john@acme.com)
    await prisma.user.upsert({
      where: { email: "john@acme.com" },
      update: {
        passwordHash: hash,
        salt: salt,
        clientId: sampleClient.id,
        role: "CLIENT"
      },
      create: {
        name: "John Doe",
        email: "john@acme.com",
        passwordHash: hash,
        salt: salt,
        clientId: sampleClient.id,
        role: "CLIENT"
      }
    });

    // 5. Seed sample projects
    const sampleProject = await prisma.project.upsert({
      where: { slug: "acme-brand-anthem" },
      update: {
        serviceType: "Video Editing",
        revisionLimit: 3
      },
      create: {
        name: "Acme Brand Anthem 2026",
        slug: "acme-brand-anthem",
        description: "High-impact video production for Q3 launch",
        serviceType: "Video Editing",
        status: "REVIEW",
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        revisionLimit: 3,
        clientId: sampleClient.id
      }
    });

    const sampleProject2 = await prisma.project.upsert({
      where: { slug: "neo-tech-product-launch" },
      update: {
        serviceType: "Thumbnail Design",
        revisionLimit: 5
      },
      create: {
        name: "NeoTech Product Reveal",
        slug: "neo-tech-product-launch",
        description: "3D product teaser and keynote cutdowns",
        serviceType: "Thumbnail Design",
        status: "PRODUCTION",
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        revisionLimit: 5,
        clientId: sampleClient2.id
      }
    });

    // 6. Seed sample inquiry
    await prisma.inquiry.create({
      data: {
        fullName: "Alex Rivera",
        email: "alex@horizonlabs.com",
        company: "Horizon Labs",
        phone: "+15550388",
        services: ["Video Editing", "Thumbnail Design"],
        budgetRange: "$5k - $10k",
        projectDetails: "Need a high-octane 60-second teaser for upcoming product unveil.",
        timeline: "Within 4 weeks",
        status: "NEW"
      }
    }).catch(() => null);

    // 7. Seed initial activity logs
    const existingActivitiesCount = await prisma.activityLog.count();
    if (existingActivitiesCount === 0) {
      await prisma.activityLog.createMany({
        data: [
          {
            action: "CLIENT_INVITED",
            entityType: "CLIENT",
            entityId: sampleClient.id,
            description: "Invited Acme Corp (john@acme.com) to Client Portal workspace.",
            actorName: "System Administrator"
          },
          {
            action: "PROJECT_CREATED",
            entityType: "PROJECT",
            entityId: sampleProject.id,
            description: 'Created new project "Acme Brand Anthem 2026" assigned to Acme Corp.',
            actorName: "Script2Scale Owner"
          },
          {
            action: "INQUIRY_CREATED",
            entityType: "INQUIRY",
            description: "New inquiry submitted by Alex Rivera (Horizon Labs) for Video Editing & Thumbnails.",
            actorName: "Public Website Form"
          }
        ]
      });
    }

    console.log("Database seeded successfully with test credentials:");
    console.log("--------------------------------------------------");
    console.log("OWNER Admin: owner@script2scale.com | Password: Password123!");
    console.log("CLIENT User: john@acme.com          | Password: Password123!");
  } catch (err: any) {
    console.warn("Database connection notice during seed:", err?.message || err);
    console.log("Proceeding with in-memory / fallback data mode.");
  }
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
