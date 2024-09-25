import { AdminDashboard, OwnerDashboard } from "@/types";
import React from "react";

const Admin: React.FC<{ owner: OwnerDashboard }> = ({ owner }) => {
  return (
    <>
      <th scope="row" className="px-6 py-4 font-medium text-white ">
        {owner.email}
      </th>
      <td className="px-6 py-4">{owner.username}</td>
      <td className="px-6 py-4">{owner.id}</td>
      <td className="px-6 py-4">{new Date(owner.createdAt).toDateString()}</td>
      <td className="px-6 py-4">
        {owner.updatedAt ? new Date(owner.updatedAt).toDateString() : null}
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
