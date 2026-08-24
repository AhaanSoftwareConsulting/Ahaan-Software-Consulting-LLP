import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import AppDevelopmentForm from "./AppDevelopmentForm";
import { getAppDevelopmentByIdAPI, updateAppDevelopmentAPI } from "../Api/api";

const EditAppDevelopment: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [projectName, setProjectName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppDevelopment = async () => {
      if (!id) return;

      try {
        const res = await getAppDevelopmentByIdAPI(id);

        const data = res.data.data;

        setProjectName(data.projectName ?? "");
        setPreviewImage(data.image ?? null);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to load design!"
        );
      }
    };

    fetchAppDevelopment();
  }, [id]);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!id) return;

    const formData = new FormData();

    formData.append("projectName", projectName);
    

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await updateAppDevelopmentAPI(id, formData);

      toast.success(
        res.data.message || "post updated successfully!"
      );

      setTimeout(() => {
        navigate("/manage-social");
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
        <AppDevelopmentForm
          formTitle="Edit App Development"
          projectName={projectName}
          setProjectName={setProjectName}
          image={image}
          setImage={setImage}
          previewImage={previewImage}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditAppDevelopment;