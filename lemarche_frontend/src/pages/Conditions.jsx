import {
ShoppingCart,
ArrowLeft,
FileCheck
} from "lucide-react";
import { Link } from "react-router-dom";
function Conditions(){
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
<FileCheck size={50}/>
</div>
<h1 className="text-5xl font-bold dark:text-white">
Conditions d'utilisation
</h1>
<p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
En utilisant notre plateforme,
vous acceptez les conditions suivantes.
</p>
</section>
{/* CONTENT */}
<section className="pb-28">
<div className="max-w-4xl mx-auto px-6 space-y-10">
<Section
title="1. Acceptation des conditions"
text="L'utilisation de la plateforme implique l'acceptation totale des présentes conditions. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le service."
/>
<Section
title="2. Création de compte"
text="L'utilisateur doit fournir des informations exactes lors de l'inscription. Il est responsable de la confidentialité de ses identifiants."
/>
<Section
title="3. Utilisation du service"
text="L'utilisateur s'engage à utiliser la plateforme de manière légale et responsable, sans porter atteinte aux droits des autres utilisateurs."
/>
<Section
title="4. Suspension ou suppression"
text="Nous nous réservons le droit de suspendre ou supprimer un compte en cas d'utilisation abusive ou non conforme aux conditions."
/>
<Section
title="5. Modifications"
text="Les conditions peuvent être mises à jour à tout moment. Les utilisateurs seront informés des changements importants."
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
export default Conditions;