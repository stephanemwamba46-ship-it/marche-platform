import {
LifeBuoy,
ArrowLeft,
Mail,
MessageCircle,
Phone
} from "lucide-react";
import { Link } from "react-router-dom";
function SupportAvance(){
return(
<div className="min-h-screen bg-white dark:bg-slate-950">
{/* HEADER */}
<header className="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 shadow-sm z-50">
<div className="flex items-center justify-between px-6 py-4">
<Link to="/" className="flex items-center gap-2">
<div className="bg-gradient-to-r from-blue-600 to-sky-400 text-white p-2 rounded-lg">
<LifeBuoy size={22}/>
</div>
<span className="text-xl font-bold text-blue-600">
Support
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
Centre de support
</h1>
<p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
Nous sommes disponibles pour vous aider
à résoudre vos problèmes rapidement.
</p>
</section>
{/* SUPPORT OPTIONS */}
<section className="pb-28">
<div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
<SupportCard
icon={<Mail size={26}/>}
title="Email Support"
desc="Réponse sous 24 heures."
/>
<SupportCard
icon={<MessageCircle size={26}/>}
title="Live Chat"
desc="Assistance instantanée."
/>
<SupportCard
icon={<Phone size={26}/>}
title="Téléphone"
desc="Support prioritaire."
/>
</div>
</section>
</div>
);
}
function SupportCard({icon,title,desc}){
return(
<div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow hover:shadow-xl transition text-center">
<div className="text-blue-600 mb-4 flex justify-center">
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
export default SupportAvance;