"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
