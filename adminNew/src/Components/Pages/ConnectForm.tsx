import { useContext, useEffect, useState } from "react";
import { getForms } from "../Api/api";
import { SearchContext } from "../../searchContext";

interface ConnectFormData {
  _id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  projectDetails: string;
  createdAt: string;
}

const ConnectForm: React.FC = () => {
  const [forms, setForms] = useState<ConnectFormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { query } = useContext(SearchContext);

  const fetchData = async (): Promise<void> => {
    try {
      const res = await getForms();
      setForms(res.data);
    } catch (error) {
      console.error("Error loading forms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = forms.filter((item) => {
    const q = query.toLowerCase();

    return (
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.service.toLowerCase().includes(q) ||
      item.budget.toLowerCase().includes(q) ||
      item.projectDetails.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full whitespace-nowrap">
          <thead className="bg-[#212121] text-[#EEB829]">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase tracking-widest">
                #
              </th>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase tracking-widest">
                Name
              </th>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase tracking-widest">
                Email
              </th>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase tracking-widest">
                Service
              </th>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase tracking-widest">
                Budget
              </th>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase tracking-widest">
                Project Details
              </th>
              <th className="px-5 py-4 text-left text-sm font-medium uppercase tracking-widest">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map((item, index) => (
                <tr
                  key={item._id}
                  className={`transition hover:bg-gradient-to-r from-[#fff] to-[#fd9c00cb] ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100"
                  }`}
                >
                  <td className="px-5 py-4">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {item.name}
                  </td>

                  <td className="px-5 py-4">
                    {item.email}
                  </td>

                  <td className="px-5 py-4">
                    {item.service}
                  </td>

                  <td className="px-5 py-4">
                    {item.budget}
                  </td>

                  <td className="max-w-sm px-5 py-4 whitespace-normal break-words">
                    {item.projectDetails}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConnectForm;