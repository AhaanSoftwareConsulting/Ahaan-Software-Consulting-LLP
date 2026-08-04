import React, { useEffect, useState } from "react";
import { getDevelopmentByIdAPI, updateDevelopmentAPI } from "../Api/api";
import { useParams, useNavigate } from "react-router-dom";
import DevelopmentForm from "../Pages/DevelopmentForm";
import { toast } from "react-toastify";

const EditDevelopment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [developer, setDeveloper] = useState(""); // NEW FIELD
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getDevelopmentByIdAPI(id);
        const data = res.data.data;

        setTitle(data.title);
        setLink(data.link);
        setDeveloper(data.developer);
        setPreviewImage(data.image);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load development!"
        );
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", title);
    fd.append("link", link);
    fd.append("developer", developer);   // ADD DEVELOPER TO FORM
    if (image) fd.append("image", image);

    try {
      const res = await updateDevelopmentAPI(id, fd);

      toast.success(
        res.data.message || "Development updated successfully!"
      );

      setTimeout(() => {
        navigate("/manage-development");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update development!"
      );
    }
  };

  return (
    <DevelopmentForm
      formTitle="Edit Development"
      title={title}
      setTitle={setTitle}
      link={link}
      setLink={setLink}
      developer={developer}          // SEND TO FORM
      setDeveloper={setDeveloper}    // SEND TO FORM
      image={image}
      setImage={setImage}
      previewImage={previewImage}
      onSubmit={handleSubmit}
    />
  );
};

export default EditDevelopment;
