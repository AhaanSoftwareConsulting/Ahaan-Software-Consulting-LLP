import React, { useEffect, useState, useContext } from "react";
import { getAllDesignsAPI, deleteDesignAPI } from "../Api/api";
import { Link } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { SearchContext } from "../../searchContext";
import { toast } from "react-toastify";
import "./ManageDesigns.css";

const ManageDesigns = () => {
  const [designs, setDesigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { query } = useContext(SearchContext);

  const loadData = async () => {
    const res = await getAllDesignsAPI();
    setDesigns(res.data.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredDesigns = designs.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.link.toLowerCase().includes(query.toLowerCase()) ||
      item.designer?.toLowerCase().includes(query.toLowerCase()),
  );

  const handleDeleteConfirm = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
    const res = await deleteDesignAPI(selectedId);

    setShowModal(false);

    toast.success(
      res.data.message || "Design deleted successfully!"
    );

    loadData();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to delete design!"
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
              <th>Category</th>
              <th>Designer</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDesigns.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>

                <td>
                  <img src={item.image} className="blog-thumb" alt="design" />
                </td>

                <td className="title-cell">{item.title}</td>

                <td className="link-cell">
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.link}
                  </a>
                </td>

                <td>
                  <span className="category-badge">
                    {item.category || "N/A"}
                  </span>
                </td>

                <td>
                  <span className="badge-author">
                    {item.designer || "Unknown"}
                  </span>
                </td>

                <td className="action-buttons">
                  <Link to={`/edit-design/${item._id}`}>
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
          <Modal.Title>Delete Design</Modal.Title>
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

export default ManageDesigns;
