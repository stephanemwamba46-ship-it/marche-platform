import { Search } from "lucide-react";
import { useState } from "react";
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Recherche :", query);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex items-center bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Rechercher un produit, service ou offre..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="w-full px-2 py-3 outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
}