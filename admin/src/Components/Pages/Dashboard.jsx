import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./Dashboard.css";

import {
  FaChartArea,
  FaChartPie,
  FaChartBar,
  FaChartLine,
} from "react-icons/fa";
import VisitorCounter from "../Visitor/VisitorCounter";
import EventCalendar from "./EventCalendar";
import Employee from "./Employee";
import BirthdayReminder from "../reminder/BirthdayReminder";
import AnniversaryReminder from "../reminder/AnniversaryReminder";

const Dashboard = () => {
  const [connectCount, setConnectCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [contactCount, setContactCount] = useState(0); // <-- NEW

  // FETCH COUNTS
  useEffect(() => {
    // FORM COUNT
    fetch("https://ahaan-software-1.onrender.com/api/form/count")
      .then((res) => res.json())
      .then((data) => setConnectCount(data.total))
      .catch((err) => console.error("Connect Error:", err));

    // BLOG COUNT
    fetch("https://ahaansoftware.com/update-json.php?count=1")
      .then((res) => res.json())
      .then((data) => setBlogCount(data.total))
      .catch((err) => console.error("Blog Error:", err));

    // CONTACT COUNT
    fetch("https://ahaan-software-1.onrender.com/api/contact/count")
      .then((res) => res.json())
      .then((data) => setContactCount(data.total))
      .catch((err) => console.error("Contact Error:", err));
  }, []);

  // AREA CHART
  const areaChart = {
    series: [
      { name: "Online", data: [10, 30, 10, 40, 15, 45] },
      { name: "Store", data: [5, 20, 5, 18, 10, 55] },
    ],
    options: {
      chart: { type: "area", toolbar: { show: false } },
      colors: ["#ff7b9b", "#ffbe3d"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.2,
          stops: [0, 90, 100],
        },
      },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    },
  };

  return (
    <div className="container-fluid px-3 py-4">
      {/* TOP CARDS */}
      <div className="row g-4 mb-4">
        {/* Blogs */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="dash-card pink-card p-3 text-white rounded-4 position-relative">
            <FaChartArea
              size={30}
              className="position-absolute"
              style={{ top: 20, right: 20, color: "#c7cef9" }}
            />
            <h4 className="dashboard-heading">Blogs</h4>
            <p className="dashboard-subheading">Latest Articles & Updates</p>
            <h3 className="dashboard-count">{blogCount}</h3>
          </div>
        </div>

        {/* Connect */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="dash-card purple-card p-3 text-white rounded-4 position-relative">
            <FaChartPie
              size={30}
              className="position-absolute"
              style={{ top: 20, right: 20, color: "#d4f9c7" }}
            />
            <h4 className="dashboard-heading">Connect</h4>
            <p className="dashboard-subheading">Client Meeting Requests</p>
            <h3 className="dashboard-count">{connectCount}</h3>
          </div>
        </div>

        {/* Contact */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="dash-card blue-card p-3 text-white rounded-4 position-relative">
            <FaChartBar
              size={30}
              className="position-absolute"
              style={{ top: 20, right: 20, color: "#f9c7c7" }}
            />
            <h4 className="dashboard-heading">Contact</h4>
            <p className="dashboard-subheading">Customer Enquiries & Support</p>

            {/* 🔥 DYNAMIC CONTACT COUNT HERE */}
            <h3 className="dashboard-count">{contactCount}</h3>
          </div>
        </div>

        {/* Visitor */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="dash-card orange-card p-3 text-white rounded-4 position-relative">
            <FaChartLine
              size={30}
              className="position-absolute"
              style={{ top: 20, right: 20, color: "#f9ecc7" }}
            />
            <h4 className="dashboard-heading">Visitor</h4>
            <p className="dashboard-subheading">Website Traffic Overview</p>
            <h3 className="dashboard-count">
              <VisitorCounter />
            </h3>
          </div>
        </div>
      </div>

      {/* MAIN CHARTS */}
      <div className="row g-4">
        <div className="col-md-8">
          <Employee />
        </div>

        <div className="col-md-4">
          {/* <EventCalendar/> */}
          <BirthdayReminder />
          <AnniversaryReminder />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
