"use client";
import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";
import { FileType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { fileExtensionsColors } from "@/lib/constants";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "name",
    header: "FileName",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "fileUrl",
    header: "URL",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          href={renderValue() as string}
          target="_blank"
          className="underline text-blue-500 hover:text-blue-600"
        >
          Download
        </a>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const ext = type.split("/").pop() as string;

      return (
        <div className="w-10">
          <FileIcon
            extension={ext as DefaultExtensionType} // Ensure the extension is of type DefaultExtensionType
            {...defaultStyles[ext as DefaultExtensionType]}
            labelColor={fileExtensionsColors[ext]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
  },
];
