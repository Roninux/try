import Image from "next/image";
import FileCard from "@/app/main/components/FileCard";
import DownloadButton from "./components/DownloadButton";
import { getFile } from "@/actions/file.actions";

export type FilePageProps = {
  params: Promise<{
    fileId: string;
  }>;
};

export default async function FilePublicPage({ params }: FilePageProps) {
  const { fileId } = await params;

  const result = await getFile(fileId);

  if (!result.success) {
    throw new Error(result.error || "Failed to retrieve file");
  }

  const file = result.file ?? null;

  if (!file) {
    throw new Error("File not found");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg flex flex-col items-center space-y-8 border border-gray-100">
        
        {/* App Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#6c47ff] rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">FileHub</span>
        </div>

        {/* File Card UI - Note: we hide the Share/Delete buttons inside FileCard since it's the public page, or just reuse it as instructed */}
        <div className="w-full pointer-events-none">
          {/* We wrap it in pointer-events-none so public users don't interact with owner buttons if they exist, or we can just render it */}
          <FileCard
            fileId={file.id}
            title={file.title}
            description={file.description}
            coverImageURL={file.coverImageURL}
            downloads={file.downloads}
          />
        </div>

        {/* Download Button */}
        <div className="w-full">
          <DownloadButton fileURL={file.fileURL} fileName={file.title} fileId={file.id} />
        </div>
      </div>
    </div>
  );
}
