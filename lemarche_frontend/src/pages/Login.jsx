import { Link, useNavigate } from "react-router-dom";
import {
ShoppingCart,
Mail,
Lock,
Loader2,
ShieldCheck,
Zap,
Globe,
Home
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
export default function Login() {
const navigate = useNavigate();
const [formData, setFormData] = useState({
email: "",
password: "",
remember: true
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
const response = await axios.post(
"http://127.0.0.1:8000/api/users/login/",
{
email: formData.email,
password: formData.password
}
);
const { access, refresh } = response.data;
if (formData.remember) {
localStorage.setItem("access", access);
localStorage.setItem("refresh", refresh);
}
else {
sessionStorage.setItem("access", access);
sessionStorage.setItem("refresh", refresh);
}
navigate("/dashboard");
}
catch (err) {
setError(
err.response?.data?.detail ||
"Votre Email ou Mot de passe incorrect"
);
}
finally {
setLoading(false);
}
};
return (
<div className="min-h-screen grid md:grid-cols-2 font-sans bg-gradient-to-br from-indigo-700 to-blue-700">
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
className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-xl font-medium hover:bg-gray-100 transition"
>
<Home size={18} />
Accueil
</Link>
</div>
{/* LEFT — fusion visuelle */}
<div className="hidden md:flex text-white p-10 flex-col justify-center space-y-6">
<h1 className="text-3xl font-bold">
Bienvenue sur Marché
</h1>
<p className="text-blue-100">
Connectez-vous et gérez vos activités en toute sécurité.
</p>

<div className="space-y-4">
<Feature icon={<ShieldCheck size={20} />} text="Connexion sécurisée JWT" />
<Feature icon={<Zap size={20} />} text="Accès rapide au dashboard" />
<Feature icon={<Globe size={20} />} text="Disponible partout" />
</div>
</div>
{/* RIGHT */}
<div className="flex items-center justify-center p-6 relative">
{loading && (
<div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
<Loader2
className="animate-spin text-indigo-600"
size={40}
/>
</div>
)}
{/* FORM */}
<div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 mt-16">
<div className="text-center mb-6">
<h2 className="text-2xl font-bold text-gray-800">
Connexion
</h2>
<p className="text-sm text-gray-500 mt-1">
Nouveau sur Marché ?
<Link
to="/register"
className="text-indigo-600 ml-1 hover:underline font-medium"
>
Créer un compte
</Link>
</p>
</div>
<form onSubmit={handleSubmit} className="space-y-4">
{error && (
<div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
{error}
</div>
)}
{/* EMAIL */}
<div>
<label className="block text-sm font-semibold text-gray-700 mb-1">
Votre Email *
</label>
<div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
<Mail
className="text-gray-400 mr-2"
size={18}
/>
<input
type="text"
name="email"
value={formData.email}
onChange={handleChange}
className="w-full outline-none"
placeholder="Votre adresse mail"
required
/>
</div>
</div>
{/* PASSWORD */}
<div>
<label className="block text-sm font-semibold text-gray-700 mb-1">
Mot de passe
</label>
<div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
<Lock
className="text-gray-400 mr-2"
size={18}
/>
<input
type="password"
name="password"
value={formData.password}
onChange={handleChange}
className="w-full outline-none"
placeholder="Votre mot de passe"
required
/>
</div>
</div>
{/* REMEMBER */}
<div className="flex justify-between items-center text-sm">
<label className="flex items-center gap-2 text-gray-600">
<input
type="checkbox"
name="remember"
checked={formData.remember}
onChange={handleChange}
/>
Se souvenir de moi
</label>
<Link
to="/forgot-password"
className="text-indigo-600 hover:underline font-medium"
>
Mot de passe oublié ?
</Link>
</div>
<button
type="submit"
className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
>
Se connecter
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