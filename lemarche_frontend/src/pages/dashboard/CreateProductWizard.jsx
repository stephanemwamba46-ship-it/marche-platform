import { useState } from "react";
import StepType from "../../components/dashboard/products/StepType";
import StepDetails from "../../components/dashboard/products/StepDetails";
import StepDescription from "../../components/dashboard/products/StepDescription";
import StepImages from "../../components/dashboard/products/StepImages";
import StepDigitalFile from "../../components/dashboard/products/StepDigitalFile";
import StepPublish from "../../components/dashboard/products/StepPublish";
export default function CreateProductWizard() {
  const [step, setStep] = useState(1);
  // ✅ CORRECTION ICI
  const totalSteps = 6;
  const [productData, setProductData] = useState({
    product_type: "digital",
    title: "",
    category: "",
    payment_method: "mobile_money",
    price: "",
    promo_price: "",
    short_description: "",
    description: ""
  });
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  return (
    <div className="max-w-3xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="
            w-10
            h-10
            rounded-xl
            bg-indigo-100
            flex
            items-center
            justify-center
            text-indigo-600
            text-xl
          ">
            📦
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Créer un produit
            </h1>
            <p className="text-sm text-gray-500">
              Construisez votre produit en quelques étapes
            </p>
          </div>
        </div>
        {/* PROGRESSION */}
        <div className="flex gap-2 mt-4">
          {/* ✅ CORRECTION ICI */}
          {[1,2,3,4,5,6].map((s) => (
            <div
              key={s}
              className={`
                flex-1
                h-2
                rounded-full
                ${
                  step >= s
                    ? "bg-indigo-500"
                    : "bg-gray-200"
                }
              `}
            />
          ))}
        </div>
      </div>
      {/* STEPS */}
      {step === 1 && (
        <StepType
          productData={productData}
          setProductData={setProductData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <StepDetails
          productData={productData}
          setProductData={setProductData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <StepDescription
          productData={productData}
          setProductData={setProductData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <StepImages
          productData={productData}
          setProductData={setProductData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && (
        <StepDigitalFile
          productData={productData}
          setProductData={setProductData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 6 && (
        <StepPublish
          productData={productData}
          prevStep={prevStep}
        />
      )}
    </div>
  );
}