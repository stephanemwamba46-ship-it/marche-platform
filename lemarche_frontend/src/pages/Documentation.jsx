import {
ShoppingCart,
ArrowLeft,
BookOpen,
FileText,
Video,
Code,
Search
} from "lucide-react";
import { Link } from "react-router-dom";
function Documentation(){
return(
<div className="min-h-screen bg-white dark:bg-slate-950">
{/* HEADER */}
<header className="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 shadow-sm z-50">
<div className="flex justify-between items-center px-6 py-4">
<Link to="/" className="flex items-center gap-2">
<div className="bg-gradient-to-r from-blue-600 to-sky-400 text-white p-2 rounded-lg">
<ShoppingCart size={22}/>
</div>
<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
Marché
</span>
</Link>
<Link to="/" className="flex items-center gap-2 text-blue-600">
<ArrowLeft size={18}/>
Accueil
</Link>
</div>
</header>
{/* HERO */}
<section className="pt-40 pb-20 px-6 text-center bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
<h1 className="text-5xl font-bold dark:text-white">
Documentation officielle
</h1>
<p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
Apprenez à utiliser toutes les fonctionnalités
de la plateforme Marché avec nos guides complets.
</p>
{/* SEARCH */}
<div className="mt-10 max-w-xl mx-auto flex items-center gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
<Search size={20}/>
<input
type="text"
placeholder="Rechercher dans la documentation..."
className="w-full bg-transparent outline-none"
/>
</div>
</section>
{/* CONTENT */}
<section className="pb-28">
<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
<DocCard
icon={<BookOpen size={28}/>}
title="Premiers pas"
desc="Créer un compte et démarrer rapidement."
/>
<DocCard
icon={<FileText size={28}/>}
title="Gestion produits"
desc="Ajouter et gérer vos produits."
/>
<DocCard
icon={<Video size={28}/>}
title="Tutoriels vidéo"
desc="Apprentissage visuel étape par étape."
/>
<DocCard
icon={<Code size={28}/>}
title="API & intégration"
desc="Connectez vos outils externes."
/>
</div>
</section>
</div>
);
}
function DocCard({icon,title,desc}){
return(
<div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-xl transition">
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
export default Documentation;