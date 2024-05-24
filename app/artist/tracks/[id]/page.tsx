import { getTrack } from "@/prisma/queries";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";

async function TrackPage({ params }: { params: { id: string } }) {
  const track = await getTrack(+params.id, "ALL");
  if (!track) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <h1>{track?.title}</h1>
      <p>Album: {track?.album?.title ?? "No album found for this track"}</p>
      <p>Status: {track?.status}</p>
      <audio controls src={track?.url} />
      <a href={track.url} download>
        <Download />
      </a>
      {track?.Comments.map((comment) => (
        <div key={comment.id} className="w-full">
          <div className="flex justify-between">
            <span>{comment.author.name}</span>
            <span>{comment.date}</span>
          </div>
          <div className="w-full rounded-xl bg-indigo-700 px-4 py-2 text-white">
            {comment.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrackPage;
