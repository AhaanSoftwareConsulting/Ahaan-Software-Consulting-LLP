import {
  FaEnvelope,
  FaUserTie,
  FaUserShield,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";

import { useAppSelector } from "../app/hook";

interface User {
  name: string;
  email: string;
  profilePicture: string;
  designation: string;
  role: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Profile() {
  const { user } = useAppSelector(
    (state: any) => state.user
  ) as { user: User | null };

  if (!user) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="rounded-xl bg-red-50 px-8 py-6 text-lg font-semibold text-red-600 shadow">
          User not found.
        </div>
      </div>
    );
  }

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

      <p className="break-words text-gray-800 font-semibold">
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
                src={user.profilePicture}
                alt={user.name}
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
                {user.name}
              </h1>

              <p className="mt-2 text-lg text-amber-400">
                {formatText(user.designation)}
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
                    user.status === "approved"
                      ? "bg-emerald-500 text-white"
                      : "bg-yellow-500 text-black"
                  }
                `}
              >
                {formatText(user.status)}
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
            value={user.email}
          />

          <InfoCard
            icon={<FaUserTie />}
            title="Designation"
            value={formatText(user.designation)}
          />

          <InfoCard
            icon={<FaUserShield />}
            title="Role"
            value={formatText(user.role)}
          />

          <InfoCard
            icon={<FaCheckCircle />}
            title="Status"
            value={formatText(user.status)}
          />

          <InfoCard
            icon={<FaCalendarAlt />}
            title="Account Created"
            value={
              user.createdAt
                ? new Date(
                    user.createdAt
                  ).toLocaleDateString()
                : "-"
            }
          />

          <InfoCard
            icon={<FaCalendarAlt />}
            title="Last Updated"
            value={
              user.updatedAt
                ? new Date(
                    user.updatedAt
                  ).toLocaleDateString()
                : "-"
            }
          />
        </div>
      </div>
    </div>
  );
}