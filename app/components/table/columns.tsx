"use client";
import { DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";
import { FileType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { fileExtensionsColors } from "@/lib/constants";
import {
  CopyIcon,
  DeleteIcon,
  DownloadIcon,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import Link from "next/link";
import getSupabaseInstance from "@/app/supabase";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<FileType>[] = [
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
    accessorKey: "created_at",
    header: "Created",
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const file = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(file.fileUrl)}
            >
              <span className="flex space-x-4 text-sm items-center">
                <CopyIcon />
                Copy link
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`${file.fileUrl}?download=${file.name}`}
                className="text-yellow-700 flex space-x-4 text-sm items-center"
              >
                <DownloadIcon />
                Download
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                getSupabaseInstance()
                  .storage.from("files")
                  .remove([file.fileUrl])
                  .then(({ data, error }) =>
                    getSupabaseInstance()
                      .from("files")
                      .delete()
                      .eq("fileUrl", file.id)
                  )
                  .then(({ data, count }) => alert("Deleted successfully!"))
                  .catch((err) => alert(err))
              }
            >
              <span className="text-red-700 flex space-x-4 text-sm items-center">
                <TrashIcon />
                Delete
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
