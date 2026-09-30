import React, { useEffect, useState } from "react";

export interface DevelopmentFormProps {
  formTitle: string;

  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;

  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;

  developer: string;
  setDeveloper: React.Dispatch<React.SetStateAction<string>>;

  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;

  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;

  previewImage: string | null;

  onSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
}

const DevelopmentForm: React.FC<DevelopmentFormProps> = ({
  formTitle,
  title,
  setTitle,
  link,
  setLink,
  developer,
  setDeveloper,
  category,
  setCategory,
  image,
  setImage,
  previewImage,
  onSubmit,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    previewImage
  );

  // =====================================================
  // IMAGE PREVIEW
  // =====================================================

  useEffect(() => {
    if (!image) {
      setImagePreview(previewImage);
      return;
    }

    const objectUrl = URL.createObjectURL(image);

    setImagePreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image, previewImage]);

  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0] ?? null;

    setImage(selectedFile);
  };

  // =====================================================
  // FORM
  // =====================================================

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-3xl
        rounded-3xl
        border
        border-yellow-100
        bg-[#FCFCF5]
        p-6
        shadow-xl
        sm:p-8
        lg:p-10
      "
    >
      {/* Heading */}

      <h2
        className="
          mb-8
          text-center
          text-2xl
          font-bold
          text-black
          sm:text-3xl
        "
      >
        {formTitle}
      </h2>

      <form
        onSubmit={onSubmit}
        className="space-y-6"
      >
        {/* =================================================
            TITLE
        ================================================= */}

        <div>
          <label
            htmlFor="development-title"
            className="mb-2 block font-semibold text-gray-800"
          >
            Title
          </label>

          <input
            id="development-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            className="
              w-full
              rounded-full
              border
              border-gray-300
              bg-transparent
              px-5
              py-3
              outline-none
              transition-all
              duration-200
              focus:border-yellow-500
              focus:ring-4
              focus:ring-yellow-200
            "
          />
        </div>

        {/* =================================================
            LINK
        ================================================= */}

        <div>
          <label
            htmlFor="development-link"
            className="mb-2 block font-semibold text-gray-800"
          >
            Link
          </label>

          <input
            id="development-link"
            type="url"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
            className="
              w-full
              rounded-full
              border
              border-gray-300
              bg-transparent
              px-5
              py-3
              outline-none
              transition-all
              duration-200
              focus:border-yellow-500
              focus:ring-4
              focus:ring-yellow-200
            "
          />
        </div>

        {/* =================================================
            DEVELOPER
        ================================================= */}

        <div>
          <label
            htmlFor="development-developer"
            className="mb-2 block font-semibold text-gray-800"
          >
            Developer Name
          </label>

          <input
            id="development-developer"
            type="text"
            required
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            placeholder="Enter developer name"
            className="
              w-full
              rounded-full
              border
              border-gray-300
              bg-transparent
              px-5
              py-3
              outline-none
              transition-all
              duration-200
              focus:border-yellow-500
              focus:ring-4
              focus:ring-yellow-200
            "
          />
        </div>

        {/* =================================================
            CATEGORY
        ================================================= */}

        <div>
          <label
            htmlFor="development-category"
            className="mb-2 block font-semibold text-gray-800"
          >
            Category
          </label>

          <select
            id="development-category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              w-full
              rounded-full
              border
              border-gray-300
              bg-white
              px-5
              py-3
              outline-none
              transition-all
              duration-200
              focus:border-yellow-500
              focus:ring-4
              focus:ring-yellow-200
            "
          >
            <option value="">
              Select Category
            </option>

            <option value="e-commerce">
              E-Commerce
            </option>

            <option value="healthcare">
              Healthcare
            </option>

            <option value="education">
              Education
            </option>

            <option value="travel">
              Travel
            </option>

            <option value="food-restaurant">
              Food & Restaurant
            </option>

            <option value="automotive">
              Automotive
            </option>

            <option value="real-estate">
              Real Estate
            </option>

            <option value="business">
              Business
            </option>

            <option value="technology">
              Technology
            </option>

            <option value="sports">
              Sports
            </option>

            <option value="fashion">
              Fashion
            </option>

            <option value="entertainment">
              Entertainment
            </option>

            <option value="portfolio">
              Portfolio
            </option>

            <option value="others">
              Others
            </option>
          </select>
        </div>

        {/* =================================================
            IMAGE
        ================================================= */}

        <div>
          <label
            htmlFor="development-image"
            className="mb-2 block font-semibold text-gray-800"
          >
            Upload Image
          </label>

          <input
            id="development-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="
              block
              w-full
              cursor-pointer
              rounded-xl
              border
              border-dashed
              border-gray-300
              bg-white
              p-4
              file:mr-4
              file:rounded-full
              file:border-0
              file:bg-black
              file:px-5
              file:py-2
              file:text-sm
              file:font-semibold
              file:text-[#EBB428]
              hover:file:bg-gray-900
            "
          />

          {/* Image Preview */}

          {imagePreview && (
            <div className="mt-6 flex justify-center">
              <img
                src={imagePreview}
                alt="Development Preview"
                className="
                  max-h-72
                  max-w-full
                  rounded-xl
                  border
                  border-gray-200
                  object-contain
                  shadow-lg
                "
              />
            </div>
          )}

          {/* Selected File Name */}

          {image && (
            <p className="mt-3 text-center text-sm text-gray-500">
              Selected: {image.name}
            </p>
          )}
        </div>

        {/* =================================================
            SUBMIT BUTTON
        ================================================= */}

        <button
          type="submit"
          className="
            w-full
            rounded-full
            bg-black
            px-6
            py-4
            text-lg
            font-semibold
            uppercase
            tracking-wide
            text-[#EBB428]
            transition-all
            duration-300
            hover:bg-gray-900
            hover:shadow-lg
          "
        >
          {formTitle.includes("Edit")
            ? "Update"
            : "Save"}
        </button>
      </form>
    </div>
  );
};

export default DevelopmentForm;