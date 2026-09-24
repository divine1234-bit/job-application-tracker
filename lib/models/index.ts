import BoardModel from "./board";
import ColumnModel from "./column";
import JobApplicationModel from "./job-application";

// Keep these as value imports so every referenced model is registered with
// Mongoose before any populate() call runs, including during Fast Refresh.
export const Board = BoardModel;
export const Column = ColumnModel;
export const JobApplication = JobApplicationModel;
