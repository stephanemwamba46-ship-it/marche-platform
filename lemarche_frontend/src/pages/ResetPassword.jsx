import { useLocation, useNavigate } from "react-router-dom";
import { Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
export default function ResetPassword() {
const navigate = useNavigate();
const location = useLocation();
const email = location.state?.email;
const code = location.state?.code;
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);
if (!email || !code) {
return (
<div className="min-h-screen flex items-center justify-center">
<div className="text-center">
<h2 className="text-xl font-bold mb-4">
Session expirée
</h2>
<p className="text-gray-500 mb-4">
Veuillez recommencer.
</p>
<button
onClick={() => navigate("/forgot-password")}
className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
>
Recommencer
</button>
</div>
</div>
);
}
const handleSubmit = async (e) => {
e.preventDefault();
if (password !== confirmPassword) {
setError("Les mots de passe ne correspondent pas");
return;
}
setLoading(true);
setError(null);
try {
await axios.post(
"http://127.0.0.1:8000/api/users/reset-password/",
{
email: email,
code: code,
new_password: password
}
);
setSuccess("Mot de passe modifié");
setTimeout(() => {
navigate("/login");
}, 1500);
}
catch (err) {
setError(
err.response?.data?.error ||
"Erreur lors du changement"
);
}
finally {
setLoading(false);
}
};
return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
<div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
<h2 className="text-2xl font-bold text-center mb-2">
Nouveau mot de passe
</h2>
<p className="text-sm text-gray-500 text-center mb-6">
Choisissez un mot de passe sécurisé
</p>
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
Nouveau mot de passe
</label>
<div className="flex items-center border rounded-xl px-3 py-2">
<Lock
className="text-gray-400 mr-2"
size={18}
/>
<input
type="password"
value={password}
onChange={(e) =>
setPassword(e.target.value)
}
className="w-full outline-none"
required
/>
</div>
</div>
<div>
<label className="block text-sm font-semibold text-gray-700 mb-1">
Confirmer mot de passe
</label>
<div className="flex items-center border rounded-xl px-3 py-2">
<Lock
className="text-gray-400 mr-2"
size={18}
/>
<input
type="password"
value={confirmPassword}
onChange={(e) =>
setConfirmPassword(e.target.value)
}
className="w-full outline-none"
required
/>
</div>
</div>
<button
type="submit"
className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
>
{loading ? "Modification..." : "Changer mot de passe"}
</button>
</form>
</div>
</div>
);
}