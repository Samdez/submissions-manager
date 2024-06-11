"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { LabelMember, Review } from "@prisma/client";
import { cn } from "@/lib/utils";
import { submitReview } from "../actions/submitReview";
import { useServerAction } from "zsa-react";

function ReviewSection({
  reviews,
  userId,
  trackId,
}: {
  reviews: (Review & { LabelMember: LabelMember })[];
  userId: number;
  trackId: number;
}) {
  const userReview = reviews?.find((r) => r.LabelMember.id === userId);
  const [isApproved, setIsApproved] = useState(userReview?.isApproved);
  const { execute } = useServerAction(submitReview);

  return (
    <div className="flex w-full justify-evenly">
      <Check
        className={cn(
          "h-12 w-12 cursor-pointer rounded-full border-2 p-2 transition-all hover:bg-primary hover:text-secondary",
          { "bg-primary text-secondary": isApproved },
        )}
        onClick={async () => {
          execute({ isApproved: true, trackId, userId });
          setIsApproved(true);
        }}
      />
      <X
        className={cn(
          "h-12 w-12 cursor-pointer rounded-full border-2 p-2 transition-all hover:bg-primary hover:text-secondary",
          { "bg-primary text-secondary": isApproved === false },
        )}
        onClick={async () => {
          execute({ isApproved: false, trackId, userId });
          setIsApproved(false);
        }}
      />
    </div>
  );
}

export default ReviewSection;
