import { AdminDashboard } from "@/types";
import React from "react";

const Admin: React.FC<{ admin: AdminDashboard }> = ({ admin }) => {
  return (
    <>
      <th scope="row" className="px-6 py-4 font-medium text-white ">
        {admin.email}
      </th>
      <td className="px-6 py-4">{admin.username}</td>
      <td className="px-6 py-4">{admin.id}</td>
      <td className="px-6 py-4">{new Date(admin.createdAt).toDateString()}</td>
      <td className="px-6 py-4">
        {admin.updatedAt ? new Date(admin.updatedAt).toDateString() : null}
      </td>
      <td className="px-6 py-4 text-right">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td>
    </>
  );
};

export default Admin;
