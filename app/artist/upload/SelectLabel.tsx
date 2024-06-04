import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

function SelectLabelComponent({
  labels,
  setLabelId,
}: {
  setLabelId: Dispatch<SetStateAction<string | null>>;
  labels: {
    id: number;
    name: string;
    artistId: number | null;
  }[];
}) {
  return (
    <Select onValueChange={setLabelId}>
      <SelectTrigger className="w-full border-indigo-600">
        <SelectValue placeholder="Select a label" />
      </SelectTrigger>
      <SelectContent>
        {labels.map((label) => (
          <SelectItem value={label.id.toString()} key={label.id}>
            {label.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectLabelComponent;
