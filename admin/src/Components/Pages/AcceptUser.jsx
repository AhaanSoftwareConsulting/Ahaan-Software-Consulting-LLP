import React, { useEffect, useState } from "react";
import { getUsersByStatusAPI } from "../Api/api";

const AcceptUser = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await getUsersByStatusAPI("approved");
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
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
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    No Approved Users Found
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
                      <span className="badge bg-success">
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

export default AcceptUser;