import {
ShoppingCart,
ArrowLeft,
Package,
FileText,
Layers,
Box,
Star,
Filter
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
function ProduitPage(){
const { type } = useParams();
const titles = {
fichiers: "Fichiers numériques",
formations: "Formations digitales",
licences: "Licences logicielles",
bundles: "Bundles complets"
};
/* PRODUITS SIMULÉS */
const products = [
{
icon: <FileText size={26}/>,
title: "Template facture pro",
desc: "Modèle professionnel prêt à l'emploi.",
price: "$12",
badge: "Nouveau"
},
{
icon: <Layers size={26}/>,
title: "Pack marketing digital",
desc: "Outils modernes pour vendre en ligne.",
price: "$39",
badge: "Populaire"
},
{
icon: <Package size={26}/>,
title: "Kit business complet",
desc: "Tout le nécessaire pour démarrer.",
price: "$59",
badge: "Premium"
},
{
icon: <Box size={26}/>,
title: "Ressources avancées",
desc: "Contenus exclusifs pour professionnels.",
price: "$25",
badge: "Populaire"
}
];
return(
<div className="min-h-screen bg-white dark:bg-slate-950">
{/* HEADER */}
<header className="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 shadow-sm z-50">
<div className="flex items-center justify-between px-6 py-4">
<Link to="/" className="flex items-center gap-2">
<div className="bg-gradient-to-r from-blue-600 to-sky-400 text-white p-2 rounded-lg">
<ShoppingCart size={22}/>
</div>
<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
Marché
</span>
</Link>
<Link
to="/"
className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition"
>
<ArrowLeft size={18}/>
Accueil
</Link>
</div>
</header>
{/* HERO */}
<section className="pt-40 pb-16 text-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
<h1 className="text-4xl md:text-5xl font-bold dark:text-white">
{titles[type] || "Produits"}
</h1>
<p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
Découvrez une sélection premium de produits numériques
conçus pour booster votre activité et améliorer votre productivité.
</p>
</section>
{/* FILTRE */}
<section className="max-w-6xl mx-auto px-6 pb-10">
<div className="flex items-center gap-3 text-blue-600 font-medium mb-6">
<Filter size={18}/>
Filtrer les produits
</div>
<div className="flex flex-wrap gap-3">
<FilterBtn label="Tous"/>
<FilterBtn label="Nouveaux"/>
<FilterBtn label="Populaires"/>
<FilterBtn label="Premium"/>
</div>
</section>
{/* PRODUITS GRID */}
<section className="pb-28">
<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
{products.map((product,index)=>(
<ProductCard
key={index}
icon={product.icon}
title={product.title}
desc={product.desc}
price={product.price}
badge={product.badge}
/>
))}
</div>
</section>
</div>
);
}
/* BOUTON FILTRE */
function FilterBtn({label}){
return(
<button className="px-4 py-2 bg-blue-50 dark:bg-slate-800 text-blue-600 rounded-full text-sm hover:bg-blue-600 hover:text-white transition">
{label}
</button>
);
}
/* CARTE PRODUIT */
function ProductCard({icon,title,desc,price,badge}){
return(
<div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow hover:shadow-xl transition hover:scale-105">
{/* BADGE */}
{badge && (
<span className="absolute top-4 right-4 text-xs bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
<Star size={12}/>
{badge}
</span>
)}
{/* ICON */}
<div className="text-blue-600 mb-4">
{icon}
</div>
{/* TITLE */}
<h3 className="font-semibold text-lg dark:text-white">
{title}
</h3>
{/* DESC */}
<p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
{desc}
</p>
{/* PRICE */}
<p className="mt-4 text-blue-600 font-bold text-lg">
{price}
</p>
{/* BUTTONS */}
<div className="flex gap-2 mt-5">
<button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">
Voir détails
</button>
<button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg text-sm hover:bg-blue-600 hover:text-white transition">
Acheter
</button>
</div>
</div>
);
}
export default ProduitPage;