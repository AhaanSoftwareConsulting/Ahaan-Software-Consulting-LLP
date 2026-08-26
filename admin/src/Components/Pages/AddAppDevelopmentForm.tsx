import React, { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AddAppDevelopmentAPI } from "../Api/api";
import AppDevelopmentForm from "./AppDevelopmentForm";

const AddAppDevelopment: React.FC = () => {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();

    formData.append("projectName", projectName);
    formData.append("image", image);

    try {
      const res = await AddAppDevelopmentAPI(formData);

      toast.success(res.data.message || "Post added successfully!");

      // Reset Form
      setProjectName("");
      setImage(null);

      navigate("/manage-app");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to add app!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <AppDevelopmentForm
          formTitle="Add Post"
          projectName={projectName}
          setProjectName={setProjectName}
          image={image}
          setImage={setImage}
          onSubmit={handleSubmit}
          previewImage={null}
        />
      </div>
    </div>
  );
};

export default AddAppDevelopment;