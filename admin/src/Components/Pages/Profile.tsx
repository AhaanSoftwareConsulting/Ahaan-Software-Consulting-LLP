import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  User,
  EnvelopeSimple,
  ShieldCheck,
  Phone,
  MapPin,
  Buildings,
  IdentificationBadge,
  CalendarBlank,
  Briefcase,
  UsersThree,
  LinkedinLogo,
  GithubLogo,
  Globe,
  Camera,
  FloppyDisk,
  SpinnerGap,
  NotePencil,
  LockSimple,
} from "@phosphor-icons/react";
import { useAppSelector } from "../app/hook";
import { getMyProfileAPI, updateMyProfileAPI } from "../Api/Profileapi";

interface ProfileFormState {
  gender: string;
  date_of_birth: string;
  bio: string;
  phone: string;
  alternate_phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relation: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
}

// Read-only — set only by manager/CEO via the Manage Employees page.
interface EmploymentReadOnly {
  designation: string;
  department: string;
  employee_code: string;
  date_of_joining: string;
  employment_type: string;
  reporting_manager: string;
}

const emptyForm: ProfileFormState = {
  gender: "",
  date_of_birth: "",
  bio: "",
  phone: "",
  alternate_phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  country: "",
  postal_code: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
  emergency_contact_relation: "",
  linkedin_url: "",
  github_url: "",
  portfolio_url: "",
};

const emptyEmployment: EmploymentReadOnly = {
  designation: "",
  department: "",
  employee_code: "",
  date_of_joining: "",
  employment_type: "",
  reporting_manager: "",
};

