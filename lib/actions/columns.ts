"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column, JobApplication } from "../models";

export async function deleteColumn(columnId: string, boardId: string) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDB();

  const board = await Board.findOne({
    _id: boardId,
    userId: session.user.id,
  });

  if (!board) {
    return { error: "Board not found" };
  }

  const column = await Column.findOne({
    _id: columnId,
    boardId: board._id,
  });

  if (!column) {
    return { error: "Column not found" };
  }

  const jobCount = await JobApplication.countDocuments({ columnId });

  if (jobCount > 0) {
    return {
      error: "Move or delete the jobs in this column before deleting it.",
    };
  }

  await Column.deleteOne({ _id: columnId });
  await Board.updateOne(
    { _id: board._id },
    { $pull: { columns: column._id } }
  );

  revalidatePath("/dashboard");

  return { success: true };
}
