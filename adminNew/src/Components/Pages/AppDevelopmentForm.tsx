import React from "react";

export interface AppDevelopmentFormProps {
  formTitle: string;

  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;

  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;

  previewImage: string | null;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AppDevelopmentForm: React.FC<AppDevelopmentFormProps> = ({
  formTitle,
  image,
  setImage,
  onSubmit,
  previewImage,
  projectName,
  setProjectName,
}) => {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-yellow-100 bg-[#FCFCF5] p-6 shadow-xl sm:p-8 lg:p-10">
      <h2 className="mb-8 text-center text-2xl font-bold text-black sm:text-3xl">
        {formTitle}
      </h2>

      <form
        onSubmit={onSubmit}
        className="space-y-6">

       {/* Title */}

      <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Title
          </label>

          <input
            type="text"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition-all duration-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
          />
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
            ? "Update App development"
            : "Save App development"}
        </button>
      </form>
    </div>
  );
};

export default AppDevelopmentForm;