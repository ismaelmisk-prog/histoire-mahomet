// All page components. Reads window.HISTOIRE_DATA + window.HISTOIRE_UI.

const {
  CHAPTERS,
  EVENTS,
  DIFFUSION,
  FACT_VS_BELIEF,
  GLOSSARY,
  QUIZ,
  FLASHCARDS,
} = window.HISTOIRE_DATA;

const {
  StarPattern,
  HexPattern,
  StarStrip,
  Icon,
  Tag,
  Card,
  Button,
  SectionTitle,
  FavoriteToggle,
  ProgressBar,
  ImagePlaceholder,
} = window.HISTOIRE_UI;

const { useState, useEffect, useMemo, useRef } = React;

// — Chapter header pattern ————————————————————
const ChapterHeader = ({ number, kicker, title, sub, fav, onFav }) => (
  <div className="chapter-header">
    <div className="chapter-header-bg">
      <StarPattern opacity={0.07} scale={0.9} />
    </div>
    <div className="chapter-header-inner">
      <div className="chapter-num">Chapitre {number}</div>
      <h1>{title}</h1>
      {kicker && <div className="chapter-kicker">{kicker}</div>}
      {sub && <p className="chapter-sub">{sub}</p>}
      <div className="chapter-header-strip">
        <StarStrip />
      </div>
      {onFav && (
        <div className="chapter-header-actions">
          <FavoriteToggle active={fav} onClick={onFav} />
        </div>
      )}
    </div>
  </div>
);

