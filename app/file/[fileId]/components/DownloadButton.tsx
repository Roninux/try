"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { incrementDownload } from "@/actions/file.actions";

export type DownloadButtonProps = {
  fileURL: string;
  fileName: string;
  fileId: string;
};

export default function DownloadButton({
  fileURL,
  fileName,
  fileId,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setToast(null);
    try {
      const response = await fetch(fileURL);
      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      
      window.URL.revokeObjectURL(url);

      const incrementResult = await incrementDownload(fileId);
      if (incrementResult.success) {
        setToast({ message: "Download successful!", type: "success" });
      } else {
        console.error("Failed to increment download count:", incrementResult.error);
        setToast({ message: "Download started, but failed to update stats.", type: "error" });
      }
    } catch (error) {
      console.error("Download error:", error);
      setToast({ message: "Failed to download file.", type: "error" });
    } finally {
      setIsDownloading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="relative w-full">
      {toast && (
        <div
          className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded text-sm text-white shadow-md z-10 whitespace-nowrap ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full bg-[#6c47ff] hover:bg-[#5b3ae0] text-white"
      >
        {isDownloading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Downloading...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Download File
          </>
        )}
      </Button>
    </div>
  );
}
