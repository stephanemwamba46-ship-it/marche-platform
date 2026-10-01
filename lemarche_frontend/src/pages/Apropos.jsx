import {
Rocket,
Users,
ShieldCheck,
Globe,
CheckCircle,
Star,
Store,
BarChart3,
ShoppingCart,
ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
function Apropos(){
return(
<div className="min-h-screen bg-white dark:bg-slate-950">
{/* ================= HEADER ================= */}
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
<Link
to="/"
className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
>
<ArrowLeft size={18}/>
Accueil
</Link>
</div>
</header>
{/* ================= HERO ================= */}
<section className="pt-40 pb-24 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 text-center px-6">
<h1 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto dark:text-white">
Construire l'avenir du commerce digital
</h1>
<p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
Marché est une plateforme moderne conçue pour permettre
à toute personne de créer, vendre et développer
ses activités dans un environnement simple,
rapide et sécurisé.
</p>
<div className="mt-12 flex justify-center">
<div className="bg-blue-100 dark:bg-slate-800 p-10 rounded-2xl shadow-lg">
<Store size={120} className="text-blue-500"/>
</div>
</div>
</section>
{/* ================= MISSION ================= */}
<section className="py-24 bg-white dark:bg-slate-950">
<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
<div>
<h2 className="text-3xl font-bold dark:text-white">
Notre mission
</h2>
<p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">
Notre mission est d'offrir une solution complète
qui simplifie la création d'activités,
la gestion des produits et la croissance des revenus.
</p>
<div className="mt-8 space-y-4">
<Point text="Créer facilement une boutique"/>
<Point text="Vendre des produits et services"/>
<Point text="Suivre ses performances en temps réel"/>
<Point text="Sécuriser toutes les transactions"/>
</div>
</div>
<div className="grid grid-cols-2 gap-6">
<IconCard icon={<Rocket size={32}/>} text="Innovation continue"/>
<IconCard icon={<Users size={32}/>} text="Communauté active"/>
<IconCard icon={<Globe size={32}/>} text="Accessibilité mondiale"/>
<IconCard icon={<ShieldCheck size={32}/>} text="Sécurité avancée"/>
</div>
</div>
</section>
{/* ================= VALEURS ================= */}
<section className="py-24 bg-blue-50 dark:bg-slate-900">
<div className="max-w-6xl mx-auto px-6 text-center">
<h2 className="text-4xl font-bold mb-16 dark:text-white">
Nos valeurs fondamentales
</h2>
<div className="grid md:grid-cols-3 gap-10">
<ValueCard
icon={<Star size={30}/>}
title="Excellence"
text="Nous visons toujours la qualité dans chaque fonctionnalité."
/>
<ValueCard
icon={<ShieldCheck size={30}/>}
title="Confiance"
text="La sécurité et la fiabilité sont au cœur de notre système."
/>
<ValueCard
icon={<BarChart3 size={30}/>}
title="Croissance"
text="Nous aidons chaque utilisateur à évoluer et réussir."
/>
</div>
</div>
</section>
{/* ================= VISION ================= */}
<section className="py-28 bg-white dark:bg-slate-950">
<div className="max-w-4xl mx-auto px-6 text-center">
<h2 className="text-4xl font-bold dark:text-white">
Notre vision
</h2>
<p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">
Nous voulons devenir une plateforme incontournable
pour la création et la gestion d’activités digitales.
</p>
<div className="mt-12 bg-gradient-to-r from-blue-600 to-sky-400 text-white p-10 rounded-2xl shadow-lg">
<h3 className="text-2xl font-bold">
Un avenir où chacun peut réussir
</h3>
<p className="mt-4 opacity-90">
Notre ambition est de créer une solution
qui aide les entrepreneurs à bâtir
des activités durables et rentables.
</p>
</div>
</div>
</section>
</div>
);
}
/* COMPONENTS */
function IconCard({icon,text}){
return(
<div className="bg-blue-50 dark:bg-slate-800 p-8 rounded-2xl text-center shadow hover:shadow-xl transition">
<div className="text-blue-600 flex justify-center mb-4">
{icon}
</div>
<p className="font-semibold dark:text-white">
{text}
</p>
</div>
);
}
function ValueCard({icon,title,text}){
return(
<div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow hover:shadow-xl transition">
<div className="text-blue-600 mb-6 flex justify-center">
{icon}
</div>
<h4 className="font-bold text-xl mb-4 dark:text-white">
{title}
</h4>
<p className="text-gray-600 dark:text-gray-300">
{text}
</p>
</div>
);
}
function Point({text}){
return(
<div className="flex items-center gap-3">
<CheckCircle size={20} className="text-blue-600"/>
<span className="text-gray-700 dark:text-gray-300">
{text}
</span>
</div>
);
}
export default Apropos;