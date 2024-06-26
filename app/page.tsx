import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full items-center justify-evenly p-24">
      <Link href={"/artist"}>
        <Card className="flex h-64 w-64 items-center justify-center bg-indigo-700 text-white transition-colors hover:bg-white hover:text-indigo-700">
          <CardTitle>Artist</CardTitle>
        </Card>
      </Link>
      <Link href={"/label"}>
        <Card className="flex h-64 w-64 items-center justify-center bg-indigo-700 text-white transition-colors hover:bg-white hover:text-indigo-700">
          <CardTitle>Label</CardTitle>
        </Card>
      </Link>
    </div>
  );
}
