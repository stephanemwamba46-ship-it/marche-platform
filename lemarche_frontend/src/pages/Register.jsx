import { Link, useNavigate } from "react-router-dom";
import {
ShoppingCart,
UserCircle,
Mail,
Lock,
ShieldCheck,
Zap,
Globe,
Loader2,
Home
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
export default function Register() {
const navigate = useNavigate();
const [formData, setFormData] = useState({
username: "",
email: "",
password: "",
accepted: false
});
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const handleChange = (e) => {
const { name, value, type, checked } = e.target;
setFormData({
...formData,
[name]: type === "checkbox"
? checked
: value
});
};
const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
setError(null);
try {
await axios.post(
"http://127.0.0.1:8000/api/users/register/",
{
username: formData.username,
email: formData.email,
password: formData.password
}
);
setTimeout(() => {
navigate("/login");
}, 600);
}
catch (err) {
setError(
err.response?.data?.message ||
"Le nom d'utilisateur ou l'email ne correspond pas "
);
}
finally {
setLoading(false);
}
};
return (
<div className="min-h-screen grid md:grid-cols-2 font-sans bg-gradient-to-br from-blue-600 to-indigo-700">
{/* HEADER */}
<div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-50">
<Link
className="flex items-center gap-2 text-white font-bold text-lg"
>
<ShoppingCart size={40} />
Marché
</Link>
<Link
to="/"
className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-gray-100 transition"
>
<Home size={15} />
Accueil
</Link>
</div>
{/* LEFT — maintenant fondu avec la droite */}
<div className="hidden md:flex text-white p-10 flex-col justify-center space-y-6">
<h1 className="text-3xl font-bold">
Lancez votre activité avec Marché
</h1>
<p className="text-blue-100">
Une plateforme moderne pour vendre et acheter.
</p>
<div className="space-y-4">
<Feature icon={<ShieldCheck size={20} />} text="Sécurité avancée" />
<Feature icon={<Zap size={20} />} text="Performance rapide" />
<Feature icon={<Globe size={20} />} text="Accessible partout" />
</div>
<div className="text-blue-200 text-sm">
© Marché 2026 — Tous droits réservés
</div>
</div>
{/* RIGHT */}
<div className="flex items-center justify-center p-6 relative">
{loading && (
<div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
<Loader2
className="animate-spin text-blue-600"
size={40}
/>
</div>
)}
{/* FORM — taille réduite */}
<div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 mt-16">
<div className="mb-4 text-center">
<h2 className="text-2xl font-bold text-gray-800">
Créer un compte
</h2>
<p className="text-gray-500 text-sm">
Déjà utilisateur ?
<Link
to="/login"
className="text-blue-600 font-semibold ml-1 hover:underline"
>
Connexion
</Link>
</p>
</div>
<form onSubmit={handleSubmit} className="space-y-4">
{error && (
<div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
{error}
</div>
)}
{/* USERNAME */}
<div>
<label className="block text-sm font-semibold text-gray-700 mb-1">
Nom d'utilisateur *
</label>
<div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
<UserCircle
className="text-gray-400 mr-2"
size={20}
/>
<input
type="text"
name="username"
value={formData.username}
onChange={handleChange}
placeholder="Votre nom d'utilisateur"
className="w-full outline-none"
required
/>
</div>
</div>
{/* EMAIL */}
<div>
<label className="block text-sm font-semibold text-gray-700 mb-1">
Adresse email *
</label>
<div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
<Mail
className="text-gray-400 mr-2"
size={20}
/>
<input
type="email"
name="email"
value={formData.email}
onChange={handleChange}
placeholder="exemple@email.com"
className="w-full outline-none"
required
/>
</div>
</div>
{/* PASSWORD */}
<div>
<label className="block text-sm font-semibold text-gray-700 mb-1">
Mot de passe *
</label>
<div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
<Lock
className="text-gray-400 mr-2"
size={20}
/>
<input
type="password"
name="password"
value={formData.password}
onChange={handleChange}
placeholder="••••••••"
className="w-full outline-none"
required
/>
</div>
</div>
{/* TERMS */}
<div className="flex items-center gap-2">
<input
type="checkbox"
name="accepted"
checked={formData.accepted}
onChange={handleChange}
className="w-4 h-4"
required
/>
<label className="text-sm text-gray-600">
J'accepte les conditions
</label>
</div>
<button
type="submit"
className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
>
Créer mon compte
</button>
</form>
</div>
</div>
</div>
);
}
function Feature({ icon, text }) {
return (
<div className="flex items-center gap-3 text-blue-100">
<div className="bg-white/20 p-2 rounded-lg">
{icon}
</div>
<span className="text-sm">
{text}
</span>
</div>
);
}