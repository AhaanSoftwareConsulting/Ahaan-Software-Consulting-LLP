import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DesignForm from "./DesignForm";
import { getDesignByIdAPI, updateDesignAPI } from "../Api/api";

const EditDesign: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [designer, setDesigner] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesign = async () => {
      if (!id) return;

      try {
        const res = await getDesignByIdAPI(id);

        const data = res.data.data;

        setTitle(data.title ?? "");
        setLink(data.link ?? "");
        setDesigner(data.designer ?? "");
        setCategory(data.category ?? "");
        setPreviewImage(data.image ?? null);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to load design!"
        );
      }
    };

    fetchDesign();
  }, [id]);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!id) return;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("link", link);
    formData.append("designer", designer);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await updateDesignAPI(id, formData);

      toast.success(
        res.data.message || "Design updated successfully!"
      );

      setTimeout(() => {
        navigate("/manage-design");
      }, 1000);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update design!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <DesignForm
          formTitle="Edit Design"
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
          previewImage={previewImage}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditDesign;