import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ArtistPage() {
  return (
    <div className="flex w-full items-center justify-evenly p-24">
      <Link href={"/artist/submissions"}>
        <Card className="flex h-64 w-64 items-center justify-center bg-indigo-700 text-white transition-colors hover:bg-white hover:text-indigo-700">
          <CardTitle>My tracks</CardTitle>
        </Card>
      </Link>
      <Link href={"/artist/upload"}>
        <Card className="flex h-64 w-64 items-center justify-center bg-indigo-700 text-white transition-colors hover:bg-white hover:text-indigo-700">
          <CardTitle>Upload</CardTitle>
        </Card>
      </Link>
    </div>
  );
}
