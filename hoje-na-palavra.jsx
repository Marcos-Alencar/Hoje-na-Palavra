import { useState, useEffect, useCallback, createContext, useContext } from "react";

// ─── Contexts ───────────────────────────────────────────────────────────────

const ThemeContext = createContext();
const LangContext = createContext();
const FavoritesContext = createContext();

const TRANSLATIONS = {
  "pt-BR": {
    appName: "Hoje na Palavra",
    today: "Hoje",
    reflection: "Reflexão",
    prayer: "Oração",
    application: "Aplicação Prática",
    favorites: "Favoritos",
    settings: "Configurações",
    home: "Início",
    noFavorites: "Nenhum favorito ainda",
    noFavoritesDesc: "Salve devocionais tocando o ícone de coração",
    loading: "Gerando seu devocional...",
    retry: "Tentar novamente",
    error: "Não foi possível carregar",
    errorDesc: "Verifique sua conexão ou tente mais tarde.",
    futureTitle: "Devocional Futuro",
    futureDesc: "Este devocional ainda não está disponível.",
    shareText: "Compartilhar",
    favoriteAdded: "Adicionado aos favoritos",
    themeLabel: "Tema",
    langLabel: "Idioma",
    notifLabel: "Notificações",
    notifDesc: "Receba seu devocional diário às 8h",
    darkMode: "Modo Escuro",
    lightMode: "Modo Claro",
    savedOffline: "Disponível offline",
    apiKeyLabel: "Chave Universal de IA",
    apiKeyPlaceholder: "sk-... ou AIza...",
    apiKeySave: "Salvar",
    apiKeyDesc: "Compatível com OpenAI, Gemini, Claude e outras IAs",
    aboutLabel: "Sobre",
    aboutDesc: "Hoje na Palavra v2.0 — Reflexões bíblicas diárias com IA",
  },
  en: {
    appName: "Today in the Word",
    today: "Today",
    reflection: "Reflection",
    prayer: "Prayer",
    application: "Practical Application",
    favorites: "Favorites",
    settings: "Settings",
    home: "Home",
    noFavorites: "No favorites yet",
    noFavoritesDesc: "Save devotionals by tapping the heart icon",
    loading: "Generating your devotional...",
    retry: "Try again",
    error: "Could not load",
    errorDesc: "Check your connection or try again later.",
    futureTitle: "Future Devotional",
    futureDesc: "This devotional is not yet available.",
    shareText: "Share",
    favoriteAdded: "Added to favorites",
    themeLabel: "Theme",
    langLabel: "Language",
    notifLabel: "Notifications",
    notifDesc: "Receive your daily devotional at 8am",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    savedOffline: "Available offline",
    apiKeyLabel: "Universal AI Key",
    apiKeyPlaceholder: "sk-... or AIza...",
    apiKeySave: "Save",
    apiKeyDesc: "Compatible with OpenAI, Gemini, Claude and others",
    aboutLabel: "About",
    aboutDesc: "Today in the Word v2.0 — Daily Bible reflections with AI",
  },
  es: {
    appName: "Hoy en la Palabra",
    today: "Hoy",
    reflection: "Reflexión",
    prayer: "Oración",
    application: "Aplicación Práctica",
    favorites: "Favoritos",
    settings: "Ajustes",
    home: "Inicio",
    noFavorites: "Sin favoritos aún",
    noFavoritesDesc: "Guarda devocionales tocando el icono de corazón",
    loading: "Generando tu devocional...",
    retry: "Intentar de nuevo",
    error: "No se pudo cargar",
    errorDesc: "Verifica tu conexión o intenta más tarde.",
    futureTitle: "Devocional Futuro",
    futureDesc: "Este devocional aún no está disponible.",
    shareText: "Compartir",
    favoriteAdded: "Añadido a favoritos",
    themeLabel: "Tema",
    langLabel: "Idioma",
    notifLabel: "Notificaciones",
    notifDesc: "Recibe tu devocional diario a las 8am",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    savedOffline: "Disponible sin conexión",
    apiKeyLabel: "Clave Universal de IA",
    apiKeyPlaceholder: "sk-... o AIza...",
    apiKeySave: "Guardar",
    apiKeyDesc: "Compatible con OpenAI, Gemini, Claude y otras IA",
    aboutLabel: "Acerca de",
    aboutDesc: "Hoy en la Palabra v2.0 — Reflexiones bíblicas diarias con IA",
  },
};

