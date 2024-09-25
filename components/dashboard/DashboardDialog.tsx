import React from "react";
import NewAdmin from "./NewAdmin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { closeDialog } from "@/store/slices/dialogSlice";
import EditAdmin from "./EditAdmin";

const DashboardDialog: React.FC = () => {
  const dispatch = useDispatch();
  const dialogState = useSelector((state: RootState) => state.dialog);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-base-300 rounded-lg shadow-lg p-6 z-10 max-w-md w-full">
        <button
          className="absolute top-2 right-2  text-white text-3xl font-semibold "
          onClick={() => dispatch(closeDialog())}
        >
          &times;
        </button>

        {dialogState.dialogType === "newadmin" && <NewAdmin />}
        {dialogState.dialogType === "edit" && <EditAdmin />}
      </div>
    </div>
  );
};

export default DashboardDialog;
