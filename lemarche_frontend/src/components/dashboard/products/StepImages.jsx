import { useState, useRef } from "react";
export default function StepImages({
  productData,
  setProductData,
  nextStep,
  prevStep
}) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  /* ====================== */
  /* HANDLE FILE */
  /* ====================== */
  const handleFile = (file) => {
    if (!file) return;
    const imageUrl =
      URL.createObjectURL(file);
    setProductData({
      ...productData,
      // fichier réel pour backend
      image: file,
      // preview frontend
      imagePreview: imageUrl
    });
  };
  /* ====================== */
  /* INPUT CHANGE */
  /* ====================== */
  const handleInputChange = (e) => {
    const file =
      e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };
  /* ====================== */
  /* DRAG DROP */
  /* ====================== */
  const handleDrop = (e) => {
    e.preventDefault();
    const file =
      e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  /* ====================== */
  /* REMOVE IMAGE */
  /* ====================== */
  const removeImage = () => {
    setProductData({
      ...productData,
      image: null,
      imagePreview: null
    });
  };
  /* ====================== */
  /* VALIDATION */
  /* ====================== */
  const handleNext = () => {
    if (!productData.image) {
      setError(
        "Veuillez ajouter une image du produit"
      );
      return;
    }
    setError("");
    nextStep();
  };
  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div>
        <h2 className="
        text-2xl
        font-bold
        flex
        items-center
        gap-2
        ">
          📸 Ajouter l'image du produit
        </h2>
        <p className="
        text-gray-500
        text-sm
        ">
          Ajoutez une image principale pour représenter votre produit.
        </p>
      </div>
      {/* DROP ZONE */}
      {!productData.imagePreview && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="
          border-2
          border-dashed
          rounded-xl
          p-10
          text-center
          cursor-pointer
          bg-white
          hover:bg-gray-50
          transition
          "
          onClick={() =>
            fileInputRef.current.click()
          }
        >
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleInputChange}
          />
          <p className="text-gray-500">
            Glissez votre image ici ou cliquez pour sélectionner
          </p>
        </div>
      )}
      {/* IMAGE PREVIEW */}
      {productData.imagePreview && (
        <div className="
        relative
        w-48
        border
        rounded-xl
        overflow-hidden
        ">
          <img
            src={productData.imagePreview}
            alt=""
            className="
            w-full
            h-40
            object-cover
            "
          />
          {/* DELETE */}
          <button
            onClick={removeImage}
            className="
            absolute
            top-2
            right-2
            bg-red-500
            text-white
            px-2
            py-1
            rounded
            text-sm
            "
          >
            🗑
          </button>
        </div>
      )}
      {error && (
        <p className="
        text-red-500
        text-sm
        ">
          {error}
        </p>
      )}
      {/* BUTTONS */}
      <div className="
      flex
      justify-between
      pt-6
      ">
        <button
          onClick={prevStep}
          className="
          px-6
          py-3
          border
          rounded-xl
          "
        >
          Retour
        </button>
        <button
          onClick={handleNext}
          className="
          px-8
          py-3
          bg-indigo-500
          hover:bg-indigo-600
          text-white
          rounded-xl
          font-medium
          "
        >
          Continuer
        </button>
      </div>
    </div>
  );
}