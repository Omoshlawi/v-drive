"use client";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import React, { useRef, useState } from "react";
import { default as DropzoneComponent, DropzoneRef } from "react-dropzone";
import { usePathname, useRouter } from "next/navigation";
import getSupabaseInstance from "../supabase";

const Dropzone = () => {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const pathName = usePathname();
  const { refresh } = useRouter();
  const supabase = getSupabaseInstance();
  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("File reading was aborded");
      reader.onerror = () => console.log("File reading had failed");

      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading || !user) return;
    setLoading(true);

    // upload image

    const { data, error } = await supabase.storage
      .from("files")
      .upload(`public/${user.id}/${selectedFile.name}`, selectedFile);
    if (error) {
      alert(error.message);
    }
    if (data) {
      // Use the JS library to download a file.

      //   const { data: fileDownloadUrl, error: downloadUrlError } =
      //     await supabase.storage.from("files").download(data.path);
      const publicUrl = supabase.storage.from("files").getPublicUrl(data.path);
      const { error } = await supabase.from("files").insert({
        fileUrl: publicUrl.data.publicUrl,
        size: selectedFile.size,
        user: user.id,
        type: selectedFile.type,
        name: selectedFile.name,
      });
      if (!error) {
        // if succesfful gve succes feedback
        refresh();
      }
    }

    setLoading(false);
  };

  // max file size is 20 mb
  const maxSize = 20971520;
  return (
    <DropzoneComponent onDrop={onDrop} minSize={0} maxSize={maxSize}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFiletooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 justify-center p-5 items-center border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-blue-950 text-white animate-pulse "
                  : "bg-slate-100/50 dark:bg-slate-100/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop file to upload"}
              {isDragActive && !isDragReject && "Drop to upload ths file"}
              {isDragReject && "File type not accepted"}
              {isFiletooLarge && (
                <div className="text-danger mt-2">File is too larg</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
};

export default Dropzone;
