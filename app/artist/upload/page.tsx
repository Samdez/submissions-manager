import { getArtist } from "@/prisma/queries/artist";
import UploadComponent from "./UploadComponent";
import { auth } from "@clerk/nextjs/server";
import { getLabels } from "@/prisma/queries/label";

async function UploadPage() {
  const { userId } = auth();
  if (!userId) throw new Error("Error authenticating user");

  const artist = await getArtist(userId);
  const labels = await getLabels();

  return (
    <div className="flex items-center justify-center p-24">
      <UploadComponent labels={labels} />
    </div>
  );
}

export default UploadPage;
