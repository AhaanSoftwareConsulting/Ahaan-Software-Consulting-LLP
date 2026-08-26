import { useContext, useEffect, useState } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

import { getUsersByStatusAPI } from "../Api/userapi";
import { getAllProfilesAPI } from "../Api/Profileapi";
import { SearchContext } from "../../searchContext";

interface ApprovedUser {
  request_id: string;
  user_id: string;
  email: string;
  full_name: string;
  role: string;
}

interface ProfileRow {
  user_id: string;
  avatar: string | null;
  designation: string | null;
  bio: string | null;
}

interface Employee {
  user_id: string;
  name: string;
  email: string;
  position: string; // designation, falls back to account role
  description: string; // bio, falls back to a generic line
  image: string; // avatar, falls back to a placeholder
  showFull?: boolean;
}

const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?background=161616&color=ffbe31&name=";

const ViewEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const { query } = useContext(SearchContext);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async (): Promise<void> => {
    try {
      setLoading(true);

      const [usersRes, profilesRes] = await Promise.all([
        getUsersByStatusAPI("approved"),
        getAllProfilesAPI(),
      ]);

      const users: ApprovedUser[] = usersRes.data.data;
      const profiles: ProfileRow[] = profilesRes.data.data;

      const profileByUserId = new Map(profiles.map((p) => [p.user_id, p]));

      const merged: Employee[] = users.map((u) => {
        const profile = profileByUserId.get(u.user_id);
        return {
          user_id: u.user_id,
          name: u.full_name,
          email: u.email,
          position: profile?.designation
            ? profile.designation.charAt(0).toUpperCase() + profile.designation.slice(1)
            : u.role?.replace("_", " ") ?? "Employee",
          description: profile?.bio || "No bio added yet.",
          image: profile?.avatar || `${FALLBACK_AVATAR}${encodeURIComponent(u.full_name)}`,
          showFull: false,
        };
      });

      setEmployees(merged);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed To Load Employees"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleShowMore = (userId: string) => {
    setEmployees((prev) =>
      prev.map((item) =>
        item.user_id === userId
          ? { ...item, showFull: !item.showFull }
          : item
      )
    );
  };

  const getShortDesc = (text: string): string => {
    const words = text.split(" ");
    if (words.length <= 10) return text;
    return words.slice(0, 10).join(" ") + "...";
  };

  const filtered = employees.filter((emp) => {
    const q = query.toLowerCase();
    return (
      emp.name.toLowerCase().includes(q) ||
      emp.position.toLowerCase().includes(q) ||
      emp.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Our Employees
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading employees...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-red-500">
          No employees found
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((emp) => (
            <div
              key={emp.user_id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="overflow-hidden">
                <img
                  src={emp.image}
                  alt={emp.name}
                  className="h-full w-full object-cover object-top transition duration-300 hover:scale-105"
                />
              </div>

              <div className="space-y-3 p-5 text-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {emp.name}
                  </h3>

                  <p className="font-semibold capitalize text-yellow-500">
                    {emp.position}
                  </p>
                </div>

                <p className="text-sm leading-6 text-gray-600">
                  {emp.showFull ? emp.description : getShortDesc(emp.description)}
                </p>

                {emp.description.split(" ").length > 20 && (
                  <button
                    onClick={() => toggleShowMore(emp.user_id)}
                    className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-yellow-400 transition hover:bg-gray-800 hover:text-white"
                  >
                    {emp.showFull ? "Show Less" : "Show More"}
                  </button>
                )}

                <div className="flex justify-center gap-3 pt-2">
                  {/* Edit and Delete are disabled for now — no handlers wired */}
                  <button
                    disabled
                    title="Editing coming soon"
                    className="cursor-not-allowed rounded-lg bg-green-600/40 p-2 text-white/60"
                  >
                    <FiEdit size={18} />
                  </button>

                  <button
                    disabled
                    title="Deletion coming soon"
                    className="cursor-not-allowed rounded-lg bg-red-600/40 p-2 text-white/60"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewEmployees;