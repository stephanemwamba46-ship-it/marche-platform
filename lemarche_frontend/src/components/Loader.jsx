export default function Loader(){
return(
<div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-900 z-50">
<div className="flex flex-col items-center gap-4">
{/* Spinner */}
<div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
{/* Texte */}
<p className="text-gray-600 dark:text-gray-300 text-sm">
Chargement en cours...
</p>
</div>
</div>
);
}