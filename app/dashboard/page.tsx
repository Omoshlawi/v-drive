import { auth } from "@clerk/nextjs";
import React from "react";
import Dropzone from "../components/Dropzone";
import supabase from "../supabase";
import { FileType } from "@/lib/types";
import TableWrapper from "../components/table/TableWrapper";

const DashboardPage = async () => {
  const { data, error } = await supabase.from("files").select();
  const files: FileType[] | null = data;
  return (
    <div>
      <Dropzone />
      <section className="container space-y-5">
        <h2>All files</h2>
        {files && <TableWrapper skeletonFiles={files} />}
      </section>
    </div>
  );
};

export default DashboardPage;
