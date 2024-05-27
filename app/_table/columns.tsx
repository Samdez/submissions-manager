"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Album, Track } from "@prisma/client";

type TrackInput = Track & { album: Album | null };
const columnHelper = createColumnHelper<TrackInput>();

export const columns = [
  columnHelper.accessor("title", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Title <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link href={`/tracks/${row.original.id}`}>
        <div className="w-full">{row.original.title}</div>
      </Link>
    ),
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Status <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("album.title", {
    id: "albumTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Album <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.album ? (
        <Link href={`artist/albums/${row.original.album.title}`}>
          <div className="w-full">{row.original.album.title}</div>
        </Link>
      ) : null;
    },
  }),
  columnHelper.accessor("submissionDate", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
];
