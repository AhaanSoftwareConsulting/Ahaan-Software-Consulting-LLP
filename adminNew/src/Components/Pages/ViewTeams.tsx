import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiTrash2,
  FiEdit,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { toast } from "react-toastify";

import {
  getAllTeams,
  deleteTeam,
  updateTeam,
} from "../Api/api";

import { SearchContext } from "../../searchContext";
import ConfirmModal from "../ConfirmModal";

interface Team {
  _id: string;
  name: string;
  position: string;
  description: string;
  image: string;
  dateOfBirth?: string;
  dateOfJoining?: string;
  isHidden?: boolean;
  showFull?: boolean;
}

const ViewTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(
    null
  );

  const { query } = useContext(SearchContext);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async (): Promise<void> => {
    try {
      const res = await getAllTeams();

      const data: Team[] = res.data.map((item: Team) => ({
        ...item,
        isHidden: item.isHidden ?? false,
        showFull: false,
      }));

      setTeams(data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed To Load Team Members"
      );
    }
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (!selectedId) return;

    try {
      const res = await deleteTeam(selectedId);

      setTeams((prev) =>
        prev.filter((team) => team._id !== selectedId)
      );

      toast.success(
        res.data.message ||
          "Team Member Deleted Successfully"
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed To Delete Team Member"
      );
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }
  };

  const toggleVisibility = async (
    team: Team
  ): Promise<void> => {
    const updatedTeam = {
      ...team,
      isHidden: !team.isHidden,
    };

    try {
      const res = await updateTeam(
        team._id,
        updatedTeam as any
      );

      setTeams((prev) =>
        prev.map((item) =>
          item._id === team._id ? updatedTeam : item
        )
      );

      toast.success(
        res.data.message ||
          "Visibility Updated Successfully"
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed To Update Visibility"
      );
    }
  };

  const toggleShowMore = (id: string) => {
    setTeams((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              showFull: !item.showFull,
            }
          : item
      )
    );
  };

  const getShortDesc = (text: string): string => {
    const words = text.split(" ");

    if (words.length <= 10) return text;

    return words.slice(0, 10).join(" ") + "...";
  };

  const filtered = teams.filter((team) => {
    const q = query.toLowerCase();

    return (
      team.name.toLowerCase().includes(q) ||
      team.position.toLowerCase().includes(q) ||
      team.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      <h2 className="mb-8 text-center text-3xl font-bold">
        Our Team
      </h2>

      {filtered.length === 0 ? (
        <p className="text-center text-red-500">
          No team members found
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filtered.map((team) => (
            <div
              key={team._id}
              className={`overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                team.isHidden
                  ? "opacity-50"
                  : ""
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={team.image}
                  alt={team.name}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>

              <div className="space-y-3 p-5 text-center">

                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {team.name}
                  </h3>

                  <p className="font-semibold text-yellow-500">
                    {team.position}
                  </p>
                </div>

                <p className="text-sm leading-6 text-gray-600">
                  {team.showFull
                    ? team.description
                    : getShortDesc(team.description)}
                </p>

                {team.description.split(" ").length >
                  20 && (
                  <button
                    onClick={() =>
                      toggleShowMore(team._id)
                    }
                    className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-yellow-400 transition hover:bg-gray-800 hover:text-white"
                  >
                    {team.showFull
                      ? "Show Less"
                      : "Show More"}
                  </button>
                )}

                <div className="flex justify-center gap-3 pt-2">

                  <Link
                    to={`/edit-team/${team._id}`}
                    className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700"
                  >
                    <FiEdit size={18} />
                  </Link>

                  <button
                    onClick={() =>
                      toggleVisibility(team)
                    }
                    className={`rounded-lg p-2 text-white transition ${
                      team.isHidden
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-gray-700 hover:bg-gray-800"
                    }`}
                  >
                    {team.isHidden ? (
                      <FiEye size={18} />
                    ) : (
                      <FiEyeOff size={18} />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(team._id)
                    }
                    className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                  >
                    <FiTrash2 size={18} />
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={showModal}
        title="Delete Team Member"
        message="This action is permanent. Once deleted, it cannot be recovered."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ViewTeams;