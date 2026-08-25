import React, { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AddSocialMediaMarketingAPI } from "../Api/api";
import SocialMediaForm from "./SocialMediaForm";

const AddSocialMediaMarketing: React.FC = () => {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();

    formData.append("projectName", projectName);
    formData.append("backgroundColor", backgroundColor);
    formData.append("image", image);

    try {
      const res = await AddSocialMediaMarketingAPI(formData);

      toast.success(res.data.message || "Post added successfully!");

      // Reset Form
      setProjectName("");
      setBackgroundColor("");
      setImage(null);

      navigate("/manage-social");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to add post!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <SocialMediaForm
          formTitle="Add Post"
          projectName={projectName}
          setProjectName={setProjectName}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          image={image}
          setImage={setImage}
          onSubmit={handleSubmit}
          previewImage={null}
        />
      </div>
    </div>
  );
};

export default AddSocialMediaMarketing;