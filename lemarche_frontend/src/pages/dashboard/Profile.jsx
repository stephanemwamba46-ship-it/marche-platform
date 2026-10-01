import { useEffect, useState } from "react";
import axios from "axios";
import {
User,
Mail,
Phone,
MapPin,
Save
} from "lucide-react";
export default function Profile() {
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [email, setEmail] = useState("");
const [profile, setProfile] = useState({
full_name: "",
phone: "",
city: "",
country: "",
address: ""
});
// ================= FETCH PROFILE =================
useEffect(() => {
const fetchProfile = async () => {
try {
const token =
localStorage.getItem("access");
const res = await axios.get(
"http://127.0.0.1:8000/api/users/my-profile/",
{
headers: {
Authorization: `Bearer ${token}`
}
}
);
// Email
setEmail(res.data.email);
// Profile
if (res.data.profile) {
setProfile({
full_name:
res.data.profile.full_name || "",
phone:
res.data.profile.phone || "",
city:
res.data.profile.city || "",
country:
res.data.profile.country || "",
address:
res.data.profile.address || ""
});
}
setLoading(false);
} catch (err) {
console.log(err);
setLoading(false);
}
};
fetchProfile();
}, []);
// ================= SAVE PROFILE =================
const handleSave = async () => {
try {
setSaving(true);
const token =
localStorage.getItem("access");
await axios.put(
"http://127.0.0.1:8000/api/users/update-my-profile/",
profile,
{
headers: {
Authorization: `Bearer ${token}`
}
}
);
alert("Profil mis à jour avec succès");
setSaving(false);
} catch (err) {
console.log(
err.response?.data
);
alert("Erreur sauvegarde");
setSaving(false);
}
};
// ================= LOADING =================
if (loading)
return (
<div className="p-6 text-gray-500">
Chargement du profil...
</div>
);
// ================= UI =================
return (
<div className="
max-w-5xl
mx-auto
p-6
space-y-6
">
{/* ================= HEADER CARD ================= */}
<div className="
bg-white
rounded-2xl
shadow-sm
border
p-6
flex
items-center
gap-5
">
{/* Avatar */}
<div className="
w-20
h-20
rounded-full
bg-indigo-50
flex
items-center
justify-center
">
<User
size={46}
strokeWidth={1.5}
className="text-indigo-600"
/>
</div>
{/* Nom + Email */}
<div>
<h2 className="
text-xl
font-semibold
text-gray-800
">
{profile.full_name || "Utilisateur"}
</h2>
<p className="
text-gray-500
flex
items-center
gap-2
text-sm
mt-1
">
<Mail size={15} />
{email}
</p>
</div>
</div>
{/* ================= FORM CARD ================= */}
<div className="
bg-white
rounded-2xl
shadow-sm
border
p-6
space-y-6
">
<h3 className="
text-lg
font-semibold
text-gray-800
">
Modifier les informations
</h3>
{/* GRID */}
<div className="
grid
grid-cols-1
md:grid-cols-2
gap-5
">
{/* NOM */}
<div>
<label className="
text-sm
text-gray-500
">
Nom complet
</label>
<div className="
flex
items-center
border
rounded-xl
px-3
py-2
mt-1
focus-within:ring-2
focus-within:ring-indigo-500
">
<User size={16} />
<input
type="text"
value={profile.full_name}
onChange={(e)=>
setProfile({
...profile,
full_name:
e.target.value
})
}
placeholder="Jean Dupont"
className="
ml-2
w-full
outline-none
bg-transparent
"
/>
</div>
</div>
{/* TELEPHONE */}
<div>
<label className="
text-sm
text-gray-500
">
Téléphone
</label>
<div className="
flex
items-center
border
rounded-xl
px-3
py-2
mt-1
focus-within:ring-2
focus-within:ring-indigo-500
">
<Phone size={16} />
<input
type="text"
value={profile.phone}
onChange={(e)=>
setProfile({
...profile,
phone:
e.target.value
})
}
placeholder="+243..."
className="
ml-2
w-full
outline-none
bg-transparent
"
/>
</div>
</div>
{/* VILLE */}
<div>
<label className="
text-sm
text-gray-500
">
Ville
</label>
<div className="
flex
items-center
border
rounded-xl
px-3
py-2
mt-1
focus-within:ring-2
focus-within:ring-indigo-500
">
<MapPin size={16} />
<input
type="text"
value={profile.city}
onChange={(e)=>
setProfile({
...profile,
city:
e.target.value
})
}
placeholder="Kinshasa"
className="
ml-2
w-full
outline-none
bg-transparent
"
/>
</div>
</div>
{/* PAYS */}
<div>
<label className="
text-sm
text-gray-500
">
Pays
</label>
<div className="
flex
items-center
border
rounded-xl
px-3
py-2
mt-1
focus-within:ring-2
focus-within:ring-indigo-500
">
<MapPin size={16} />
<input
type="text"
value={profile.country}
onChange={(e)=>
setProfile({
...profile,
country:
e.target.value
})
}
placeholder="RDC"
className="
ml-2
w-full
outline-none
bg-transparent
"
/>
</div>
</div>
{/* ADRESSE (FULL WIDTH) */}
<div className="md:col-span-2">
<label className="
text-sm
text-gray-500
">
Adresse
</label>
<div className="
flex
items-center
border
rounded-xl
px-3
py-2
mt-1
focus-within:ring-2
focus-within:ring-indigo-500
">
<MapPin size={16} />
<input
type="text"
value={profile.address}
onChange={(e)=>
setProfile({
...profile,
address:
e.target.value
})
}
placeholder="Rue, Quartier..."
className="
ml-2
w-full
outline-none
bg-transparent
"
/>
</div>
</div>
</div>
{/* BUTTON */}
<div className="pt-2">
<button
onClick={handleSave}
disabled={saving}
className="
bg-indigo-600
hover:bg-indigo-700
text-white
px-6
py-3
rounded-xl
flex
items-center
gap-2
transition
shadow-sm
"
>
<Save size={18} />
{saving
? "Enregistrement..."
: "Enregistrer les modifications"}
</button>
</div>
</div>
</div>
);
}