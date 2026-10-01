import {
  FileText,
  Package
} from "lucide-react";
export default function StepType({
  productData,
  setProductData,
  nextStep
}) {
  const types = [
    {
      key: "digital",
      label: "Produit digital",
      icon: FileText
    },
    {
      key: "physical",
      label: "Produit physique",
      icon: Package
    }
  ];
  return (
    <div>
      <h2 className="
        text-lg
        font-semibold
        mb-4
      ">
        Choisissez le type de produit
      </h2>
      <div className="
        grid
        grid-cols-2
        gap-4
        mb-6
      ">
        {types.map((type) => {
          const Icon = type.icon;
          const isSelected =
            productData.product_type ===
            type.key;
          return (
            <button
              key={type.key}
              onClick={() =>
                setProductData({
                  ...productData,
                  product_type:
                    type.key
                })
              }
              className={`
                border
                rounded-xl
                p-6
                flex
                flex-col
                items-center
                gap-2
                ${
                  isSelected
                    ? "border-sky-500 bg-sky-50"
                    : "hover:border-sky-300"
                }
              `}
            >
              <Icon size={32} />
              <span className="
                font-medium
              ">
                {type.label}
              </span>
            </button>
          );
        })}
      </div>
      <button
  onClick={nextStep}
  className="
    w-full
    mt-6
    py-3
    bg-indigo-500
    hover:bg-indigo-600
    text-white
    rounded-xl
    font-medium
    transition
  "
>
  Continuer
</button>
    </div>
  );
}