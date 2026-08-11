import { useEffect, useState } from "react";
import { getNewsletterSubscribers } from "../Api/api";

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async (): Promise<void> => {
    try {
      const res = await getNewsletterSubscribers();
      setSubscribers(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-lg font-medium text-gray-500">
          Loading subscribers...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Newsletter Subscribers
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Total Subscribers: {subscribers.length}
        </p>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">

        <table className="min-w-full">

          <thead className="bg-gray-900 text-sm uppercase tracking-wider text-yellow-400">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Subscribed At</th>
            </tr>
          </thead>

          <tbody>

            {subscribers.length > 0 ? (
              subscribers.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    {item.email}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-10 text-center text-gray-500"
                >
                  No subscribers found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default Newsletter;