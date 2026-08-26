import { useContext, useEffect, useState } from "react";
import {
  FaRegCalendarAlt,
  FaSearch,
} from "react-icons/fa";
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

import { getMyProfileAPI } from "../Api/Profileapi";
import { profileAPI } from "../Api/userapi";
import { SearchContext } from "../../searchContext";

interface Weather {
  temp: number;
  desc: string;
  title: string;
  hour: number;
}

interface User {
  _id?: string;
  full_name: string;
  role: string;
}
interface Profile {
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
  avatar?:string,
  designation?:string
}

export default function Topbar() {
  const navigate = useNavigate();

  const { query, setQuery } = useContext(SearchContext);

  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  const [weather, setWeather] =
    useState<Weather | null>(null);

  const [user, setUser] =
    useState<User | null>(null);

  const [filtered, setFiltered] = useState<
    { id: number; name: string; route: string }[]
  >([]);
  const [profile, setProfile]=useState<Profile|null>(null)


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
    if (!query.trim()) {
      setFiltered([]);
      return;
    }

    setFiltered(
      searchData.filter((item) =>
        item.name
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    );
  }, [query]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileAPI();
        console.log("FETCH USER:", res)
        setUser(res.data);
      } catch (error) {
        console.log(error);
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

        setWeather({
          temp: data.main.temp,
          desc: data.weather[0].main,
          title: data.weather[0].description,
          hour: new Date().getHours(),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeather();

    const timer = setInterval(fetchWeather, 600000);

    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return null;

    const isNight =
      weather.hour >= 18 || weather.hour < 6;

    switch (weather.desc) {
      case "Clear":
        return isNight ? (
          <WiNightClear
            size={34}
            className="text-yellow-400"
          />
        ) : (
          <WiDaySunny
            size={34}
            className="text-orange-400"
          />
        );

      case "Clouds":
        return (
          <WiCloudy
            size={34}
            className="text-gray-500"
          />
        );

      case "Rain":
        return (
          <WiRainMix
            size={34}
            className="text-blue-500"
          />
        );

      case "Thunderstorm":
        return (
          <WiStormShowers
            size={34}
            className="text-yellow-500"
          />
        );

      case "Snow":
        return (
          <WiSnow
            size={34}
            className="text-sky-300"
          />
        );

      case "Haze":
      case "Mist":
      case "Fog":
        return (
          <WiDayHaze
            size={34}
            className="text-gray-700"
          />
        );

      default:
        return (
          <WiCloudy
            size={34}
            className="text-gray-500"
          />
        );
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();

      setCurrentDate(
        `${date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })}, ${date.toLocaleDateString("en-US", {
          weekday: "long",
        })}`
      );

      setCurrentTime(
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(()=>{
    const fetchProfile=async()=>{
      try{
        const res=await getMyProfileAPI();
        setProfile(res.data.data)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchProfile();
  }, [])

  return (
    <div className="w-full rounded-2xl bg-white p-4 ">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* LEFT */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Weather */}
          <div className="flex min-w-[210px] items-center gap-3 rounded-xl border border-gray-100 bg-gradient-to-r from-[#fff] to-[#fd9c00cb] px-4 py-3">
            {getWeatherIcon()}

            <div>
              <p className="text-lg font-bold text-gray-800">
                {weather?.temp ? `${Math.round(weather.temp)}°C` : "--"}
              </p>

              <p className="text-xs capitalize text-gray-500">
                {weather?.title || "Loading..."}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex min-w-[220px] items-center gap-3 rounded-xl border border-gray-100 bg-gradient-to-r from-[#fff] to-[#fd9c00cb] px-4 py-3">
            <FaRegCalendarAlt
              size={22}

            />

            <div>
              <p className="font-semibold text-gray-800">
                {currentDate}
              </p>

              <p className="text-sm text-gray-500">
                {currentTime}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:flex-1">
          {/* Search */}
          <div className="relative flex-1">
            <div className="flex h-12 items-center rounded-xl border border-gray-200 bg-white px-4 shadow-sm">
              <FaSearch className="mr-3 text-gray-400" />

              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Search Result */}
            {filtered.length > 0 && (
              <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(item.route);
                      setQuery("");
                    }}
                    className="block w-full border-b border-gray-100 px-4 py-3 text-left text-sm transition hover:bg-amber-50 hover:text-amber-600"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition hover:border-amber-300 hover:shadow-lg"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 animate-spin rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 p-[2px] [animation-duration:4s]">
                <div className="h-full w-full rounded-full bg-white"></div>
              </div>

              <img
                src={
                  profile?.avatar ||
                  "https://ahaanmedia.com/asc/All/blog-dp.png"
                }
                alt="profile"
                className="relative z-10 h-14 w-14 rounded-full object-cover"
              />
            </div>

            <div className="hidden text-left sm:block">
              <h4 className="font-semibold text-gray-800">
                {user?.full_name || "Loading..."}
              </h4>

              <p className="text-sm capitalize text-amber-500">
                {profile?.designation || user?.role?.replace("_", " ") || "Role"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}