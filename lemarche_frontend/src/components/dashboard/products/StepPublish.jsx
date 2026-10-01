import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/axios";
export default function StepPublish({
  productData,
  prevStep
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handlePublish = async () => {
    // ✅ VALIDATION ICI (CORRECT)
    if (
      !productData.title ||
      !productData.description ||
      !productData.price
    ) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("category", productData.category);
      formData.append("product_type", productData.product_type);
      formData.append("price", productData.price);
      if (productData.image) {
        formData.append("image", productData.image);
      }
      if (productData.file) {
        formData.append("file", productData.file);
      }
      await API.post("/products/", formData);
      alert("Produit publié avec succès 🎉");
      navigate("/dashboard/products");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Erreur lors de la publication"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          🚀 Publier le produit
        </h2>
      </div>
      {/* PREVIEW */}
      <div className="border rounded-xl p-5 bg-white space-y-4">
        <div>
          <p className="text-sm text-gray-500">Nom</p>
          <p className="font-semibold">{productData.title}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Prix</p>
          <p className="font-semibold">{productData.price} CDF</p>
        </div>
        {/* ✅ DESCRIPTION PRO */}
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Description
          </p>
          <div
            className="prose max-w-none border p-3 rounded"
            dangerouslySetInnerHTML={{
              __html: productData.description
            }}
          />
        </div>
        {/* IMAGE */}
        {productData.imagePreview && (
          <img
            src={productData.imagePreview}
            className="w-32 h-32 object-cover rounded"
          />
        )}
        {/* FILE */}
        {productData.fileName && (
          <p className="text-sm">
            📄 {productData.fileName}
          </p>
        )}
      </div>
      {error && (
        <p className="text-red-500">{error}</p>
      )}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-3 border rounded-xl"
        >
          Retour
        </button>
        <button
          onClick={handlePublish}
          disabled={loading}
          className="px-8 py-3 bg-green-500 text-white rounded-xl flex gap-2"
        >
          {loading && <span className="animate-spin">⏳</span>}
          {loading ? "Publication..." : "Publier"}
        </button>
      </div>
    </div>
  );
}