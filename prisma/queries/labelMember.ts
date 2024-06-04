import { prisma } from "../client";

export async function getLabelMember(labelMemberClerkId: string) {
  const user = await prisma.labelMember.findFirst({
    where: { clerkId: labelMemberClerkId },
    include: { Label: true },
  });
  return user;
}

export async function createLabelMember({
  labelMemberClerkId,
  email,
  firstName,
  lastName,
  userName,
  labelClerkId,
}: {
  labelMemberClerkId: string;
  labelClerkId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
}) {
  const createdUser = await prisma.labelMember.create({
    data: {
      clerkId: labelMemberClerkId,
      firstName,
      lastName,
      userName,
      email,
      Label: { connect: { clerkId: labelClerkId } },
    },
  });
  return createdUser;
}

// export async function linkLabelMemberToLabel({
//   memberClerkId,
//   labelClerkId,
// }: {
//   memberClerkId: string;
//   labelClerkId: string;
// }) {
//   const res = await createLabelMember({
//     clerkId: memberClerkId,
//     labelClerkId,
//   });
//   // const res = await prisma.labelMember.update({
//   //   where: { clerkId: memberClerkId },
//   //   data: { Label: { connect: { clerkId: labelClerkId } } },
//   // });
//   return res;
// }
