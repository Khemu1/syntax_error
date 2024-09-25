import { AdminDashboard } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  isDialogOpen: boolean; // Determines if the dialog is open or closed
  dialogType: "edit" | "newadmin" | ""; // Type of the dialog
  editContent: AdminDashboard | null; // Data for editing an admin
}

const initialState: DialogState = {
  isDialogOpen: false,
  dialogType: "",
  editContent: null,
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
      state.dialogType = "newadmin";
      state.editContent = null;
    },
    closeDialog(state) {
      state.isDialogOpen = false;
      state.dialogType = "";
      state.editContent = null;
    },
  },
});

export const { openEditDialog, openNewAdminDialog, closeDialog } =
  dialogSlice.actions;

export default dialogSlice.reducer;
