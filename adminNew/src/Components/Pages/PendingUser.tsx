import { useEffect, useState } from "react";
import { Check, X, Clock, Image as ImageIcon } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { getPendingUsersAPI, approveUserAPI, rejectUserAPI } from "../Api/userapi";

// Matches the flat row shape returned by approval.repository.js -> getPendingRequests()
interface PendingRequest {
  request_id: string;
  requested_at: string;
  status: string;
  user_id: string;
  email: string;
  full_name: string;
  role: string;
}

export const PendingUser = () => {
  const [requests, setRequests] = useState<PendingRequest[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await getPendingUsersAPI();
      // controller wraps rows in { data, count }
      setRequests(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveUser = async (requestId: string) => {
    try {
      await approveUserAPI(requestId);
      toast.success("User Approved Successfully");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve user");
    }
  };

  const rejectUser = async (requestId: string) => {
    try {
      await rejectUserAPI(requestId);
      toast.error("User Rejected Successfully");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject user");
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
                <th scope="col" className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Clock size={40} className="text-gray-400" />
                      <p className="text-base font-medium">No Pending Users Found</p>
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
                      {/* No profilePicture column exists on users table (per approval.repository.js) */}
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
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 capitalize">
                        <Clock size={14} weight="bold" />
                        {req.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => approveUser(req.request_id)}
                          className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
                        >
                          <Check size={14} weight="bold" />
                          Approve
                        </button>

                        <button
                          type="button"
                          onClick={() => rejectUser(req.request_id)}
                          className="inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
                        >
                          <X size={14} weight="bold" />
                          Reject
                        </button>
                      </div>
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
