import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-orange-500 p-2 rounded-xl text-white">
            <ShoppingCart size={24} />
          </div>
          <span className="text-2xl font-bold text-gray-800">
            Marché
          </span>
        </div>
        {/* MENU */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#features" className="hover:text-orange-500">
            Fonctionnalités
          </a>
          <a href="#how" className="hover:text-orange-500">
            Comment ça marche
          </a>
          <a href="#contact" className="hover:text-orange-500">
            Contact
          </a>
        </nav>
        {/* BUTTONS */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-orange-500"
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold transition"
          >
            Commencer
          </Link>
        </div>
      </div>
    </header>
  );
}