import {
Briefcase,
ArrowLeft,
MapPin,
Clock,
Users
} from "lucide-react";
import { Link } from "react-router-dom";
function Carriere(){
return(
<div className="min-h-screen bg-white dark:bg-slate-950">
{/* HEADER */}
<header className="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 shadow-sm z-50">
<div className="flex items-center justify-between px-6 py-4">
<Link to="/" className="flex items-center gap-2">
<div className="bg-gradient-to-r from-purple-600 to-pink-400 text-white p-2 rounded-lg">
<Briefcase size={22}/>
</div>
<span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-400 bg-clip-text text-transparent">
Carrières
</span>
</Link>
<Link
to="/"
className="flex items-center gap-2 text-purple-600 font-medium"
>
<ArrowLeft size={18}/>
Accueil
</Link>
</div>
</header>
{/* HERO */}
<section className="pt-40 pb-20 text-center px-6 bg-gradient-to-b from-purple-50 to-white dark:from-slate-900 dark:to-slate-950">
<h1 className="text-4xl md:text-5xl font-bold dark:text-white">
Rejoignez notre équipe
</h1>
<p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
Nous construisons des solutions digitales
qui transforment des idées en succès.
Faites partie de cette aventure.
</p>
</section>
{/* JOB LIST */}
<section className="pb-28">
<div className="max-w-5xl mx-auto px-6 space-y-6">
<JobCard
title="Développeur Frontend React"
location="Remote"
type="Temps plein"
/>
<JobCard
title="Développeur Backend Django"
location="Remote"
type="Temps plein"
/>
<JobCard
title="Designer UI/UX"
location="Hybride"
type="Temps partiel"
/>
</div>
</section>
</div>
);
}
function JobCard({title,location,type}){
return(
<div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow hover:shadow-xl transition">
<h3 className="text-lg font-semibold dark:text-white">
{title}
</h3>
<div className="flex gap-6 mt-4 text-gray-600 dark:text-gray-300 text-sm">
<div className="flex items-center gap-2">
<MapPin size={16}/>
{location}
</div>
<div className="flex items-center gap-2">
<Clock size={16}/>
{type}
</div>
</div>
<button className="mt-6 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
Postuler
</button>
</div>
);
}
export default Carriere;