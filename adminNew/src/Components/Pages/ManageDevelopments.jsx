import React, { useEffect, useState, useContext } from "react";
import { getAllDevelopmentsAPI, deleteDevelopmentAPI } from "../Api/api";
import { Link } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { SearchContext } from "../../searchContext";
import { toast } from "react-toastify";
import "./ManageDesigns.css";

const ManageDevelopments = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // 🔥 Global Search Context
  const { query } = useContext(SearchContext);

  const loadData = async () => {
    const res = await getAllDevelopmentsAPI();
    setItems(res.data.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔥 Search should filter by title, link and developer
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.link.toLowerCase().includes(query.toLowerCase()) ||
      item.developer?.toLowerCase().includes(query.toLowerCase())
  );

  const handleDeleteConfirm = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
     try {
    const res = await deleteDevelopmentAPI(selectedId);

    setShowModal(false);

    toast.success(
      res.data.message || "Development deleted successfully!"
    );

    loadData();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to delete development!"
    );
  }
  };

  return (
    <div className="container mt-1 mb-3">
      <div className="table-container">
        <Table
          striped
          hover
          responsive
          className="table align-middle text-center"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Link</th>
              <th>Developer</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>

                <td>
                  <img src={item.image} className="blog-thumb" alt="thumb" />
                </td>

                <td>{item.title}</td>

                <td>{item.link}</td>

                <td>
                  <span className="badge-author">
                    {item.developer || "Unknown"}
                  </span>
                </td>

                <td className="action-buttons d-flex gap-2 justify-content-center">
                  <Link to={`/edit-development/${item._id}`}>
                    <Button variant="success" className="icon-btn">
                      <FiEdit />
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    className="icon-btn"
                    onClick={() => handleDeleteConfirm(item._id)}
                  >
                    <FiTrash2 />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Delete Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Development</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This action is permanent. Are you sure you want to delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageDevelopments;
