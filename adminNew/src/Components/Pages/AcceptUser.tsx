import { useEffect, useState } from "react";
import { UserCheck, Image as ImageIcon } from "@phosphor-icons/react";
import { getUsersByStatusAPI } from "../Api/userapi";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
  status?: string;
}

export const AcceptUser = () => {
  const [users, setUsers] = useState<User[]>([]);

 const fetchUsers = async () => {
  try {
    const res = await getUsersByStatusAPI("approved");
    setUsers(res.data.data);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full px-4 py-6">
      <div className="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 border-collapse">
            <thead className="bg-[#ffbe31] text-black font-semibold">
              <tr>
                <th scope="col" className="px-6 py-4">#</th>
                <th scope="col" className="px-6 py-4">Profile</th>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Email</th>
                <th scope="col" className="px-6 py-4">Role</th>
                <th scope="col" className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <UserCheck size={40} className="text-gray-400" />
                      <p className="text-base font-medium">No Approved Users Found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-500">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt={user.name}
                          className="h-14 w-14 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 border border-gray-200">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 capitalize text-gray-600">
                      {user.role?.replace("_", " ")}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <UserCheck size={14} weight="bold" />
                        Approved
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};