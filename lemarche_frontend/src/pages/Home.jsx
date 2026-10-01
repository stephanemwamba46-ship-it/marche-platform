import { useState } from "react";
import { Link } from "react-router-dom";
import {Moon, Sun} from "lucide-react";
import {
Menu,
X,
LogIn,
CreditCard,
Info,
Mail,
HelpCircle,
ShoppingCart,
BarChart3,
ShieldCheck,
Users,
Database,
Lock,
Cloud,
RefreshCcw,
UserCheck,
Globe,
Headphones,
BookOpen,
Store,
Star,
Rocket,
CheckCircle
} from "lucide-react";
export default function Home(){
const [menuOpen,setMenuOpen]=useState(false);
const [dark,setDark]=useState(false);

return(
<div className="bg-white text-gray-800 font-sans">

{/* ================= HEADER ================= */}
<header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
<div className="flex items-center justify-between px-6 py-4">
<Link to="" className="flex items-center gap-2">
<div className="">
<ShoppingCart size={40}/>
</div>
<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text">
Marché
</span>
</Link>
<button onClick={()=>setMenuOpen(!menuOpen)}>
{menuOpen?<X size={26}/>:<Menu size={26}/>}
</button>
</div>
{menuOpen && (
<div className="absolute right-4 top-16 w-64 bg-white shadow-xl rounded-xl p-5">
<ul className="space-y-5">
<li>
<Link to="/login" className="flex items-center gap-3 hover:text-blue-600">
<LogIn size={20}/>
Se connecter
</Link>
</li>
<li>
<Link to="tarifs/" className="flex items-center gap-3 hover:text-blue-600">
<CreditCard size={20}/>
Tarifs
</Link>
</li>
<li>
<Link to="a-propos/" className="flex items-center gap-3 hover:text-blue-600">
<Info size={20}/>
À propos
</Link>
</li>
<li>
<Link to="centre-aide/" className="flex items-center gap-3 hover:text-blue-600">
<HelpCircle size={20}/>
Centre d’aide
</Link>
</li>
<li>
<Link to="contact/" className="flex items-center gap-3 hover:text-blue-600">
<Mail size={20}/>
Contact
</Link>
</li>
</ul>
</div>
)}
</header>
{/* ================= HERO ================= */}
<section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white text-center px-6">
<button
onClick={()=>{
setDark(!dark);
document.body.classList.toggle("dark");
}}
className="text-blue-600"
>
{dark ? <Sun size={40}/> : <Moon size={40}/>}
</button>
<h1 className="text-4xl md:text-4xl font-bold max-w-3xl mx-auto">
Tout votre quotidien en une seule application
</h1>
<p className="mt-6 text-gray-600 max-w-2xl mx-auto">
Créez votre boutique, proposez vos services,
gérez vos produits et développez vos revenus
dans une seule application moderne.
</p>
<Link to="/register">
<button className="mt-10
bg-gradient-to-r
from-blue-600
to-sky-400
text-white
px-8 py-4
rounded-xl
hover:scale-105
transition">
Créer un compte gratuitement
</button>
</Link>
<div className="flex flex-wrap justify-center gap-3 mt-8">
<Badge text="Produits digitaux et physique"/>
<Badge text="Services"/>
<Badge text="Formations"/>
<Badge text="Offres d'emplois"/>
<Badge text="Santé et logement"/>
</div>
</section>
<div className="mt-12 flex justify-center">
<div className="bg-blue-100 p-10 rounded-2xl shadow-lg">
<Store size={120} className="text-blue-500"/>
</div>
</div>
{/* ================= WHY CHOOSE ================= */}
<section className="py-24 bg-white">
<div className="max-w-6xl mx-auto px-6">
<h2 className="text-3xl font-bold text-center mb-14">
Pourquoi choisir Marché ?
</h2>
<div className="grid md:grid-cols-3 gap-10">
<Feature icon={<Rocket size={28}/>} title="Rapide"/>
<Feature icon={<ShieldCheck size={28}/>} title="Sécurisé"/>
<Feature icon={<Globe size={28}/>} title="Accessible partout"/>
</div>
</div>
</section>
{/* ================= EXTRA STATS ================= */}
<section className="py-20 bg-blue-50">
<div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto px-6 text-center">
<Stat number="100K+" label="Utilisateurs"/>
<Stat number="15K+" label="Transactions"/>
<Stat number="25K+" label="Produits"/>
<Stat number="99%" label="Satisfaction"/>
</div>
</section>
<section className="py-24 bg-white fade-in">
<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
<div>
<h2 className="text-3xl font-bold">
Visualisez vos performances en temps réel
</h2>
<p className="text-gray-600 mt-4">
Suivez vos ventes, revenus et croissance
dans un tableau moderne.
</p>
<Link to="/register">
<button className="mt-6 bg-gradient-to-r from-blue-600 to-sky-400 text-white px-6 py-3 rounded-xl">
Accéder au tableau
</button>
</Link>
</div>
{/* DASHBOARD UI */}
<div className="bg-blue-100 p-10 rounded-2xl shadow-lg">
<div className="bg-white rounded-xl p-6 shadow">
<div className="flex justify-between mb-4">
<span className="text-gray-500">
Revenus
</span>
<span className="text-blue-600 font-bold">
+32%
</span>
</div>
<div className="h-32 bg-blue-50 rounded-lg"></div>
</div>
</div>
</div>
</section>

<section className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
<div className="max-w-7xl mx-auto px-6">
<h2 className="text-4xl font-bold text-center mb-6">
Ils nous font confiance
</h2>
<p className="text-center text-gray-600 dark:text-gray-400 mb-16">
Des utilisateurs satisfaits partagent leur expérience.
</p>
<div className="grid md:grid-cols-3 gap-10">
<div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-xl transition">
<div className="flex items-center gap-4">
<img
src="https://i.pravatar.cc/100?img=1"
alt="user"
className="w-14 h-14 rounded-full"
/>
<div>
<h4 className="font-bold">Jean Mukendi</h4>
<p className="text-sm text-gray-500">
Boutique en ligne
</p>
</div>
</div>
<p className="mt-6 text-gray-600 dark:text-gray-300">
"Depuis que j'utilise cette plateforme, ma gestion est devenue simple."
</p>
<div className="flex mt-4 text-yellow-400">
★★★★★
</div>
</div>
<div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-xl transition">
<div className="flex items-center gap-4">
<img
src="https://i.pravatar.cc/100?img=5"
alt="user"
className="w-14 h-14 rounded-full"
/>
<div>
<h4 className="font-bold">Sarah Ilunga</h4>
<p className="text-sm text-gray-500">
Service digital
</p>
</div>
</div>
<p className="mt-6 text-gray-600 dark:text-gray-300">
"Interface moderne, rapide et très efficace."
</p>
<div className="flex mt-4 text-yellow-400">
★★★★★
</div>
</div>
<div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-xl transition">
<div className="flex items-center gap-4">
<img
src="https://i.pravatar.cc/100?img=12"
alt="user"
className="w-14 h-14 rounded-full"
/>
<div>
<h4 className="font-bold">Patrick Kabeya</h4>
<p className="text-sm text-gray-500">
Prestataire
</p>
</div>
</div>
<p className="mt-6 text-gray-600 dark:text-gray-300">
"Tout est centralisé et mes clients sont satisfaits."
</p>
<div className="flex mt-4 text-yellow-400">
★★★★★
</div>
</div>
</div>
</div>
</section>

<section className="py-24 bg-white dark:bg-slate-950">
<div className="max-w-7xl mx-auto px-6 text-center">
<h2 className="text-4xl font-bold mb-6">
Connectez vos outils préférés
</h2>
<p className="text-gray-600 dark:text-gray-400 mb-14">
Notre plateforme s'intègre facilement avec les services populaires.
</p>
<div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center opacity-80">
<Integration logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" name="Google"/>
<Integration logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" name="Slack"/>
<Integration logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" name="PayPal"/>
<Integration logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg" name="Stripe"/>
</div>
</div>
</section>

<section className="py-24 bg-blue-50 dark:bg-slate-900">
<div className="max-w-7xl mx-auto px-6">
<h2 className="text-4xl font-bold text-center mb-16">
Sécurité avancée et fiabilité maximale
</h2>
<div className="grid md:grid-cols-3 gap-10">
<SecurityCard
icon={<ShieldCheck size={32}/>}
title="Chiffrement avancé"
text="Toutes vos données sont protégées par un chiffrement sécurisé."
/>
<SecurityCard
icon={<Database size={32}/>}
title="Sauvegardes automatiques"
text="Vos informations sont sauvegardées régulièrement."
/>
<SecurityCard
icon={<Lock size={32}/>}
title="Accès sécurisé"
text="Protection contre les accès non autorisés."
/>
<SecurityCard
icon={<Cloud size={32}/>}
title="Cloud sécurisé"
text="Hébergement fiable et rapide."
/>
<SecurityCard
icon={<RefreshCcw size={32}/>}
title="Synchronisation en temps réel"
text="Mise à jour instantanée des données."
/>
<SecurityCard
icon={<UserCheck size={32}/>}
title="Contrôle des utilisateurs"
text="Gestion avancée des accès."
/>
</div>
</div>
</section>

{/* ================= NEW FEATURES ================= */}
<section className="py-24 bg-blue-50 dark:bg-slate-900">
<div className="max-w-4xl mx-auto px-6 text-center">
<h2 className="text-4xl font-bold">
Recevez nos nouveautés
</h2>
<p className="mt-4 opacity-90">
Abonnez-vous pour recevoir des conseils, mises à jour et offres.
</p>
<div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
<input
type="email"
placeholder="Votre adresse email"
className="px-6 py-4 rounded-xl text-black w-full md:w-96"
/>
<button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
S'abonner
</button>
</div>
</div>
</section>
{/* ================= BIG CTA ================= */}
<section className="py-28 bg-gradient-to-r from-blue-700 to-sky-500 text-white text-center px-6">
<h2 className="text-4xl md:text-5xl font-bold">
Prêt à lancer votre activité ?
</h2>
<p className="mt-6 text-blue-100">
Rejoignez des milliers d’utilisateurs
qui développent leurs revenus.
</p>
<Link to="/register">
<button className="mt-8
bg-white
text-blue-700
px-10 py-4
rounded-xl
font-semibold
hover:scale-105
transition">
Créer mon compte
</button>
</Link>
</section>{/* ================= FOOTER ================= */}
<footer className="bg-gray-900 text-white py-16">
<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
{/* LOGO */}
<div>
<h3 className="text-xl font-bold text-blue-400 mb-4">
Marché
</h3>
<p className="text-gray-400">
Plateforme moderne pour vendre
et développer vos activités.
</p>
</div>
{/* PRODUIT */}
<div>
<h4 className="font-semibold mb-4">
Produit
</h4>
<ul className="space-y-2 text-gray-400">
<li>
<Link to="/fichiers" className="hover:text-white">
Fichiers
</Link>
</li>
<li>
<Link to="/formations" className="hover:text-white">
Formations
</Link>
</li>
<li>
<Link to="/licences" className="hover:text-white">
Licences
</Link>
</li>
<li>
<Link to="/bundles" className="hover:text-white">
Bundles
</Link>
</li>
</ul>
</div>
{/* RESSOURCES */}
<div>
<h4 className="font-semibold mb-4">
Ressources
</h4>
<ul className="space-y-2 text-gray-400">
<li>
<Link to="/guides" className="hover:text-white">
Guides
</Link>
</li>
<li>
<Link to="/support" className="hover:text-white">
Support
</Link>
</li>
<li>
<Link to="/centre-aide" className="hover:text-white">
Centre d’aide
</Link>
</li>
<li>
<Link to="/documentation" className="hover:text-white">
Documentation
</Link>
</li>
<li>
<Link to="/tarifs" className="hover:text-white">
Tarifs
</Link>
</li>
</ul>
</div>
{/* ENTREPRISE */}
<div>
<h4 className="font-semibold mb-4">
Entreprise
</h4>
<ul className="space-y-2 text-gray-400">
<li>
<Link to="/a-propos" className="hover:text-white">
À propos
</Link>
</li>
<li>
<Link to="/contact" className="hover:text-white">
Contact
</Link>
</li>
<li>
<Link to="/carriere" className="hover:text-white">
Carrière
</Link>
</li>
<li>
<Link to="/confidentialite" className="hover:text-white">
Confidentialité
</Link>
</li>
<li>
<Link to="/conditions" className="hover:text-white">
Conditions
</Link>
</li>
<li>
<Link to="/status-service" className="hover:text-white">
Status service
</Link>
</li>
</ul>
</div>
</div>
<p className="text-center text-gray-500 mt-12">
© 2026 Marché — Tous droits réservés
</p>
</footer>
</div>
);
}
/* COMPONENTS */
function Badge({text}){
return(
<span className="
px-4 py-2
bg-gradient-to-r
from-blue-100
to-sky-100
text-blue-700
rounded-full
text-sm
font-medium
">
{text}
</span>
);
}
function Feature({icon,title}){
return(
<div className="bg-white p-6 rounded-2xl shadow-md text-center">
<div className="text-blue-600 flex justify-center mb-3">
{icon}
</div>
<h3 className="font-semibold">
{title}
</h3>
</div>
);
}
function Stat({number,label}){
return(
<div>
<h2 className="text-3xl font-bold text-blue-600">
{number}
</h2>
<p className="text-gray-600">
{label}
</p>
</div>
);
}
function FooterCol({title,links}){
return(
<div>
<h4 className="font-semibold mb-4">
{title}
</h4>
<ul className="space-y-2 text-gray-400">
{links.map((l,i)=>(
<li key={i} className="hover:text-white cursor-pointer">
{l}
</li>
))}
</ul>
</div>
);
}
function Testimonial({name,text}){
return(
<div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
<p className="text-gray-600 dark:text-gray-300">
"{text}"
</p>
<h4 className="mt-4 font-bold">
{name}
</h4>
</div>
);
}

function Integration({logo,name}){
return(
<div className="flex flex-col items-center gap-3 hover:scale-105 transition">
<img
src={logo}
alt={name}
className="h-12"
/>
<p className="text-sm text-gray-600 dark:text-gray-400">
{name}
</p>
</div>
);
}

function SecurityCard({icon,title,text}){
return(
<div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-lg transition">
<div className="text-blue-600 mb-4">
{icon}
</div>
<h4 className="font-bold mb-2">
{title}
</h4>
<p className="text-gray-600 dark:text-gray-300">
{text}
</p>
</div>
);
}