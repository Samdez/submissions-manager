CREATE TABLE IF NOT EXISTS "albums" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artists_to_albums" (
	"artist_id" integer NOT NULL,
	"album_id" integer NOT NULL,
	CONSTRAINT "artists_to_albums_artist_id_album_id_pk" PRIMARY KEY("artist_id","album_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tracks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"album_id" integer,
	"status" text DEFAULT 'pending'
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artists_to_albums" ADD CONSTRAINT "artists_to_albums_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artists_to_albums" ADD CONSTRAINT "artists_to_albums_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
