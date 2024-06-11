import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { getTrack } from "@/prisma/queries/track";
import { auth } from "@clerk/nextjs/server";
import CommentSection from "@/app/components/CommentSection";
import ReviewSection from "@/app/components/ReviewSection";
import { getLabelMember } from "@/prisma/queries/labelMember";

async function TrackPage({ params }: { params: { id: string } }) {
  const user = auth();
  if (!user.userId) {
    throw new Error("No id for this user");
  }
  const userFromDb = await getLabelMember(user.userId);
  if (!userFromDb?.id) {
    throw new Error("No id for this user");
  }
  const track = await getTrack(+params.id, "ALL");
  if (!track) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <h1>{track?.title}</h1>
      <p>Album: {track?.Album?.title ?? "No album found for this track"}</p>
      <p>Status: {track?.status}</p>
      <audio controls src={track?.url} />
      <a href={track.url} download>
        <Download />
      </a>
      <ReviewSection
        reviews={track.Reviews}
        userId={userFromDb?.id}
        trackId={track.id}
      />
      <CommentSection
        pathToRevalidate={params.id}
        trackId={track.id}
        userClerkId={user.userId || ""}
        comments={track.Comments}
      />

      {/* {track?.Comments.map((comment) => (
        <div key={comment.id} className="w-full">
          <div className="flex justify-between">
            <span>{comment.author.userName}</span>
            <span>{comment.date}</span>
          </div>
          <div className="w-full rounded-xl bg-indigo-700 px-4 py-2 text-white">
            {comment.text}
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default TrackPage;
