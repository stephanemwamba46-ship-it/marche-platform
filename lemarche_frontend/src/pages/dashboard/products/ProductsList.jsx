import { useEffect, useState } from "react";
import {
  Plus,
  MoreVertical,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";
import ProductActionsMenu from "../../../components/dashboard/products/ProductActionsMenu";
export default function ProductsList() {
  const navigate =
    useNavigate();
  const [products, setProducts] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [search, setSearch] =
    useState("");
  // 📡 Charger produits
  const fetchProducts =
    async () => {
      try {
        const response =
          await API.get(
            "/products/my_products/"
          );
        setProducts(
          response.data
        );
      } catch (error) {
        console.log(
          "PRODUCTS ERROR:",
          error.response?.data
        );
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchProducts();
  }, []);
  // 🔎 Filtrer produits
  const filteredProducts =
    products.filter(p =>
      p.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
  if (loading) {
    return (
      <div className="p-8">
        Chargement...
      </div>
    );
  }
  return (
    <div className="
      max-w-4xl
      mx-auto
    ">
      {/* HEADER */}
      <div className="mb-6">
        <button
          onClick={() =>
            navigate(
              "/dashboard/products/create"
            )
          }
          className="
            w-full
            bg-sky-500
            hover:bg-sky-600
            text-white
            py-3
            rounded-xl
            font-semibold
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <Plus size={18} />
          Ajouter un produit
        </button>
      </div>
      {/* SEARCH */}
      <div className="
        mb-4
        relative
      ">
        <Search
          className="
            absolute
            left-3
            top-3
            text-gray-400
          "
          size={18}
        />
        <input
          type="text"
          placeholder="Rechercher"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            pl-10
            pr-4
            py-3
            border
            rounded-xl
            outline-none
          "
        />
      </div>
      {/* LISTE PRODUITS */}
      <div className="
        bg-white
        rounded-xl
        shadow
        divide-y
      ">
        {filteredProducts.length === 0 ? (
          <div className="
            p-6
            text-center
            text-gray-500
          ">
            Aucun produit trouvé
          </div>
        ) : (
          filteredProducts.map(
            (product) => (
              <div
                key={product.id}
                className="
                  flex
                  items-center
                  justify-between
                  p-4
                  hover:bg-gray-50
                "
              >
                {/* LEFT */}
                <div className="
                  flex
                  items-center
                  gap-3
                ">
                  {/* IMAGE */}
                  {product.image ? (
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.title
                      }
                      className="
                        w-12
                        h-12
                        rounded-lg
                        object-cover
                      "
                    />
                  ) : (
                    <div className="
                      w-12
                      h-12
                      bg-gray-200
                      rounded-lg
                    " />
                  )}
                  {/* TITLE */}
                  <div>
                    <p className="
                      font-medium
                    ">
                      {product.title}
                    </p>
                    <p className="
                      text-sm
                      text-gray-500
                    ">
                      {product.price} CDF
                    </p>
                  </div>
                </div>
                {/* ACTIONS */}
                <button
                  onClick={() =>
                    navigate(
                      `/products/view/${product.slug}`
                    )
                  }
                  className="
                    p-2
                    hover:bg-gray-100
                    rounded-lg
                  "
                >
                 
                </button>
                <button>
                   <ProductActionsMenu
                  product={product}
                  refreshProducts={fetchProducts} 
                  />
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}