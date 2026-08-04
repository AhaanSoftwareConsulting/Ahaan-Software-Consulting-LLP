import React, { useEffect, useState } from "react";
import { getDesignByIdAPI, updateDesignAPI } from "../Api/api";
import { useParams, useNavigate } from "react-router-dom";
import DesignForm from "../Pages/DesignForm";
import { toast } from "react-toastify";

const EditDesign = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [designer, setDesigner] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {

      try {
      const res = await getDesignByIdAPI(id);
      const data = res.data.data;

      setTitle(data.title);
      setLink(data.link);
      setDesigner(data.designer); // 👈 NEW FIELD
      setCategory(data.category || "");
      setPreviewImage(data.image);
    }catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load design!"
        );
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      title,
      link,
      designer,
      category,
    });

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

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update design!"
      );
    }
  };

  return (
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
      onSubmit={handleSubmit}
      previewImage={previewImage}
    />
  );
};

export default EditDesign;
