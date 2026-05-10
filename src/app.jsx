// App shell: sidebar nav, top bar (search, dark mode, progress), badges,
// favorites (localStorage), routing via state.

const { useState, useEffect, useMemo, useCallback } = React;
const { Icon, Button, Card, ProgressBar } = window.HISTOIRE_UI;

const PAGES = [
  { id: "accueil", label: "Accueil", icon: "home", group: "" },
  { id: "introduction", label: "Introduction", icon: "scroll", group: "Cours" },
  { id: "temps-espace", label: "Temps & espace", icon: "map", group: "Cours" },
  { id: "evenements", label: "Événements majeurs", icon: "flag", group: "Cours" },
  { id: "diffusion", label: "Diffusion du message", icon: "spread", group: "Cours" },
  { id: "faits-vs-croyances", label: "Faits vs croyances", icon: "scale", group: "Cours" },
  { id: "conclusion", label: "Conclusion", icon: "check", group: "Cours" },
  { id: "chronologie", label: "Chronologie", icon: "timeline", group: "Outils" },
  { id: "flashcards", label: "Flashcards", icon: "card", group: "Outils" },
  { id: "quiz", label: "Quiz", icon: "quiz", group: "Outils" },
  { id: "glossaire", label: "Glossaire", icon: "book", group: "Outils" },
];

const STORAGE = "histoire.v1";

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE) || "{}");
  } catch (_) {
    return {};
  }
}
function saveState(s) {
  try { localStorage.setItem(STORAGE, JSON.stringify(s)); } catch (_) {}
}

const { CHAPTERS, GLOSSARY, EVENTS, BADGES, QUIZ, FLASHCARDS } = window.HISTOIRE_DATA;

// flat search index — pages, chapters, glossary, events
const SEARCH_INDEX = [
  ...PAGES.filter((p) => p.id !== "accueil").map((p) => ({
    type: "Page", title: p.label, target: p.id, sub: p.group,
  })),
  ...CHAPTERS.map((c) => ({
    type: "Chapitre", title: c.title, target: c.id, sub: c.summary,
  })),
  ...EVENTS.map((e) => ({
    type: "Date", title: `${e.year} — ${e.title}`, target: "chronologie", sub: e.body.slice(0, 90) + "…",
  })),
  ...GLOSSARY.map((g) => ({
    type: "Lexique", title: g.term, target: "glossaire", sub: g.def.slice(0, 90) + "…",
  })),
];

