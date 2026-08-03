import React, { useEffect, useState, useContext } from "react";
import { FaBell, FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import {
  WiDaySunny,
  WiNightClear,
  WiCloudy,
  WiRainMix,
  WiStormShowers,
  WiSnow,
  WiDayHaze,
} from "react-icons/wi";
import { useNavigate } from "react-router-dom";
import { profileAPI } from "../Api/api";
import { SearchContext } from "../../searchContext";
import "./SidebarTopbar.css";

export default function Topbar() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [weather, setWeather] = useState(null);
  const [user, setUser] = useState(null);

  const { query, setQuery } = useContext(SearchContext);
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();

  const searchData = [
    { id: 1, name: "Dashboard", route: "/" },
    { id: 2, name: "All Blogs", route: "/all-blogs" },
    { id: 3, name: "Add Blog", route: "/add-blogs" },
    { id: 4, name: "Manage Blogs", route: "/manage-blogs" },
    { id: 5, name: "Connect Form", route: "/connect-form" },
    { id: 6, name: "Contact Form", route: "/contact-form" },
    { id: 7, name: "Teams", route: "/view-team" },
    { id: 8, name: "Chat", route: "/chat" },
  ];

  useEffect(() => {
    if (query.trim() === "") return setFiltered([]);

    setFiltered(
      searchData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [query]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileAPI();
        setUser(res.data.user);
      } catch (err) {
        console.log("Profile Error:", err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=082f135195d80501379a461dbad34d4c&units=metric",
        );
        const data = await res.json();
        const hour = new Date().getHours();

        setWeather({
          temp: data.main?.temp,
          desc: data.weather[0]?.main,
          title: data.weather[0]?.description,
          hour,
        });
      } catch (error) {
        console.log("Weather Error:", error);
      }
    };

    fetchWeather();
    const timer = setInterval(fetchWeather, 600000);
    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return null;
    const isNight = weather.hour >= 18 || weather.hour < 6;

    switch (weather.desc) {
      case "Clear":
        return isNight ? (
          <WiNightClear size={35} color="#ffcc00" />
        ) : (
          <WiDaySunny size={35} color="#ffaa00" />
        );
      case "Clouds":
        return <WiCloudy size={35} color="#6b7280" />;
      case "Rain":
        return <WiRainMix size={35} color="#3b82f6" />;
      case "Thunderstorm":
        return <WiStormShowers size={35} color="#facc15" />;
      case "Snow":
        return <WiSnow size={35} color="#93c5fd" />;
      case "Haze":
      case "Mist":
      case "Fog":
        return <WiDayHaze size={35} color="#191c24" />;
      default:
        return <WiCloudy size={35} color="#6b7280" />;
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });

      const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

      const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentDate(`${formattedDate}, ${weekday}`);
      setCurrentTime(time);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
   <div className="topbar-container d-flex flex-column flex-lg-row justify-content-between align-items-lg-center px-3 px-lg-4 py-3 gap-3">
      {/* LEFT SIDE */}
      <div className="d-flex  flex-row align-items-center gap-3">
        {weather && (
          <div className="d-flex align-items-center gap-2 weather-box">
            {getWeatherIcon()}
            <div>
              <span className="fw-bold">{weather.temp}°C</span>
              <br />
              <small className="text-muted">{weather.title}</small>
            </div>
          </div>
        )}

       <div className="d-flex align-items-center justify-content-sm-end justify-content-start gap-2 date-box">
          <FaRegCalendarAlt size={22} />
          <div>
            <span className="fw-bold">{currentDate}</span>
            <br />
            <small className="text-muted">{currentTime}</small>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="d-flex  flex-row align-items-stretch align-items-lg-center gap-3 flex-grow-1">
        {/* SEARCH → FULL WIDTH */}
        <div className="position-relative flex-grow-1 search-wrapper">
          <div className="d-flex align-items-center px-3 py-1 w-100 admin-search-box">
            <FaSearch className="me-2 text-muted" />

            <input
              type="text"
              placeholder="Search by title..."
              className=" w-100"
              value={query}
              style={{
                outline: "none",
                border: "none",
                background: "transparent",
              }}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* {filtered.length > 0 && (
      <ul
        className="position-absolute bg-white  rounded mt-1 p-0 w-100"
        style={{
          listStyle: "none",
          maxHeight: "180px",
          overflowY: "auto",
          zIndex: 999,
        }}
      >
        {filtered.map((item) => (
          <li
            key={item.id}
            className="px-3 py-2 border-bottom"
            style={{ cursor: "pointer" }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    )} */}
        </div>

        {/* USER */}
        <div
  className="d-flex align-items-center justify-content-sm-end justify-content-start profile-box"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/profile")}
        >

          <div className="profile-avatar">
          <img
            src={
              user?.profilePicture
                ? user.profilePicture
                : "https://ahaanmedia.com/asc/All/blog-dp.png"
            }
            width="50"
            height="50"
            className="profile-avatar-img"
            alt="user"
          />

          </div>

          <div>
            <span className="fw-bold">{user?.name || "Loading..."}</span>
            <br />
            <small className="text-warning">{user?.role || "Role"}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
