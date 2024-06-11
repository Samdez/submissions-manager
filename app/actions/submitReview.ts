"use server";

import { prisma } from "@/prisma/client";
import { z } from "zod";
import { createServerAction } from "zsa";

export const submitReview = createServerAction()
  .input(
    z.object({
      isApproved: z.boolean(),
      trackId: z.number(),
      userId: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    await prisma.review.upsert({
      where: {
        reviewId: {
          trackId: input.trackId,
          labelMemberId: input.userId,
        },
      },
      create: {
        isApproved: input.isApproved,
        trackId: input.trackId,
        labelMemberId: input.userId,
      },
      update: {
        isApproved: input.isApproved,
      },
    });
  });
