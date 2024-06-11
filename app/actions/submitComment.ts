"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";

export const submitComment = createServerAction()
  .input(
    z.object({
      pathToRevalidate: z.string(),
      trackId: z.number(),
      userClerkId: z.string(),
      text: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    await prisma.comment.create({
      data: {
        date: new Date().toISOString(),
        text: input.text,
        visibility: "ALL",
        author: { connect: { clerkId: input.userClerkId } },
        track: { connect: { id: input.trackId } },
      },
    });
    revalidatePath(`tracks/${input.pathToRevalidate}`);
  });