function Section({
  title,
  icon,
  children,
  last,
  badge,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  last?: boolean;
  badge?: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl bg-white p-6 shadow-sm border border-gray-100 ${last ? "" : "mb-6"}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-700">
          <span className="text-[#ffbe31]">{icon}</span>
          {title}
        </h3>
        {badge}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
  full,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

// Plain, non-editable value display for the Employment section
function ReadOnlyValue({ value }: { value: string }) {
  return (
    <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-2.5 text-sm capitalize text-gray-700">
      {value ? value.replace(/_/g, " ") : <span className="text-gray-400">Not set</span>}
    </div>
  );
}

export default function Profile() {
  // full_name / email / role come from auth-service via Redux (populated
  // by getProfile() after login) — NOT editable here.
  const { user } = useAppSelector((state) => state.user);

  const [form, setForm] = useState<ProfileFormState>(emptyForm);
  const [employment, setEmployment] = useState<EmploymentReadOnly>(emptyEmployment);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getMyProfileAPI();
      const data = res.data.data;

      setForm({
        gender: data.gender ?? "",
        date_of_birth: data.date_of_birth ?? "",
        bio: data.bio ?? "",
        phone: data.phone ?? "",
        alternate_phone: data.alternate_phone ?? "",
        address_line1: data.address_line1 ?? "",
        address_line2: data.address_line2 ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        country: data.country ?? "",
        postal_code: data.postal_code ?? "",
        emergency_contact_name: data.emergency_contact_name ?? "",
        emergency_contact_phone: data.emergency_contact_phone ?? "",
        emergency_contact_relation: data.emergency_contact_relation ?? "",
        linkedin_url: data.linkedin_url ?? "",
        github_url: data.github_url ?? "",
        portfolio_url: data.portfolio_url ?? "",
      });

      setEmployment({
        designation: data.designation ?? "",
        department: data.department ?? "",
        employee_code: data.employee_code ?? "",
        date_of_joining: data.date_of_joining ?? "",
        employment_type: data.employment_type ?? "",
        reporting_manager: data.reporting_manager ?? "",
      });

      setAvatarUrl(data.avatar ?? null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const fd = new FormData();

      // Only self-editable fields — designation/department/etc. are
      // intentionally excluded (backend ignores them on this route anyway,
      // but we don't even send them to avoid confusion).
      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, value ?? "");
      });

      if (avatarFile) fd.append("avatar", avatarFile);

      const res = await updateMyProfileAPI(fd);
      setAvatarUrl(res.data.data.avatar ?? avatarUrl);
      setAvatarFile(null);
      setAvatarPreview(null);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition focus:border-[#ffbe31] focus:outline-none focus:ring-2 focus:ring-[#ffbe31]/30";

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <SpinnerGap size={32} className="animate-spin text-[#ffbe31]" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      {/* ── Header card: avatar + read-only identity from auth-service ── */}
      <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
        <div className="h-24 bg-gradient-to-r from-[#161616] to-[#2a2a2a]" />
        <div className="flex flex-col items-center gap-4 px-6 pb-6 sm:flex-row sm:items-end">
          <div className="relative -mt-14">
            <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md">
              {avatarPreview || avatarUrl ? (
                <img
                  src={avatarPreview ?? avatarUrl ?? undefined}
                  alt={user?.full_name ?? "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-300">
                  <User size={48} />
                </div>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#ffbe31] text-black shadow-md transition hover:bg-[#e6ab29]"
            >
              <Camera size={16} weight="bold" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          <div className="flex-1 pt-2 text-center sm:pt-0 sm:text-left">
            <h2 className="text-xl font-bold text-gray-900">{user?.full_name || "—"}</h2>
            <div className="mt-1 flex flex-col items-center gap-1 text-sm text-gray-500 sm:flex-row sm:gap-4">
              <span className="flex items-center gap-1.5">
                <EnvelopeSimple size={16} /> {user?.email || "—"}
              </span>
              <span className="flex items-center gap-1.5 capitalize">
                <ShieldCheck size={16} /> {user?.role?.replace("_", " ") || "—"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffbe31] to-[#ff9d00] px-6 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <SpinnerGap size={16} className="animate-spin" /> : <FloppyDisk size={16} weight="bold" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ── Personal Info ── */}
      <Section title="Personal Info" icon={<NotePencil size={18} />}>
        <Field label="Gender" icon={<User size={14} />}>
          <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </Field>
        <Field label="Date of Birth" icon={<CalendarBlank size={14} />}>
          <input
            type="date"
            name="date_of_birth"
            value={form.date_of_birth}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
        <Field label="Bio" icon={<NotePencil size={14} />} full>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
            placeholder="A short note about yourself"
            className={inputClass}
          />
        </Field>
      </Section>

      {/* ── Contact ── */}
      <Section title="Contact" icon={<Phone size={18} />}>
        <Field label="Phone" icon={<Phone size={14} />}>
          <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Alternate Phone" icon={<Phone size={14} />}>
          <input
            name="alternate_phone"
            value={form.alternate_phone}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
      </Section>

      {/* ── Address ── */}
      <Section title="Address" icon={<MapPin size={18} />}>
        <Field label="Address Line 1" icon={<MapPin size={14} />} full>
          <input
            name="address_line1"
            value={form.address_line1}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
        <Field label="Address Line 2" icon={<MapPin size={14} />} full>
          <input
            name="address_line2"
            value={form.address_line2}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
        <Field label="City" icon={<Buildings size={14} />}>
          <input name="city" value={form.city} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="State" icon={<Buildings size={14} />}>
          <input name="state" value={form.state} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Country" icon={<Globe size={14} />}>
          <input name="country" value={form.country} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Postal Code" icon={<MapPin size={14} />}>
          <input
            name="postal_code"
            value={form.postal_code}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
      </Section>

      {/* ── Employment (READ-ONLY — set by manager/CEO only) ── */}
      <Section
        title="Employment"
        icon={<Briefcase size={18} />}
        badge={
          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-500">
            <LockSimple size={12} /> Set by your manager
          </span>
        }
      >
        <Field label="Designation" icon={<IdentificationBadge size={14} />}>
          <ReadOnlyValue value={employment.designation} />
        </Field>
        <Field label="Department" icon={<Buildings size={14} />}>
          <ReadOnlyValue value={employment.department} />
        </Field>
        <Field label="Employee Code" icon={<IdentificationBadge size={14} />}>
          <ReadOnlyValue value={employment.employee_code} />
        </Field>
        <Field label="Date of Joining" icon={<CalendarBlank size={14} />}>
          <ReadOnlyValue value={employment.date_of_joining} />
        </Field>
        <Field label="Employment Type" icon={<Briefcase size={14} />}>
          <ReadOnlyValue value={employment.employment_type} />
        </Field>
        <Field label="Reporting Manager" icon={<User size={14} />}>
          <ReadOnlyValue value={employment.reporting_manager} />
        </Field>
      </Section>

      {/* ── Emergency Contact ── */}
      <Section title="Emergency Contact" icon={<UsersThree size={18} />}>
        <Field label="Name" icon={<User size={14} />}>
          <input
            name="emergency_contact_name"
            value={form.emergency_contact_name}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
        <Field label="Phone" icon={<Phone size={14} />}>
          <input
            name="emergency_contact_phone"
            value={form.emergency_contact_phone}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
        <Field label="Relation" icon={<UsersThree size={14} />}>
          <input
            name="emergency_contact_relation"
            value={form.emergency_contact_relation}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>
      </Section>

      {/* ── Social Links ── */}
      <Section title="Social Links" icon={<Globe size={18} />} last>
        <Field label="LinkedIn" icon={<LinkedinLogo size={14} />}>
          <input
            name="linkedin_url"
            value={form.linkedin_url}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
            className={inputClass}
          />
        </Field>
        <Field label="GitHub" icon={<GithubLogo size={14} />}>
          <input
            name="github_url"
            value={form.github_url}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </Field>
        <Field label="Portfolio" icon={<Globe size={14} />}>
          <input
            name="portfolio_url"
            value={form.portfolio_url}
            onChange={handleChange}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>
      </Section>
    </div>
  );
}