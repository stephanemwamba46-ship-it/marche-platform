import {
  Pencil,
  Eye,
  Copy,
  Share2,
  Link,
  Pin,
  Trash2,
  MoreVertical
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";
export default function ProductActionsMenu({
  product,
  refreshProducts
}) {
  const navigate =
    useNavigate();
  const [open, setOpen] =
    useState(false);
  // 🗑️ DELETE
  const deleteProduct =
    async () => {
      const confirmDelete =
        window.confirm(
          "Supprimer ce produit ?"
        );
      if (!confirmDelete) return;
      try {
        await API.delete(
          `/products/${product.slug}/`
        );
        refreshProducts();
      } catch (error) {
        console.log(
          "DELETE ERROR:",
          error.response?.data
        );
      }
    };
  return (
    <div className="relative">
      {/* BUTTON ⋮ */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          p-2
          hover:bg-gray-100
          rounded-lg
        "
      >
        <MoreVertical size={18} />
      </button>
      {/* MENU */}
      {open && (
        <div className="
          absolute
          right-0
          mt-2
          w-48
          bg-white
          rounded-xl
          shadow-lg
          border
          z-50
        ">
          {/* EDIT */}
          <button
            onClick={() =>
              navigate(
                `/dashboard/products/edit/${product.slug}`
              )
            }
            className="
              flex
              items-center
              gap-2
              w-full
              px-4
              py-2
              hover:bg-gray-50
            "
          >
            <Pencil size={16} />
            Modifier
          </button>
          {/* VIEW */}
          <button
            onClick={() =>
              navigate(
               window.open(`/products/${product.slug}`,"_blank")
              )
            }
            className="
              flex
              items-center
              gap-2
              w-full
              px-4
              py-2
              hover:bg-gray-50
            "
          >
            <Eye size={16} />
            Voir
          </button>
          {/* DUPLICATE */}
          <button
            className="
              flex
              items-center
              gap-2
              w-full
              px-4
              py-2
              hover:bg-gray-50
            "
          >
            <Copy size={16} />
            Dupliquer
          </button>
          {/* SHARE */}
          <button
            className="
              flex
              items-center
              gap-2
              w-full
              px-4
              py-2
              hover:bg-gray-50
            "
          >
            <Share2 size={16} />
            Partager
          </button>
          {/* LINK */}
          <button
            className="
              flex
              items-center
              gap-2
              w-full
              px-4
              py-2
              hover:bg-gray-50
            "
          >
            <Link size={16} />
            Lien
          </button>
          {/* PIN */}
          <button
            className="
              flex
              items-center
              gap-2
              w-full
              px-4
              py-2
              hover:bg-gray-50
            "
          >
            <Pin size={16} />
            Épingler
          </button>
          {/* DELETE */}
          <button
            onClick={deleteProduct}
            className="
              flex
              items-center
              gap-2
              w-full
              px-4
              py-2
              text-red-600
              hover:bg-red-50
            "
          >
            <Trash2 size={16} />
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
}