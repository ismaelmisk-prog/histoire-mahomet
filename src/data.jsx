// Toutes les données proviennent UNIQUEMENT du syllabus fourni.
// Aucun fait inventé, aucune source extérieure.

const CHAPTERS = [
  {
    id: "introduction",
    number: "I",
    title: "Introduction",
    kicker: "Notre enquête",
    summary:
      "Une question d'historien : comment étudier la vie de Mahomet en séparant les faits historiques des croyances religieuses ?",
    minutes: 3,
  },
  {
    id: "temps-espace",
    number: "II.a",
    title: "Mahomet dans le temps et l'espace",
    kicker: "Le décor",
    summary:
      "Péninsule arabique au VIIᵉ siècle. La Mecque, le Hedjaz, les caravanes, les clans, l'enfance d'un orphelin devenu « Al Amine ».",
    minutes: 5,
  },
  {
    id: "evenements",
    number: "II.b",
    title: "Les événements majeurs",
    kicker: "Chronologie",
    summary:
      "De 570 à 632 : naissance, première révélation, persécutions, Hégire, batailles, prise pacifique de La Mecque, mort.",
    minutes: 7,
  },
  {
    id: "diffusion",
    number: "II.c",
    title: "Pourquoi & comment son message s'est diffusé",
    kicker: "Quatre clés",
    summary:
      "Contexte social, contexte religieux, réseaux de commerce, groupes de soutien : ce qui a fait voyager une idée.",
    minutes: 6,
  },
  {
    id: "faits-vs-croyances",
    number: "II.d",
    title: "Faits historiques vs croyances religieuses",
    kicker: "L'œil de l'historien",
    summary:
      "Le tableau qui sépare ce que fait l'historien (sources, dates, contexte) de ce qui relève de la foi.",
    minutes: 4,
  },
  {
    id: "conclusion",
    number: "III",
    title: "Conclusion",
    kicker: "Ce qu'on retient",
    summary:
      "L'islam ne s'est pas propagé par magie. On apprend à étudier un prophète comme on étudie un roi : avec des preuves.",
    minutes: 2,
  },
];

// Événements (extraits littéralement du syllabus)
const EVENTS = [
  {
    year: "570",
    title: "Naissance de Mahomet",
    place: "La Mecque",
    body: "Mahomet est né vers 570 à La Mecque, dans le Hedjaz, d'après la Sira (sa biographie traditionnelle). Son père Abd Allah, du clan Hachim de la tribu des Quraychites, meurt avant sa naissance ; sa mère Amina meurt quand il a six ans.",
    tag: "naissance",
  },
  {
    year: "~595",
    title: "Mariage avec Khadija",
    place: "La Mecque",
    body: "Khadija, riche commerçante de sa tribu, l'embauche pour gérer ses caravanes. Impressionnée par son intégrité, elle lui propose de l'épouser. Il a 25 ans, elle en a 40. Ils restent mariés 25 ans.",
    tag: "vie privée",
  },
  {
    year: "610",
    title: "Première révélation",
    place: "Mont Hira",
    body: "Mahomet devient prophète dès sa première vision sur le mont Hira, près de La Mecque. Selon la tradition musulmane, un ange identifié à Gabriel lui transmet la première des 114 révélations qui constitueront le Coran. Sa prédication commence : il dénonce les riches marchands et appelle à la justice envers les pauvres.",
    tag: "religion",
  },
  {
    year: "615",
    title: "Persécutions, exil vers l'Éthiopie",
    place: "La Mecque → Abyssinie",
    body: "Les fidèles deviennent nombreux, ce qui provoque une grande opposition. Entre 615 et 616, Mahomet conseille à ses partisans de se réfugier : sa lutte contre les idoles païennes bouleverse l'équilibre des clans. Une première vague part pour l'Éthiopie chrétienne.",
    tag: "opposition",
  },
  {
    year: "622",
    title: "L'Hégire",
    place: "La Mecque → Yathrib (Médine)",
    body: "Entre juillet et septembre 622, Mahomet et ses partisans quittent La Mecque pour Yathrib (l'ancienne Médine), où il a de la famille par sa grand-mère. Ce départ marque le début du calendrier musulman. À Médine, il s'allie avec les tribus arabes et juives — alliance vite rompue avec les juifs (prière vers La Mecque et non Jérusalem).",
    tag: "tournant",
  },
  {
    year: "624",
    title: "Bataille de Badr",
    place: "Près de Médine",
    body: "Mahomet est autorisé à utiliser la force pour récupérer les biens abandonnés et affaiblir le commerce mecquois. La bataille de Badr est sa première grande victoire : 72 morts et 50 prisonniers côté mecquois, contre 14 morts côté musulman.",
    tag: "bataille",
  },
  {
    year: "625",
    title: "Défaite de Uhud",
    place: "Près de Médine",
    body: "Entre 622 et 632, les historiens comptent 25 expéditions, environ 150 morts musulmans et 250 morts mecquois. Mahomet participe à 15 d'entre elles et sera blessé lors de la défaite de Uhud en 625.",
    tag: "bataille",
  },
  {
    year: "630",
    title: "Prise pacifique de La Mecque",
    place: "La Mecque",
    body: "En janvier 630, à la tête d'une armée de 10 000 hommes, Mahomet décide de reconquérir La Mecque. Il dit aux Mecquois : « Qu'est-ce que vous croyez que je vais faire de vous ? Partez, vous êtes libres. » Sans qu'une seule goutte de sang ne soit versée, la ville est reconquise et toutes les statues des anciens dieux sont brisées.",
    tag: "tournant",
  },
  {
    year: "632",
    title: "Mort de Mahomet",
    place: "Médine",
    body: "Lors du pèlerinage de 632, il fixe les règles du hadjdj (qui excluent les incroyants). À son retour, il tombe malade et meurt à Médine le 8 juin 632.",
    tag: "fin",
  },
];

