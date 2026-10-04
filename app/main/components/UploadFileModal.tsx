"use client";

<<<<<<< HEAD
import { Upload } from "lucide-react";
=======
import { UploadCloud } from "lucide-react";
>>>>>>> 0f15419 ( hub v2)
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
<<<<<<< HEAD
import UploadFileForm from "@/app/main/components/UploadFileForm";

// UploadFileModal
// Renders the hero section of the /main page with a dialog-based upload flow.
export default function UploadFileModal() {
  return (
    <section
      style={{
        minHeight: "calc(100vh - 128px)", // subtract navbar + footer
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        animation: "fadeIn 0.4s ease both",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.25,
          }}
        >
          Upload your files
        </h1>

        {/* Description */}
        <p style={{ fontSize: "0.9375rem", color: "#6b7280", maxWidth: "360px" }}>
          Share any file instantly with a public link — no account required for
          your recipients.
        </p>

        {/* Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              style={{
                marginTop: "0.5rem",
                height: "2.75rem",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                borderRadius: "0.5rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Upload size={18} />
              Upload File
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload a file</DialogTitle>
              <DialogDescription>
                Choose a file to upload. Once uploaded, you&apos;ll receive a
                shareable public link.
              </DialogDescription>
            </DialogHeader>

            {/* UploadFileForm will handle the actual upload logic */}
            <UploadFileForm />
=======
// @ts-ignore - Component to be implemented later
import UploadFileForm from "./UploadFileForm";

export default function UploadFileModal() {
  return (
    <section className="min-h-[60vh] w-full flex flex-col items-center justify-center px-4 py-12 animate-in fade-in duration-500">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Upload Your Files
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Securely upload your files and share them easily with anyone using a public link.
          </p>
        </div>

        <Dialog>
          <DialogTrigger
            render={
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <UploadCloud className="w-6 h-6" />
                Upload File
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Upload File</DialogTitle>
              <DialogDescription>
                Choose a file to upload to your FileHub storage.
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              <UploadFileForm />
            </div>
>>>>>>> 0f15419 ( hub v2)
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
