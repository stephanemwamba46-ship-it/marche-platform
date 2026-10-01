export default function WizardHeader({
  step,
  totalSteps
}) {
  const progress =
    (step / totalSteps) * 100;
  return (
    <div className="mb-8">
      {/* TITLE */}
      <h1 className="
        text-2xl
        font-bold
        mb-2
      ">
        Créer un produit bien fait
      </h1>
      {/* STEP */}
      <p className="
        text-sm
        text-gray-500
        mb-3
      ">
        Étape {step} sur {totalSteps}
      </p>
      {/* PROGRESS */}
      <div className="
        w-full
        h-2
        bg-gray-200
        rounded-full
      ">
        <div
          className="
            h-2
            bg-sky-500
            rounded-full
            transition-all
          "
          style={{
            width: `${progress}%`
          }}
        />
      </div>
    </div>
  );
}