const PALETTES = {
  light: {
    bg: "#F8F6F1",
    surface: "#FFFFFF",
    surfaceAlt: "#F2EFE8",
    border: "#E8E3D8",
    text: "#1A1714",
    textSec: "#5C5448",
    textMuted: "#9C9286",
    accent: "#7B5E3A",
    accentLight: "#F5EDE0",
    accentBright: "#C8872A",
    gold: "#D4A853",
    error: "#C0392B",
    heart: "#E74C3C",
    navBg: "#FFFFFF",
    navBorder: "#E8E3D8",
    skeleton: "#EDE8DF",
    tag: "#EDE3D4",
    tagText: "#7B5E3A",
  },
  dark: {
    bg: "#0F0D0B",
    surface: "#1A1714",
    surfaceAlt: "#221F1A",
    border: "#2E2A24",
    text: "#F2EDE6",
    textSec: "#B8AFA3",
    textMuted: "#6E665C",
    accent: "#C8872A",
    accentLight: "#1F1A13",
    accentBright: "#E6A040",
    gold: "#D4A853",
    error: "#E74C3C",
    heart: "#E74C3C",
    navBg: "#1A1714",
    navBorder: "#2E2A24",
    skeleton: "#221F1A",
    tag: "#2A2218",
    tagText: "#C8872A",
  },
};

// ─── Storage helpers ─────────────────────────────────────────────────────────

const DB_KEY = "hnp_devotionals_v2";
const FAV_KEY = "hnp_favorites_v2";
const SETTINGS_KEY = "hnp_settings_v2";

function loadDB() {
  try { return JSON.parse(localStorage.getItem(DB_KEY) || "{}"); } catch { return {}; }
}
function saveDB(db) {
  try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch {}
}
function loadFavs() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); } catch { return []; }
}
function saveFavs(favs) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch {}
}
function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || JSON.stringify({ dark: false, lang: "pt-BR", apiKey: "", notif: false }));
  } catch { return { dark: false, lang: "pt-BR", apiKey: "", notif: false }; }
}
function saveSettings(s) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch {}
}

// ─── AI Generation ───────────────────────────────────────────────────────────

async function generateDevotional(date, lang, apiKey) {
  const LANG_INSTRUCTION = {
    "pt-BR": "Responda COMPLETAMENTE em Português do Brasil.",
    "en": "Respond COMPLETELY in English.",
    "es": "Responde COMPLETAMENTE en Español.",
  };
  const instruction = LANG_INSTRUCTION[lang] || LANG_INSTRUCTION["pt-BR"];

  const systemPrompt = `Você é um pastor e teólogo experiente que escreve devocionais bíblicos profundos e inspiradores. ${instruction}

Responda EXATAMENTE neste formato JSON (sem markdown, sem backticks):
{
  "title": "Título impactante e curto do devocional",
  "verse": "Texto completo do versículo bíblico",
  "verseReference": "Referência (ex: João 3:16)",
  "reflection": "Reflexão profunda de 3-4 parágrafos conectando o versículo à vida cotidiana moderna",
  "prayer": "Oração baseada na reflexão do dia (2-3 parágrafos)",
  "application": "Uma aplicação prática e concreta para hoje (1-2 frases diretas)"
}`;

  const userPrompt = `Crie um devocional bíblico para ${date}. Escolha um versículo relevante, escreva uma reflexão profunda e inspiradora.`;

  // Try as OpenAI-compatible first (covers OpenAI, many universal APIs)
  const url = "https://api.openai.com/v1/chat/completions";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      max_tokens: 2048,
    }),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "{}";
  return JSON.parse(content);
}

