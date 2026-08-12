import { useEffect } from "react";
import {
  FaEnvelope,
  FaUserTie,
  FaUserShield,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";

import { useAppSelector } from "../app/hook";

interface User {
  _id?: string;
  id?: string;
  name?: string;
  fullName?: string;
  full_name?: string;
  email?: string;
  profilePicture?: string;
  designation?: string;
  role?: string;
  status?: string;
  is_verified?: boolean;
  is_active?: boolean;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
}

export default function Profile() {
  const { user } = useAppSelector(
    (state: any) => state.user
  ) as { user: User | null };

  // 🔍 CONSOLE LOG FOR DEBUGGING - Check your browser console (F12) to see what data is received!
  useEffect(() => {
    console.log("DEBUG: Current User object in Profile component:", user);
  }, [user]);

  if (!user) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="rounded-xl bg-red-50 px-8 py-6 text-lg font-semibold text-red-600 shadow">
          User not found.
        </div>
      </div>
    );
  }

  // Safe field extractions matching your SQL schema and frontend properties
  const displayName = user.name || user.fullName || user.full_name || "User";
  const displayEmail = user.email || "-";
  const displayDesignation = user.designation || "Not specified";
  const displayRole = user.role || "Employee";
  const displayStatus =
    user.status ||
    (user.is_verified ? "Approved" : "Pending Verification");
  const avatarUrl =
    user.profilePicture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=ca8f2b&color=fff`;

  const createdAtDate = user.createdAt || user.created_at;
  const updatedAtDate = user.updatedAt || user.updated_at;

  const formatText = (text?: string) =>
    text
      ?.replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) || "-";

  const InfoCard = ({
    icon,
    title,
    value,
  }: {
    icon: React.ReactNode;
    title: string;
    value: React.ReactNode;
  }) => (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="mb-3 flex items-center gap-2 text-amber-500">
        <span className="text-lg">{icon}</span>

        <span className="text-sm font-semibold uppercase tracking-wide">
          {title}
        </span>
      </div>

      <p className="break-words font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-xl
        "
      >
        {/* Header */}
        <div
          className="
            relative
            bg-gradient-to-r
            from-[#111]
            via-[#2b2b2b]
            to-[#111]
            px-8
            py-10
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              gap-6
              lg:flex-row
            "
          >
            {/* Avatar */}
            <div className="relative">
              <div
                className="
                  absolute
                  inset-0
                  animate-spin
                  rounded-full
                  bg-gradient-to-r
                  from-yellow-400
                  via-amber-500
                  to-yellow-400
                  p-[3px]
                  [animation-duration:5s]
                "
              >
                <div className="h-full w-full rounded-full bg-white" />
              </div>

              <img
                src={avatarUrl}
                alt={displayName}
                className="
                  relative
                  z-10
                  h-36
                  w-36
                  rounded-full
                  object-cover
                "
              />
            </div>

            {/* User Info */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-white">
                {displayName}
              </h1>

              <p className="mt-2 text-lg text-amber-400">
                {formatText(displayDesignation)}
              </p>

              <span
                className={`
                  mt-5
                  inline-flex
                  rounded-full
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  ${
                    displayStatus.toLowerCase() === "approved" || user.is_verified
                      ? "bg-emerald-500 text-white"
                      : "bg-yellow-500 text-black"
                  }
                `}
              >
                {formatText(displayStatus)}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div
          className="
            grid
            gap-6
            p-8
            md:grid-cols-2
          "
        >
          <InfoCard
            icon={<FaEnvelope />}
            title="Email"
            value={displayEmail}
          />

          <InfoCard
            icon={<FaUserTie />}
            title="Designation"
            value={formatText(displayDesignation)}
          />

          <InfoCard
            icon={<FaUserShield />}
            title="Role"
            value={formatText(displayRole)}
          />

          <InfoCard
            icon={<FaCheckCircle />}
            title="Status"
            value={formatText(displayStatus)}
          />

          <InfoCard
            icon={<FaCalendarAlt />}
            title="Account Created"
            value={
              createdAtDate
                ? new Date(createdAtDate).toLocaleDateString()
                : "-"
            }
          />

          <InfoCard
            icon={<FaCalendarAlt />}
            title="Last Updated"
            value={
              updatedAtDate
                ? new Date(updatedAtDate).toLocaleDateString()
                : "-"
            }
          />
        </div>
      </div>
    </div>
  );
}