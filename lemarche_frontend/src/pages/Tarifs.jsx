import { CheckCircle, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
function Tarifs(){
return(
<div className="min-h-screen bg-white dark:bg-slate-950">
{/* HEADER */}
<header className="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 shadow-sm z-50">
<div className="flex items-center justify-between px-6 py-4">
<Link to="/" className="flex items-center gap-2">
<div className="">
<ShoppingCart size={40}/>
</div>
<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text">
Marché
</span>
</Link>
<Link to="/" className="flex items-center gap-2 text-blue-600 font-medium">
<ArrowLeft size={18}/>
Accueil
</Link>
</div>
</header>
{/* HERO */}
<section className="pt-40 pb-24 text-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
<h1 className="text-4xl md:text-5xl font-bold dark:text-white">
Choisissez votre plan
</h1>
<p className="mt-6 text-gray-600 dark:text-gray-300">
Des solutions adaptées à tous les besoins.
</p>
</section>
{/* PRICING */}
<section className="pb-28">
<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
<Plan
title="Starter"
price="Gratuit"
features={[
"Boutique basique",
"Produits limités",
"Support standard"
]}
/>
<Plan
title="Pro"
price="$9/mois"
features={[
"Produits illimités",
"Statistiques avancées",
"Support prioritaire"
]}
highlight
/>
<Plan
title="Business"
price="$29/mois"
features={[
"Fonctionnalités complètes",
"Multi-utilisateurs",
"Support premium"
]}
/>
</div>
</section>
</div>
);
}
function Plan({title,price,features,highlight}){
return(
<div className={`p-10 rounded-2xl shadow transition hover:shadow-xl
${highlight ? "bg-gradient-to-r from-blue-600 to-sky-400 text-white" : "bg-white dark:bg-slate-800"}
`}>
<h3 className="text-xl font-bold mb-4">
{title}
</h3>
<p className="text-3xl font-bold mb-6">
{price}
</p>
<div className="space-y-3 mb-8">
{features.map((f,i)=>(
<div key={i} className="flex items-center gap-2">
<CheckCircle size={18}/>
<span>
{f}
</span>
</div>
))}
</div>
<button className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
Choisir
</button>
</div>
);
}
export default Tarifs;