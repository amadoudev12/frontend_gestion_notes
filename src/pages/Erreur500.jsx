import { Link } from "react-router-dom";

export default function Error500() {
return ( <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 text-white px-4"> 
<div className="text-center max-w-lg">
    {/* Code erreur */}
    <h1 className="text-8xl font-extrabold text-red-500">500</h1>
    
    {/* Message */}
    <h2 className="mt-4 text-2xl font-semibold">
      Erreur interne du serveur
    </h2>
    
    <p className="mt-2 text-slate-300">
      Oups quelque chose s’est mal passé de notre côté. 
      Réessaie plus tard ou retourne à l’accueil.
    </p>

    {/* Boutons */}
    <div className="mt-6 flex justify-center gap-4">
      <button
        onClick={() => window.location.reload()}
        className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
      >
        Réessayer
      </button>

      <Link
        to="/"
        className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition"
      >
        Accueil
      </Link>
    </div>

  </div>
</div>
);
}
