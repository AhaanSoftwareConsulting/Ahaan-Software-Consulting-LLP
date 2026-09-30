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
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter project title.");
      return;
    }

    if (!link.trim()) {
      toast.error("Please enter project link.");
      return;
    }

    if (!developer.trim()) {
      toast.error("Please enter developer name.");
      return;
    }

    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("link", link);
    formData.append("developer", developer);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const res = await addDevelopmentAPI(formData);

      toast.success(
        res?.data?.message ||
          "Development Added Successfully!"
      );

      setTitle("");
      setLink("");
      setDeveloper("");
      setCategory("");
      setImage(null);

      navigate("/manage-development");
    } catch (error: any) {
      console.error(
        "Add Development Error:",
        error
      );

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
          category={category}
          setCategory={setCategory}
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