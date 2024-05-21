import { getTracks } from "@/db/queries";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { log } from "console";

async function SubmissionsPage() {
  const tracks = await getTracks();
  console.log("🚀 ~ SubmissionsPage ~ tracks:", tracks);
  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={tracks} /> */}
    </div>
  );
}

export default SubmissionsPage;
