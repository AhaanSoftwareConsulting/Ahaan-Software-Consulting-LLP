import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { logoutUser } from "../features/user/userSlice";   // <-- ADD THIS
import { FaBars } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { RiBloggerLine } from "react-icons/ri";
import { TiDocumentAdd } from "react-icons/ti";
import { MdManageSearch } from "react-icons/md";
import { GrConnect, GrContactInfo } from "react-icons/gr";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaCodeCompare } from "react-icons/fa6";
import { TiUserAdd } from "react-icons/ti";
import { FaUsers } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import "./SidebarTopbar.css";
import { toast } from "react-toastify";
import { MdPendingActions } from "react-icons/md";
import { HiClipboardCheck } from "react-icons/hi";
import { RiFileCloseFill } from "react-icons/ri";
import { FaRegPaperPlane } from "react-icons/fa6";


const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  // 🔥 LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUser());

      if (res?.meta?.requestStatus === "fulfilled") {
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const gradient = {
    background: "linear-gradient(90deg, #ffbe31, #ff9d00)",
    color: "#000",
    fontWeight: "600",
  };

  const menuStyle = {
    padding: "10px 15px",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
  };

  const menuItems = [
    { label: "Dashboard", icon: <RxDashboard className="me-2" />, path: "/" },

    { section: "Blog" },
    { label: "All Blogs", icon: <RiBloggerLine className="me-2" />, path: "/all-blogs" },
    { label: "Add Blogs", icon: <TiDocumentAdd className="me-2" />, path: "/add-blogs" },
    { label: "Manage Blogs", icon: <MdManageSearch className="me-2" />, path: "/manage-blogs" },

    { section: "Connect" },
    { label: "Connect Form", icon: <GrConnect className="me-2" />, path: "/connect-form" },
    { label: "Contact Us Form", icon: <GrContactInfo className="me-2" />, path: "/contact-form" },
    { label: "Newsletter Form", icon: <FaRegPaperPlane className="me-2" />, path: "/newsletter" },


    { section: "Designfolio" },
    { label: "Add Design", icon: <MdOutlineDesignServices className="me-2" />, path: "/add-design" },
    { label: "Manage Design", icon: <FaCodeCompare className="me-2" />, path: "/manage-design" },

    { section: "Devfolio" },
    { label: "Add Development", icon: <MdOutlineDesignServices className="me-2" />, path: "/add-development" },
    { label: "Manage Development", icon: <FaCodeCompare className="me-2" />, path: "/manage-development" },

    { section: "Teams" },
    { label: "Add Teams", icon: <TiUserAdd className="me-2" />, path: "/add-team" },
    { label: "View Teams", icon: <FaUsers className="me-2" />, path: "/view-team" },
  ];

  if (user?.role === "super_admin") {
  menuItems.push(
    { section: "User Management" },
    {
      label: "Pending Users",
      icon: <MdPendingActions className="me-2" />,
      path: "/pending-users",
    },
    {
      label: "Approved Users",
      icon: <HiClipboardCheck className="me-2" />,
      path: "/approved-users",
    },
    {
      label: "Rejected Users",
      icon: <RiFileCloseFill className="me-2" />,
      path: "/rejected-users",
    }
  );
}

  return (
    <>
      {/* Scrollbar Hide CSS */}
      <style>
        {`
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {/* Overlay */}
{open && (
  <div
    className="d-xl-none position-fixed top-0 start-0 w-100 h-100"
    style={{
      background: "rgba(0,0,0,0.4)",
      zIndex: 999,
    }}
    onClick={() => setOpen(false)}
  />
)}

      {/* Mobile Toggle */}
      <div className="d-xl-none bg-dark text-white p-2">
        <button className="btn btn-outline-light" onClick={() => setOpen(!open)}>
          <FaBars size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`text-white d-flex flex-column sidebar-transition ${
          open ? "d-block" : "d-none"
        } d-xl-flex`}
        style={{
          width: "100%",
          maxWidth: "200px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "#161616ff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <div className="p-3 text-left">
          <img
            src="https://ahaanmedia.com/asc/layouts/asc.png"
            alt="ASC Logo"
            className="img-fluid"
            style={{ maxWidth: "150px" }}
          />
        </div>

        {/* Scrollable Area */}
        <div
          className="hide-scrollbar"
          style={{ flexGrow: 1, overflowY: "auto", paddingRight: "5px" }}
        >
          <ul className="nav flex-column mt-2 px-2">
            {menuItems.map((item, i) =>
              item.section ? (
                <React.Fragment key={i}>
                
                  <div
                    className="text-uppercase font-size-12 mt-2 px-2"
                    style={{
                      color: "#ffbe31ff",
                      fontWeight: "700",
                      letterSpacing: "2px",
                      lineHeight: "40px",
                    }}
                  >
                    {item.section}
                  </div>
                </React.Fragment>
              ) : (
                <li key={i} className="nav-item">
                  <NavLink
                    to={item.path}
                    className="nav-link"
                    style={({ isActive }) => ({
                      ...menuStyle,
                      ...(isActive ? gradient : {}),
                      color: isActive ? "#000" : "#fff",
                      fontSize: "13px",
                    })}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = gradient.background;
                      e.currentTarget.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      if (window.location.pathname === item.path) {
                        e.currentTarget.style.background = gradient.background;
                        e.currentTarget.style.color = "#000";
                      } else {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Bottom Logout */}
        <div
          style={{
            padding: "15px",
            borderTop: "1px solid #333",
            background: "#161616ff",
          }}
        >
          <button
            className="logout-btn"
            onClick={handleLogout}
          
          >
            <IoMdLogOut /> Logout
          </button>
        </div>
      </div>

      <div className="d-none d-xl-block" style={{ width: "200px" }}></div>
    </>
  );
};

export default Sidebar;
