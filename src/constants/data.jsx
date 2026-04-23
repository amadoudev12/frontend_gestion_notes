export const NAV_LINKS = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Bénéfices", href: "#benefits" },
  { label: "Sécurité", href: "#trust" },
];

export const BENEFITS = [
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Gain de temps",
    desc: "Automatisez les tâches répétitives — bulletins, relevés de notes, listes d'appel — et récupérez des heures chaque semaine.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Organisation simplifiée",
    desc: "Toutes vos données scolaires au même endroit : classes, enseignants, élèves et notes en un seul tableau de bord.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Données sécurisées",
    desc: "Chiffrement de bout en bout, sauvegardes automatiques et conformité RGPD pour protéger les données de vos élèves.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Collaboration fluide",
    desc: "Partagez l'accès avec vos enseignants et personnels administratifs avec des rôles et permissions personnalisés.",
  },
];

export const FEATURES = [
  {
    color: "bg-blue-50",
    accent: "text-blue-600",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <line x1="19" y1="8" x2="19" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Gestion des élèves",
    desc: "Fiches complètes, suivi des présences, historique scolaire et communication avec les familles centralisés.",
    tags: ["Fiches élèves", "Présences", "Historique"],
  },
  {
    color: "bg-violet-50",
    accent: "text-violet-600",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Gestion des enseignants",
    desc: "Profils, emplois du temps, matières enseignées et évaluation des performances en un espace dédié.",
    tags: ["Profils", "Emplois du temps", "Matières"],
  },
  {
    color: "bg-emerald-50",
    accent: "text-emerald-600",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Gestion des classes",
    desc: "Créez et organisez vos classes, affectez les élèves et les enseignants, gérez les emplois du temps.",
    tags: ["Affectations", "Capacités", "Planning"],
  },
  {
    color: "bg-amber-50",
    accent: "text-amber-600",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Gestion des notes",
    desc: "Saisie rapide des notes, calcul automatique des moyennes, pondération par matière et par coefficient.",
    tags: ["Saisie rapide", "Moyennes auto", "Coefficients"],
  },
  {
    color: "bg-rose-50",
    accent: "text-rose-600",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Génération des bulletins",
    desc: "Bulletins officiels générés en un clic, personnalisables avec le logo et le tampon de votre établissement.",
    tags: ["PDF automatique", "Personnalisé", "Impression"],
  },
];

export const TRUST_ITEMS = [
  {
    icon: "✦",
    title: "Prise en main en 5 minutes",
    desc: "Interface intuitive conçue pour des non-techniciens. Votre établissement opérationnel dès le premier jour.",
  },
  {
    icon: "◈",
    title: "Accessible partout",
    desc: "Depuis un navigateur, une tablette ou un téléphone. Aucune installation requise.",
  },
  {
    icon: "◉",
    title: "Conformité RGPD",
    desc: "Données hébergées en Europe, chiffrées et sauvegardées quotidiennement.",
  },
];

export const SCHOOL_TYPES = [
  "Collège",
  "Lycée",
  "Université",
  "École primaire",
  "École professionnelle",
  "Institut de formation",
  "Autre",
];

export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --blue: #2563EB; --blue-light: #EFF6FF; --blue-mid: #DBEAFE; --violet: #7C3AED; }
  html { scroll-behavior: smooth; }
  .gradient-hero { background: radial-gradient(ellipse 80% 60% at 50% -10%, #dbeafe 0%, transparent 70%), white; }
  .gradient-cta { background: linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%); }
  .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .card-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(37,99,235,0.1); }
  .btn-primary { background: #2563EB; color: white; border: none; border-radius: 10px; padding: 12px 28px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.18s ease; letter-spacing: -0.01em; }
  .btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.35); }
  .btn-primary:active { transform: translateY(0); }
  .btn-outline { background: white; color: #2563EB; border: 1.5px solid #2563EB; border-radius: 10px; padding: 12px 28px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.18s ease; }
  .btn-outline:hover { background: #EFF6FF; }
  .input-field { width: 100%; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 12px 14px; font-size: 14px; color: #1e293b; transition: border-color 0.15s; outline: none; font-family: inherit; background: white; }
  .input-field:focus { border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
  .input-field::placeholder { color: #94a3b8; }
  .select-field { width: 100%; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 12px 14px; font-size: 14px; color: #1e293b; transition: border-color 0.15s; outline: none; font-family: inherit; background: white; appearance: none; cursor: pointer; }
  .select-field:focus { border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
  .tag-pill { display: inline-flex; align-items: center; background: #F1F5F9; color: #475569; border-radius: 20px; padding: 3px 10px; font-size: 12px; font-weight: 500; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.6); backdrop-filter: blur(6px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal-content { background: white; border-radius: 20px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; animation: slideUp 0.25s ease; box-shadow: 0 32px 80px rgba(0,0,0,0.2); }
  @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  .step-dot { width: 8px; height: 8px; border-radius: 50%; transition: all 0.2s; }
  .feature-icon-wrap { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .nav-blur { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: #EFF6FF; border: 1px solid #BFDBFE; color: #1d4ed8; border-radius: 40px; padding: 6px 16px; font-size: 13px; font-weight: 500; }
  .mockup-shadow { box-shadow: 0 40px 100px rgba(37,99,235,0.15), 0 8px 32px rgba(0,0,0,0.08); }
  .success-check { width: 64px; height: 64px; background: #EFF6FF; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
`;