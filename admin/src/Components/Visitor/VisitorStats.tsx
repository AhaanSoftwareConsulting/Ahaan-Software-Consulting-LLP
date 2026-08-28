// pages/VisitorStats.tsx
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type RangeType = "daily" | "weekly" | "monthly";

interface StatPoint {
  label: string;
  count: number;
}

export default function VisitorStats() {
  const [range, setRange] = useState<RangeType>("daily");
  const [data, setData] = useState<StatPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://ahaan-software-consulting-llp.onrender.com/api/visitor/stats?range=${range}`
        );
        const json = await res.json();
        setData(json.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [range]);

  const categories = data.map((d) => String(d.label));
  const counts = data.map((d) => d.count);

  // ============================
  // LINE / AREA CHART
  // ============================
  const lineChartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#3b82f6"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { style: { colors: "#6b7280" } },
    },
    yaxis: {
      labels: { style: { colors: "#6b7280" } },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    markers: {
      size: 4,
      colors: ["#3b82f6"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    tooltip: {
      y: { formatter: (val) => `${val} visitors` },
    },
  };

  // ============================
  // DOUGHNUT CHART — top contributing periods
  // ============================
  const sorted = [...data].sort((a, b) => b.count - a.count);
  const top = sorted.slice(0, 4);
  const othersTotal = sorted
    .slice(4)
    .reduce((sum, d) => sum + d.count, 0);

  const doughnutLabels = [
    ...top.map((d) => d.label),
    ...(othersTotal > 0 ? ["Others"] : []),
  ];
  const doughnutSeries = [
    ...top.map((d) => d.count),
    ...(othersTotal > 0 ? [othersTotal] : []),
  ];

  const doughnutOptions: ApexOptions = {
    chart: { type: "donut" },
    labels: doughnutLabels,
    colors: ["#3b82f6", "#ffbe3d", "#22c55e", "#f97373", "#a1a1aa"],
    legend: {
      show: true,
      position: "bottom",
      fontSize: "11px",
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(0)}%`,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: (w) =>
                w.globals.seriesTotals
                  .reduce((a: number, b: number) => a + b, 0)
                  .toString(),
            },
          },
        },
      },
    },
    stroke: { width: 0 },
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header + range toggle */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Visitor Analytics</h1>

        <div className="flex gap-2">
          {(["daily", "weekly", "monthly"] as RangeType[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition
                ${
                  range === r
                    ? "bg-amber-400 text-black"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Main grid: line chart left, doughnut top-right */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Line chart */}
        <div className="rounded-2xl bg-white p-6 shadow-md xl:col-span-8">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Visitor Trend
            </h3>
            <p className="text-sm text-gray-500">
              {range.charAt(0).toUpperCase() + range.slice(1)} visitor count
            </p>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : data.length === 0 ? (
            <p className="text-gray-500">No data available.</p>
          ) : (
            <Chart
              options={lineChartOptions}
              series={[{ name: "Visitors", data: counts }]}
              type="area"
              height={360}
            />
          )}
        </div>

        {/* Doughnut chart */}
        <div className="rounded-2xl bg-white p-6 shadow-md xl:col-span-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Top Contributors
            </h3>
            <p className="text-sm text-gray-500">
              Highest traffic {range === "daily" ? "days" : range === "weekly" ? "weeks" : "months"}
            </p>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : data.length === 0 ? (
            <p className="text-gray-500">No data available.</p>
          ) : (
            <Chart
              options={doughnutOptions}
              series={doughnutSeries}
              type="donut"
              height={300}
            />
          )}
        </div>
      </div>
    </div>
  );
}