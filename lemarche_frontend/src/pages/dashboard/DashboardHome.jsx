import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import {
  Sun,
  Moon,
  User,
  Wallet,
  CalendarDays,
  Users,
  BarChart3,
  Rocket,
  TrendingUp,
  Mail,
  HelpCircle,
  Globe,
  LogOut
} from "lucide-react";
export default function DashboardHome() {
  const {user} =
    useOutletContext();
  const [showMenu, setShowMenu] =
    useState(false);
  const [darkMode, setDarkMode] =
    useState(false);
  const [stats, setStats] =
    useState({
      total_earnings: 0,
      total_sales: 0,
      products_stats: [],
      growth: []
    });
  const [showAll, setShowAll] =
    useState(false);
  // 🕐 SALUTATION
  const hour = new Date().getHours();
  let greeting = "Bonjour";
  if (hour >= 13)
    greeting = "Bon après-midi";
  if (hour < 5)
    greeting = "Bonne nuit";
  // 🌙 DARK MODE
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  // 📡 FETCH DASHBOARD
  useEffect(() => {
    const fetchDashboard =
      async () => {
      try {
        const token =
          localStorage.getItem("access");
        const res =
          await axios.get(
            "http://127.0.0.1:8000/api/earnings/dashboard/",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );
        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboard();
  }, []);
  // 📊 Revenus 7 jours
  const last7DaysTotal =
    stats.growth?.reduce(
      (acc, day) =>
        acc + day.earnings,
      0
    ) || 0;
  // ⭐ Produits affichés
  const displayedProducts =
    showAll
      ? stats.products_stats
      : stats.products_stats?.slice(0,1);
  return (
    <div className="
      bg-white
      min-h-screen
      px-8
      pt-6
      pb-6
    ">
      {/* 🔝 TOP */}
      <div className="
        flex
        justify-between
        items-center
        mb-4
      ">
        {/* 👋 SALUTATION */}
        <h1 className="
          text-4xl
          font-bold
          text-gray-1000
        ">
          {greeting} {user?.username || "Utilisateur"}☀️
        </h1>
        {/* 🌙 DARK + PROFILE */}
        <div className="
          flex
          items-center
          gap-4
        ">
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
              dark:hover:bg-gray-800
            "
          >
            {darkMode
              ? <Sun size={20} />
              : <Moon size={20} />
            }
          </button>
          <div className="relative">
  {/* AVATAR */}
  <div
    onClick={() =>
      setShowMenu(!showMenu)
    }
    className="
      w-10
      h-10
      rounded-full
      bg-gradient-to-r
      from-indigo-600
      to-blue-600
      flex
      items-center
      justify-center
      text-white
      cursor-pointer
    "
  >
    <User size={20} />
  </div>
  {/* MENU PROFIL AMÉLIORÉ */}
{showMenu && (
  <div
    className="
      absolute
      right-0
      mt-2
      w-64
      bg-white
      rounded-xl
      shadow-lg
      border
      z-50
      overflow-hidden
    "
  >
    {/* USER */}
    <div className="
      px-4
      py-3
      border-b
    ">
      <p className="
        text-sm
        font-semibold
      ">
        {user?.username || "Utilisateur"}
      </p>
      <p className="
        text-xs
        text-gray-500
        flex
        items-center
        gap-1
        mt-1
      ">
        <Mail size={14} />
        {user?.email || "email@example.com"}
      </p>
    </div>
    {/* MON PROFIL */}
    <button
      onClick={() => {
        window.location.href =
        "/dashboard/profile";
      }}
      className="
        w-full
        flex
        items-center
        gap-2
        px-4
        py-2
        text-sm
        hover:bg-gray-100
      "
    >
      <User size={16} />
      Mon profil
    </button>
    {/* CENTRE D'AIDE */}
    <button
      onClick={() => {
        window.location.href =
        "/dashboard/help";
      }}
      className="
        w-full
        flex
        items-center
        gap-2
        px-4
        py-2
        text-sm
        hover:bg-gray-100
      "
    >
      <HelpCircle size={16} />
      Centre d’aide
    </button>
    {/* LANGUE */}
    <div
      className="
        px-4
        py-3
        border-t
      "
    >
      <div className="
        flex
        items-center
        gap-2
        text-sm
        mb-2
      ">
        <Globe size={16} />
        Langue
      </div>
      <select
        className="
          w-full
          border
          rounded-lg
          px-2
          py-1
          text-sm
        "
      >
        <option>
          🇫🇷 Français
        </option>
        <option>
          🇬🇧 English
        </option>
      </select>
    </div>
    {/* LOGOUT */}
    <button
      onClick={() => {
        localStorage.removeItem("access");
        window.location.href =
        "/login";
      }}
      className="
        w-full
        flex
        items-center
        gap-2
        px-4
        py-2
        text-sm
        text-red-600
        hover:bg-gray-100
        border-t
      "
    >
      <LogOut size={16} />
      Déconnexion
    </button>
  </div>
)}
</div>
        </div>
      </div>
      {/* DESCRIPTION */}
      <p className="
        text-gray-500
        mb-8
      ">
        Voici un aperçu complet sur toutes vos activités 📊
      </p>
      {/* ACTIONS */}
      <div className="
        flex
        gap-4
        mb-8
        flex-wrap
      ">
        <QuickButton
          icon={<BarChart3 size={18} />}
          label="Explorer statistiques"
        />
        <QuickButton
          icon={<Rocket size={18} />}
          label="Optimiser ventes"
        />
        <QuickButton
          icon={<TrendingUp size={18} />}
          label="Voir performance"
        />
      </div>
      {/* CARDS */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mb-10
      ">
        <StatCard
          icon={<Wallet size={22} />}
          value={`${stats.total_earnings} CDF`}
          label="Revenu total"
        />
        <StatCard
          icon={<CalendarDays size={22} />}
          value={`${last7DaysTotal} CDF`}
          label="7 derniers jours"
        />
        <StatCard
          icon={<Users size={22} />}
          value={stats.total_sales}
          label="Nombre total de ventes"
        />
      </div>
      {/* PRODUITS */}
      <div>
        <div className="
          flex
          justify-between
          items-center
          mb-4
        ">
          <h2 className="
            text-xl
            font-semibold
          ">
            Produits les plus vendus
          </h2>
          <button
            onClick={() =>
              setShowAll(!showAll)
            }
            className="
              border
              px-4
              py-2
              rounded-lg
              text-sm
              hover:bg-gray-100
            "
          >
            {showAll
              ? "Réduire"
              : "Voir plus"
            }
          </button>
        </div>
        <div className="
          bg-gray-100
          rounded-xl
          p-4
          space-y-2
        ">
          {displayedProducts?.length > 0 ? (
            displayedProducts.map(
              (product, index) => (
                <div
                  key={index}
                  className="
                    flex
                    justify-between
                  "
                >
                  <span className="font-medium">
                    {product.product_name}
                  </span>
                  <span className="text-gray-500">
                    {product.sales_count} ventes
                  </span>
                </div>
              ))
          ) : (
            <p className="
              text-gray-500
              text-center
            ">
              Aucune donnée disponible
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
/* QUICK BUTTON */
function QuickButton({
  icon,
  label
}) {
  return (
    <button className="
      flex
      items-center
      gap-2
      border
      rounded-full
      px-4
      py-2
      text-sm
      hover:bg-gray-100
    ">
      {icon}
      {label}
    </button>
  );
}
/* CARD */
function StatCard({
  icon,
  value,
  label
}) {
  return (
    <div className="
      bg-gray-100
      rounded-2xl
      p-6
      min-h-[130px]
      flex
      flex-col
      justify-between
    ">
      <div className="text-gray-500">
        {icon}
      </div>
      <div className="
        text-3xl
        font-bold
      ">
        {value}
      </div>
      <div className="
        text-sm
        text-gray-500
      ">
        {label}
      </div>
    </div>
  );
}