import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../../api/axios";
import {
  Menu,
  User,
  Info,
  Phone,
  LogIn,
  HelpCircle,
  BookOpen,
  Shield,
  FileText,
  ShoppingCart
} from "lucide-react";
export default function ViewProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    API.get(`/products/${slug}/`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);
  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Chargement...
      </div>
    );
  }
  const finalPrice =
    product.promo_price || product.price;
  return (
    <div className="bg-white min-h-screen">
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="text-indigo-600" />
            </div>
            <div>
              <p className="font-bold">
                {product.seller_username || product.seller}
              </p>
              <p className="text-xs text-gray-500">
                Vendeur vérifié
              </p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-12 w-60 bg-white rounded-xl shadow-xl border overflow-hidden">
                <Link
                  to="/a-propos"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                >
                  <Info size={18} />
                  À propos
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                >
                  <Phone size={18} />
                  Contact
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                >
                  <LogIn size={18} />
                  Se connecter
                </Link>
                <Link
                  to="/centre-aide"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                >
                  <HelpCircle size={18} />
                  Aide
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* CONTENU */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* IMAGE */}
          <div>
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="w-full rounded-2xl shadow-lg"
              />
            )}
          </div>
          {/* INFOS */}
          <div>
            <h1 className="text-3xl font-bold mb-5">
              {product.title}
            </h1>
            {product.promo_price ? (
              <>
                <p className="text-lg text-gray-400 line-through">
                  {product.price} CDF
                </p>
                <p className="text-5xl font-extrabold text-indigo-600">
                  {product.promo_price} CDF
                </p>
              </>
            ) : (
              <p className="text-5xl font-extrabold text-indigo-600">
                {product.price} CDF
              </p>
            )}
            <button
              className="
              mt-6
              w-full
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              py-4
              rounded-xl
              text-lg
              font-bold
              "
            >
              Acheter maintenant
            </button>
            {/* APERÇU */}
            <div className="mt-5">
              <button
                className="
                text-indigo-600
                font-semibold
                underline
                "
              >
                Découvrir un aperçu
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Consultez une ou deux pages du produit avant achat.
              </p>
            </div>
            {/* PAIEMENTS */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">
                Moyens de paiement
              </h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="border rounded-lg p-3 text-center text-xs">
                  Airtel
                </div>
                <div className="border rounded-lg p-3 text-center text-xs">
                  M-Pesa
                </div>
                <div className="border rounded-lg p-3 text-center text-xs">
                  Orange
                </div>
                <div className="border rounded-lg p-3 text-center text-xs">
                  Visa
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FICHIER */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Fichier inclus
          </h2>
          <div className="border rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="font-semibold">
                {product.file
                  ? product.file.split("/").pop()
                  : "Produit Digital"}
              </p>
              <p className="text-gray-500 text-sm">
                Téléchargeable après achat
              </p>
            </div>
            <FileText
              size={40}
              className="text-indigo-600"
            />
          </div>
        </div>
        {/* DESCRIPTION */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Description
          </h2>
          <div
            className="
            prose
            max-w-none
            prose-img:rounded-xl
            prose-img:shadow
            "
            dangerouslySetInnerHTML={{
              __html: product.description
            }}
          />
        </div>
        {/* ACTIONS */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/guides"
            className="bg-indigo-100 text-indigo-700 px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <BookOpen size={18} />
            Guide
          </Link>
          <Link
            to="/documentation"
            className="bg-indigo-100 text-indigo-700 px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Comment acheter
          </Link>
          <Link
            to="/support"
            className="bg-indigo-100 text-indigo-700 px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <Shield size={18} />
            Support
          </Link>
        </div>
        {/* VENDEUR */}
        <div className="mt-14 border-t pt-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <User
                size={28}
                className="text-indigo-600"
              />
            </div>
            <div>
              <p className="font-bold text-lg">
                {product.seller_username || product.seller}
              </p>
              <p className="text-gray-500">
                Vendeur vérifié Marché
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <footer className="border-t mt-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl text-indigo-600">
                Marché
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Achetez et vendez des produits digitaux facilement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">
                Ressources
              </h4>
              <div className="space-y-2 text-sm">
                <Link to="/guides">
                  Guides
                </Link>
                <br />
                <Link to="/documentation">
                  Documentation
                </Link>
                <br />
                <Link to="/centre-aide">
                  Centre d'aide
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">
                Légal
              </h4>
              <div className="space-y-2 text-sm">
                <Link to="/confidentialite">
                  Confidentialité
                </Link>
                <br />
                <Link to="/conditions">
                  Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* CTA BAS */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-5xl mx-auto p-4 text-center">
          <p className="text-3xl font-bold text-indigo-600 mb-3">
            {finalPrice} CDF
          </p>
          <button
            className="
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-10
            py-4
            rounded-xl
            font-bold
            "
          >
            Acheter maintenant
          </button>
        </div>
      </div>
    </div>
  );
}