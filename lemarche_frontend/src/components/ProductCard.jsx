export default function ProductCard({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
      {/* IMAGE */}
      <div className="h-48 bg-gray-200">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg text-gray-800">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-orange-500 font-bold text-lg">
            {item.price} $
          </span>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm">
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );
}