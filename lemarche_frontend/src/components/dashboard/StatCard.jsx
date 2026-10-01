import {
DollarSign,
ShoppingCart,
Package,
TrendingUp
} from "lucide-react";
export default function StatCard({
title,
value,
icon: Icon,
suffix,
color = "indigo"
}) {
return (
<div className="
relative
bg-white
dark:bg-gray-900
p-6
rounded-2xl
shadow-sm
border
dark:border-gray-800
h-36
flex
flex-col
justify-between
">
{/* ICON — haut gauche */}
<div className={`
w-10 h-10
rounded-xl
flex
items-center
justify-center
bg-${color}-100
dark:bg-${color}-900/30
`}>
<Icon
size={20}
className={`
text-${color}-600
dark:text-${color}-400
`}
/>
</div>
{/* VALUE — centre */}
<div className="absolute inset-0 flex items-center justify-center">
<h2 className="text-3xl font-bold">
{value ?? 0}
{suffix && (
<span className="text-base ml-1">
{suffix}
</span>
)}
</h2>
</div>
{/* TITLE — bas droite */}
<div className="flex justify-end">
<span className="
text-sm
text-gray-500
font-medium
">
{title}
</span>
</div>
</div>
);
}