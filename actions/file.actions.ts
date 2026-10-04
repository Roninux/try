"use server";

import prisma from "@/lib/prisma";
import { CreateFileData, createFileSchema } from "@/app/main/validations/upload";
import { getUser } from "@/actions/user.actions";
import { revalidatePath } from "next/cache";

export async function createFile(data: CreateFileData) {
  try {
    const validatedData = createFileSchema.safeParse(data);
    
    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.issues[0].message,
      };
    }

    const dbUser = await getUser(validatedData.data.clerkUserId);
    
    if (!dbUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const file = await prisma.file.create({
      data: {
        title: validatedData.data.title,
        description: validatedData.data.description,
        coverImageURL: validatedData.data.coverImageURL,
        fileURL: validatedData.data.fileURL,
        userId: dbUser.id,
      },
    });
    
    revalidatePath("/main/files");

    return {
      success: true,
      file,
    };
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while creating the file.",
    };
  }
}

export async function getFiles(clerkUserId: string) {
  try {
    const dbUser = await getUser(clerkUserId);
    if (!dbUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const files = await prisma.file.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      files,
    };
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while fetching files.",
    };
  }
}

export async function deleteFile(fileId: string) {
  try {
    await prisma.file.delete({
      where: { id: fileId },
    });
    
    revalidatePath("/main/files");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while deleting the file.",
    };
  }
}

export async function getFile(fileId: string) {
  try {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return {
        success: false,
        error: "File not found",
      };
    }

    return {
      success: true,
      file,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get file",
    };
  }
}

export async function incrementDownload(fileId: string) {
  try {
    await prisma.file.update({
      where: { id: fileId },
      data: {
        downloads: {
          increment: 1,
        },
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: `Failed to increment download: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
