import { AdminDashboard } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  isDialogOpen: boolean;
  dialogType: "edit" | "newAdmin" | "editCourse" | "";
  editContent: AdminDashboard | null; // Data for editing an admin
  courseId: number | null;
}

const initialState: DialogState = {
  isDialogOpen: false,
  dialogType: "",
  editContent: null,
  courseId: null,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openEditDialog(state, action: PayloadAction<AdminDashboard>) {
      state.isDialogOpen = true;
      state.dialogType = "edit";
      state.editContent = action.payload;
    },
    openNewAdminDialog(state) {
      state.isDialogOpen = true;
      state.dialogType = "newAdmin";
      state.editContent = null;
    },
    openEditCourseDialog(state, action: PayloadAction<number>) {
      state.isDialogOpen = true;
      state.dialogType = "editCourse";
      state.courseId = action.payload;
    },
    closeDialog(state) {
      state.isDialogOpen = false;
      state.dialogType = "";
      state.editContent = null;
      state.courseId = null;
    },
  },
});

export const {
  openEditDialog,
  openEditCourseDialog,
  openNewAdminDialog,
  closeDialog,
} = dialogSlice.actions;

export default dialogSlice.reducer;