// — Home —————————————————————————————————————
const HomePage = ({ go, progress, favorites, badges }) => {
  const earned = badges.filter((b) => b.earned).length;
  return (
    <div className="page page-home">
      <section className="hero">
        <div className="hero-bg">
          <StarPattern opacity={0.08} scale={1.3} />
        </div>
        <div className="hero-content">
          <div className="hero-mono">SYLLABUS · S2b · ISMAEL MISKIN &amp; GHALI FILALI</div>
          <h1>
            Mahomet :
            <br />
            <em>entre histoire et religion.</em>
          </h1>
          <p>
            Une enquête d'historien. On retrace une vie, on explique un message,
            et on apprend à séparer les faits prouvés des croyances.
          </p>
          <div className="hero-cta">
            <Button icon="arrow" onClick={() => go("introduction")}>Commencer l'enquête</Button>
            <Button variant="ghost" icon="timeline" onClick={() => go("chronologie")}>
              Voir la chronologie
            </Button>
          </div>
          <div className="hero-strip"><StarStrip count={11} /></div>
        </div>
      </section>

      <section className="home-stats">
        <div className="stat">
          <div className="stat-num">62</div>
          <div className="stat-label">ans, de 570 à 632</div>
        </div>
        <div className="stat">
          <div className="stat-num">114</div>
          <div className="stat-label">révélations (Coran, selon la tradition)</div>
        </div>
        <div className="stat">
          <div className="stat-num">25</div>
          <div className="stat-label">expéditions militaires entre 622 et 632</div>
        </div>
        <div className="stat">
          <div className="stat-num">10 000</div>
          <div className="stat-label">hommes pour la prise de La Mecque (630)</div>
        </div>
      </section>

      <section className="home-progress">
        <Card className="card-progress">
          <div className="card-progress-head">
            <div>
              <div className="kicker">Votre parcours</div>
              <h3>Progression</h3>
            </div>
            <div className="card-progress-meta">
              <span><Icon name="starFill" size={14} /> {favorites.length} favori{favorites.length > 1 ? "s" : ""}</span>
              <span><Icon name="check" size={14} /> {earned}/{badges.length} badges</span>
            </div>
          </div>
          <ProgressBar value={progress} label="Lecture du syllabus" />
        </Card>
      </section>

      <section className="chapters-grid">
        <div className="kicker">Sommaire</div>
        <h2>Six chapitres pour une enquête</h2>
        <div className="chapters-list">
          {CHAPTERS.map((c, i) => (
            <Card
              key={c.id}
              as="button"
              className="chapter-card"
              onClick={() => go(c.id)}
            >
              <div className="chapter-card-num">{c.number}</div>
              <div className="chapter-card-body">
                <div className="kicker">{c.kicker}</div>
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
                <div className="chapter-card-foot">
                  <span><Icon name="clock" size={14} /> {c.minutes} min de lecture</span>
                  <span className="chapter-card-arrow"><Icon name="arrow" size={16} /></span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="home-tools">
        <div className="kicker">Outils</div>
        <h2>Apprendre activement</h2>
        <div className="tools-grid">
          <Card as="button" className="tool-card" onClick={() => go("chronologie")}>
            <Icon name="timeline" size={22} />
            <h3>Chronologie</h3>
            <p>9 jalons de 570 à 632, à parcourir.</p>
          </Card>
          <Card as="button" className="tool-card" onClick={() => go("flashcards")}>
            <Icon name="card" size={22} />
            <h3>Flashcards</h3>
            <p>{FLASHCARDS.length} cartes mémoire à retourner.</p>
          </Card>
          <Card as="button" className="tool-card" onClick={() => go("quiz")}>
            <Icon name="quiz" size={22} />
            <h3>Quiz</h3>
            <p>{QUIZ.length} questions tirées du syllabus.</p>
          </Card>
          <Card as="button" className="tool-card" onClick={() => go("glossaire")}>
            <Icon name="book" size={22} />
            <h3>Glossaire</h3>
            <p>{GLOSSARY.length} mots à connaître.</p>
          </Card>
        </div>
      </section>

      <section className="home-question">
        <Card className="card-question">
          <Icon name="compass" size={22} />
          <div>
            <div className="kicker">La grande question</div>
            <p>
              « Comment fait-on, en tant qu'historien, pour étudier la vie de
              Mahomet en séparant bien les faits historiques des croyances
              religieuses ? »
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
};

// — Introduction ————————————————————————————————
const IntroductionPage = ({ fav, onFav }) => (
  <div className="page page-prose">
    <ChapterHeader
      number="I"
      kicker="Notre enquête"
      title="Introduction"
      sub="Pas un cours de religion. Une enquête d'historien."
      fav={fav}
      onFav={onFav}
    />
    <div className="prose">
      <p className="lead">
        Dans ce syllabus, on va parler du prophète Mahomet. On va le situer dans
        le temps et dans l'espace, retracer les grands moments de sa vie, et
        comprendre comment et pourquoi son message s'est diffusé aussi vite à
        l'époque.
      </p>
      <p>
        Mais on n'est pas là pour faire un cours de religion. Pour cette mission,
        on s'est mis dans la peau de vrais historiens. Et un historien ne se
        laisse pas influencer par ses croyances : il lui faut des preuves et des
        faits validés scientifiquement.
      </p>
      <p>
        Du coup, dans ce dossier, on va faire une séparation entre les faits
        historiques prouvés d'un côté, et les croyances religieuses de l'autre.
      </p>

      <Card className="quote">
        <div className="quote-mark">«</div>
        <blockquote>
          La grande question de notre enquête : comment fait-on, en tant
          qu'historien, pour étudier la vie de Mahomet en séparant bien les
          faits historiques des croyances religieuses ?
        </blockquote>
      </Card>

      <h2>Trois objectifs</h2>
      <div className="objectives">
        <Card><div className="obj-num">01</div><div><h4>Situer</h4><p>Placer Mahomet dans le temps et dans l'espace.</p></div></Card>
        <Card><div className="obj-num">02</div><div><h4>Retracer</h4><p>Les grands moments de sa vie, en chronologie.</p></div></Card>
        <Card><div className="obj-num">03</div><div><h4>Comprendre</h4><p>Comment et pourquoi son message s'est diffusé.</p></div></Card>
      </div>
    </div>
  </div>
);

// — Mahomet dans le temps et l'espace ————————————
const StylizedMap = () => (
  <div className="stylized-map">
    <div className="stylized-map-bg">
      <HexPattern opacity={0.08} />
    </div>
    <svg viewBox="0 0 600 380" className="stylized-map-svg" aria-label="Carte stylisée de la péninsule arabique au VIIe siècle">
      {/* Coastline-like abstract shape */}
      <path
        d="M80 60 Q140 40 220 60 Q300 80 360 70 Q440 60 500 90 Q540 130 520 200 Q500 270 460 300 Q400 340 320 330 Q240 320 180 300 Q120 280 90 230 Q60 180 70 130 Q72 90 80 60 Z"
        fill="var(--surface-2)"
        stroke="var(--ink-muted)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      {/* Routes */}
      <g stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeDasharray="2 5" opacity="0.7">
        <path d="M260 240 Q220 180 200 130" />
        <path d="M260 240 Q330 200 400 150" />
        <path d="M260 240 Q310 290 360 310" />
      </g>
      {/* Cities */}
      <g>
        {[
          { x: 260, y: 240, label: "La Mecque", sub: "Hedjaz" },
          { x: 200, y: 130, label: "Médine", sub: "ex-Yathrib (622)" },
          { x: 400, y: 150, label: "Syrie", sub: "marchands chrétiens" },
          { x: 360, y: 310, label: "Yémen", sub: "commerce" },
          { x: 470, y: 280, label: "Abyssinie", sub: "exil 615" },
        ].map((c) => (
          <g key={c.label} transform={`translate(${c.x}, ${c.y})`}>
            <circle r="4" fill="var(--primary)" />
            <circle r="9" fill="none" stroke="var(--primary)" opacity="0.4" />
            <text x="12" y="-6" className="map-label">{c.label}</text>
            <text x="12" y="8" className="map-sub">{c.sub}</text>
          </g>
        ))}
      </g>
      {/* Title */}
      <text x="300" y="28" textAnchor="middle" className="map-title">PÉNINSULE ARABIQUE — VIIᵉ SIÈCLE</text>
    </svg>
  </div>
);

const TempsEspacePage = ({ fav, onFav }) => (
  <div className="page page-prose">
    <ChapterHeader
      number="II.a"
      kicker="Le décor"
      title="Mahomet dans le temps et dans l'espace"
      sub="Personnage du VIIᵉ siècle. Toute son histoire se déroule dans la péninsule arabique, principalement entre La Mecque et Médine."
      fav={fav}
      onFav={onFav}
    />
    <div className="prose">
      <p className="lead">
        Mahomet n'est pas hors du monde : il vit dans une société bien précise,
        qui a ses propres règles. D'après la Sira, il est né en 570 à La Mecque,
        dans le Hedjaz.
      </p>

      <StylizedMap />
      <p className="caption">Carte stylisée d'après le syllabus — repères principaux.</p>

      <h2>Un carrefour commercial</h2>
      <p>
        À cette époque, la région est un immense carrefour commercial. Il y a
        beaucoup d'échanges entre le Yémen, la Syrie et l'Abyssinie chrétienne
        (l'actuelle Éthiopie). La Mecque est une grande étape pour les
        caravanes. Autour de la ville, on trouve plein de tribus bédouines qui
        élèvent des chameaux pour transporter les marchandises.
      </p>

      <Card className="callout callout-historian">
        <div className="callout-head">
          <Icon name="eye" size={18} />
          <span>L'œil de l'historien — c'est quoi nos sources ?</span>
        </div>
        <p>
          On n'a pas de preuves « scientifiques » directes (comme des papiers
          d'identité ou des photos) sur l'enfance de Mahomet. Tout ce qu'on
          raconte sur sa jeunesse d'orphelin ou son honnêteté vient de la Sira,
          la biographie traditionnelle écrite par des musulmans bien après sa
          mort. En tant qu'historiens, on utilise ces textes, mais on garde une
          petite distance parce qu'ils ont été écrits pour montrer que c'était
          quelqu'un d'exceptionnel.
        </p>
      </Card>

      <h2>Une vie dans un système de clans</h2>
      <p>
        Il grandit en plein dans ce système de clans. Son père, Abd Allah,
        faisait partie des Hachim, un clan de la puissante tribu des
        Quraychites. Orphelin de père à la naissance, il perd aussi sa mère,
        Amina, à six ans. Il est d'abord placé chez une nourrice bédouine, puis
        élevé par son grand-père, et ensuite par son oncle, Abou Talib.
      </p>
      <p>
        Comme son oncle n'a pas beaucoup d'argent, Mahomet doit travailler très
        jeune pour l'aider. Il commence comme berger, puis se lance dans le
        commerce. Dans sa tribu, il est très connu pour son honnêteté. Les gens
        le surnomment « Al Amine » (l'homme de confiance).
      </p>
      <p>
        Khadija, une riche commerçante de sa tribu, l'embauche pour gérer ses
        caravanes. Elle est tellement impressionnée par son intégrité qu'elle
        lui propose de l'épouser. Il a 25 ans, elle en a 40. Ils restent mariés
        pendant 25 ans, jusqu'à la mort de Khadija, qui sera la première
        personne à se convertir à l'islam bien avant que Mahomet ne s'exile à
        Médine.
      </p>

      <div className="people-grid">
        <Card><div className="person-name">Abd Allah</div><div className="person-role">Père, mort avant sa naissance · clan Hachim</div></Card>
        <Card><div className="person-name">Amina</div><div className="person-role">Mère, morte quand il a 6 ans</div></Card>
        <Card><div className="person-name">Abou Talib</div><div className="person-role">Oncle, qui l'élève après son grand-père</div></Card>
        <Card><div className="person-name">Khadija</div><div className="person-role">Épouse, première convertie · 25 ans avec lui</div></Card>
      </div>
    </div>
  </div>
);

// — Événements majeurs ————————————————————————
const EventsPage = ({ fav, onFav }) => {
  const [active, setActive] = useState(0);
  const ev = EVENTS[active];
  return (
    <div className="page page-events">
      <ChapterHeader
        number="II.b"
        kicker="Chronologie"
        title="Les événements majeurs"
        sub="De 570 à 632. Cliquez sur une date pour la déplier."
        fav={fav}
        onFav={onFav}
      />
      <div className="events-layout">
        <div className="events-track" role="tablist">
          {EVENTS.map((e, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              className={`event-pill ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="event-pill-year">{e.year}</span>
              <span className="event-pill-title">{e.title}</span>
            </button>
          ))}
        </div>
        <Card className="events-detail">
          <div className="events-detail-head">
            <div>
              <Tag tone={ev.tag}>{ev.tag}</Tag>
              <h2>{ev.title}</h2>
              <div className="events-detail-place"><Icon name="map" size={14} /> {ev.place}</div>
            </div>
            <div className="events-detail-year">{ev.year}</div>
          </div>
          <p>{ev.body}</p>
        </Card>
      </div>

      <Card className="callout callout-historian">
        <div className="callout-head">
          <Icon name="eye" size={18} />
          <span>L'œil de l'historien</span>
        </div>
        <p>
          Attention à ne pas tout mélanger ! En tant qu'historiens, nous
          étudions Mahomet comme un chef politique et militaire qui a unifié
          l'Arabie. Nous n'avons pas de preuves scientifiques des interventions
          divines (comme l'ange Gabriel) : ça appartient au domaine de la foi et
          des croyances religieuses, pas à la science historique.
        </p>
      </Card>
    </div>
  );
};

// — Diffusion ————————————————————————————————
const DiffusionPage = ({ fav, onFav }) => (
  <div className="page page-prose">
    <ChapterHeader
      number="II.c"
      kicker="Quatre clés"
      title="Pourquoi & comment son message s'est diffusé"
      sub="Une idée qui voyage sans Internet : social, religieux, commercial, politique."
      fav={fav}
      onFav={onFav}
    />
    <div className="diffusion-grid">
      {DIFFUSION.map((d) => (
        <Card key={d.n} className="diffusion-card">
          <div className="diffusion-num">{d.n}</div>
          <h3>{d.title}</h3>
          <p>{d.body}</p>
        </Card>
      ))}
    </div>

    <figure style={{ margin: "28px 0 8px", borderRadius: "var(--r)", overflow: "hidden", border: "1px solid var(--rule)" }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Kaaba_Mecca.jpg"
        alt="La Kaaba à La Mecque"
        style={{ width: "100%", display: "block", maxHeight: "480px", objectFit: "cover" }}
      />
      <figcaption style={{ padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: "0.74rem", color: "var(--ink-muted)", letterSpacing: "0.04em", background: "var(--surface)" }}>
        La Kaaba à La Mecque — Ancien sanctuaire polythéiste devenu le centre du monothéisme musulman. © Pras / CC BY 3.0
      </figcaption>
    </figure>
  </div>
);

// — Faits vs croyances ————————————————————————
const FactsPage = ({ fav, onFav }) => (
  <div className="page page-prose">
    <ChapterHeader
      number="II.d"
      kicker="L'œil de l'historien"
      title="Faits historiques vs croyances religieuses"
      sub="Le tableau du syllabus, à confronter colonne par colonne."
      fav={fav}
      onFav={onFav}
    />
    <div className="facts-table">
      <div className="facts-head">
        <div className="facts-col facts-col-h">
          <Icon name="scale" size={18} />
          <span>Ce que fait l'historien</span>
        </div>
        <div className="facts-col facts-col-b">
          <Icon name="flag" size={18} />
          <span>Ce qui relève de la croyance</span>
        </div>
      </div>
      {FACT_VS_BELIEF.map((row, i) => (
        <div className="facts-row" key={i}>
          <Card className="facts-cell facts-cell-h">
            <h4>{row.historian.title}</h4>
            <p>{row.historian.body}</p>
          </Card>
          <div className="facts-vs">vs</div>
          <Card className="facts-cell facts-cell-b">
            <h4>{row.believer.title}</h4>
            <p>{row.believer.body}</p>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

// — Conclusion ————————————————————————————————
const ConclusionPage = ({ fav, onFav }) => (
  <div className="page page-prose">
    <ChapterHeader
      number="III"
      kicker="Ce qu'on retient"
      title="Conclusion"
      fav={fav}
      onFav={onFav}
    />
    <div className="prose">
      <p className="lead">
        En gros, dans notre travail, on a compris que Mahomet est un personnage
        très important pour l'histoire, pas seulement pour la religion.
      </p>
      <p>
        Ce qu'on retient, c'est que l'islam ne s'est pas propagé par magie. Il
        s'est propagé parce que les gens en avaient marre des inégalités, parce
        que les marchands racontaient ce qu'ils entendaient dans les autres
        villes, et parce que Mahomet a été un bon chef pour unir les tribus qui
        se faisaient la guerre.
      </p>
      <p>
        Le plus important dans notre mission de groupe, c'était d'apprendre à
        ne pas mélanger la croyance et l'histoire. On a vu qu'on peut étudier
        la vie d'un prophète de façon neutre, comme on étudie la vie d'un roi
        ou d'un empereur, en cherchant des preuves et des explications
        logiques. L'historien ne juge pas si c'est vrai ou faux, il essaie
        juste de comprendre comment les gens vivaient à cette époque-là.
      </p>

      <h2>Questions ouvertes du syllabus</h2>
      <div className="open-questions">
        <Card>
          <div className="kicker">Sur la méthode</div>
          <p>
            Que vous soyez à Casablanca ou à Bruxelles, trouvez-vous facile de
            faire la différence entre un récit de tradition (la Sira) et un
            fait prouvé par l'archéologie ou des documents d'époque ?
          </p>
        </Card>
        <Card>
          <div className="kicker">Sur la neutralité</div>
          <p>
            Est-ce que vous pensez qu'un historien peut vraiment rester 100 %
            neutre quand il travaille sur un sujet qui touche à la foi et aux
            convictions de millions de personnes ?
          </p>
        </Card>
      </div>

      <h2>Bibliographie du syllabus</h2>
      <div className="biblio">
        <div>
          <div className="kicker">Ressources numériques &amp; vidéos</div>
          <ul>
            <li>Lumni.fr — dossiers pédagogiques</li>
            <li>YouTube — « C'est pas Sorcier », L'Islam : de Mahomet à nos jours</li>
          </ul>
        </div>
        <div>
          <div className="kicker">Revues &amp; études spécialisées</div>
          <ul>
            <li>Magazine L'Histoire — articles sur le VIIᵉ siècle</li>
            <li>Institut du Monde Arabe (IMA) — site officiel</li>
          </ul>
        </div>
        <div>
          <div className="kicker">Supports scolaires &amp; cartographiques</div>
          <ul>
            <li>Manuel d'Histoire-Géographie 5ᵉ — cartes de l'Hégire</li>
            <li>Atlas historique (Georges Duby, Larousse)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// — Glossaire ————————————————————————————————
const GlossaryPage = ({ query, fav, onFav, favorites, toggleFav }) => {
  const list = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return GLOSSARY;
    return GLOSSARY.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        g.def.toLowerCase().includes(q),
    );
  }, [query]);
  return (
    <div className="page page-prose">
      <ChapterHeader
        number="IV"
        kicker="Le petit lexique"
        title="Glossaire"
        sub={`${GLOSSARY.length} mots à connaître pour suivre l'enquête.`}
        fav={fav}
        onFav={onFav}
      />
      {list.length === 0 && (
        <Card className="empty">Aucun mot ne correspond à « {query} ».</Card>
      )}
      <div className="glossary-grid">
        {list.map((g) => {
          const id = `glo-${g.term}`;
          const isFav = favorites.includes(id);
          return (
            <Card key={g.term} className="glossary-card">
              <div className="glossary-head">
                <h3>{g.term}</h3>
                <button
                  className={`fav-btn ${isFav ? "is-active" : ""}`}
                  onClick={() => toggleFav(id)}
                  aria-label={`Favori : ${g.term}`}
                >
                  <Icon name={isFav ? "starFill" : "star"} size={14} />
                </button>
              </div>
              <p>{g.def}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// — Quiz ——————————————————————————————————————
const QuizPage = ({ onPass }) => {
  const [picks, setPicks] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(
    () =>
      QUIZ.reduce((s, q, i) => (picks[i] === q.answer ? s + 1 : s), 0),
    [picks],
  );
  useEffect(() => {
    if (submitted && score >= 8) onPass?.();
  }, [submitted, score, onPass]);

  const answeredCount = Object.keys(picks).length;

  return (
    <div className="page page-prose">
      <ChapterHeader
        number="QZ"
        kicker="Vérifier ses connaissances"
        title="Quiz visuel"
        sub={`${QUIZ.length} questions tirées du syllabus. Choisissez, validez, lisez l'explication.`}
      />
      <div className="quiz-meta">
        <ProgressBar value={answeredCount} max={QUIZ.length} label="Questions répondues" />
        {submitted && (
          <div className={`quiz-score ${score >= 8 ? "good" : "ok"}`}>
            Score : <strong>{score}/{QUIZ.length}</strong>
            {score >= 8 ? " — Œil de l'historien obtenu." : " — Encore un effort."}
          </div>
        )}
      </div>
      <div className="quiz-list">
        {QUIZ.map((q, i) => {
          const pick = picks[i];
          return (
            <Card key={i} className="quiz-card">
              <div className="quiz-num">Q{i + 1}</div>
              <h3>{q.q}</h3>
              <div className="quiz-options">
                {q.options.map((o, j) => {
                  const isPicked = pick === j;
                  const isRight = submitted && j === q.answer;
                  const isWrong = submitted && isPicked && j !== q.answer;
                  return (
                    <button
                      key={j}
                      className={`quiz-opt ${isPicked ? "is-picked" : ""} ${isRight ? "is-right" : ""} ${isWrong ? "is-wrong" : ""}`}
                      disabled={submitted}
                      onClick={() => setPicks((p) => ({ ...p, [i]: j }))}
                    >
                      <span className="quiz-opt-letter">{String.fromCharCode(65 + j)}</span>
                      <span>{o}</span>
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className={`quiz-explain ${pick === q.answer ? "good" : "bad"}`}>
                  {pick === q.answer ? "Bonne réponse. " : "Mauvaise réponse. "}
                  {q.explain}
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <div className="quiz-actions">
        {!submitted ? (
          <Button icon="check" onClick={() => setSubmitted(true)} disabled={answeredCount < QUIZ.length}>
            Valider mes réponses
          </Button>
        ) : (
          <Button icon="rotate" variant="ghost" onClick={() => { setPicks({}); setSubmitted(false); }}>
            Recommencer
          </Button>
        )}
      </div>
    </div>
  );
};

// — Flashcards ————————————————————————————————
const FlashcardsPage = ({ onFlip3 }) => {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState(new Set());

  const next = () => { setFlipped(false); setI((i + 1) % FLASHCARDS.length); };
  const prev = () => { setFlipped(false); setI((i - 1 + FLASHCARDS.length) % FLASHCARDS.length); };

  const flip = () => {
    setFlipped((f) => !f);
    setSeen((s) => {
      const ns = new Set(s);
      ns.add(i);
      if (ns.size >= 3) onFlip3?.();
      return ns;
    });
  };

  const card = FLASHCARDS[i];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") { e.preventDefault(); flip(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="page page-prose">
      <ChapterHeader
        number="FC"
        kicker="Cartes mémoire"
        title="Flashcards"
        sub={`${FLASHCARDS.length} cartes — cliquez pour retourner. Flèches ←/→, espace pour retourner.`}
      />
      <div className="flashcard-stage">
        <button
          className={`flashcard ${flipped ? "is-flipped" : ""}`}
          onClick={flip}
          aria-label="Retourner la carte"
        >
          <div className="flashcard-bg">
            <StarPattern opacity={0.06} scale={0.75} />
          </div>
          <div className="flashcard-inner">
            <div className="flashcard-face flashcard-front">
              <div className="flashcard-corner">recto · {i + 1}/{FLASHCARDS.length}</div>
              <div className="flashcard-text">{card.front}</div>
              <div className="flashcard-hint">cliquer pour retourner</div>
            </div>
            <div className="flashcard-face flashcard-back">
              <div className="flashcard-corner">verso</div>
              <div className="flashcard-text flashcard-text-back">{card.back}</div>
            </div>
          </div>
        </button>
      </div>
      <div className="flashcard-controls">
        <Button variant="ghost" icon="arrow" onClick={prev}>Précédente</Button>
        <div className="flashcard-progress">{i + 1} / {FLASHCARDS.length}</div>
        <Button icon="arrow" onClick={next}>Suivante</Button>
      </div>
    </div>
  );
};

// — Chronologie ————————————————————————————————
const TimelinePage = ({ onSeen }) => {
  useEffect(() => { onSeen?.(); }, [onSeen]);
  return (
    <div className="page page-timeline">
      <ChapterHeader
        number="CR"
        kicker="9 jalons"
        title="Chronologie interactive"
        sub="De la naissance à la mort — survolez ou cliquez chaque date."
      />
      <div className="timeline">
        <div className="timeline-axis" />
        {EVENTS.map((e, i) => (
          <div key={i} className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}>
            <div className="timeline-dot">
              <div className="timeline-dot-inner" />
            </div>
            <Card className="timeline-card">
              <div className="timeline-year">{e.year}</div>
              <h3>{e.title}</h3>
              <div className="timeline-place"><Icon name="map" size={13} /> {e.place}</div>
              <p>{e.body}</p>
              <Tag tone={e.tag}>{e.tag}</Tag>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

window.HISTOIRE_PAGES = {
  HomePage,
  IntroductionPage,
  TempsEspacePage,
  EventsPage,
  DiffusionPage,
  FactsPage,
  ConclusionPage,
  GlossaryPage,
  QuizPage,
  FlashcardsPage,
  TimelinePage,
};
