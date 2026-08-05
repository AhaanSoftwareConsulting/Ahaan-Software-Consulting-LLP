import React from "react";

export interface DesignFormProps {
  formTitle: string;

  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;

  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;

  designer: string;
  setDesigner: React.Dispatch<React.SetStateAction<string>>;

  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;

  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;

  previewImage: string | null;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DesignForm: React.FC<DesignFormProps> = ({
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
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-yellow-100 bg-[#FCFCF5] p-6 shadow-xl sm:p-8 lg:p-10">
      <h2 className="mb-8 text-center text-2xl font-bold text-black sm:text-3xl">
        {formTitle}
      </h2>

      <form
        onSubmit={onSubmit}
        className="space-y-6"
      >
        {/* Title */}

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Title
          </label>

          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
          />
        </div>

        {/* Link */}

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Link
          </label>

          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
          />
        </div>

        {/* Designer */}

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Designer Name
          </label>

          <input
            type="text"
            required
            value={designer}
            onChange={(e) => setDesigner(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
          />
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Category
          </label>

          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
          >
            <option value="" disabled>
              Select Category
            </option>

            <option value="electronics">Electronics</option>

            <option value="education-books">
              Education & Books
            </option>

            <option value="business-services">
              Business & Services
            </option>

            <option value="cars-motorcycles">
              Cars & Motorcycles
            </option>

            <option value="sports-outdoors-travel">
              Sports, Outdoors & Travel
            </option>

            <option value="fashion-beauty">
              Fashion & Beauty
            </option>

            <option value="defense-security">
              Defense & Security
            </option>

            <option value="it-tech">
              IT & Tech
            </option>

            <option value="food-restaurant">
              Food & Restaurant
            </option>

            <option value="entertainment">
              Entertainment
            </option>

            <option value="travel">
              Travel
            </option>

            <option value="society-people">
              Society & People
            </option>

            <option value="medical-healthcare">
              Medical & Healthcare
            </option>

            <option value="real-estate">
              Real Estate
            </option>

            <option value="web-banner">
              Web Banner
            </option>

            <option value="business-card">
              Business Card
            </option>

            <option value="product-label">
              Product Label
            </option>

            <option value="others">
              Others
            </option>
          </select>
        </div>

        {/* Image */}

        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Upload Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] ?? null)
            }
            className="block w-full cursor-pointer rounded-xl border border-dashed border-gray-300 bg-white p-4 file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-5 file:py-2 file:text-sm file:font-semibold file:text-[#EBB428] hover:file:bg-gray-900"
          />

          {(image || previewImage) && (
            <div className="mt-6 flex justify-center">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : previewImage ?? ""
                }
                alt="Preview"
                className="max-h-72 rounded-xl border border-gray-200 object-cover shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="w-full rounded-full bg-black px-6 py-4 text-lg font-semibold uppercase tracking-wide text-[#EBB428] transition-all duration-300 hover:bg-gray-900"
        >
          {formTitle.includes("Edit")
            ? "Update Design"
            : "Save Design"}
        </button>
      </form>
    </div>
  );
};

export default DesignForm;