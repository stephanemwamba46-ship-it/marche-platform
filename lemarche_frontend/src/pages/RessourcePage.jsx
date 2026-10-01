import {
BookOpen,
LifeBuoy,
ArrowLeft,
Search,
FileText,
Video,
HelpCircle
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
function RessourcePage(){
const { type } = useParams();
const titles = {
guides: "Guides pratiques",
support: "Support technique"
};
return(
<div className="min-h-screen bg-white dark:bg-slate-950">
{/* HEADER */}
<header className="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 shadow-sm z-50">
<div className="flex items-center justify-between px-6 py-4">
<Link to="/" className="flex items-center gap-2">
<div className="bg-gradient-to-r from-blue-600 to-sky-400 text-white p-2 rounded-lg">
<BookOpen size={22}/>
</div>
<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
Marché
</span>
</Link>
<Link
to="/"
className="flex items-center gap-2 text-blue-600 font-medium"
>
<ArrowLeft size={18}/>
Accueil
</Link>
</div>
</header>
{/* HERO */}
<section className="pt-40 pb-20 text-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
<h1 className="text-4xl md:text-5xl font-bold dark:text-white">
{titles[type] || "Ressources"}
</h1>
<p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
Accédez à des ressources complètes pour
mieux utiliser la plateforme et résoudre
rapidement vos problèmes.
</p>
{/* SEARCH */}
<div className="mt-10 max-w-xl mx-auto">
<div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
<Search size={20} className="text-gray-400"/>
<input
type="text"
placeholder="Rechercher un guide ou une solution..."
className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
/>
</div>
</div>
</section>
{/* RESOURCES GRID */}
<section className="pb-28">
<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
<ResourceCard
icon={<FileText size={28}/>}
title="Documentation écrite"
desc="Guides détaillés étape par étape."
/>
<ResourceCard
icon={<Video size={28}/>}
title="Tutoriels vidéo"
desc="Apprenez visuellement."
/>
<ResourceCard
icon={<HelpCircle size={28}/>}
title="FAQ intelligente"
desc="Réponses rapides aux questions fréquentes."
/>
</div>
</section>
{/* CONTACT SUPPORT */}
<section className="pb-32 text-center">
<h2 className="text-3xl font-bold dark:text-white">
Besoin d'aide supplémentaire ?
</h2>
<p className="text-gray-600 dark:text-gray-300 mt-4">
Notre équipe est disponible pour vous accompagner.
</p>
<Link
to="/contact"
className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
>
<LifeBuoy size={18}/>
Contacter le support
</Link>
</section>
</div>
);
}
function ResourceCard({icon,title,desc}){
return(
<div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-xl transition hover:scale-105">
<div className="text-blue-600 mb-4">
{icon}
</div>
<h3 className="font-semibold text-lg dark:text-white">
{title}
</h3>
<p className="text-gray-600 dark:text-gray-300 mt-2">
{desc}
</p>
</div>
);
}
export default RessourcePage;