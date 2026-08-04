import React from "react";
import "./DesignForm.css";

const DesignForm = ({
  formTitle,
  title,
  setTitle,
  link,
  setLink,
  designer,
  setDesigner,
  category,
  setCategory,
  image,
  setImage,
  onSubmit,
  previewImage,
}) => {
  return (
    <div className="design-form-wrapper">
      <h2 className="form-title">{formTitle}</h2>

      <form onSubmit={onSubmit} className="design-form">
        {/* TITLE */}
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className="form-control styled-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* LINK */}
        <div className="form-group">
          <label className="form-label">Link</label>
          <input
            className="form-control styled-input"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        {/* DESIGNER */}
        <div className="form-group">
          <label className="form-label">Designer Name</label>
          <input
            className="form-control styled-input"
            type="text"
            value={designer}
            onChange={(e) => setDesigner(e.target.value)}
            required
          />
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label className="form-label">Category</label>

          <select
            className="form-control styled-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Category
            </option>

            <option value="electronics">Electronics</option>

            <option value="education-books">Education & Books</option>

            <option value="business-services">Business & Services</option>

            <option value="cars-motorcycles">Cars & Motorcycles</option>

            <option value="sports-outdoors-travel">
              Sports, Outdoors & Travel
            </option>

            <option value="fashion-beauty">Fashion & Beauty</option>

            <option value="defense-security">Defense & Security</option>

            <option value="it-tech">IT & Tech</option>

            <option value="food-restaurant">Food & Restaurant</option>

            <option value="entertainment">Entertainment</option>

            <option value="travel">Travel</option>

            <option value="society-people">Society & People</option>

            <option value="medical-healthcare">Medical & Healthcare</option>

            <option value="real-estate">Real Estate</option>

            <option value="web-banner">Web Banner</option>

            <option value="business-card">Business Card</option>

            <option value="product-label">Product Label</option>

            <option value="others">Others</option>
          </select>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="form-group">
          <label className="form-label">Upload Image</label>
          <input
            className="form-control styled-input"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* IMAGE PREVIEW */}
          {(image || previewImage) && (
            <div className="preview-wrapper">
              <img
                src={image ? URL.createObjectURL(image) : previewImage}
                alt="Preview"
                className="preview-img"
              />
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          {formTitle.includes("Edit") ? "Update Design" : "Save Design"}
        </button>
      </form>
    </div>
  );
};

export default DesignForm;
