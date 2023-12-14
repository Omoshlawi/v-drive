import React from "react";
import { Button } from "../ui/button";
import { FileType } from "@/lib/types";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

interface TableWrapperProps {
  skeletonFiles: FileType[];
}

const TableWrapper: React.FC<TableWrapperProps> = ({ skeletonFiles }) => {
  return (
    <div>
      <Button className="mb-5">Sort by ...</Button>
      <DataTable columns={columns} data={skeletonFiles} />
    </div>
  );
};

export default TableWrapper;
