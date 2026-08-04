import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DevelopmentForm from "./DevelopmentForm";
import { addDevelopmentAPI } from "../Api/api";

const AddDevelopment: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [developer, setDeveloper] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("link", link);
    formData.append("developer", developer);
    formData.append("image", image);

    try {
      const res = await addDevelopmentAPI(formData);

      toast.success(
        res.data.message || "Development Added Successfully!"
      );

      // Reset Form
      setTitle("");
      setLink("");
      setDeveloper("");
      setImage(null);

      navigate("/manage-development");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to add development!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <DevelopmentForm
          formTitle="Add Development"
          title={title}
          setTitle={setTitle}
          link={link}
          setLink={setLink}
          developer={developer}
          setDeveloper={setDeveloper}
          image={image}
          setImage={setImage}
          previewImage={null}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddDevelopment;