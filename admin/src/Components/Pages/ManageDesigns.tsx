import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

import { deleteDesignAPI, getAllDesignsAPI } from "../Api/api";
import { SearchContext } from "../../searchContext";

interface Design {
  _id: string;
  title: string;
  link: string;
  image: string;
  category?: string;
  designer?: string;
}

const ManageDesigns: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { query } = useContext(SearchContext);

  const loadData = async (): Promise<void> => {
    try {
      const res = await getAllDesignsAPI();
      setDesigns(res.data.data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load designs."
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredDesigns = designs.filter((item) => {
    const q = query.toLowerCase();

    return (
      item.title.toLowerCase().includes(q) ||
      item.link.toLowerCase().includes(q) ||
      item.designer?.toLowerCase().includes(q)
    );
  });

  const handleDeleteConfirm = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (!selectedId) return;

    try {
      const res = await deleteDesignAPI(selectedId);

      toast.success(
        res.data.message || "Design deleted successfully!"
      );

      setShowModal(false);
      setSelectedId(null);

      loadData();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete design!"
      );
    }
  };

  return (
    <>
      <div className="rounded-2xl bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full whitespace-nowrap">
            <thead className="bg-black text-[#EBB428]">
              <tr>
                <th className="px-4 py-4 text-left">#</th>
                <th className="px-4 py-4 text-left">Image</th>
                <th className="px-4 py-4 text-left">Title</th>
                <th className="px-4 py-4 text-left">Link</th>
                <th className="px-4 py-4 text-left">Category</th>
                <th className="px-4 py-4 text-left">Designer</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDesigns.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-8 text-center text-gray-500"
                  >
                    No designs found.
                  </td>
                </tr>
              ) : (
                filteredDesigns.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`transition hover:bg-gradient-to-r from-[#fff] to-[#00000042] ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100"
                  }`}
                  >
                    
                    
                    <td className="px-4 py-4">
                      {index + 1}
                    </td>

                    <td className="px-4 py-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-10 w-20 rounded-md shadow-sm object-cover"
                      />
                    </td>

                    <td className="px-4 py-4 font-medium">
                      {item.title}
                    </td>

                    <td className="max-w-xs px-4 py-4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="block truncate text-blue-600 hover:underline"
                      >
                        {item.link}
                      </a>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-gradient-to-r from-[#fff] to-[#ff9d00] px-3 py-1 text-sm font-medium text-yellow-700">
                        {item.category || "N/A"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-gray-200 px-3 py-1 text-sm">
                        {item.designer || "Unknown"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/edit-design/${item._id}`}
                          className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700"
                        >
                          <FiEdit size={18} />
                        </Link>

                        <button
                          onClick={() =>
                            handleDeleteConfirm(item._id)
                          }
                          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">
              Delete Design
            </h2>

            <p className="mt-3 text-gray-600">
              This action is permanent. Are you sure you
              want to delete this design?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-gray-300 px-5 py-2 font-medium hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageDesigns;