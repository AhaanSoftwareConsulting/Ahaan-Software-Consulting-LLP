import { useContext, useEffect, useState } from "react";
import { getContact } from "../Api/api";
import { SearchContext } from "../../searchContext";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  message: string;
  createdAt: string;
}

const ContactForm: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { query } = useContext(SearchContext);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await getContact();
        setContacts(res.data);
      } catch (error) {
        console.error("Error loading contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = contacts.filter((item) => {
    const q = query.toLowerCase();

    return (
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.website.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-black text-[#EBB428]">
              <tr>
                <th className="px-4 py-4 text-left font-semibold">#</th>
                <th className="px-4 py-4 text-left font-semibold">Name</th>
                <th className="px-4 py-4 text-left font-semibold">Email</th>
                <th className="px-4 py-4 text-left font-semibold">Phone</th>
                <th className="px-4 py-4 text-left font-semibold">Website</th>
                <th className="px-4 py-4 text-left font-semibold">Message</th>
                <th className="px-4 py-4 text-left font-semibold">Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b transition hover:bg-yellow-50"
                  >
                    <td className="px-4 py-4">{index + 1}</td>

                    <td className="px-4 py-4 font-medium">
                      {item.name}
                    </td>

                    <td className="px-4 py-4">
                      {item.email}
                    </td>

                    <td className="px-4 py-4">
                      {item.phone}
                    </td>

                    <td className="px-4 py-4">
                      {item.website}
                    </td>

                    <td className="max-w-xs px-4 py-4">
                      <p className="line-clamp-2">
                        {item.message}
                      </p>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-8 text-center text-gray-500"
                  >
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;