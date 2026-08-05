import React, { useEffect, useState, useContext } from "react";
import { getContact } from "../Api/api";
import { SearchContext } from "../../searchContext";
import "./ConnectForm.css"; // SAME CSS USE koro

const ContactForm = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 GET GLOBAL SEARCH TEXT
  const { query } = useContext(SearchContext);

  const fetchData = async () => {
    try {
      const res = await getContact();
      setContacts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading contacts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <h3 className="loading-text">Loading...</h3>;

  // 🔥 SEARCH FILTER EXACTLY LIKE CONNECT FORM
  const filtered = contacts.filter((item) => {
    const q = query.toLowerCase();

    return (
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.website.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q)
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
              <th>Phone</th>
              <th>Website</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.website}</td>
                <td>{item.message}</td>
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

export default ContactForm;
