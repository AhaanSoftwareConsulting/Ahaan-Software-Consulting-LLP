import React, { useEffect, useState, useContext } from "react";
import { getForms } from "../Api/api";
import { SearchContext } from "../../searchContext";
import "./ConnectForm.css";

const ConnectForm = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 GET GLOBAL SEARCH TEXT
  const { query } = useContext(SearchContext);

  const fetchData = async () => {
    try {
      const res = await getForms();
      setForms(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading forms:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <h3 className="loading-text">Loading...</h3>;

  // 🔥 FILTER BASED ON TOPBAR SEARCH
  const filtered = forms.filter((item) => {
    const q = query.toLowerCase();

    return (
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.service.toLowerCase().includes(q) ||
      item.budget.toLowerCase().includes(q) ||
      item.projectDetails.toLowerCase().includes(q)
    );
  });

  return (
    <div className="container mt-1 mb-1">
      <div className="table-container">

        <table className="table custom-table align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Service</th>
              <th>Budget</th>
              <th>Project Details</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.service}</td>
                <td>{item.budget}</td>
                <td>{item.projectDetails}</td>
                <td className="timestamp">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ConnectForm;
