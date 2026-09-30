import React from "react";

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

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DevelopmentForm: React.FC<DevelopmentFormProps> = ({
  formTitle,
  title,
  setTitle,
  setLink,
  link,
  developer,
  setDeveloper,
  category,
  setCategory,
  image,
  setImage,
  previewImage,
  onSubmit,
}) => {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-yellow-100 bg-[#FCFCF5] p-6 shadow-xl sm:p-8 lg:p-10">
      <h2 className="mb-8 text-center text-2xl font-bold text-black sm:text-3xl">
        {formTitle}
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">

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
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
          />
        </div>

        {/* Developer */}
        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Developer Name
          </label>

          <input
            type="text"
            required
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
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
            className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
          >
            <option value="">Select Category</option>
            <option value="e-commerce">E-Commerce</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="travel">Travel</option>
            <option value="food-restaurant">Food & Restaurant</option>
            <option value="automotive">Automotive</option>
            <option value="real-estate">Real Estate</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="fashion">Fashion</option>
            <option value="entertainment">Entertainment</option>
            <option value="portfolio">Portfolio</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Upload Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-full bg-black px-6 py-4 text-lg font-semibold uppercase tracking-wide text-[#EBB428] transition-all duration-300 hover:bg-gray-900"
        >
          {formTitle.includes("Edit") ? "Update" : "Save"}
        </button>

      </form>
    </div>
  );
};

export default DevelopmentForm;