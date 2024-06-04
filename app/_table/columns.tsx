"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Album, Label, Track } from "@prisma/client";

type TrackInput = Track & { Album: Album | null; Labels: Label[] };
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
  columnHelper.accessor("Labels.name", {
    id: "labelName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Label <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-full">
        {row.original.Labels.map(
          (label, i) =>
            `${label.name} ${i < row.original.Labels.length - 1 ? "/" : ""}`,
        )}
      </div>
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
  columnHelper.accessor("Album.title", {
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
      return row.original.Album ? (
        <Link href={`artist/albums/${row.original.Album.title}`}>
          <div className="w-full">{row.original.Album.title}</div>
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
