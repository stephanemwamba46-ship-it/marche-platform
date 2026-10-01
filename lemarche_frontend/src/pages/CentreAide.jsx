import {
HelpCircle,
ShoppingCart,
ArrowLeft,
ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
function CentreAide(){
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
<section className="pt-40 pb-16 text-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
<h1 className="text-4xl font-bold dark:text-white">
Centre d'aide
</h1>
<p className="mt-6 text-gray-600 dark:text-gray-300">
Retrouvez ici les réponses aux questions fréquentes.
</p>
</section>
{/* FAQ */}
<section className="pb-28">
<div className="max-w-4xl mx-auto px-6 space-y-6">
<FAQ
q="Comment créer une boutique ?"
a="Après inscription, accédez au tableau de bord et cliquez sur créer une boutique."
/>
<FAQ
q="Puis-je vendre plusieurs produits ?"
a="Oui, selon votre plan vous pouvez ajouter plusieurs produits."
/>
<FAQ
q="Mes données sont-elles sécurisées ?"
a="Oui, toutes les données sont protégées avec des technologies modernes."
/>
<FAQ
q="Comment contacter le support ?"
a="Utilisez la page Contact pour envoyer un message."
/>
</div>
</section>
</div>
);
}
function FAQ({q,a}){
const [open,setOpen]=useState(false);
return(
<div className="border rounded-xl overflow-hidden dark:border-slate-700">
<button
onClick={()=>setOpen(!open)}
className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-slate-800"
>
<span className="font-medium dark:text-white">
{q}
</span>
<ChevronDown
className={`transition ${open ? "rotate-180" : ""}`}
/>
</button>
{open && (
<div className="px-6 py-4 bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-300">
{a}
</div>
)}
</div>
);
}
export default CentreAide;