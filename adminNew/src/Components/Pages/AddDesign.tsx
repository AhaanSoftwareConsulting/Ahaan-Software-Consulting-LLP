import React, { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addDesignAPI } from "../Api/api";
import DesignForm from "./DesignForm";

const AddDesign: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [designer, setDesigner] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("link", link);
    formData.append("designer", designer);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const res = await addDesignAPI(formData);

      toast.success(res.data.message || "Design added successfully!");

      // Reset Form
      setTitle("");
      setLink("");
      setDesigner("");
      setCategory("");
      setImage(null);

      navigate("/manage-design");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to add design!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
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
      </div>
    </div>
  );
};

export default AddDesign;