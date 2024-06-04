import { prisma } from "../client";

export async function getArtist(artistClerkId: string) {
  const user = await prisma.artist.findFirst({
    where: { clerkId: artistClerkId },
    include: { Labels: true },
  });
  return user;
}

export async function createArtist({
  clerkId,
  email,
  firstName,
  lastName,
  userName,
}: {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}) {
  const createdUser = await prisma.artist.create({
    data: { clerkId, email, firstName, lastName, userName },
  });
  return createdUser;
}
