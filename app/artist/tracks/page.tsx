import { getTracks } from "@/prisma/queries";
import { columns } from "../../_table/columns";
import { DataTable } from "../../components/data-table";
import { auth } from "@clerk/nextjs/server";

async function SubmissionsPage() {
  const { userId } = auth();
  if (!userId) throw new Error("User cannot be identified");

  const tracks = await getTracks(userId);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tracks} />
    </div>
  );
}

export default SubmissionsPage;
