import { prisma } from "../client";

export async function getLabels() {
  return prisma.label.findMany();
}

export async function createLabel({
  clerkId,
  name,
}: {
  clerkId: string;
  name: string;
}) {
  const createdUser = await prisma.label.create({
    data: {
      clerkId,
      name,
    },
  });
  return createdUser;
}
