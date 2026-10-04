"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteFile } from "@/actions/file.actions";

export type FileCardProps = {
  coverImageURL: string;
  title: string;
  description: string;
  fileId: string;
  downloads: number;
};

export default function FileCard({
  coverImageURL,
  title,
  description,
  fileId,
  downloads,
}: FileCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getDownloadsText = (count: number) => {
    if (count === 0) return "No downloads";
    if (count === 1) return "1 download";
    return `${count} downloads`;
  };

  const handleShare = async () => {
    try {
      const shareLink = `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/file/${fileId}`;
      await navigator.clipboard.writeText(shareLink);
      setToastMessage("Link copied to clipboard!");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (error) {
      setToastMessage("Failed to copy link");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteFile(fileId);
      if (!result.success) {
        setToastMessage(result.error || "Failed to delete file");
        setTimeout(() => setToastMessage(null), 3000);
      }
      // If success, the page is revalidated in the server action and the UI will update
    } catch (error) {
      setToastMessage("An error occurred");
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md">
      {toastMessage && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded shadow-lg z-10 transition-opacity">
          {toastMessage}
        </div>
      )}

      <div className="relative h-40 w-full bg-gray-100 overflow-hidden">
        {coverImageURL ? (
          <Image
            src={coverImageURL}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate" title={title}>
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-grow">
          {description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">
            {getDownloadsText(downloads)}
          </span>

          <div className="flex space-x-2">
            <button
              onClick={handleShare}
              className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium transition-colors"
            >
              Share
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