// Les 4 clés de la diffusion
const DIFFUSION = [
  {
    n: "01",
    title: "Le contexte social",
    body: "À La Mecque, la société est divisée en clans. Les Quraychites contrôlent l'argent, le commerce et même la religion. Les riches marchands deviennent de plus en plus riches, alors que les pauvres, veuves et orphelins sont laissés de côté. Quand Mahomet appelle à la justice et au partage, ce n'est pas qu'un message religieux : c'est un message social. Les pauvres y voient un espoir de vivre mieux.",
  },
  {
    n: "02",
    title: "Le contexte religieux",
    body: "Avant l'islam, les Arabes sont polythéistes : ils croient en plusieurs dieux représentés par des statues dans la Kaaba. Mais le monothéisme n'est pas inconnu : à force de voyager pour le commerce, ils croisent des communautés juives dans les oasis et des marchands chrétiens venus de Syrie. Quand Mahomet arrive avec son message, les gens savent déjà ce que c'est qu'un Dieu unique. Sa religion propose d'unir toutes les tribus sous une seule idée.",
  },
  {
    n: "03",
    title: "Les réseaux de commerce",
    body: "Comment une idée a-t-elle pu voyager aussi vite sans Internet ? Par le commerce. La Mecque est un carrefour où beaucoup de routes se croisent. Les caravanes ne transportent pas que des sacs de marchandises : elles transportent aussi des infos et des rumeurs. Dans les marchés des grandes villes, les gens racontent ce qu'ils ont entendu à La Mecque. Sans ce système de commerce très organisé, l'islam ne serait peut-être pas parti aussi loin.",
  },
  {
    n: "04",
    title: "Le rôle des groupes de soutien",
    body: "Mahomet n'est pas resté seul. Au début, ce sont ses proches : Khadija, son ami Abou Bakr. À Médine (Hégire en 622), tout change : les tribus se disputent et ont besoin d'un chef pour ramener la paix. Mahomet est choisi pour ça. Il signe des pactes, montre qu'il est un vrai chef d'État. Plus il gagne des batailles ou réussit des traités, plus les autres tribus se disent qu'il est plus sûr d'être son allié.",
  },
];

// Tableau faits vs croyances (rangées extraites du syllabus)
const FACT_VS_BELIEF = [
  {
    historian: {
      title: "Étudier des sources",
      body: "Il cherche des vieux textes, des objets ou des pièces de monnaie pour avoir des preuves.",
    },
    believer: {
      title: "Adhérer à une foi",
      body: "Le croyant accepte le message du Coran parce qu'il a la conviction que c'est la vérité.",
    },
  },
  {
    historian: {
      title: "Situer dans le temps",
      body: "Il utilise des dates précises (comme l'Hégire en 622) pour créer une chronologie réelle.",
    },
    believer: {
      title: "Croire en une mission",
      body: "Le croyant pense que Mahomet a été choisi par Dieu pour une mission divine.",
    },
  },
  {
    historian: {
      title: "Reconstituer un contexte",
      body: "Il explique les événements par l'économie, la politique ou les guerres de l'époque.",
    },
    believer: {
      title: "Exprimer une conviction",
      body: "Le croyant explique les événements par la volonté de Dieu ou par des miracles.",
    },
  },
  {
    historian: {
      title: "Rester neutre",
      body: "L'historien dit : « Selon les textes de l'époque » — sans donner son avis personnel.",
    },
    believer: {
      title: "Pratiquer sa religion",
      body: "Le croyant suit les règles de sa religion et exprime sa spiritualité au quotidien.",
    },
  },
  {
    historian: {
      title: "Chercher des causes logiques",
      body: "Par exemple, il explique le succès de l'islam par les alliances entre les tribus.",
    },
    believer: {
      title: "Suivre une vérité sacrée",
      body: "Par exemple, il explique le succès de l'islam parce que c'est le message de Dieu.",
    },
  },
];

