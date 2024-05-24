import { Prisma } from "@prisma/client";
import { prisma } from "./client";

export async function getTracks() {
  const tracks = await prisma.track.findMany({ include: { album: true } });
  return tracks;
}

export async function getTrack(trackId: number) {
  const track = await prisma.track.findFirst({
    where: { id: trackId },
    include: { album: true },
  });
  return track;
}

export async function insertTrack(trackData: Prisma.TrackCreateInput) {
  const createdTrack = await prisma.track.create({ data: trackData });
  return createdTrack;
}
