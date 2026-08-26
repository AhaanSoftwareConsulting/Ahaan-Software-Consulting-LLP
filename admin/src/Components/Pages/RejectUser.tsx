import { useState, useEffect } from "react";
import { X, Image as ImageIcon } from "@phosphor-icons/react";
import { getUsersByStatusAPI } from "../Api/userapi";

// Matches the flat row shape returned by approval.repository.js -> getAllRequests()
interface ApprovalRequest {
  request_id: string;
  status: string;
  requested_at: string;
  reviewed_at?: string;
  reject_reason?: string | null;
  user_id: string;
  email: string;
  full_name: string;
  role: string;
  reviewed_by_email?: string;
  reviewed_by_name?: string;
}

export const RejectUser = () => {
  const [requests, setRequests] = useState<ApprovalRequest[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await getUsersByStatusAPI("rejected");
      setRequests(res.data.data);
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
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <X size={40} className="text-gray-400" />
                      <p className="text-base font-medium">No Rejected Users Found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                requests.map((req, index) => (
                  <tr key={req.request_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 border border-gray-200">
                        <ImageIcon size={24} />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {req.full_name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {req.email}
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-600">
                      {req.role?.replace("_", " ")}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        <X size={14} weight="bold" />
                        Rejected
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