const App = () => {
  const persisted = loadState();
  const [route, setRoute] = useState(persisted.route || "accueil");
  const [dark, setDark] = useState(persisted.dark || false);
  const [favorites, setFavorites] = useState(persisted.favorites || []);
  const [earned, setEarned] = useState(persisted.earned || ["first-step"]);
  const [sideOpen, setSideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [glossaryQuery, setGlossaryQuery] = useState("");

  // persist
  useEffect(() => {
    saveState({ route, dark, favorites, earned });
  }, [route, dark, favorites, earned]);

  // dark mode class on root
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  // close sidebar on route change (mobile)
  useEffect(() => { setSideOpen(false); window.scrollTo({ top: 0 }); }, [route]);

  // earn badge helpers
  const earnBadge = useCallback((id) => {
    setEarned((e) => (e.includes(id) ? e : [...e, id]));
  }, []);

  // route -> badges
  useEffect(() => {
    if (route === "introduction") earnBadge("intro-read");
    if (route === "chronologie") earnBadge("timeline");
  }, [route, earnBadge]);

  const toggleFav = useCallback((id) => {
    setFavorites((f) => {
      const next = f.includes(id) ? f.filter((x) => x !== id) : [...f, id];
      if (!f.includes(id)) earnBadge("favorite");
      return next;
    });
  }, [earnBadge]);

  // progress: based on earned badges + visited routes (proxy)
  const visitedKey = "histoire.visited";
  const [visited, setVisited] = useState(() => {
    try { return JSON.parse(localStorage.getItem(visitedKey) || "[]"); } catch (_) { return []; }
  });
  useEffect(() => {
    if (!visited.includes(route)) {
      const next = [...visited, route];
      setVisited(next);
      try { localStorage.setItem(visitedKey, JSON.stringify(next)); } catch (_) {}
    }
  }, [route]);
  const progress = Math.min(100, Math.round((visited.length / PAGES.length) * 100));

  // build badges list with earned flag
  const badges = BADGES.map((b) => ({ ...b, earned: earned.includes(b.id) }));

  // search results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((it) =>
      (it.title + " " + (it.sub || "")).toLowerCase().includes(q),
    ).slice(0, 10);
  }, [query]);

  const go = (id) => setRoute(id);

  const {
    HomePage, IntroductionPage, TempsEspacePage, EventsPage, DiffusionPage,
    FactsPage, ConclusionPage, GlossaryPage, QuizPage, FlashcardsPage, TimelinePage,
  } = window.HISTOIRE_PAGES;

  // page content
  const isFav = (key) => favorites.includes(key);
  const fav = (key) => () => toggleFav(key);

  let body;
  switch (route) {
    case "introduction":
      body = <IntroductionPage fav={isFav("ch-introduction")} onFav={fav("ch-introduction")} />; break;
    case "temps-espace":
      body = <TempsEspacePage fav={isFav("ch-temps-espace")} onFav={fav("ch-temps-espace")} />; break;
    case "evenements":
      body = <EventsPage fav={isFav("ch-evenements")} onFav={fav("ch-evenements")} />; break;
    case "diffusion":
      body = <DiffusionPage fav={isFav("ch-diffusion")} onFav={fav("ch-diffusion")} />; break;
    case "faits-vs-croyances":
      body = <FactsPage fav={isFav("ch-faits")} onFav={fav("ch-faits")} />; break;
    case "conclusion":
      body = <ConclusionPage fav={isFav("ch-conclusion")} onFav={fav("ch-conclusion")} />; break;
    case "glossaire":
      body = <GlossaryPage query={glossaryQuery} fav={isFav("ch-glossaire")} onFav={fav("ch-glossaire")} favorites={favorites} toggleFav={toggleFav} />; break;
    case "quiz":
      body = <QuizPage onPass={() => earnBadge("quiz-pass")} />; break;
    case "flashcards":
      body = <FlashcardsPage onFlip3={() => earnBadge("flashcards-3")} />; break;
    case "chronologie":
      body = <TimelinePage onSeen={() => earnBadge("timeline")} />; break;
    case "accueil":
    default:
      body = <HomePage go={go} progress={progress} favorites={favorites} badges={badges} />;
  }

  // group nav
  const navGroups = useMemo(() => {
    const groups = {};
    PAGES.forEach((p) => {
      const g = p.group || "_";
      if (!groups[g]) groups[g] = [];
      groups[g].push(p);
    });
    return groups;
  }, []);

  return (
    <div className="app">
      {/* sidebar */}
      <aside className={`sidebar ${sideOpen ? "is-open" : ""}`}>
        <div className="brand" onClick={() => go("accueil")}>
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="-12 -12 24 24" width="22" height="22">
              <g fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="-9" y="-9" width="18" height="18" />
                <rect x="-9" y="-9" width="18" height="18" transform="rotate(45)" />
              </g>
            </svg>
          </div>
          <div>
            <div className="brand-name">histoire</div>
            <div className="brand-sub">syllabus interactif</div>
          </div>
        </div>

        {Object.entries(navGroups).map(([g, items]) => (
          <div key={g} className="nav-group">
            {g !== "_" && g !== "" && <div className="nav-group-title">{g}</div>}
            <ul>
              {items.map((p) => (
                <li key={p.id}>
                  <button
                    className={`nav-item ${route === p.id ? "is-active" : ""}`}
                    onClick={() => go(p.id)}
                  >
                    <Icon name={p.icon} size={16} />
                    <span>{p.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="sidebar-foot">
          <div className="kicker">Progression</div>
          <ProgressBar value={progress} label="" />
          <div className="badges">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`badge ${b.earned ? "is-earned" : ""}`}
                title={`${b.label} — ${b.desc}`}
              >
                <Icon name={b.icon} size={13} />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* mobile overlay */}
      {sideOpen && <div className="overlay" onClick={() => setSideOpen(false)} />}

      {/* main */}
      <main className="main">
        <header className="topbar">
          <button
            className="icon-btn topbar-menu"
            onClick={() => setSideOpen((o) => !o)}
            aria-label="Menu"
          >
            <Icon name="menu" size={18} />
          </button>

          <div className="search">
            <button
              className="search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Rechercher"
            >
              <Icon name="search" size={16} />
              <span>Rechercher dans le syllabus…</span>
              <kbd>/</kbd>
            </button>
          </div>

          <div className="topbar-right">
            <div className="topbar-progress">
              <ProgressBar value={progress} />
            </div>
            <button
              className="icon-btn"
              onClick={() => setDark((d) => !d)}
              aria-label="Mode sombre"
            >
              <Icon name={dark ? "sun" : "moon"} size={18} />
            </button>
          </div>
        </header>

        <div className="content">{body}</div>

        <footer className="foot">
          <div>« histoire » — frontend de démonstration · contenu : Ismael Miskin &amp; Ghali Filali, S2b</div>
        </footer>
      </main>

      {/* search modal */}
      {searchOpen && (
        <div className="modal" role="dialog" aria-modal="true" onClick={() => setSearchOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-search">
              <Icon name="search" size={16} />
              <input
                autoFocus
                type="text"
                placeholder="Mot-clé, date, terme…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="icon-btn" onClick={() => setSearchOpen(false)}>
                <Icon name="x" size={16} />
              </button>
            </div>
            {!query && (
              <div className="modal-empty">
                Essayez : <em>Hégire</em>, <em>624</em>, <em>Khadija</em>, <em>caravane</em>.
              </div>
            )}
            {query && results.length === 0 && (
              <div className="modal-empty">Aucun résultat.</div>
            )}
            <div className="modal-results">
              {results.map((r, i) => (
                <button
                  key={i}
                  className="modal-result"
                  onClick={() => {
                    if (r.target === "glossaire") setGlossaryQuery(r.title);
                    go(r.target);
                    setSearchOpen(false);
                    setQuery("");
                  }}
                >
                  <span className="modal-result-type">{r.type}</span>
                  <span className="modal-result-title">{r.title}</span>
                  {r.sub && <span className="modal-result-sub">{r.sub}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// keyboard shortcut for search
window.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
    e.preventDefault();
    document.querySelector(".search-trigger")?.click();
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
