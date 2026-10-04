import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "@/actions/user.actions";
import { getFiles } from "@/actions/file.actions";
import FileCard from "../components/FileCard";
import Link from "next/link";

export default async function FilesPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  const dbUser = await getUser(clerkUser.id);

  if (!dbUser) {
    redirect("/sign-in");
  }

  const result = await getFiles(clerkUser.id);

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch files.");
  }

  const files = result.files ?? [];

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Files</h1>
        <Link 
          href="/main"
          className="bg-[#6c47ff] hover:bg-[#5b3ae0] text-white px-4 py-2 rounded-md font-medium transition-colors text-sm"
        >
          Upload New File
        </Link>
      </div>

      {files.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No files uploaded yet</h3>
          <p className="text-gray-500 mb-6">
            Get started by uploading your first file to share with others.
          </p>
          <Link
            href="/main"
            className="bg-[#6c47ff] text-white px-6 py-2 rounded-md font-medium hover:bg-[#5b3ae0] transition-colors"
          >
            Upload a File
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {files.map((file) => (
            <FileCard
              key={file.id}
              fileId={file.id}
              title={file.title}
              description={file.description}
              coverImageURL={file.coverImageURL}
              downloads={file.downloads || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
