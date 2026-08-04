import React, { useEffect, useState } from "react";
import { getNewsletterSubscribers } from "../Api/api";

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      const res = await getNewsletterSubscribers();
      setSubscribers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Subscribed At</th>
          </tr>
        </thead>

        <tbody>
          {subscribers.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.email}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Newsletter;