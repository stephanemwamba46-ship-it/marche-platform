import { Link, useNavigate } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
export default function ForgotPassword() {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);
const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
setError(null);
try {
await axios.post(
"http://127.0.0.1:8000/api/users/send-reset-code/",
{
email: email
}
);
setSuccess("Code envoyé à votre email");
setTimeout(() => {
navigate("/verify-code", {
state: { email }
});
}, 1200);
}
catch (err) {
setError(
err.response?.data?.error ||
"Erreur lors de l'envoi"
);
}
finally {
setLoading(false);
}
};
return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
<div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
<h2 className="text-2xl font-bold text-center mb-6">
Mot de passe oublié
</h2>
<form
onSubmit={handleSubmit}
className="space-y-4"
>
{error && (
<div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
{error}
</div>
)}
{success && (
<div className="bg-green-50 border border-green-200 text-green-600 text-sm p-3 rounded-lg">
{success}
</div>
)}
<div>
<label className="block text-sm font-semibold text-gray-700 mb-1">
Votre email
</label>
<div className="flex items-center border rounded-xl px-3 py-2">
<Mail
className="text-gray-400 mr-2"
size={18}
/>
<input
type="email"
value={email}
onChange={(e) =>
setEmail(e.target.value)
}
placeholder="email@example.com"
className="w-full outline-none"
required
/>
</div>
</div>
<button
type="submit"
className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
>
{loading ? (
<>
<Loader2
className="animate-spin"
size={18}
/>
Envoi...
</>
) : (
"Envoyer le code"
)}
</button>
<div className="text-center text-sm">
<Link
to="/login"
className="text-indigo-600 hover:underline"
>
Retour à la connexion
</Link>
</div>
</form>
</div>
</div>
);
}