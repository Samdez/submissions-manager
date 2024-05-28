import { Prisma } from "@prisma/client";
import { prisma } from "./client";

export async function getTracks(userId: string) {
  const tracks = await prisma.track.findMany({
    include: { album: true },
    where: { Artist: { clerkId: userId } },
  });
  return tracks;
}

export async function getTrack(
  trackId: number,
  visibility: "ALL" | "LABEL_MEMBERS",
) {
  const track = await prisma.track.findFirst({
    where: { id: trackId },
    include: {
      album: true,
      Comments: { include: { author: true }, where: { visibility } },
    },
  });
  return track;
}

export async function insertTrack(trackData: Prisma.TrackCreateInput) {
  const createdTrack = await prisma.track.create({ data: trackData });
  return createdTrack;
}

export async function createUser({
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
