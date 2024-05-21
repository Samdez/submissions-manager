import { relations } from "drizzle-orm";
import {
  serial,
  text,
  integer,
  primaryKey,
  pgTable,
} from "drizzle-orm/pg-core";

export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  albumId: integer("album_id"),
  status: text("status", { enum: ["accepted", "rejected", "pending"] }).default(
    "pending",
  ),
});

export const tracksRelations = relations(tracks, ({ one }) => ({
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),
}));

export const albums = pgTable("albums", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
});
export const albumssRelations = relations(albums, ({ many }) => ({
  tracks: many(tracks),
}));

export const artists = pgTable("artists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const artistsRelations = relations(artists, ({ many }) => ({
  artistsToAlbums: many(artistsToAlbums),
}));

export const artistsToAlbums = pgTable(
  "artists_to_albums",
  {
    artistId: integer("artist_id")
      .notNull()
      .references(() => artists.id),
    albumId: integer("album_id")
      .notNull()
      .references(() => albums.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.artistId, t.albumId] }),
  }),
);
export const artiststoAlbumsRelation = relations(
  artistsToAlbums,
  ({ one }) => ({
    artist: one(artists, {
      fields: [artistsToAlbums.artistId],
      references: [artists.id],
    }),
    album: one(albums, {
      fields: [artistsToAlbums.albumId],
      references: [albums.id],
    }),
  }),
);
