"use client";

import { useServerAction } from "zsa-react";
import { Textarea } from "@/components/ui/textarea";
import { submitComment } from "../actions/submitComment";
import { useState } from "react";
import { Comment, LabelMember } from "@prisma/client";

function CommentSection({
  pathToRevalidate,
  trackId,
  userClerkId,
  comments,
}: {
  pathToRevalidate: string;
  trackId: number;
  userClerkId: string;
  comments: (Comment & { author: LabelMember })[];
}) {
  const [text, setText] = useState("");
  const { execute } = useServerAction(submitComment);

  return (
    <>
      <Textarea
        className="w-full"
        placeholder="Write a new comment"
        name="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={async (event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            await execute({ pathToRevalidate, text, trackId, userClerkId });
            setText("");
          }
        }}
      />
      {comments.map((comment) => (
        <div key={comment.id} className="w-full">
          <div className="flex justify-between">
            <span>{comment.author.userName}</span>
            <span>{comment.date}</span>
          </div>
          <div className="w-full rounded-xl bg-indigo-700 px-4 py-2 text-white">
            {comment.text}
          </div>
        </div>
      ))}
    </>
  );
}

export default CommentSection;
