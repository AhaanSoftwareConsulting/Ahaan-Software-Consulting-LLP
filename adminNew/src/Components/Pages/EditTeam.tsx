import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getSingleTeam, updateTeam } from "../Api/api";

interface TeamFormData {
  name: string;
  position: string;
  dateOfBirth: string;
  dateOfJoining: string;
  description: string;
  image: string;
}

const EditTeam: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TeamFormData>();

  // ===========================
  // Load Team Data
  // ===========================
  useEffect(() => {
    const loadTeam = async (): Promise<void> => {
      if (!id) return;

      try {
        const res = await getSingleTeam(id);
        const team = res.data.data;

        if (team) {
          setValue("name", team.name);
          setValue("position", team.position);
          setValue("description", team.description);
          setValue("image", team.image);

          setValue(
            "dateOfBirth",
            team.dateOfBirth
              ? team.dateOfBirth.split("T")[0]
              : ""
          );

          setValue(
            "dateOfJoining",
            team.dateOfJoining
              ? team.dateOfJoining.split("T")[0]
              : ""
          );
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ??
            "Failed To Load Team"
        );
      }
    };

    loadTeam();
  }, [id, setValue]);

  // ===========================
  // Update Team
  // ===========================
  const onSubmit = async (
    data: TeamFormData
  ): Promise<void> => {
    if (!id) return;

    try {
      // If updateTeam expects FormData
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("position", data.position);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("dateOfJoining", data.dateOfJoining);
      formData.append("description", data.description);
      formData.append("image", data.image);

      const res = await updateTeam(id, formData);

      toast.success(
        res.data.message ||
          "Team Updated Successfully"
      );

      setTimeout(() => {
        navigate("/view-team");
      }, 1000);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed To Update Team"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-yellow-100 bg-[#FCFCF5] p-6 shadow-xl sm:p-8 lg:p-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-black sm:text-3xl">
          Edit Team Member
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
              className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
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
              placeholder="Enter position"
              className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
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
                required:
                  "Date of Birth is required",
              })}
              className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
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
                required:
                  "Date of Joining is required",
              })}
              className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
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
              placeholder="Write something..."
              className="w-full rounded-2xl border border-gray-300 px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />
          </div>

          {/* Image URL */}

          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Image URL
            </label>

            <input
              {...register("image")}
              placeholder="https://example.com/team.jpg"
              className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full rounded-full bg-black px-6 py-4 text-lg font-semibold uppercase tracking-wide text-[#EBB428] transition hover:bg-gray-900"
          >
            Update Team Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTeam;