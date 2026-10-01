import {
ShoppingCart,
ArrowLeft,
ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
function Confidentialite(){
return(
<div className="min-h-screen bg-white dark:bg-slate-950">
{/* HEADER */}
<header className="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 shadow-sm z-50">
<div className="flex justify-between items-center px-6 py-4">
<Link to="/" className="flex items-center gap-2">
<div className="bg-gradient-to-r from-blue-600 to-sky-400 text-white p-2 rounded-lg">
<ShoppingCart size={22}/>
</div>
<span className="text-xl font-bold text-blue-600">
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
<section className="pt-40 pb-16 text-center px-6 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
<div className="flex justify-center mb-6 text-blue-600">
<ShieldCheck size={50}/>
</div>
<h1 className="text-5xl font-bold dark:text-white">
Politique de confidentialité
</h1>
<p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
Votre confidentialité est essentielle pour nous.
Cette page explique comment nous collectons,
utilisons et protégeons vos informations.
</p>
</section>
{/* CONTENT */}
<section className="pb-28">
<div className="max-w-4xl mx-auto px-6 space-y-10 text-left">
<Section
title="1. Collecte des informations"
text="Nous collectons uniquement les informations nécessaires à la création et à la gestion de votre compte, telles que votre nom, votre adresse email et vos données d'utilisation de la plateforme."
/>
<Section
title="2. Utilisation des données"
text="Les données collectées sont utilisées pour améliorer nos services, personnaliser votre expérience utilisateur et assurer le bon fonctionnement de la plateforme."
/>
<Section
title="3. Protection des données"
text="Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé ou toute perte accidentelle."
/>
<Section
title="4. Partage des informations"
text="Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées uniquement lorsque cela est nécessaire pour le fonctionnement du service ou requis par la loi."
/>
<Section
title="5. Vos droits"
text="Vous pouvez à tout moment demander l'accès, la modification ou la suppression de vos données personnelles en contactant notre support."
/>
</div>
</section>
</div>
);
}
function Section({title,text}){
return(
<div>
<h2 className="text-xl font-semibold dark:text-white">
{title}
</h2>
<p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
{text}
</p>
</div>
);
}
export default Confidentialite;