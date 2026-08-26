import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyProfileAPI } from "../Api/Profileapi";

import {
  FaBars,
  FaUsers,
} from "react-icons/fa";

import {
  FaCodeCompare,
  FaRegPaperPlane,
} from "react-icons/fa6";

import {
  RxDashboard,
} from "react-icons/rx";

import {
  RiBloggerLine,
  RiFileCloseFill,
} from "react-icons/ri";

import {
  TiDocumentAdd,
} from "react-icons/ti";

import {
  MdManageSearch,
  MdOutlineDesignServices,
  MdPendingActions,
} from "react-icons/md";

import {
  HiClipboardCheck,
} from "react-icons/hi";

import {
  IoMdLogOut,
} from "react-icons/io";

import {
  GrConnect,
  GrContactInfo,
} from "react-icons/gr";

import { useAppDispatch, useAppSelector } from "../app/hook";
import { logoutUser } from "../features/user/userSlice";
import { UserCircle, Briefcase } from "@phosphor-icons/react";

interface MenuItem {
  label?: string;
  path?: string;
  icon?: React.ReactNode;
  section?: string;
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile]=useState<any>(null)

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { user } = useAppSelector(
    (state) => state.user
  );
 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await getMyProfileAPI();

      setProfile(res.data.data);

    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  if (user) {
    fetchProfile();
  }
}, [user]);



  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUser());

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <RxDashboard />,
      path: "/",
    },
    {
      label: "My Profile",
      icon: <UserCircle />,
      path: "/profile",
    },

   
  ];

if (["manager", "ceo", "hr"].includes(user?.role ?? "")) {
    menuItems.push(
       {
      section: "Blog",
    },

    {
      label: "All Blogs",
      icon: <RiBloggerLine />,
      path: "/all-blogs",
    },

    {
      label: "Add Blogs",
      icon: <TiDocumentAdd />,
      path: "/add-blogs",
    },

    {
      label: "Manage Blogs",
      icon: <MdManageSearch />,
      path: "/manage-blogs",
    },

    {
      section: "Connect",
    },

    {
      label: "Connect Form",
      icon: <GrConnect />,
      path: "/connect-form",
    },

    {
      label: "Contact Us Form",
      icon: <GrContactInfo />,
      path: "/contact-form",
    },

    {
      label: "Newsletter Form",
      icon: <FaRegPaperPlane />,
      path: "/newsletter",
    },
    )
  }

  if(["manager", "ceo", "employee"].includes(user?.role?? "") || profile?.designation==='designer'){
    menuItems.push(
{
      section: "Designfolio",
    },

    {
      label: "Add Design",
      icon: <MdOutlineDesignServices />,
      path: "/add-design",
    },

    {
      label: "Manage Design",
      icon: <FaCodeCompare />,
      path: "/manage-design",
    },
  )
  }
  
  if(["manager", "ceo", "employee"].includes(user?.role?? "") || profile?.designation==='developer'){
    menuItems.push(
      {
      section: "Devfolio",
    },

    {
      label: "Add Development",
      icon: <MdOutlineDesignServices />,
      path: "/add-development",
    },

    {
      label: "Manage Development",
      icon: <FaCodeCompare />,
      path: "/manage-development",
    },

    {
      label: "Add Marketing",
      icon: <MdOutlineDesignServices />,
      path: "/add-social",
    },

    {
      label: "Manage Marketing",
      icon: <FaCodeCompare />,
      path: "/manage-social",
    },

    {
      label: "Add AppDevelopment",
      icon: <MdOutlineDesignServices />,
      path: "/add-app",
    },

    {
      label: "Manage AppDevelopment",
      icon: <FaCodeCompare />,
      path: "/manage-app",
    },
  )}

  if (["manager", "ceo", "hr"].includes(user?.role ?? "")) {
    menuItems.push(


      { section: "User Management" },
      { label: "View Teams", icon: <FaUsers />, path: "/view-team" },
      { label: "Pending Users", icon: <MdPendingActions />, path: "/pending-users" },
      { label: "Approved Users", icon: <HiClipboardCheck />, path: "/approved-users" },
      { label: "Rejected Users", icon: <RiFileCloseFill />, path: "/rejected-users" },
      { label: "Manage Employees", icon: <Briefcase />, path: "/manage-employees" }
    );
  }
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 xl:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Toggle */}
      <div className="bg-[#161616] p-3 text-white xl:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-white/20 p-2 transition hover:bg-white/10"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed left-0 top-0 z-50 flex h-screen w-[260px]
        flex-col bg-[#161616] text-white
        transition-transform duration-300
        xl:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Logo */}
        <div className="border-b border-white/10 p-5">
          <img
            src="https://ahaanmedia.com/asc/layouts/asc.png"
            alt="ASC Logo"
            className="w-36"
          />
        </div>

        {/* Scrollable Menu */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              if (item.section) {
                return (
                  <li
                    key={index}
                    className="mt-5 mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-gray-400"
                  >
                    {item.section}
                  </li>
                );
              }


              return (
                <li key={index}>
                  <NavLink
                    to={item.path!}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl shine-btn px-4 py-3
            text-sm font-medium transition-all duration-300
            ${isActive
                        ? "bg-gradient-to-r from-[#fff] to-[#ff9d00] text-black shadow-lg "
                        : "text-white hover:bg-[#222] hover:text-[#ffbe31]"
                      }`
                    }
                  >
                    <span className="text-lg">
                      {item.icon}
                    </span>

                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 font-semibold text-white transition hover:scale-[1.02]"
          >
            <IoMdLogOut className="mr-2 text-xl transition-transform duration-300 group-hover:-rotate-12" />

            Logout
          </button>
        </div>
      </aside>

      <div className="hidden w-[260px] xl:block" />

      <style>
        {`
    @keyframes shine {
      from {
        left:-120%;
      }
      to {
        left:140%;
      }
    }
  `}
      </style>

    </>
  );

}