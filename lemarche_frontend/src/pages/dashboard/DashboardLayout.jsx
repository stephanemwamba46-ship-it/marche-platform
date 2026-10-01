import Sidebar from "../../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function DashboardLayout() {
  const [user, setUser] =
    useState(null);
  useEffect(() => {
    const token =
      localStorage.getItem("access") ||
      sessionStorage.getItem("access");
    if (!token) return;
    axios.get(
      "http://127.0.0.1:8000/api/users/my-profile/",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.log(
        "Erreur user:",
        err
      );
    });
  }, []);
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main */}
      <div className="
        flex-1
        ml-64
        min-h-screen
        bg-gray-50
        dark:bg-gray-950
      ">
        <div className="p-6">
          {/* 🔥 IMPORTANT */}
          <Outlet context={{ user }} />
        </div>
      </div>
    </div>
  );
}