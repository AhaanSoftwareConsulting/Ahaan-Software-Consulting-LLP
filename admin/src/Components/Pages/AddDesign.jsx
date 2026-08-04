import React, { useState } from "react";
import { addDesignAPI } from "../Api/api";
import DesignForm from "../Pages/DesignForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddDesign = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [designer, setDesigner] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("designer", designer); // NEW FIELD
    formData.append("image", image);
    formData.append("category", category);

    try {
      const res = await addDesignAPI(formData);

      toast.success(res.data.message || "Design added successfully!");

      // Reset Form
      setTitle("");
      setLink("");
      setDesigner("");
      setImage(null);
      setCategory("");

      navigate("/manage-design");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add design!");
    }
  };

  return (
    <DesignForm
      formTitle="Add Design"
      title={title}
      setTitle={setTitle}
      link={link}
      setLink={setLink}
      designer={designer}
      setDesigner={setDesigner}
      category={category}
      setCategory={setCategory}
      image={image}
      setImage={setImage}
      onSubmit={handleSubmit}
      previewImage={null}
    />
  );
};

export default AddDesign;
