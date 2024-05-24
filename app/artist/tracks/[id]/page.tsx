import { getTrack } from "@/prisma/queries";

async function TrackPage({ params }: { params: { id: string } }) {
  const track = await getTrack(+params.id);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1>{track?.title}</h1>
      <p>Album: {track?.album?.title ?? "No album found for this track"}</p>
      <p>Status: {track?.status}</p>
      <audio controls src={track?.url} />
    </div>
  );
}

export default TrackPage;