// Glossaire (Petit Lexique du syllabus)
const GLOSSARY = [
  {
    term: "Polythéiste",
    def: "C'est quand on croit en plusieurs dieux en même temps. C'était le cas de la plupart des Arabes avant l'islam.",
  },
  {
    term: "Monothéiste",
    def: "C'est quand on croit en un seul Dieu (comme dans l'islam, le christianisme ou le judaïsme).",
  },
  {
    term: "Hégire",
    def: "C'est le moment où Mahomet quitte La Mecque pour aller à Médine en 622. C'est une date super importante parce que c'est le début du calendrier musulman.",
  },
  {
    term: "Coran",
    def: "C'est le livre sacré des musulmans. Il rassemble toutes les paroles que Mahomet a reçues, selon la tradition.",
  },
  {
    term: "Caravane",
    def: "C'est un grand groupe de marchands qui voyagent ensemble avec des chameaux pour transporter des marchandises dans le désert.",
  },
  {
    term: "Clan",
    def: "C'est un groupe de plusieurs familles qui sont liées entre elles. À l'époque, c'était super important pour être protégé.",
  },
  {
    term: "Sira",
    def: "La biographie traditionnelle de Mahomet, écrite par des musulmans bien après sa mort. L'historien l'utilise mais garde une distance critique.",
  },
  {
    term: "Al Amine",
    def: "Surnom donné à Mahomet par sa tribu, qui signifie « l'homme de confiance ». Il est connu pour son honnêteté.",
  },
  {
    term: "Quraychites",
    def: "Tribu puissante de La Mecque, qui contrôle l'argent, le commerce et la religion. Mahomet appartient au clan Hachim de cette tribu.",
  },
  {
    term: "Kaaba",
    def: "Sanctuaire à La Mecque. Avant l'islam, on y trouvait les statues des dieux du polythéisme arabe ; il devient le centre du monothéisme musulman.",
  },
  {
    term: "Hadjdj",
    def: "Pèlerinage. Lors du pèlerinage de 632, Mahomet en fixe les règles, qui excluent les incroyants.",
  },
  {
    term: "Yathrib",
    def: "Ancien nom de Médine. Devient « Madinat al-Nabi » (la ville du Prophète) après l'Hégire.",
  },
];

