import { Track, columns } from "./columns";
import { DataTable } from "./data-table";

export const tracks: Track[] = Array(20).fill({
	id: "728ed52f",
	status: "pending",
	album: "Album 1",
	title: "Title 1",
	date: "22-05-23",
	albumId: "123",
});

function SubmissionsPage() {
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={tracks} />
		</div>
	);
}

export default SubmissionsPage;
