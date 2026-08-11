import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

import {
  FaChartArea,
  FaChartPie,
  FaChartBar,
  FaChartLine,
} from "react-icons/fa";

import VisitorCounter from "../Visitor/VisitorCounter";
// import EventCalendar from "./EventCalendar";
import Employee from "./Employee";
import BirthdayReminder from "../reminder/BirthdayReminder";
import AnniversaryReminder from "../reminder/AnniversaryReminder";

interface CountResponse {
  total: number;
}

interface BlogResponse {
  total: number;
}

export default function Dashboard() {
  const [connectCount, setConnectCount] = useState<number>(0);
  const [blogCount, setBlogCount] = useState<number>(0);
  const [contactCount, setContactCount] = useState<number>(0);

  // =============================
  // FETCH COUNTS
  // =============================
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [connectRes, blogRes, contactRes] =
          await Promise.all([
            fetch(
              "https://ahaan-software-1.onrender.com/api/form/count"
            ),
            fetch(
              "https://ahaansoftware.com/update-json.php?count=1"
            ),
            fetch(
              "https://ahaan-software-1.onrender.com/api/contact/count"
            ),
          ]);

        const connectData: CountResponse =
          await connectRes.json();

        const blogData: BlogResponse =
          await blogRes.json();

        const contactData: CountResponse =
          await contactRes.json();

        setConnectCount(connectData.total);
        setBlogCount(blogData.total);
        setContactCount(contactData.total);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCounts();
  }, []);

  // =============================
  // AREA CHART
  // =============================

  const areaChart = {
    series: [
      {
        name: "Online",
        data: [10, 30, 10, 40, 15, 45],
      },
      {
        name: "Store",
        data: [5, 20, 5, 18, 10, 55],
      },
    ],

    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
      },

      colors: ["#ff7b9b", "#ffbe3d"],

      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: "smooth",
        width: 3,
      },

      fill: {
        type: "gradient",

        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.2,
          stops: [0, 90, 100],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
        ],
      },
    } as ApexOptions,
  };

  // =============================
  // REUSABLE DASHBOARD CARD
  // =============================

  interface DashboardCardProps {
    title: string;
    subtitle: string;
    value: React.ReactNode;
    icon: React.ReactNode;
  }

  const DashboardCard = ({
    title,
    subtitle,
    value,
    icon,
  }: DashboardCardProps) => (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border-l-4
        border-amber-400
        bg-gradient-to-br
        from-[#0c0c0c]
        to-[#3d3d3d]
        p-6
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* Shine */}
      <span
        className="
          absolute
          left-[-180%]
          top-0
          h-full
          w-1/3
          -skew-x-12
          bg-white/20
          animate-[cardShine_3s_linear_infinite]
        "
      />

      {/* Icon */}
      <div
        className="
          absolute
          right-5
          top-5
          text-3xl
         
          transition-all
          duration-300
          group-hover:rotate-6
          group-hover:scale-110
          animate-[floatIcon_3s_ease-in-out_infinite]
        "
      >
        {icon}
      </div>

      <h3
        className="
          relative
          z-10
          text-2xl
          font-bold
          text-amber-400
          transition-all
          duration-300
          group-hover:tracking-wider
        "
      >
        {title}
      </h3>

      <p
        className="
          relative
          z-10
          mt-2
          text-sm
          text-white/80
        "
      >
        {subtitle}
      </p>

      <h2
        className="
          relative
          z-10
          mt-4
          text-3xl
          font-extrabold
          text-white
        "
      >
        {value}
      </h2>
    </div>
  );
    return (
    <>
      <div className="space-y-6">

        {/* ========================= */}
        {/* TOP DASHBOARD CARDS */}
        {/* ========================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {/* Blogs */}
          <DashboardCard
            title="Blogs"
            subtitle="Latest Articles & Updates"
            value={blogCount}
            icon={<FaChartArea style={{ color: "#c7cef9" }}/>}
          />

          {/* Connect */}
          <DashboardCard
            title="Connect"
            subtitle="Client Meeting Requests"
            value={connectCount}
            icon={<FaChartPie   style={{ color: "#d4f9c7" }}/>}
          />

          {/* Contact */}
          <DashboardCard
            title="Contact"
            subtitle="Customer Enquiries & Support"
            value={contactCount}
            icon={<FaChartBar style={{ color: "#f9c7c7" }}/>}
          />

          {/* Visitors */}
          <DashboardCard
            title="Visitors"
            subtitle="Website Traffic Overview"
            value={<VisitorCounter />}
            icon={<FaChartLine style={{ color: "#f9ecc7" }}/>}
          />
        </div>

        {/* ========================= */}
        {/* MAIN CONTENT */}
        {/* ========================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-12
          "
        >
          {/* Left Section */}
          <div className="xl:col-span-8 space-y-6">

            {/* Employee */}
            <Employee />

            {/* Area Chart */}
            <div
              className="
                rounded-2xl
                bg-white
                p-6
                shadow-md
              "
            >
              <div className="mb-5">
                <h3 className="text-xl font-bold text-gray-800">
                  Sales Overview
                </h3>

                <p className="text-sm text-gray-500">
                  Online vs Store Performance
                </p>
              </div>

              <Chart
                options={areaChart.options}
                series={areaChart.series}
                type="area"
                height={340}
              />
            </div>

            {/* Uncomment if needed */}
            {/*
            <div
              className="
                rounded-2xl
                bg-white
                p-5
                shadow-md
              "
            >
              <EventCalendar />
            </div>
            */}
          </div>
                    {/* ========================= */}
          {/* RIGHT SIDEBAR */}
          {/* ========================= */}

          <div className="xl:col-span-4 space-y-6">

            <BirthdayReminder />

            <AnniversaryReminder />

          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* TAILWIND ANIMATIONS */}
      {/* ========================= */}

      <style>
        {`
          @keyframes cardShine {
            0% {
              left: -180%;
            }

            100% {
              left: 180%;
            }
          }

          @keyframes floatIcon {
            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-6px);
            }
          }
        `}
      </style>
    </>
  );
}