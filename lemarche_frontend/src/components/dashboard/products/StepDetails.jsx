import { useState, useEffect } from "react";
import API from "../../../api/axios";
export default function StepDetails({
  productData,
  setProductData,
  nextStep,
  prevStep
}) {
  const [categories, setCategories] =
    useState([]);
  const [errors, setErrors] =
    useState({});
  // FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories =
      async () => {
        try {
          const res =
            await API.get(
              "/categories/"
            );
          setCategories(res.data);
        } catch (error) {
          console.log(error);
        }
      };
    fetchCategories();
  }, []);
  // VALIDATION
  const validate = () => {
    let newErrors = {};
    if (!productData.title)
      newErrors.title =
        "Nom requis";
    if (!productData.category)
      newErrors.category =
        "Catégorie requise";
    if (!productData.price)
      newErrors.price =
        "Prix requis";
    setErrors(newErrors);
    return Object.keys(newErrors)
      .length === 0;
  };
  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };
  return (
    <div>
      {/* TITLE */}
      <h1 className="
        text-2xl
        font-semibold
        mb-6
      ">
        Détails du produit
      </h1>
      <div className="
        space-y-5
      ">
        {/* NOM */}
        <div>
          <label className="
            text-sm
            font-medium
          ">
            Nom du produit *
          </label>
          <input
            type="text"
            placeholder="Ex: Guide complet Facebook Ads 2025"
            value={productData.title}
            onChange={(e) =>
              setProductData({
                ...productData,
                title:
                  e.target.value
              })
            }
            className="
              w-full
              mt-2
              border
              rounded-xl
              p-3
            "
          />
          {errors.title && (
            <p className="
              text-red-500
              text-xs
            ">
              {errors.title}
            </p>
          )}
        </div>
        {/* CATEGORIE */}
        <div>
          <label className="
            text-sm
            font-medium
          ">
            Catégorie *
          </label>
          <select
            value={productData.category}
            onChange={(e) =>
              setProductData({
                ...productData,
                category:
                  e.target.value
              })
            }
            className="
              w-full
              mt-2
              border
              rounded-xl
              p-3
            "
          >
            <option value="">
              Dans quelle catégorie classer ce produit
            </option>
            {categories.map(cat => (
              <option
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="
              text-red-500
              text-xs
            ">
              {errors.category}
            </p>
          )}
        </div>
        {/* MODELE TARIFICATION */}
        <div>
          <label className="
            text-sm
            font-medium
          ">
            Modèle de tarification *
          </label>
          <select
            value="one_time"
            className="
              w-full
              mt-2
              border
              rounded-xl
              p-3
            "
          >
            <option>
              Mobile money
            </option>
          </select>
        </div>
        {/* PRIX */}
        <div>
          <label className="
            text-sm
            font-medium
          ">
            Prix
          </label>
          <div className="
            flex
            mt-2
            border
            rounded-xl
            overflow-hidden
          ">
            <span className="
              px-4
              flex
              items-center
              bg-gray-100
              text-sm
            ">
              CDF
            </span>
            <input
              type="number"
              value={productData.price}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  price:
                    e.target.value
                })
              }
              className="
                w-full
                p-3
                outline-none
              "
            />
          </div>
          {errors.price && (
            <p className="
              text-red-500
              text-xs
            ">
              {errors.price}
            </p>
          )}
        </div>
        {/* PRIX PROMO */}
        <div>
          <label className="
            text-sm
            font-medium
          ">
            Prix promotionnel
          </label>
          <div className="
            flex
            mt-2
            border
            rounded-xl
            overflow-hidden
          ">
            <span className="
              px-4
              flex
              items-center
              bg-gray-100
              text-sm
            ">
              CDF
            </span>
            <input
              type="number"
              value={
                productData.promo_price
              }
              onChange={(e) =>
                setProductData({
                  ...productData,
                  promo_price:
                    e.target.value
                })
              }
              className="
                w-full
                p-3
                outline-none
              "
            />
          </div>
        </div>
      </div>
      {/* BUTTONS */}
      <div className="
  flex
  justify-between
  mt-10
">
  {/* ANNULER */}
  <button
    onClick={prevStep}
    className="
      px-6
      py-3
      border
      border-gray-300
      rounded-xl
      hover:bg-gray-100
      dark:border-gray-700
      dark:hover:bg-gray-800
    "
  >
    Retour
  </button>
  {/* CONTINUER */}
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
      shadow-sm
      transition
    "
  >
    Continuer
  </button>
</div>
    </div>
  );
}