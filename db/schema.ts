import { relations } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const tracks = sqliteTable("tracks", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  albumId: integer("album_id"),
});

export const tracksRelations = relations(tracks, ({ one }) => ({
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),
}));

export const albums = sqliteTable("albums", {
  id: integer("id"),
  title: text("title").notNull(),
});
export const albumssRelations = relations(albums, ({ many }) => ({
  tracks: many(tracks),
}));

export const artists = sqliteTable("artists", {
  id: integer("id"),
  name: text("name").notNull(),
});

export const artistsRelations = relations(artists, ({ many }) => ({
  artistsToAlbums: many(artistsToAlbums),
}));

export const artistsToAlbums = sqliteTable(
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
