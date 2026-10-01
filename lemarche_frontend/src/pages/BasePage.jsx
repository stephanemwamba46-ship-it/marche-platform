function BasePage({title,description}){
return(
<div className="min-h-screen bg-white dark:bg-slate-950">
<div className="py-24 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-center">
<h1 className="text-4xl font-bold">
{title}
</h1>
<p className="mt-4 opacity-90 max-w-2xl mx-auto">
{description}
</p>
</div>
<div className="max-w-6xl mx-auto px-6 py-20">
<div className="grid md:grid-cols-3 gap-8">
{[1,2,3,4,5,6].map((item)=>(
<div
key={item}
className="bg-gray-50 dark:bg-slate-800 p-8 rounded-2xl shadow"
>
<h3 className="font-bold mb-2">
Contenu {item}
</h3>
<p className="text-gray-600 dark:text-gray-300">
Description du contenu lié à cette page.
</p>
</div>
))}
</div>
</div>
</div>
);
}
export default BasePage;