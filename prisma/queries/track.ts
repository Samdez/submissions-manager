import { Prisma } from "@prisma/client";
import { prisma } from "../client";

export async function getTrack(
  trackId: number,
  visibility: "ALL" | "LABEL_MEMBERS",
) {
  try {
    const track = await prisma.track.findFirst({
      where: { id: trackId },
      include: {
        Album: true,
        Comments: { include: { author: true }, where: { visibility } },
        Reviews: { include: { LabelMember: true } },
      },
    });
    return track;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function getTracksByArtist(userId: string) {
  const tracks = await prisma.track.findMany({
    include: { Album: true, Labels: true },
    where: { Artist: { clerkId: userId } },
  });
  return tracks;
}

export async function getTracksByLabel(labelId: number) {
  const tracks = await prisma.track.findMany({
    include: { Album: true, Labels: true },
    where: { Labels: { some: { id: labelId } } },
  });
  return tracks;
}

export async function insertTrack(trackData: Prisma.TrackCreateInput) {
  const createdTrack = await prisma.track.create({ data: trackData });
  return createdTrack;
}
