import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DevelopmentForm from "./DevelopmentForm";
import {
  getDevelopmentByIdAPI,
  updateDevelopmentAPI,
} from "../Api/api";

const EditDevelopment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [developer, setDeveloper] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      if (!id) return;

      try {
        const res = await getDevelopmentByIdAPI(id);
        const data = res.data.data;

        setTitle(data.title ?? "");
        setLink(data.link ?? "");
        setDeveloper(data.developer ?? "");
        setPreviewImage(data.image ?? null);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to load development!"
        );
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!id) return;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("link", link);
    formData.append("developer", developer);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await updateDevelopmentAPI(id, formData);

      toast.success(
        res.data.message ||
          "Development updated successfully!"
      );

      setTimeout(() => {
        navigate("/manage-development");
      }, 1000);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update development!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <DevelopmentForm
          formTitle="Edit Development"
          title={title}
          setTitle={setTitle}
          link={link}
          setLink={setLink}
          developer={developer}
          setDeveloper={setDeveloper}
          image={image}
          setImage={setImage}
          previewImage={previewImage}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditDevelopment;