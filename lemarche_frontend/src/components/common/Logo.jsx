import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
export default function Logo() {
return (
<Link to="/" className="flex items-center gap-2">
<div className="">
<ShoppingCart size={40} />
</div>
<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text">
Marché
</span>
</Link>
);
}