import ProductCard from "./ProductCard";
export default function Feed() {
  // Mock temporaire
  const items = [
    {
      id: 1,
      title: "Chaussures Nike",
      description: "Chaussures originales très solides",
      price: 50
    },
    {
      id: 2,
      title: "Service plomberie",
      description: "Installation plomberie professionnelle",
      price: 80
    },
    {
      id: 3,
      title: "Offre emploi",
      description: "Recherche chauffeur expérimenté",
      price: 0
    }
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Publications récentes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <ProductCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}