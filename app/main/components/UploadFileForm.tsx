<<<<<<< HEAD
// UploadFileForm — placeholder.
// Replace this with the real upload form implementation.
export default function UploadFileForm() {
  return null;
=======
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { UploadFileFormData, uploadFileFormSchema } from "@/app/main/validations/upload";
import { createFile } from "@/actions/file.actions";

type UploadedFileData = {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  uploadedBy: string;
};

import { UploadButton } from "@/lib/uploadthing";

export default function UploadFileForm() {
  const router = useRouter();
  const { user } = useUser();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<UploadedFileData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFileData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFileFormData>({
    resolver: zodResolver(uploadFileFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: UploadFileFormData) => {
    if (!coverImage) {
      alert("Error: Please upload a cover image.");
      return;
    }
    
    if (!uploadedFile) {
      alert("Error: Please upload a file.");
      return;
    }
    
    if (!user) {
      alert("Error: You must be logged in to upload files.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createFile({
        title: data.title,
        description: data.description,
        coverImageURL: coverImage.fileUrl,
        fileURL: uploadedFile.fileUrl,
        fileName: uploadedFile.fileName,
        fileSize: uploadedFile.fileSize,
        clerkUserId: user.id,
      });

      if (result.success) {
        alert("Success: File uploaded successfully!");
        router.push("/main/files");
      } else {
        alert(`Error: ${result.error}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("Error: An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6 border rounded-lg shadow-sm bg-white">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter file title"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter file description"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      {/* Cover Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image Upload</label>
        <div className="border border-dashed border-gray-300 rounded-md p-4 bg-gray-50 flex flex-col items-center justify-center">
          <UploadButton
            endpoint="fileUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]) {
                setCoverImage({
                  fileUrl: res[0].url,
                  fileName: res[0].name,
                  fileSize: res[0].size,
                  uploadedBy: user?.id || "unknown",
                });
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          {coverImage && <span className="text-sm text-green-600 mt-2 font-medium">Cover image selected!</span>}
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">File Upload</label>
        <div className="border border-dashed border-gray-300 rounded-md p-4 bg-gray-50 flex flex-col items-center justify-center">
          <UploadButton
            endpoint="fileUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]) {
                setUploadedFile({
                  fileUrl: res[0].url,
                  fileName: res[0].name,
                  fileSize: res[0].size,
                  uploadedBy: user?.id || "unknown",
                });
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          {uploadedFile && <span className="text-sm text-green-600 mt-2 font-medium">File selected!</span>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
>>>>>>> 0f15419 ( hub v2)
}
