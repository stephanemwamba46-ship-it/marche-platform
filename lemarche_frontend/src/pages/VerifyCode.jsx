import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
export default function VerifyCode() {
const navigate = useNavigate();
const location = useLocation();
const email = location.state?.email;
const [code, setCode] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [resendLoading, setResendLoading] = useState(false);
// ⏱ Timer 60 secondes
const [timeLeft, setTimeLeft] = useState(60);
if (!email) {
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
Retour
</button>
</div>
</div>
);
}
// ⏱ Compteur secondes
useEffect(() => {
if (timeLeft <= 0) return;
const timer = setInterval(() => {
setTimeLeft(prev => prev - 1);
}, 1000);
return () => clearInterval(timer);
}, [timeLeft]);
// Format temps
const formatTime = () => {
const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;
return `${minutes}:${seconds
.toString()
.padStart(2, "0")}`;
};
// Vérifier code
const handleSubmit = async (e) => {
e.preventDefault();
if (code.length !== 6) {
setError("Le code doit contenir 6 chiffres");
return;
}
setLoading(true);
setError(null);
try {
await axios.post(
"http://127.0.0.1:8000/api/users/verify-reset-code/",
{
email: email,
code: code
}
);
navigate("/reset-password", {
state: {
email: email,
code: code
}
});
}
catch (err) {
setError(
err.response?.data?.error ||
"Code invalide ou expiré"
);
}
finally {
setLoading(false);
}
};
// 🔁 Renvoyer code
const handleResend = async () => {
setResendLoading(true);
setError(null);
try {
await axios.post(
"http://127.0.0.1:8000/api/users/send-reset-code/",
{
email: email
}
);
// Reset timer
setTimeLeft(60);
setCode("");
}
catch (err) {
setError(
err.response?.data?.error ||
"Erreur lors du renvoi"
);
}
finally {
setResendLoading(false);
}
};
return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
<div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
<h2 className="text-2xl font-bold text-center mb-2">
Vérifier le code
</h2>
<p className="text-sm text-gray-500 text-center mb-6">
Entrez le code reçu par email
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
<input
type="text"
autoFocus
value={code}
onChange={(e) => {
const value =
e.target.value.replace(/\D/g, "");
setCode(value);
}}
placeholder="123456"
maxLength={6}
className="w-full text-center text-2xl tracking-widest border rounded-xl py-3 outline-none focus:ring-2 focus:ring-indigo-500"
/>
{/* ⏱ Timer visible */}
<div className="text-center text-sm text-gray-500">
{timeLeft > 0 ? (
<span>
Expire dans <b>{formatTime()}</b>
</span>
) : (
<span className="text-red-500 font-semibold">
Code expiré
</span>
)}
</div>
<button
type="submit"
disabled={timeLeft <= 0}
className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:bg-gray-400"
>
{loading ? (
<>
<Loader2
className="animate-spin"
size={18}
/>
Vérification...
</>
) : (
"Vérifier le code"
)}
</button>
{/* 🔁 Bouton renvoi */}
<button
type="button"
onClick={handleResend}
disabled={timeLeft > 0 || resendLoading}
className="w-full text-indigo-600 text-sm flex items-center justify-center gap-2 disabled:text-gray-400"
>
{resendLoading ? (
<>
<Loader2
className="animate-spin"
size={16}
/>
Renvoi...
</>
) : (
<>
<RefreshCcw size={16} />
Renvoyer le code
</>
)}
</button>
</form>
</div>
</div>
);
}