import { useEffect, useState } from "react";
import api from "../api/axios";
export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchDashboard();
  }, []);
  const fetchDashboard = async () => {
    try {
      const response = await api.get(
        "/earnings/dashboard/"
      );
      setData(response.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };
  if (!data) {
    return <p>Loading dashboard...</p>;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        📊 Seller Dashboard
      </h1>
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 💰 Earnings */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-gray-500">
            Total Earnings
          </h2>
          <p className="text-2xl font-bold">
            ${data.total_earnings}
          </p>
        </div>
        {/* 📦 Sales */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-gray-500">
            Total Sales
          </h2>
          <p className="text-2xl font-bold">
            {data.total_sales}
          </p>
        </div>
        {/* 🛒 Products */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-gray-500">
            Products Sold
          </h2>
          <p className="text-2xl font-bold">
            {data.total_products_sold}
          </p>
        </div>
      </div>
      {/* 📈 GROWTH */}
      <div className="bg-white shadow rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">
          📈 Growth (7 days)
        </h2>
        <ul>
          {data.growth.map((g, index) => (
            <li key={index}>
              {g.date} — ${g.earnings}
            </li>
          ))}
        </ul>
      </div>
      {/* 📊 PRODUCTS TABLE */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">
          📊 Products Stats
        </h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">
                Product
              </th>
              <th className="p-2 text-left">
                Sales
              </th>
              <th className="p-2 text-left">
                Earnings
              </th>
            </tr>
          </thead>
          <tbody>
            {data.products_stats.map((p, index) => (
              <tr key={index}>
                <td className="p-2">
                  {p.product_name}
                </td>
                <td className="p-2">
                  {p.sales_count}
                </td>
                <td className="p-2">
                  ${p.earnings_total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}