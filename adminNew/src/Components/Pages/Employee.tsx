import { useEffect, useState } from "react";
import { getAllTeams } from "../Api/api";

interface Team {
  _id: string;
  name: string;
  position: string;
  image: string;
  dateOfBirth?: string;
  dateOfJoining?: string;
  createdAt?: string;
}

const Employee = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async (): Promise<void> => {
    try {
      const res = await getAllTeams();
      setTeams(res.data || []);
    } catch (error) {
      console.error(error);
      setTeams([]);
    }
  };

  const formatDate = (date?: string): string => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Employees
        </h2>
      </div>

      {/* Table */}
      <div className="max-h-[445px]  overflow-y-auto rounded-lg border border-gray-200">

        <table className="min-w-[650px] w-full border-collapse">

          <thead className="sticky top-0 z-10 bg-gray-100">

            <tr className="text-left">

              <th className="px-5 py-4 text-sm font-semibold text-gray-800">
                Photo
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-800">
                Name & Position
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-800">
                Date of Birth
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-800">
                Date of Joining
              </th>

              <th className="px-5 py-4 text-sm font-semibold text-gray-800">
                Added On
              </th>

            </tr>

          </thead>

          <tbody>

            {teams.map((item) => (

              <tr
                key={item._id}
                className="shadow-sm transition hover:bg-gray-50"
              >

                <td className="px-5 py-4">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-full object-cover shadow-md"
                  />

                </td>

                <td className="px-5 py-4">

                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-yellow-600">
                    {item.position}
                  </p>

                </td>

                <td className="px-5 py-4 text-gray-700">
                  {formatDate(item.dateOfBirth)}
                </td>

                <td className="px-5 py-4 text-gray-700">
                  {formatDate(item.dateOfJoining)}
                </td>

                <td className="px-5 py-4 text-gray-700">
                  {formatDate(item.createdAt)}
                </td>

              </tr>

            ))}

            {teams.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-500"
                >
                  No employees found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default Employee;