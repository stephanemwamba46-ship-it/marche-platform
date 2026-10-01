import {
Server,
CheckCircle,
AlertTriangle,
ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
function StatusService(){
return(
<div className="min-h-screen bg-white dark:bg-slate-950">
{/* HEADER */}
<header className="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 shadow-sm z-50">
<div className="flex items-center justify-between px-6 py-4">
<Link to="/" className="flex items-center gap-2">
<div className="bg-gradient-to-r from-green-600 to-emerald-400 text-white p-2 rounded-lg">
<Server size={22}/>
</div>
<span className="text-xl font-bold text-green-600">
Status Service
</span>
</Link>
<Link
to="/"
className="flex items-center gap-2 text-green-600 font-medium"
>
<ArrowLeft size={18}/>
Accueil
</Link>
</div>
</header>
{/* CONTENT */}
<section className="pt-40 pb-28 text-center px-6">
<h1 className="text-4xl font-bold dark:text-white">
État du système
</h1>
<p className="text-gray-600 dark:text-gray-300 mt-4">
Vérifiez la disponibilité des services.
</p>
<div className="max-w-3xl mx-auto mt-16 space-y-6">
<ServiceItem
name="Serveur principal"
status="online"
/>
<ServiceItem
name="API Paiement"
status="online"
/>
<ServiceItem
name="Base de données"
status="maintenance"
/>
</div>
</section>
</div>
);
}
function ServiceItem({name,status}){
const isOnline = status === "online";
return(
<div className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-xl shadow">
<div className="flex items-center gap-3">
{isOnline
? <CheckCircle className="text-green-500"/>
: <AlertTriangle className="text-yellow-500"/>
}
<span className="font-medium dark:text-white">
{name}
</span>
</div>
<span className={`font-semibold ${isOnline ? "text-green-500" : "text-yellow-500"}`}>
{isOnline ? "Opérationnel" : "Maintenance"}
</span>
</div>
);
}
export default StatusService;