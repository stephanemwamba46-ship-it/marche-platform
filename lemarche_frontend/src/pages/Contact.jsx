import {
Mail,
Phone,
MapPin,
ShoppingCart,
ArrowLeft,
Send
} from "lucide-react";
import { Link } from "react-router-dom";
function Contact(){
return(
<div className="min-h-screen bg-white dark:bg-slate-950">
{/* ================= HEADER ================= */}
<header className="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 shadow-sm z-50">
<div className="flex items-center justify-between px-6 py-4">
<Link to="/" className="flex items-center gap-2">
<div className="g">
<ShoppingCart size={40}/>
</div>
<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text">
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
{/* ================= HERO ================= */}
<section className="pt-40 pb-16 text-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
<h1 className="text-4xl md:text-5xl font-bold dark:text-white">
Contactez-nous
</h1>
<p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
Une question ? Un problème ? Une suggestion ? 
Notre équipe est là pour vous aider.
</p>
</section>
{/* ================= CONTACT CONTENT ================= */}
<section className="pb-28">
<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14">
{/* LEFT INFO */}
<div className="space-y-8">
<ContactItem
icon={<Mail size={24}/>}
title="Email"
text="support@marche.com"
/>
<ContactItem
icon={<Phone size={24}/>}
title="Téléphone"
text="+243 971 032 234"
/>
<ContactItem
icon={<MapPin size={24}/>}
title="Adresse"
text="Kinshasa, République Démocratique du Congo"
/>
</div>
{/* FORM */}
<div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow">
<h2 className="text-2xl font-bold mb-6 dark:text-white">
Envoyer un message
</h2>
<form className="space-y-6">
<input
type="text"
placeholder="Votre nom"
className="w-full px-5 py-3 border rounded-xl dark:bg-slate-900 dark:border-slate-700"
/>
<input
type="email"
placeholder="Votre email"
className="w-full px-5 py-3 border rounded-xl dark:bg-slate-900 dark:border-slate-700"
/>
<textarea
rows="5"
placeholder="Votre message"
className="w-full px-5 py-3 border rounded-xl dark:bg-slate-900 dark:border-slate-700"
/>
<button
type="submit"
className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-sky-400 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
>
<Send size={18}/>
Envoyer
</button>
</form>
</div>
</div>
</section>
</div>
);
}
/* COMPONENT */
function ContactItem({icon,title,text}){
return(
<div className="flex items-start gap-4">
<div className="bg-blue-100 dark:bg-slate-800 p-3 rounded-xl text-blue-600">
{icon}
</div>
<div>
<h4 className="font-semibold dark:text-white">
{title}
</h4>
<p className="text-gray-600 dark:text-gray-300">
{text}
</p>
</div>
</div>
);
}
export default Contact;