import { getLabelMember } from "@/prisma/queries/labelMember";
import { columns } from "../_table/columns";
import { DataTable } from "../components/data-table";
import { auth } from "@clerk/nextjs/server";
import { getTracksByLabel } from "@/prisma/queries/track";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function SubmissionsPage() {
  const { userId } = auth();
  if (!userId) throw new Error("Error authenticating user");

  const labelMember = await getLabelMember(userId);
  if (!labelMember?.Label) {
    return (
      <Link href={"/label/create"}>
        <Button>Create a new team</Button>
      </Link>
    );
  }

  const tracks = await getTracksByLabel(labelMember.Label.id);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tracks} />
    </div>
  );
}

export default SubmissionsPage;
