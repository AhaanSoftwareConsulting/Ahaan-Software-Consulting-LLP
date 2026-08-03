import React from "react";
import { useEffect, useState } from "react";
import { getUsersByStatusAPI, approveUserAPI, rejectUserAPI } from "../Api/api";
import { toast } from "react-toastify";

const PendingUsers = () => {
  const [users, setUsers] = useState([]);

  const approveUser = async (id) => {
    try {
      await approveUserAPI(id);

      toast.success("User Approved Successfully");

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectUser = async (id) => {
    try {
      await rejectUserAPI(id);

      toast.error("User Rejected Successfully");

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

const fetchUsers = async () => {
  try {
    const res = await getUsersByStatusAPI("pending");

    console.log(res.data);

    setUsers(res.data.users);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm border-0">

        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead
              style={{
                background: "#ffbe31",
                color: "#000",
              }}
            >
              <tr>
                <th>#</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    No Pending Users Found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        width="55"
                        height="55"
                        style={{
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td className="text-capitalize">
                      {user.role.replace("_", " ")}
                    </td>

                    <td>
                      <span className="badge bg-warning text-dark">
                        {user.status}
                      </span>
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => approveUser(user._id)}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rejectUser(user._id)}
                      >
                        Reject
                      </button>
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

export default PendingUsers;
