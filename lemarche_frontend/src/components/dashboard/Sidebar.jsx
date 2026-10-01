import {
LayoutDashboard,
Package,
Briefcase,
Wrench,
BookOpen,
Folder,
Key,
Boxes,
DollarSign,
BarChart3,
Users,
Settings,
HelpCircle
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "../common/Logo"
export default function Sidebar() {
const menu = [
{ name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
{ name: "Produits", icon: Package, path: "/dashboard/products" },
{ name: "Jobs", icon: Briefcase, path: "/dashboard/jobs" },
{ name: "Services", icon: Wrench, path: "/dashboard/services" },
{ name: "Formations", icon: BookOpen, path: "/dashboard/formations" },
{ name: "Fichiers", icon: Folder, path: "/dashboard/files" },
{ name: "Revenus", icon: DollarSign, path: "/dashboard/revenue" },
{ name: "Statistiques", icon: BarChart3, path: "/dashboard/stats" },
{ name: "Clients", icon: Users, path: "/dashboard/clients" },
{ name: "Paramètres", icon: Settings, path: "/dashboard/settings" },
{ name: "Support", icon: HelpCircle, path: "/dashboard/support" }
];
return (
<div className="w-64 h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 fixed">
<div className="p-6">
<Logo/>
</div>
<nav className="px-3 space-y-2">
{menu.map((item, index) => {
const Icon = item.icon;
return (
<NavLink
key={index}
to={item.path}
className={({ isActive }) =>
`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
${isActive
? "bg-indigo-600 text-white"
: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
}`
}
>
<Icon size={18} />
{item.name}
</NavLink>
);
})}
</nav>
</div>
);
}