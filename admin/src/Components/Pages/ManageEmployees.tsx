import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Briefcase,
  Buildings,
  IdentificationBadge,
  CalendarBlank,
  User as UserIcon,
  X,
  FloppyDisk,
  SpinnerGap,
  PencilSimple,
} from "@phosphor-icons/react";
import { getUsersByStatusAPI } from "../Api/userapi";
import { getProfileByUserIdAPI, updateEmploymentAPI } from "../Api/Profileapi";

interface ApprovedUser {
  request_id: string;
  user_id: string;
  email: string;
  full_name: string;
  role: string;
}

interface EmploymentForm {
  designation: string;
  department: string;
  employee_code: string;
  date_of_joining: string;
  employment_type: string;
  reporting_manager: string;
}

const emptyEmployment: EmploymentForm = {
  designation: "",
  department: "",
  employee_code: "",
  date_of_joining: "",
  employment_type: "",
  reporting_manager: "",
};

const DESIGNATIONS = [
  "developer",
  "designer",
  "sales",
  "hr",
  "marketing",
  "manager",
  "ceo",
  "intern",
  "support",
  "other",
];

export const ManageEmployees = () => {
  const [users, setUsers] = useState<ApprovedUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<ApprovedUser | null>(null);
  const [form, setForm] = useState<EmploymentForm>(emptyEmployment);
  const [modalLoading, setModalLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsersByStatusAPI("approved");
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = async (user: ApprovedUser) => {
    setActiveUser(user);
    setModalOpen(true);
    setModalLoading(true);
    try {
      const res = await getProfileByUserIdAPI(user.user_id);
      const data = res.data.data;
      setForm({
        designation: data.designation ?? "",
        department: data.department ?? "",
        employee_code: data.employee_code ?? "",
        date_of_joining: data.date_of_joining ?? "",
        employment_type: data.employment_type ?? "",
        reporting_manager: data.reporting_manager ?? "",
      });
    } catch (err) {
      // Profile may not exist yet (user never opened /profile/me) — that's fine,
      // updateEmployment will create it. Just start with a blank form.
      setForm(emptyEmployment);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveUser(null);
    setForm(emptyEmployment);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!activeUser) return;
    try {
      setSaving(true);
      await updateEmploymentAPI(activeUser.user_id, form);
      toast.success("Employment details updated");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update employment details");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 transition focus:border-[#ffbe31] focus:outline-none focus:ring-2 focus:ring-[#ffbe31]/30";

  return (
    <div className="w-full px-4 py-6">
      <div className="mb-4 flex items-center gap-2">
        <Briefcase size={22} className="text-[#ffbe31]" />
        <h2 className="text-lg font-bold text-gray-800">Manage Employees</h2>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 border-collapse">
            <thead className="bg-[#ffbe31] text-black font-semibold">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Account Role</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    <SpinnerGap size={28} className="mx-auto animate-spin text-[#ffbe31]" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    No approved employees found.
                  </td>
                </tr>
              ) : (
                users.map((u, i) => (
                  <tr key={u.request_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-500">{i + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{u.full_name}</td>
                    <td className="px-6 py-4 text-gray-600">{u.email}</td>
                    <td className="px-6 py-4 capitalize text-gray-600">
                      {u.role?.replace("_", " ")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => openModal(u)}
                        className="inline-flex items-center gap-1 rounded-md bg-[#161616] px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-[#2a2a2a] transition-colors"
                      >
                        <PencilSimple size={14} weight="bold" />
                        Edit Employment
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Edit Employment Modal ── */}
      {modalOpen && activeUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Edit Employment</h3>
                <p className="text-xs text-gray-500">
                  {activeUser.full_name} · {activeUser.email}
                </p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-5">
              {modalLoading ? (
                <div className="flex h-32 items-center justify-center">
                  <SpinnerGap size={28} className="animate-spin text-[#ffbe31]" />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <IdentificationBadge size={14} /> Designation
                    </label>
                    <select
                      name="designation"
                      value={form.designation}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select</option>
                      {DESIGNATIONS.map((d) => (
                        <option key={d} value={d}>
                          {d.charAt(0).toUpperCase() + d.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <Buildings size={14} /> Department
                    </label>
                    <input
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <IdentificationBadge size={14} /> Employee Code
                    </label>
                    <input
                      name="employee_code"
                      value={form.employee_code}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <CalendarBlank size={14} /> Date of Joining
                    </label>
                    <input
                      type="date"
                      name="date_of_joining"
                      value={form.date_of_joining}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <Briefcase size={14} /> Employment Type
                    </label>
                    <select
                      name="employment_type"
                      value={form.employment_type}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select</option>
                      <option value="full_time">Full-time</option>
                      <option value="part_time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="intern">Intern</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <UserIcon size={14} /> Reporting Manager
                    </label>
                    <input
                      name="reporting_manager"
                      value={form.reporting_manager}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
              <button
                onClick={closeModal}
                className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || modalLoading}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffbe31] to-[#ff9d00] px-5 py-2 text-sm font-semibold text-black shadow-sm transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? <SpinnerGap size={16} className="animate-spin" /> : <FloppyDisk size={16} weight="bold" />}
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};