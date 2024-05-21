import { eq } from "drizzle-orm";
import { db } from "./client";
import { albums, tracks } from "./schema";

type InsertTrack = typeof tracks.$inferInsert;

export async function insertTrack({ title, url }: InsertTrack) {
  try {
    await db.insert(tracks).values({ title, url });
  } catch (error) {
    throw new Error(`Error while inserting track ${title} in DB`);
  }
}

export async function getTracks() {
  return (
    db
      .select()
      // .select({
      //   id: tracks.id,
      //   title: tracks.title,
      //   status: tracks.status,
      //   url: tracks.url,
      //   albumId: tracks.albumId,
      // })
      .from(tracks)
      .leftJoin(albums, eq(tracks.albumId, albums.id))
  );
}
