import { getTracks } from "@/prisma/queries";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function SubmissionsPage() {
  const tracks = await getTracks();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tracks} />
    </div>
  );
}

export default SubmissionsPage;
