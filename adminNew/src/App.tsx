import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Topbar from "./Components/Layouts/Topbar";
import Sidebar from "./Components/Layouts/Sidebar";

import Dashboard from "./Components/Pages/Dashboard";

import BlogList from "./Components/Pages/BlogList";
import BlogForm from "./Components/Pages/BlogForm";
import BlogTable from "./Components/Pages/BlogTable";
import EditBlog from "./Components/Pages/EditBlog";
import ViewBlog from "./Components/Pages/ViewBlog";

import ConnectForm from "./Components/Pages/ConnectForm";
import ContactForm from "./Components/Pages/ContactForm";
import Newsletter from "./Components/Pages/Newsletter";

import AddTeam from "./Components/Pages/AddTeam";
import EditTeam from "./Components/Pages/EditTeam";
import ViewTeams from "./Components/Pages/ViewTeams";

import AddDesign from "./Components/Pages/AddDesign";
import ManageDesigns from "./Components/Pages/ManageDesigns";
import EditDesign from "./Components/Pages/EditDesign";

import AddDevelopment from "./Components/Pages/AddDevelopment";
import ManageDevelopments from "./Components/Pages/ManageDevelopments";
import EditDevelopment from "./Components/Pages/EditDevelopment";

import Profile from "./Components/Pages/Profile";

import PageLoader from "./Components/Common/PageLoader";

import { SearchContext } from "./searchContext";

import "apexcharts/dist/apexcharts.css";

function LayoutWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <PageLoader />}

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 min-h-screen min-w-0 overflow-x-hidden bg-slate-50">
          {/* Topbar */}
          <Topbar />

          {/* Page Content */}
          <main className="p-6">
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* Blogs */}
              <Route path="/all-blogs" element={<BlogList />} />
              <Route path="/add-blogs" element={<BlogForm />} />
              <Route path="/manage-blogs" element={<BlogTable />} />
              <Route path="/edit-blog/:id" element={<EditBlog />} />
              <Route path="/view-blog/:id" element={<ViewBlog />} />

              {/* Connect */}
              <Route path="/connect-form" element={<ConnectForm />} />
              <Route path="/contact-form" element={<ContactForm />} />
              <Route path="/newsletter" element={<Newsletter />} />

              {/* Teams */}
              <Route path="/add-team" element={<AddTeam />} />
              <Route path="/edit-team/:id" element={<EditTeam />} />
              <Route path="/view-team" element={<ViewTeams />} />

              {/* Design */}
              <Route path="/add-design" element={<AddDesign />} />
              <Route path="/manage-design" element={<ManageDesigns />} />
              <Route path="/edit-design/:id" element={<EditDesign />} />

              {/* Development */}
              <Route
                path="/add-development"
                element={<AddDevelopment />}
              />
              <Route
                path="/manage-development"
                element={<ManageDevelopments />}
              />
              <Route
                path="/edit-development/:id"
                element={<EditDevelopment />}
              />

              {/* Profile */}
              <Route path="/profile" element={<Profile />} />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div className="flex h-96 items-center justify-center">
                    <h2 className="text-3xl font-bold text-gray-600">
                      404 - Page Not Found
                    </h2>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LayoutWrapper />} />
        </Routes>
      </BrowserRouter>
    </SearchContext.Provider>
  );
}