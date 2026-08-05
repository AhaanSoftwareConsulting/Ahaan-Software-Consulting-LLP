import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { createTeam } from "../Api/api";

interface TeamFormData {
  name: string;
  position: string;
  dateOfBirth: string;
  dateOfJoining: string;
  description: string;
  image: string;
}

const AddTeam: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamFormData>();

  const onSubmit = async (
  data: TeamFormData
): Promise<void> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("position", data.position);
  formData.append("dateOfBirth", data.dateOfBirth);
  formData.append("dateOfJoining", data.dateOfJoining);
  formData.append("description", data.description);

  // Since this is an Image URL (string)
  formData.append("image", data.image);

  try {
    const res = await createTeam(formData);

    toast.success(
      res.data.message || "Team Member Added Successfully"
    );

    reset();

    setTimeout(() => {
      navigate("/view-team");
    }, 1000);
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
      "Failed To Add Team Member"
    );
  }
};
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-yellow-100 bg-[#FCFCF5] p-6 shadow-xl sm:p-8 lg:p-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-black sm:text-3xl">
          Add Team Member
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Name */}

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Name
            </label>

            <input
              {...register("name", {
                required: "Name is required",
              })}
              placeholder="Enter full name"
              className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Position */}

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Position
            </label>

            <input
              {...register("position", {
                required: "Position is required",
              })}
              placeholder="Job role"
              className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />

            {errors.position && (
              <p className="mt-2 text-sm text-red-500">
                {errors.position.message}
              </p>
            )}
          </div>

          {/* Date of Birth */}

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Date of Birth
            </label>

            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
              })}
              className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />

            {errors.dateOfBirth && (
              <p className="mt-2 text-sm text-red-500">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Date of Joining */}

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Date of Joining
            </label>

            <input
              type="date"
              {...register("dateOfJoining", {
                required: "Date of Joining is required",
              })}
              className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />

            {errors.dateOfJoining && (
              <p className="mt-2 text-sm text-red-500">
                {errors.dateOfJoining.message}
              </p>
            )}
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Description
            </label>

            <textarea
              rows={4}
              {...register("description")}
              placeholder="Short description"
              className="w-full rounded-2xl border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />
          </div>

          {/* Image */}

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Image URL
            </label>

            <input
              {...register("image")}
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full rounded-full bg-black px-6 py-4 text-lg font-semibold uppercase tracking-wide text-[#EBB428] transition hover:bg-gray-900"
          >
            Add Team Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;