// Quiz — questions construites uniquement à partir du syllabus
const QUIZ = [
  {
    q: "En quelle année Mahomet est-il né, selon la Sira ?",
    options: ["622", "570", "610", "632"],
    answer: 1,
    explain: "« Il est né en 570 à La Mecque, dans le Hedjaz » (Sira).",
  },
  {
    q: "Quel surnom sa tribu lui donne-t-elle pour son honnêteté ?",
    options: ["Abou Talib", "Al Amine", "Hachim", "Al Quraychi"],
    answer: 1,
    explain: "« Les gens le surnomment Al Amine (l'homme de confiance). »",
  },
  {
    q: "Sur quel mont Mahomet reçoit-il sa première vision en 610 ?",
    options: ["Mont Sinaï", "Mont Uhud", "Mont Hira", "Mont Badr"],
    answer: 2,
    explain: "« Sa première vision sur le mont Hira, une colline proche de La Mecque. »",
  },
  {
    q: "Combien de révélations constituent le Coran selon la tradition ?",
    options: ["72", "114", "150", "622"],
    answer: 1,
    explain: "« La première des 114 révélations qui vont constituer le Coran. »",
  },
  {
    q: "Que désigne l'Hégire ?",
    options: [
      "La première révélation à Mahomet",
      "La bataille de Badr",
      "Le départ de La Mecque pour Yathrib en 622",
      "La prise de La Mecque en 630",
    ],
    answer: 2,
    explain:
      "« Ce départ, entre juillet et septembre 622, s'appelle l'Hégire et marque le début du calendrier musulman. »",
  },
  {
    q: "Quelle bataille est la première grande victoire de Mahomet, en 624 ?",
    options: ["Uhud", "Badr", "Médine", "La Mecque"],
    answer: 1,
    explain:
      "« En 624, c'est la bataille de Badr (sa première grande victoire) : 72 morts et 50 prisonniers côté mecquois. »",
  },
  {
    q: "Comment La Mecque est-elle reconquise en 630 ?",
    options: [
      "Par un long siège",
      "Par une trahison interne",
      "Pacifiquement, sans une goutte de sang",
      "Par alliance avec l'empire byzantin",
    ],
    answer: 2,
    explain:
      "« Sans qu'une seule goutte de sang ne soit versée, La Mecque est reconquise pacifiquement. »",
  },
  {
    q: "À quelle date Mahomet meurt-il ?",
    options: ["8 juin 632", "Janvier 630", "Septembre 622", "610"],
    answer: 0,
    explain: "« Il tombe malade et meurt à Médine le 8 juin 632. »",
  },
  {
    q: "Avant l'islam, les Arabes étaient principalement…",
    options: ["Chrétiens", "Juifs", "Polythéistes", "Athées"],
    answer: 2,
    explain:
      "« Avant que l'islam n'arrive en arabie les Arabes étaient des polythéistes. »",
  },
  {
    q: "D'après le syllabus, qu'est-ce qui a permis au message de voyager si vite ?",
    options: [
      "L'imprimerie",
      "Les réseaux de commerce et les caravanes",
      "Les empires byzantin et perse",
      "Les écoles religieuses",
    ],
    answer: 1,
    explain:
      "« Les caravanes ne transportaient pas que des marchandises, elles transportaient aussi des infos et des rumeurs. »",
  },
  {
    q: "Que fait l'historien, contrairement au croyant ?",
    options: [
      "Il adhère à une foi",
      "Il explique par des miracles",
      "Il étudie des sources et reste neutre",
      "Il pratique sa religion",
    ],
    answer: 2,
    explain:
      "L'historien : « étudier des sources, situer dans le temps, rester neutre, chercher des causes logiques ».",
  },
  {
    q: "Qui est la première personne à se convertir à l'islam d'après le syllabus ?",
    options: ["Abou Bakr", "Abou Talib", "Khadija", "Amina"],
    answer: 2,
    explain:
      "« Khadija […] sera la première personne à se convertir à l'islam bien avant que Mahomet ne s'exile à Médine. »",
  },
];

// Flashcards — cartes mémoire issues du contenu
const FLASHCARDS = [
  { front: "570", back: "Naissance de Mahomet à La Mecque (Sira)." },
  { front: "610", back: "Première révélation sur le mont Hira. Début de la prédication." },
  { front: "615", back: "Persécutions ; première vague vers l'Éthiopie chrétienne." },
  { front: "622", back: "L'Hégire : départ pour Yathrib (Médine). Début du calendrier musulman." },
  { front: "624", back: "Bataille de Badr — première grande victoire (72 morts mecquois, 14 musulmans)." },
  { front: "625", back: "Défaite de Uhud ; Mahomet y est blessé." },
  { front: "630", back: "Prise pacifique de La Mecque ; les statues sont brisées." },
  { front: "632", back: "Mort de Mahomet à Médine, le 8 juin." },
  { front: "Al Amine", back: "« L'homme de confiance » — surnom donné par sa tribu." },
  { front: "Quraychites", back: "Tribu puissante de La Mecque qui contrôle argent, commerce et religion." },
  { front: "Khadija", back: "Riche commerçante, première épouse de Mahomet (25 ans / 40 ans), première convertie." },
  { front: "Sira", back: "Biographie traditionnelle de Mahomet ; à utiliser avec une distance critique." },
  { front: "Polythéisme", back: "Croyance en plusieurs dieux — religion arabe avant l'islam (statues dans la Kaaba)." },
  { front: "Monothéisme", back: "Croyance en un seul Dieu — connue en Arabie via les communautés juives et chrétiennes." },
  { front: "Hadjdj", back: "Pèlerinage. Mahomet en fixe les règles en 632 (excluent les incroyants)." },
];

const BADGES = [
  { id: "first-step", label: "Premier pas", desc: "Ouvrir l'application", icon: "step" },
  { id: "intro-read", label: "Enquêteur", desc: "Lire l'introduction", icon: "scroll" },
  { id: "timeline", label: "Voyageur du temps", desc: "Parcourir la chronologie", icon: "clock" },
  { id: "flashcards-3", label: "Mémoire d'éléphant", desc: "Retourner 3 flashcards", icon: "card" },
  { id: "quiz-pass", label: "Œil de l'historien", desc: "Réussir le quiz (≥ 8/12)", icon: "eye" },
  { id: "favorite", label: "Bibliothécaire", desc: "Ajouter un favori", icon: "star" },
];

window.HISTOIRE_DATA = {
  CHAPTERS,
  EVENTS,
  DIFFUSION,
  FACT_VS_BELIEF,
  GLOSSARY,
  QUIZ,
  FLASHCARDS,
  BADGES,
};