// Use Claude (Anthropic API) as fallback via the built-in capability
async function generateWithClaude(date, lang) {
  const LANG_INSTRUCTION = {
    "pt-BR": "Responda COMPLETAMENTE em Português do Brasil.",
    "en": "Respond COMPLETELY in English.",
    "es": "Responde COMPLETAMENTE en Español.",
  };
  const instruction = LANG_INSTRUCTION[lang] || LANG_INSTRUCTION["pt-BR"];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Você é um pastor experiente. ${instruction} Crie um devocional bíblico para ${date}. Responda APENAS com JSON válido (sem markdown):
{"title":"...","verse":"...","verseReference":"...","reflection":"...","prayer":"...","application":"..."}`
      }]
    })
  });
  const data = await response.json();
  const raw = data.content?.[0]?.text || "{}";
  // Strip possible markdown fences
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const Icon = ({ name, size = 20, color = "currentColor", style = {} }) => {
  const icons = {
    home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    heartFill: "M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z",
    settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    chevLeft: "M15 19l-7-7 7-7",
    chevRight: "M9 5l7 7-7 7",
    share: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
    sun: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    moon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    key: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    hand: "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11",
    bulb: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    alert: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    trash: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  };
  const d = icons[name] || icons.info;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d={d} fill={name === "heartFill" ? color : "none"} stroke={name === "heartFill" ? "none" : color} />
    </svg>
  );
};

// ─── Date helpers ─────────────────────────────────────────────────────────────

function formatDate(date, lang) {
  const opts = { weekday: "long", day: "numeric", month: "long" };
  try {
    return date.toLocaleDateString(lang === "pt-BR" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US", opts);
  } catch { return date.toLocaleDateString(); }
}

function toDateStr(date) {
  return date.toISOString().split("T")[0];
}

function isToday(date) {
  return toDateStr(date) === toDateStr(new Date());
}

function isFuture(date) {
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(date); d.setHours(0,0,0,0);
  return d > today;
}

// ─── Components ──────────────────────────────────────────────────────────────

function Skeleton({ p }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ background: p.skeleton, borderRadius: 16, padding: 24, animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.15}s` }}>
          <div style={{ background: p.border, borderRadius: 8, height: 14, width: "40%", marginBottom: 16 }} />
          {[...Array(3)].map((_, j) => (
            <div key={j} style={{ background: p.border, borderRadius: 6, height: 10, width: j === 2 ? "60%" : "100%", marginBottom: 10 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

function DevotionalCard({ dev, p, t }) {
  const { favorites, toggle } = useContext(FavoritesContext);
  const isFav = favorites.includes(dev.date);

  const handleShare = async () => {
    const text = `${dev.title}\n\n"${dev.verse}"\n— ${dev.verseReference}\n\n${dev.reflection}\n\n${dev.prayer}\n\n— Hoje na Palavra`;
    if (navigator.share) {
      try { await navigator.share({ title: dev.title, text }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(text); alert("Copiado!"); } catch {}
    }
  };

  const sections = [
    { icon: "book", label: t.reflection, text: dev.reflection, bg: p.surface, accent: p.accent },
    { icon: "hand", label: t.prayer, text: dev.prayer, bg: p.surface, accent: p.accent },
    { icon: "bulb", label: t.application, text: dev.application, bg: p.accentLight, accent: p.accentBright },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Verse card */}
      <div style={{
        background: `linear-gradient(135deg, ${p.accent}15 0%, ${p.gold}10 100%)`,
        border: `1px solid ${p.gold}40`,
        borderRadius: 20,
        padding: 28,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: `${p.gold}08` }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Icon name="book" size={16} color={p.gold} />
          <span style={{ color: p.gold, fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", fontFamily: "Georgia, serif" }}>
            {dev.verseReference}
          </span>
        </div>
        <p style={{ color: p.text, fontSize: 18, lineHeight: 1.7, fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", margin: 0 }}>
          "{dev.verse}"
        </p>
      </div>

      {/* Sections */}
      {sections.map((s, i) => (
        <div key={i} style={{
          background: s.bg,
          border: `1px solid ${p.border}`,
          borderRadius: 16,
          padding: 22,
          animation: `fadeUp 0.5s ease both`,
          animationDelay: `${(i + 1) * 0.1}s`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Icon name={s.icon} size={16} color={s.accent} />
            <span style={{ color: p.text, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "system-ui" }}>
              {s.label}
            </span>
          </div>
          <p style={{ color: p.textSec, fontSize: 15, lineHeight: 1.8, margin: 0, fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {s.text}
          </p>
        </div>
      ))}

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", paddingTop: 8 }}>
        <button onClick={() => toggle(dev.date)} style={{
          width: 52, height: 52, borderRadius: 26,
          background: p.surface, border: `1px solid ${p.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
          boxShadow: isFav ? `0 0 0 2px ${p.heart}40` : "none",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <Icon name={isFav ? "heartFill" : "heart"} size={22} color={isFav ? p.heart : p.textMuted} />
        </button>
        <button onClick={handleShare} style={{
          width: 52, height: 52, borderRadius: 26,
          background: p.surface, border: `1px solid ${p.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "transform 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <Icon name="share" size={20} color={p.textMuted} />
        </button>
      </div>
    </div>
  );
}

function HomeScreen({ p, t, lang, apiKey }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [devotional, setDevotional] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dateStr = toDateStr(currentDate);
  const future = isFuture(currentDate);
  const todayBool = isToday(currentDate);

  const load = useCallback(async () => {
    if (future) return;
    setLoading(true); setError(null);
    const db = loadDB();
    const cacheKey = `${dateStr}_${lang}`;
    if (db[cacheKey]) { setDevotional(db[cacheKey]); setLoading(false); return; }
    try {
      let parsed;
      if (apiKey) {
        parsed = await generateDevotional(dateStr, lang, apiKey);
      } else {
        parsed = await generateWithClaude(dateStr, lang);
      }
      const dev = { date: dateStr, ...parsed };
      db[cacheKey] = dev;
      saveDB(db);
      setDevotional(dev);
    } catch (e) {
      setError(e.message || "error");
    }
    setLoading(false);
  }, [dateStr, lang, future, apiKey]);

  useEffect(() => { load(); }, [load]);

  const prev = () => setCurrentDate(d => { const n = new Date(d); n.setDate(n.getDate() - 1); return n; });
  const next = () => { if (!future) setCurrentDate(d => { const n = new Date(d); n.setDate(n.getDate() + 1); return n; }); };
  const goToday = () => setCurrentDate(new Date());

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ color: p.accent, fontSize: 22, fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}>
            ✦ {t.appName}
          </span>
          {!todayBool && (
            <button onClick={goToday} style={{
              background: p.accent, color: "#fff", border: "none",
              borderRadius: 20, padding: "8px 18px", fontSize: 13, fontWeight: 600,
              cursor: "pointer", transition: "opacity 0.15s"
            }}>
              {t.today}
            </button>
          )}
        </div>

        {/* Date nav */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <button onClick={prev} style={{ background: "none", border: "none", padding: 8, cursor: "pointer", color: p.text, borderRadius: 8 }}>
            <Icon name="chevLeft" size={22} color={p.text} />
          </button>
          <div style={{ flex: 1, textAlign: "center" }}>
            <span style={{ color: p.text, fontSize: 15, fontWeight: 500, textTransform: "capitalize" }}>
              {formatDate(currentDate, lang)}
            </span>
          </div>
          <button onClick={next} disabled={future} style={{ background: "none", border: "none", padding: 8, cursor: future ? "default" : "pointer", opacity: future ? 0.2 : 1, color: p.text, borderRadius: 8 }}>
            <Icon name="chevRight" size={22} color={p.text} />
          </button>
        </div>
        <div style={{ height: 1, background: p.border, margin: "12px 0 0" }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 100px" }}>
        {future ? (
          <div style={{ textAlign: "center", paddingTop: 80, color: p.textMuted }}>
            <Icon name="clock" size={48} color={p.textMuted} />
            <p style={{ fontSize: 17, fontWeight: 600, color: p.text, marginTop: 16 }}>{t.futureTitle}</p>
            <p style={{ fontSize: 14, color: p.textMuted }}>{t.futureDesc}</p>
          </div>
        ) : loading ? (
          <>
            <p style={{ textAlign: "center", color: p.textMuted, fontSize: 14, marginBottom: 24 }}>{t.loading}</p>
            <Skeleton p={p} />
          </>
        ) : error ? (
          <div style={{ textAlign: "center", paddingTop: 60, color: p.textMuted }}>
            <Icon name="alert" size={48} color={p.error} />
            <p style={{ fontSize: 17, fontWeight: 600, color: p.text, marginTop: 16 }}>{t.error}</p>
            <p style={{ fontSize: 13, marginBottom: 20 }}>{t.errorDesc}</p>
            <button onClick={load} style={{ background: p.accent, color: "#fff", border: "none", borderRadius: 20, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              {t.retry}
            </button>
          </div>
        ) : devotional ? (
          <>
            <h1 style={{ color: p.text, fontSize: 22, lineHeight: 1.4, textAlign: "center", marginBottom: 24, fontFamily: "Georgia, 'Times New Roman', serif" }}>
              {devotional.title}
            </h1>
            <DevotionalCard dev={devotional} p={p} t={t} />
          </>
        ) : null}
      </div>
    </div>
  );
}

function FavoritesScreen({ p, t, lang }) {
  const { favorites, toggle } = useContext(FavoritesContext);
  const db = loadDB();

  const favDevotionals = favorites
    .map(date => db[`${date}_${lang}`] || db[Object.keys(db).find(k => k.startsWith(date))])
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (favorites.length === 0) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: p.textMuted }}>
        <Icon name="heart" size={52} color={p.border} />
        <p style={{ fontSize: 17, fontWeight: 600, color: p.text, marginTop: 16 }}>{t.noFavorites}</p>
        <p style={{ fontSize: 14, textAlign: "center", maxWidth: 220 }}>{t.noFavoritesDesc}</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 100px" }}>
      <h2 style={{ color: p.text, fontSize: 20, fontFamily: "Georgia, serif", marginBottom: 20 }}>{t.favorites}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {favDevotionals.map(dev => (
          <div key={dev.date} style={{
            background: p.surface, border: `1px solid ${p.border}`,
            borderRadius: 16, padding: 20,
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <span style={{ color: p.textMuted, fontSize: 12, fontWeight: 500, display: "block", marginBottom: 4 }}>{dev.date}</span>
                <span style={{ color: p.text, fontSize: 15, fontWeight: 700, fontFamily: "Georgia, serif", lineHeight: 1.3 }}>{dev.title}</span>
              </div>
              <button onClick={() => toggle(dev.date)} style={{
                background: "none", border: "none", cursor: "pointer", padding: 4, marginLeft: 8
              }}>
                <Icon name="heartFill" size={20} color={p.heart} />
              </button>
            </div>
            <p style={{ color: p.textSec, fontSize: 13, fontStyle: "italic", margin: 0, fontFamily: "Georgia, serif" }}>
              "{dev.verse?.slice(0, 120)}{dev.verse?.length > 120 ? "..." : ""}"
            </p>
            <span style={{ color: p.gold, fontSize: 12, fontWeight: 600 }}>— {dev.verseReference}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsScreen({ p, t, settings, setSettings }) {
  const [apiKeyInput, setApiKeyInput] = useState(settings.apiKey || "");
  const [saved, setSaved] = useState(false);

  const update = (key, val) => {
    const next = { ...settings, [key]: val };
    setSettings(next); saveSettings(next);
  };

  const saveKey = () => {
    update("apiKey", apiKeyInput);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const Row = ({ icon, label, children }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: `1px solid ${p.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: p.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={18} color={p.accent} />
        </div>
        <span style={{ color: p.text, fontSize: 15, fontWeight: 500 }}>{label}</span>
      </div>
      {children}
    </div>
  );

  const Toggle = ({ on, onToggle }) => (
    <button onClick={onToggle} style={{
      width: 48, height: 28, borderRadius: 14,
      background: on ? p.accent : p.border,
      border: "none", cursor: "pointer", position: "relative",
      transition: "background 0.25s"
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 11, background: "#fff",
        position: "absolute", top: 3, left: on ? 23 : 3,
        transition: "left 0.25s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
      }} />
    </button>
  );

  const langs = [{ value: "pt-BR", label: "Português" }, { value: "en", label: "English" }, { value: "es", label: "Español" }];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 100px" }}>
      <h2 style={{ color: p.text, fontSize: 20, fontFamily: "Georgia, serif", marginBottom: 24 }}>{t.settings}</h2>

      {/* Theme */}
      <Row icon={settings.dark ? "moon" : "sun"} label={t.themeLabel}>
        <Toggle on={settings.dark} onToggle={() => update("dark", !settings.dark)} />
      </Row>

      {/* Language */}
      <div style={{ padding: "16px 0", borderBottom: `1px solid ${p.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: p.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="book" size={18} color={p.accent} />
          </div>
          <span style={{ color: p.text, fontSize: 15, fontWeight: 500 }}>{t.langLabel}</span>
        </div>
        <div style={{ display: "flex", gap: 8, paddingLeft: 48 }}>
          {langs.map(l => (
            <button key={l.value} onClick={() => update("lang", l.value)} style={{
              padding: "8px 14px", borderRadius: 20,
              background: settings.lang === l.value ? p.accent : p.surfaceAlt,
              color: settings.lang === l.value ? "#fff" : p.textSec,
              border: `1px solid ${settings.lang === l.value ? p.accent : p.border}`,
              cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s"
            }}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <Row icon="bell" label={t.notifLabel}>
        <Toggle on={settings.notif} onToggle={() => {
          if (!settings.notif && "Notification" in window) {
            Notification.requestPermission().then(perm => {
              if (perm === "granted") update("notif", true);
            });
          } else { update("notif", false); }
        }} />
      </Row>
      {settings.notif && (
        <p style={{ color: p.textMuted, fontSize: 12, marginTop: -8, marginBottom: 8, paddingLeft: 48 }}>{t.notifDesc}</p>
      )}

      {/* API Key */}
      <div style={{ padding: "16px 0", borderBottom: `1px solid ${p.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: p.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="key" size={18} color={p.accent} />
          </div>
          <span style={{ color: p.text, fontSize: 15, fontWeight: 500 }}>{t.apiKeyLabel}</span>
        </div>
        <p style={{ color: p.textMuted, fontSize: 12, marginLeft: 48, marginBottom: 10 }}>{t.apiKeyDesc}</p>
        <div style={{ display: "flex", gap: 8, marginLeft: 48 }}>
          <input
            value={apiKeyInput}
            onChange={e => setApiKeyInput(e.target.value)}
            placeholder={t.apiKeyPlaceholder}
            type="password"
            style={{
              flex: 1, padding: "10px 14px", borderRadius: 10,
              border: `1px solid ${p.border}`, background: p.surfaceAlt,
              color: p.text, fontSize: 13, outline: "none",
            }}
          />
          <button onClick={saveKey} style={{
            background: saved ? "#27AE60" : p.accent, color: "#fff",
            border: "none", borderRadius: 10, padding: "10px 16px",
            fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.3s"
          }}>
            {saved ? "✓" : t.apiKeySave}
          </button>
        </div>
      </div>

      {/* About */}
      <Row icon="info" label={t.aboutLabel}>
        <span style={{ color: p.textMuted, fontSize: 12 }}>v2.0</span>
      </Row>
      <p style={{ color: p.textMuted, fontSize: 12, paddingLeft: 48, marginTop: -8 }}>{t.aboutDesc}</p>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [settings, setSettings] = useState(loadSettings);
  const [tab, setTab] = useState("home");
  const [favorites, setFavorites] = useState(loadFavs);

  const p = PALETTES[settings.dark ? "dark" : "light"];
  const t = TRANSLATIONS[settings.lang] || TRANSLATIONS["pt-BR"];

  const toggleFav = (date) => {
    setFavorites(prev => {
      const next = prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date];
      saveFavs(next); return next;
    });
  };

  const tabs = [
    { id: "home", icon: "home", label: t.home },
    { id: "favorites", icon: "heart", label: t.favorites },
    { id: "settings", icon: "settings", label: t.settings },
  ];

  return (
    <ThemeContext.Provider value={{ p, dark: settings.dark }}>
      <LangContext.Provider value={{ lang: settings.lang, t }}>
        <FavoritesContext.Provider value={{ favorites, toggle: toggleFav }}>
          <div style={{
            minHeight: "100vh",
            background: p.bg,
            display: "flex",
            flexDirection: "column",
            maxWidth: 480,
            margin: "0 auto",
            position: "relative",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}>
            <style>{`
              * { box-sizing: border-box; }
              body { margin: 0; background: ${p.bg}; }
              @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
              @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
              button { font-family: inherit; }
              ::-webkit-scrollbar { width: 4px; }
              ::-webkit-scrollbar-track { background: transparent; }
              ::-webkit-scrollbar-thumb { background: ${p.border}; border-radius: 4px; }
            `}</style>

            {/* Screen */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {tab === "home" && <HomeScreen p={p} t={t} lang={settings.lang} apiKey={settings.apiKey} />}
              {tab === "favorites" && <FavoritesScreen p={p} t={t} lang={settings.lang} />}
              {tab === "settings" && <SettingsScreen p={p} t={t} settings={settings} setSettings={s => { setSettings(s); saveSettings(s); }} />}
            </div>

            {/* Bottom nav */}
            <div style={{
              position: "sticky", bottom: 0,
              background: p.navBg,
              borderTop: `1px solid ${p.navBorder}`,
              display: "flex",
              backdropFilter: "blur(12px)",
              zIndex: 100,
            }}>
              {tabs.map(tb => {
                const active = tab === tb.id;
                return (
                  <button key={tb.id} onClick={() => setTab(tb.id)} style={{
                    flex: 1, padding: "12px 4px 14px",
                    background: "none", border: "none",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    cursor: "pointer", color: active ? p.accent : p.textMuted,
                    transition: "color 0.2s",
                  }}>
                    <div style={{ position: "relative" }}>
                      {tb.id === "favorites" && favorites.length > 0 && (
                        <span style={{
                          position: "absolute", top: -4, right: -6,
                          background: p.heart, color: "#fff",
                          width: 14, height: 14, borderRadius: 7,
                          fontSize: 9, fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>{favorites.length}</span>
                      )}
                      <Icon name={active && tb.id === "favorites" ? "heartFill" : tb.icon} size={22} color={active ? p.accent : p.textMuted} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: 0.3 }}>{tb.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </FavoritesContext.Provider>
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}
