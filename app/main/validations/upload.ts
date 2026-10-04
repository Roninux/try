import { z } from "zod";

// ---------------------------------------------------------------------------
// Client-side schema
// Validates the upload form that users fill in on the front end.
// ---------------------------------------------------------------------------
export const uploadFileFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { message: "Title must be at least 5 characters." })
    .max(100, { message: "Title cannot exceed 100 characters." }),

  description: z
    .string()
    .trim()
    .min(50, { message: "Description must be at least 50 characters." })
    .max(500, { message: "Description cannot exceed 500 characters." }),
});

// ---------------------------------------------------------------------------
// Server / database schema
// Extends the client schema with server-only fields validated before
// a file record is written to the database.
// ---------------------------------------------------------------------------
export const createFileSchema = uploadFileFormSchema.extend({
  /** Public URL of the file's cover image. */
  coverImageURL: z.string().url({ message: "coverImageURL must be a valid URL." }),

  /** Public URL of the uploaded file itself. */
  fileURL: z.string().url({ message: "fileURL must be a valid URL." }),

  /** Original file name — must not be empty. */
  fileName: z.string().min(1, { message: "fileName cannot be empty." }),

  /** File size in bytes — must be a positive number. */
  fileSize: z.number().positive({ message: "fileSize must be a positive number." }),

  /** Clerk user ID of the uploader — must not be empty. */
  clerkUserId: z.string().min(1, { message: "clerkUserId cannot be empty." }),
});

// ---------------------------------------------------------------------------
// Exported types
// ---------------------------------------------------------------------------

/** Data shape for the client-side upload form. */
export type UploadFileFormData = z.infer<typeof uploadFileFormSchema>;

/** Data shape used on the server when saving a file to the database. */
export type CreateFileData = z.infer<typeof createFileSchema>;
