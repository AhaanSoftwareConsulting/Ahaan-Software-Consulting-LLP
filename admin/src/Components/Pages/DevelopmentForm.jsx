import React from "react";

const DevelopmentForm = ({
  formTitle,
  title,
  setTitle,
  link,
  setLink,
  developer,
  setDeveloper,
  image,
  setImage,
  previewImage,
  onSubmit
}) => {
  return (
    <div className="design-form-wrapper">
      <h2 className="form-title">{formTitle}</h2>

      <form onSubmit={onSubmit} className="blog-form">

        {/* TITLE */}
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control styled-input"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />
        </div>

        {/* LINK */}
        <div className="form-group">
          <label className="form-label">Link</label>
          <input
            type="text"
            className="form-control styled-input"
            value={link}
            onChange={(e)=>setLink(e.target.value)}
            required
          />
        </div>

        {/* DEVELOPER NAME */}
        <div className="form-group">
          <label className="form-label">Developer Name</label>
          <input
            type="text"
            className="form-control styled-input"
            value={developer}
            onChange={(e)=>setDeveloper(e.target.value)}
            required
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div className="form-group">
          <label className="form-label">Upload Image</label>

          <input
            type="file"
            className="form-control styled-input"
            accept="image/*"
            onChange={(e)=>setImage(e.target.files[0])}
          />

          {(image || previewImage) && (
            <img
              src={image ? URL.createObjectURL(image) : previewImage}
              className="preview-img"
              alt="preview"
            />
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="submit-button">
          {formTitle.includes("Edit") ? "Update" : "Save"}
        </button>

      </form>
    </div>
  );
};

export default DevelopmentForm;
