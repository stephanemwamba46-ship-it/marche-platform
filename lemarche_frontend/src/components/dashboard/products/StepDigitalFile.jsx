import { useRef, useState } from "react";
export default function StepDigitalFile({
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
    setProductData({
      ...productData,
      // fichier réel pour backend Django
      file: file,
      // nom pour preview frontend
      fileName: file.name
    });
  };
  /* ====================== */
  /* INPUT CHANGE */
  /* ====================== */
  const handleInputChange = (e) => {
    const file = e.target.files[0];
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
  /* REMOVE FILE */
  /* ====================== */
  const removeFile = () => {
    setProductData({
      ...productData,
      file: null,
      fileName: null
    });
  };
  /* ====================== */
  /* VALIDATION */
  /* ====================== */
  const handleNext = () => {
    if (!productData.file) {
      setError(
        "Veuillez ajouter le fichier du produit digital"
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
          📦 Ajouter le fichier du produit
        </h2>
        <p className="
        text-gray-500
        text-sm
        ">
          Importez le fichier que vos clients téléchargeront après l'achat.
        </p>
      </div>
      {/* DROP ZONE */}
      {!productData.fileName && (
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
            hidden
            ref={fileInputRef}
            onChange={handleInputChange}
          />
          <p className="text-gray-500">
            Glissez votre fichier ici ou cliquez pour sélectionner
          </p>
          <p className="
          text-xs
          text-gray-400
          mt-2
          ">
            Formats acceptés : PDF, ZIP, DOCX, MP4, APK…
          </p>
        </div>
      )}
      {/* FILE PREVIEW */}
      {productData.fileName && (
        <div className="
        flex
        items-center
        justify-between
        border
        rounded-xl
        p-4
        bg-gray-50
        ">
          <div className="
          flex
          items-center
          gap-3
          ">
            <span className="
            text-2xl
            ">
              📄
            </span>
            <div>
              <p className="
              font-medium
              text-sm
              ">
                {productData.fileName}
              </p>
              <p className="
              text-xs
              text-gray-500
              ">
                Fichier prêt à être vendu
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="
            bg-red-500
            text-white
            px-3
            py-1
            rounded
            text-sm
            "
          >
            🗑 Supprimer
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