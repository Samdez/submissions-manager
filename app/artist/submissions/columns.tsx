"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type Track = {
	id: string;
	title: string;
	status: "pending" | "accepted" | "rejected";
	album: string;
	albumId: string;
};

export const columns: ColumnDef<Track>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => (
			<Link href={`/artist/submissions/${row.original.id}`}>
				<div className="w-full">{row.original.title}</div>
			</Link>
		),
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "album",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Album <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<Link href={`artist/albums/${row.original.albumId}`}>
				<div className="w-full">
					toot
					{row.original.album}
				</div>
			</Link>
		),
	},
	{
		accessorKey: "date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Date <ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
];
