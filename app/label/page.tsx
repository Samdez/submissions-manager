import { getTracks } from "@/prisma/queries";
import { columns } from "../_table/columns";
import { DataTable } from "../components/data-table";

async function SubmissionsPage() {
  const tracks = await getTracks();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tracks} />
    </div>
  );
}

export default SubmissionsPage;
