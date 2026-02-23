// When loaded via CDN + Babel, React hooks come from the global React object
const { useState, useEffect, useCallback, useRef, createContext, useContext } = React;

// ─── Contexts ───────────────────────────────────────────────────────────────
const ThemeContext = createContext();
const LangContext = createContext();
const FavoritesContext = createContext();

// ─── Translations ─────────────────────────────────────────────────────────
const T = {
  "pt-BR": {
    appName: "Hoje na Palavra", appTagline: "Reflexão Bíblica Diária",
    home: "Início", favorites: "Favoritos", settings: "Configurações",
    today: "Hoje", reflection: "Reflexão", prayer: "Oração", application: "Aplicação Prática",
    verse: "Versículo do Dia",
    noFavorites: "Nenhum favorito ainda",
    noFavoritesDesc: "Salve devocionais tocando o ícone de coração ♡",
    loading: "Gerando sua reflexão de hoje...", loadingHint: "Isto pode levar alguns segundos",
    retry: "Tentar novamente", error: "Não foi possível carregar",
    errorDesc: "Verifique sua conexão ou tente mais tarde.",
    futureTitle: "Devocional Futuro", futureDesc: "Este devocional ainda não está disponível.",
    shareText: "Compartilhar", copied: "Copiado!", favAdded: "Salvo nos favoritos", favRemoved: "Removido",
    themeLabel: "Aparência", langLabel: "Idioma", notifLabel: "Notificações diárias",
    notifDesc: "Receba seu devocional às 8h da manhã", notifEnabled: "Ativadas", notifDisabled: "Desativadas",
    darkMode: "Escuro", lightMode: "Claro",
    apiKeyLabel: "Chave de IA", apiKeyPlaceholder: "sk-... ou AIza...",
    apiKeySave: "Salvar", apiKeyDesc: "OpenAI, Gemini, Claude, LiteLLM e outras",
    apiKeySaved: "Chave salva!", apiKeyRemove: "Remover",
    aboutLabel: "Sobre o App", aboutDesc: "Hoje na Palavra v3.0",
    aboutSubDesc: "Reflexões bíblicas diárias geradas com Inteligência Artificial",
    readMore: "Ler mais", readLess: "Ler menos",
    cachedBadge: "Offline disponível", generatedBy: "Gerado por IA",
    notifGranted: "Notificações ativadas!", notifDenied: "Permissão negada",
    clearCache: "Limpar cache", clearCacheConfirm: "Cache limpo!",
  },
  en: {
    appName: "Today in the Word", appTagline: "Daily Biblical Reflection",
    home: "Home", favorites: "Favorites", settings: "Settings",
    today: "Today", reflection: "Reflection", prayer: "Prayer", application: "Practical Application",
    verse: "Verse of the Day",
    noFavorites: "No favorites yet",
    noFavoritesDesc: "Save devotionals by tapping the heart icon ♡",
    loading: "Generating today's reflection...", loadingHint: "This may take a few seconds",
    retry: "Try again", error: "Could not load",
    errorDesc: "Check your connection or try again later.",
    futureTitle: "Future Devotional", futureDesc: "This devotional is not yet available.",
    shareText: "Share", copied: "Copied!", favAdded: "Saved to favorites", favRemoved: "Removed",
    themeLabel: "Appearance", langLabel: "Language", notifLabel: "Daily notifications",
    notifDesc: "Receive your devotional at 8am", notifEnabled: "Enabled", notifDisabled: "Disabled",
    darkMode: "Dark", lightMode: "Light",
    apiKeyLabel: "AI Key", apiKeyPlaceholder: "sk-... or AIza...",
    apiKeySave: "Save", apiKeyDesc: "OpenAI, Gemini, Claude, LiteLLM and others",
    apiKeySaved: "Key saved!", apiKeyRemove: "Remove",
    aboutLabel: "About", aboutDesc: "Today in the Word v3.0",
    aboutSubDesc: "Daily biblical reflections generated with Artificial Intelligence",
    readMore: "Read more", readLess: "Read less",
    cachedBadge: "Available offline", generatedBy: "AI Generated",
    notifGranted: "Notifications enabled!", notifDenied: "Permission denied",
    clearCache: "Clear cache", clearCacheConfirm: "Cache cleared!",
  },
  es: {
    appName: "Hoy en la Palabra", appTagline: "Reflexión Bíblica Diaria",
    home: "Inicio", favorites: "Favoritos", settings: "Ajustes",
    today: "Hoy", reflection: "Reflexión", prayer: "Oración", application: "Aplicación Práctica",
    verse: "Versículo del Día",
    noFavorites: "Sin favoritos aún",
    noFavoritesDesc: "Guarda devocionales tocando el icono de corazón ♡",
    loading: "Generando tu reflexión de hoy...", loadingHint: "Esto puede tomar unos segundos",
    retry: "Intentar de nuevo", error: "No se pudo cargar",
    errorDesc: "Verifica tu conexión o intenta más tarde.",
    futureTitle: "Devocional Futuro", futureDesc: "Este devocional aún no está disponible.",
    shareText: "Compartir", copied: "¡Copiado!", favAdded: "Guardado en favoritos", favRemoved: "Eliminado",
    themeLabel: "Apariencia", langLabel: "Idioma", notifLabel: "Notificaciones diarias",
    notifDesc: "Recibe tu devocional a las 8am", notifEnabled: "Activadas", notifDisabled: "Desactivadas",
    darkMode: "Oscuro", lightMode: "Claro",
    apiKeyLabel: "Clave de IA", apiKeyPlaceholder: "sk-... o AIza...",
    apiKeySave: "Guardar", apiKeyDesc: "OpenAI, Gemini, Claude, LiteLLM y otras",
    apiKeySaved: "¡Clave guardada!", apiKeyRemove: "Eliminar",
    aboutLabel: "Acerca de", aboutDesc: "Hoy en la Palabra v3.0",
    aboutSubDesc: "Reflexiones bíblicas diarias generadas con Inteligencia Artificial",
    readMore: "Leer más", readLess: "Leer menos",
    cachedBadge: "Disponible sin conexión", generatedBy: "Generado por IA",
    notifGranted: "¡Notificaciones activadas!", notifDenied: "Permiso denegado",
    clearCache: "Limpiar caché", clearCacheConfirm: "¡Caché limpiado!",
  },
};

// ─── Palettes ─────────────────────────────────────────────────────────────
const PALETTES = {
  light: {
    bg: "#FAF8F3", surface: "#FFFFFF", surfaceAlt: "#F3EFE6", surfaceHover: "#EDE8DC",
    border: "#E5DDD0", borderLight: "#EDE8DC",
    text: "#18150F", textSec: "#4A4237", textMuted: "#9A8E82",
    accent: "#7C5C35", accentLight: "#F5EAD8", accentBright: "#C47B22",
    gold: "#C8952C", goldLight: "#FDF3E0", goldBorder: "#E8C068",
    error: "#B83B2A", success: "#2A7B4F",
    heart: "#C0392B", navBg: "rgba(255,255,255,0.92)",
    navBorder: "#E5DDD0", skeleton: "#EDE8DC", skeletonShine: "#F5F2EC",
    tag: "#EDE0CC", tagText: "#7C5C35", headerGrad: "135deg, #F5EAD8 0%, #FDF6EC 100%",
    shimmer: "rgba(255,255,255,0.6)",
  },
  dark: {
    bg: "#0D0B08", surface: "#17140F", surfaceAlt: "#1F1B14", surfaceHover: "#26211A",
    border: "#2B2620", borderLight: "#322C24",
    text: "#F0EAE0", textSec: "#B5A898", textMuted: "#6A6055",
    accent: "#C47B22", accentLight: "#1E1810", accentBright: "#E09030",
    gold: "#C8952C", goldLight: "#1A1408", goldBorder: "#5A4010",
    error: "#E05545", success: "#4CAF7A",
    heart: "#E05545", navBg: "rgba(23,20,15,0.95)",
    navBorder: "#2B2620", skeleton: "#1F1B14", skeletonShine: "#2B2620",
    tag: "#221C12", tagText: "#C47B22", headerGrad: "135deg, #1A1408 0%, #17140F 100%",
    shimmer: "rgba(255,255,255,0.04)",
  },
};

// ─── Storage ───────────────────────────────────────────────────────────────
const DB_KEY = "hnp_v3_devotionals";
const FAV_KEY = "hnp_v3_favorites";
const CFG_KEY = "hnp_v3_config";
const loadDB = () => { try { return JSON.parse(localStorage.getItem(DB_KEY) || "{}"); } catch { return {}; } };
const saveDB = (d) => { try { localStorage.setItem(DB_KEY, JSON.stringify(d)); } catch {} };
const loadFavs = () => { try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); } catch { return []; } };
const saveFavs = (f) => { try { localStorage.setItem(FAV_KEY, JSON.stringify(f)); } catch {} };
const loadCfg = () => { try { return { ...{ dark: false, lang: "pt-BR", apiKey: "", notif: false }, ...JSON.parse(localStorage.getItem(CFG_KEY) || "{}") }; } catch { return { dark: false, lang: "pt-BR", apiKey: "", notif: false }; } };
const saveCfg = (c) => { try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch {} };

// ─── AI Generation ─────────────────────────────────────────────────────────
const LANG_INSTR = { "pt-BR": "Responda COMPLETAMENTE em Português do Brasil.", en: "Respond COMPLETELY in English.", es: "Responde COMPLETAMENTE en Español." };

const buildSystemPrompt = (lang) => `Você é um pastor e teólogo experiente. ${LANG_INSTR[lang] || LANG_INSTR["pt-BR"]}
Responda SOMENTE com JSON válido (sem markdown, sem backticks, sem comentários):
{"title":"Título impactante curto","verse":"Texto completo do versículo","verseReference":"Ex: João 3:16","theme":"Uma palavra tema (ex: Graça, Esperança)","reflection":"Reflexão profunda em 3-4 parágrafos separados por \\n\\n","prayer":"Oração baseada na reflexão (2-3 parágrafos separados por \\n\\n)","application":"Aplicação prática e concreta para hoje (1-2 frases diretas)"}`;

async function generateWithExternalKey(date, lang, apiKey) {
  const body = JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: buildSystemPrompt(lang) },
      { role: "user", content: `Crie um devocional bíblico único para a data: ${date}.` },
    ],
    response_format: { type: "json_object" },
    max_tokens: 2048,
  });
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` }, body,
  });
  if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

async function generateWithClaude(date, lang) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `${buildSystemPrompt(lang)}\n\nCrie um devocional bíblico único para a data: ${date}.`
      }]
    })
  });
  const data = await res.json();
  const raw = data.content?.[0]?.text || "{}";
  return JSON.parse(raw.replace(/```json|```/g, "").trim());
}

async function getDevotional(date, lang, apiKey) {
  const db = loadDB();
  const key = `${date}_${lang}`;
  if (db[key]) return { ...db[key], cached: true };

  let dev;
  if (apiKey) {
    try { dev = await generateWithExternalKey(date, lang, apiKey); }
    catch { dev = await generateWithClaude(date, lang); }
  } else {
    dev = await generateWithClaude(date, lang);
  }

  const final = { ...dev, date, lang, generatedAt: new Date().toISOString() };
  db[key] = final;
  saveDB(db);
  return final;
}

// ─── Notification scheduling ───────────────────────────────────────────────
function scheduleDailyNotif(t) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  const now = new Date();
  const next8am = new Date();
  next8am.setHours(8, 0, 0, 0);
  if (now > next8am) next8am.setDate(next8am.getDate() + 1);
  const delay = next8am.getTime() - now.getTime();
  if (delay < 86400000) {
    setTimeout(() => {
      new Notification(t.appName, { body: t.notifDesc, icon: "https://via.placeholder.com/192/C47B22/FFFFFF?text=✦", tag: "daily-devotional" });
    }, delay);
  }
}

// ─── Date utils ───────────────────────────────────────────────────────────
const toDateStr = (d) => d.toISOString().split("T")[0];
const isFuture = (d) => { const t = new Date(); t.setHours(0,0,0,0); const dd = new Date(d); dd.setHours(0,0,0,0); return dd > t; };
const isToday = (d) => toDateStr(d) === toDateStr(new Date());
const fmtDate = (d, lang) => {
  const locale = lang === "pt-BR" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US";
  try { return d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }); }
  catch { return d.toLocaleDateString(); }
};

// ─── Icons ─────────────────────────────────────────────────────────────────
const PATHS = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  heartFill: "M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z",
  settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  chevLeft: "M15 19l-7-7 7-7", chevRight: "M9 5l7 7-7 7",
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
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  check: "M5 13l4 4L19 7",
  sparkle: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  globe: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  wifi: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
};

const Icon = ({ name, size = 20, color = "currentColor", filled }) => {
  const d = PATHS[name] || PATHS.info;
  const isFill = name === "heartFill" || name === "starFill" || filled;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={isFill ? "none" : color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} fill={isFill ? color : "none"} stroke={isFill ? "none" : color} strokeWidth={isFill ? 0 : 1.8} />
    </svg>
  );
};

// ─── Toast ─────────────────────────────────────────────────────────────────
function Toast({ msg, p }) {
  if (!msg) return null;
  return (
    <div style={{
      position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)",
      background: p.text, color: p.bg, padding: "10px 20px", borderRadius: 20,
      fontSize: 13, fontWeight: 600, zIndex: 999, whiteSpace: "nowrap",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)", animation: "toastIn 0.3s ease",
      letterSpacing: 0.3,
    }}>
      {msg}
    </div>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────
function Skeleton({ p }) {
  const bar = (w, h = 10) => (
    <div style={{ background: p.skeleton, borderRadius: 6, height: h, width: w, marginBottom: 10, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent 0%, ${p.shimmer} 50%, transparent 100%)`, animation: "shimmer 1.6s ease-in-out infinite" }} />
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {[0,1,2,3].map(i => (
        <div key={i} style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: 18, padding: 22, animationDelay: `${i*0.1}s` }}>
          {bar("35%", 8)}
          {bar("100%", 10)}
          {bar("90%", 10)}
          {bar("55%", 10)}
        </div>
      ))}
    </div>
  );
}

// ─── Devocional Card ────────────────────────────────────────────────────────
function DevotionalCard({ dev, p, t, onToast }) {
  const { favorites, toggle } = useContext(FavoritesContext);
  const isFav = favorites.includes(dev.date);
  const [heartAnim, setHeartAnim] = useState(false);
  const [expanded, setExpanded] = useState({ reflection: true, prayer: false, application: false });

  const handleFav = () => {
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 400);
    toggle(dev.date);
    onToast(isFav ? t.favRemoved : t.favAdded);
  };

  const handleShare = async () => {
    const text = `✦ ${dev.title}\n\n"${dev.verse}"\n— ${dev.verseReference}\n\n${dev.reflection?.split("\n\n")[0]}\n\n— ${t.appName}`;
    if (navigator.share) {
      try { await navigator.share({ title: dev.title, text, url: window.location.href }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(text); onToast(t.copied); } catch {}
    }
  };

  const Section = ({ icon, label, content, key: k }) => {
    const open = expanded[k];
    const paragraphs = content?.split("\n\n").filter(Boolean) || [];
    return (
      <div style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: 18, overflow: "hidden", transition: "box-shadow 0.2s" }}>
        <button onClick={() => setExpanded(e => ({ ...e, [k]: !open }))} style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px", background: "none", border: "none", cursor: "pointer", gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: p.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={icon} size={16} color={p.accent} />
            </div>
            <span style={{ color: p.text, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>{label}</span>
          </div>
          <div style={{ transform: `rotate(${open ? 90 : 0}deg)`, transition: "transform 0.25s", color: p.textMuted }}>
            <Icon name="chevRight" size={16} color={p.textMuted} />
          </div>
        </button>
        {open && (
          <div style={{ padding: "0 20px 20px", animation: "fadeDown 0.25s ease" }}>
            <div style={{ height: 1, background: p.border, marginBottom: 14 }} />
            {paragraphs.map((para, i) => (
              <p key={i} style={{ color: p.textSec, fontSize: 15, lineHeight: 1.8, margin: "0 0 12px", fontFamily: "Georgia, 'Times New Roman', serif" }}>
                {para}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeUp 0.5s ease" }}>
      {/* Verse Hero */}
      <div style={{
        background: `linear-gradient(${p.headerGrad})`,
        border: `1px solid ${p.goldBorder}`,
        borderRadius: 22, padding: "28px 24px", position: "relative", overflow: "hidden",
      }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `${p.gold}12`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: `${p.gold}08`, pointerEvents: "none" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ color: p.gold, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>{t.verse}</span>
          {dev.theme && (
            <span style={{ background: p.tag, color: p.tagText, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 0.8, textTransform: "uppercase" }}>
              {dev.theme}
            </span>
          )}
          {dev.cached && (
            <span style={{ background: p.accentLight, color: p.accent, fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20 }}>
              ⚡ offline
            </span>
          )}
        </div>

        <blockquote style={{ margin: "0 0 16px", padding: "0 0 0 14px", borderLeft: `3px solid ${p.gold}` }}>
          <p style={{ color: p.text, fontSize: 17, lineHeight: 1.75, fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", margin: 0 }}>
            "{dev.verse}"
          </p>
        </blockquote>
        <p style={{ color: p.gold, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, margin: 0 }}>— {dev.verseReference}</p>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={handleFav} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
            background: isFav ? `${p.heart}18` : p.surface,
            border: `1px solid ${isFav ? p.heart : p.border}`,
            borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 700,
            color: isFav ? p.heart : p.textSec,
            transform: heartAnim ? "scale(1.15)" : "scale(1)",
            transition: "all 0.2s",
          }}>
            <Icon name={isFav ? "heartFill" : "heart"} size={14} color={isFav ? p.heart : p.textSec} />
            {isFav ? "❤" : "♡"}
          </button>
          <button onClick={handleShare} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
            background: p.surface, border: `1px solid ${p.border}`,
            borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 700, color: p.textSec,
            transition: "all 0.2s",
          }}>
            <Icon name="share" size={14} color={p.textSec} />
            {t.shareText}
          </button>
          <div style={{ flex: 1 }} />
          <span style={{ display: "flex", alignItems: "center", gap: 4, color: p.textMuted, fontSize: 11, fontStyle: "italic" }}>
            <Icon name="sparkle" size={12} color={p.textMuted} /> IA
          </span>
        </div>
      </div>

      {/* Sections */}
      <Section icon="book" label={t.reflection} content={dev.reflection} k="reflection" />
      <Section icon="hand" label={t.prayer} content={dev.prayer} k="prayer" />
      <Section icon="bulb" label={t.application} content={dev.application} k="application" />
    </div>
  );
}

// ─── Home Screen ────────────────────────────────────────────────────────────
function HomeScreen({ p, t, lang, apiKey }) {
  const [date, setDate] = useState(new Date());
  const [dev, setDev] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState("");
  const dateStr = toDateStr(date);
  const future = isFuture(date);
  const todayBool = isToday(date);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const load = useCallback(async () => {
    if (future) return;
    setLoading(true); setError(null);
    try {
      const data = await getDevotional(dateStr, lang, apiKey);
      setDev(data);
    } catch (e) {
      setError(e.message || "error");
    }
    setLoading(false);
  }, [dateStr, lang, apiKey, future]);

  useEffect(() => { setDev(null); load(); }, [load]);

  const prev = () => setDate(d => { const n = new Date(d); n.setDate(n.getDate() - 1); return n; });
  const next = () => { if (!future) setDate(d => { const n = new Date(d); n.setDate(n.getDate() + 1); return n; }); };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* Header */}
      <div style={{ background: p.bg, padding: "18px 20px 0", flexShrink: 0, position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ color: p.accent, fontSize: 20, fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: -0.3 }}>
              ✦ {t.appName}
            </div>
            <div style={{ color: p.textMuted, fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "system-ui, sans-serif", marginTop: 1 }}>
              {t.appTagline}
            </div>
          </div>
          {!todayBool && (
            <button onClick={() => setDate(new Date())} style={{
              background: p.accent, color: "#fff", border: "none", borderRadius: 20,
              padding: "7px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer",
              transition: "opacity 0.15s", letterSpacing: 0.3,
            }}>{t.today}</button>
          )}
        </div>

        {/* Date nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: p.surfaceAlt, borderRadius: 14, padding: "4px 6px", marginBottom: 14 }}>
          <button onClick={prev} style={{ background: "none", border: "none", padding: "8px 10px", cursor: "pointer", borderRadius: 10, display: "flex" }}>
            <Icon name="chevLeft" size={18} color={p.text} />
          </button>
          <div style={{ flex: 1, textAlign: "center" }}>
            <span style={{ color: p.text, fontSize: 13, fontWeight: 600, textTransform: "capitalize", letterSpacing: 0.2 }}>
              {fmtDate(date, lang)}
            </span>
          </div>
          <button onClick={next} disabled={future} style={{
            background: "none", border: "none", padding: "8px 10px", cursor: future ? "default" : "pointer",
            opacity: future ? 0.25 : 1, borderRadius: 10, display: "flex",
          }}>
            <Icon name="chevRight" size={18} color={p.text} />
          </button>
        </div>
        <div style={{ height: 1, background: p.border }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px 110px" }}>
        {future ? (
          <div style={{ textAlign: "center", paddingTop: 80, animation: "fadeUp 0.4s ease" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🕐</div>
            <p style={{ fontSize: 17, fontWeight: 700, color: p.text, marginBottom: 8, fontFamily: "Georgia, serif" }}>{t.futureTitle}</p>
            <p style={{ fontSize: 14, color: p.textMuted, maxWidth: 220, margin: "0 auto" }}>{t.futureDesc}</p>
          </div>
        ) : loading ? (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ color: p.textMuted, fontSize: 14, marginBottom: 4 }}>{t.loading}</div>
              <div style={{ color: p.textMuted, fontSize: 12, fontStyle: "italic" }}>{t.loadingHint}</div>
            </div>
            <Skeleton p={p} />
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", paddingTop: 60, animation: "fadeUp 0.4s ease" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
            <p style={{ fontSize: 17, fontWeight: 700, color: p.text, marginBottom: 6 }}>{t.error}</p>
            <p style={{ fontSize: 13, color: p.textMuted, marginBottom: 20, maxWidth: 240, margin: "0 auto 20px" }}>{t.errorDesc}</p>
            <button onClick={load} style={{
              background: p.accent, color: "#fff", border: "none",
              borderRadius: 20, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}>{t.retry}</button>
          </div>
        ) : dev ? (
          <div>
            <h1 style={{ color: p.text, fontSize: 21, lineHeight: 1.35, textAlign: "center", marginBottom: 20, fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, letterSpacing: -0.3 }}>
              {dev.title}
            </h1>
            <DevotionalCard dev={dev} p={p} t={t} onToast={showToast} />
          </div>
        ) : null}
      </div>

      <Toast msg={toast} p={p} />
    </div>
  );
}

// ─── Favorites Screen ──────────────────────────────────────────────────────
function FavoritesScreen({ p, t, lang, onNavigateHome }) {
  const { favorites, toggle } = useContext(FavoritesContext);
  const db = loadDB();
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2000); };

  const favDevs = favorites
    .map(date => db[`${date}_${lang}`] || db[Object.keys(db).find(k => k.startsWith(date)) || ""] )
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (favorites.length === 0) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, animation: "fadeUp 0.4s ease" }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>📖</div>
        <p style={{ fontSize: 18, fontWeight: 700, color: p.text, marginBottom: 8, fontFamily: "Georgia, serif", textAlign: "center" }}>{t.noFavorites}</p>
        <p style={{ fontSize: 14, color: p.textMuted, textAlign: "center", maxWidth: 220, lineHeight: 1.6 }}>{t.noFavoritesDesc}</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 110px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ color: p.text, fontSize: 20, fontFamily: "Georgia, serif", margin: 0, fontWeight: 700 }}>{t.favorites}</h2>
        <span style={{ background: p.tag, color: p.tagText, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
          {favorites.length}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {favDevs.map(dev => (
          <div key={dev.date} style={{
            background: p.surface, border: `1px solid ${p.border}`,
            borderRadius: 18, padding: "18px 20px", animation: "fadeUp 0.3s ease",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <span style={{ color: p.textMuted, fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{dev.date}</span>
                <span style={{ color: p.text, fontSize: 15, fontWeight: 700, fontFamily: "Georgia, serif", lineHeight: 1.35 }}>{dev.title}</span>
                {dev.theme && <span style={{ display: "inline-block", marginTop: 6, background: p.tag, color: p.tagText, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 10, letterSpacing: 0.5 }}>{dev.theme}</span>}
              </div>
              <button onClick={() => { toggle(dev.date); showToast(t.favRemoved); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
                <Icon name="heartFill" size={20} color={p.heart} />
              </button>
            </div>
            <p style={{ color: p.textSec, fontSize: 13, fontStyle: "italic", margin: "12px 0 0", fontFamily: "Georgia, serif", lineHeight: 1.6, borderLeft: `2px solid ${p.border}`, paddingLeft: 12 }}>
              "{dev.verse?.slice(0, 100)}{dev.verse?.length > 100 ? "…" : ""}"
            </p>
            <span style={{ color: p.gold, fontSize: 12, fontWeight: 600, display: "block", marginTop: 6 }}>— {dev.verseReference}</span>
          </div>
        ))}
      </div>
      <Toast msg={toast} p={p} />
    </div>
  );
}

// ─── Settings Screen ────────────────────────────────────────────────────────
function SettingsScreen({ p, t, settings, setSettings }) {
  const [keyInput, setKeyInput] = useState(settings.apiKey || "");
  const [keySaved, setKeySaved] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2000); };

  const upd = (k, v) => { const n = { ...settings, [k]: v }; setSettings(n); saveCfg(n); };

  const saveKey = () => {
    upd("apiKey", keyInput);
    setKeySaved(true);
    showToast(t.apiKeySaved);
    setTimeout(() => setKeySaved(false), 2500);
  };

  const toggleNotif = () => {
    if (!settings.notif && "Notification" in window) {
      Notification.requestPermission().then(perm => {
        if (perm === "granted") { upd("notif", true); showToast(t.notifGranted); scheduleDailyNotif(t); }
        else showToast(t.notifDenied);
      });
    } else upd("notif", false);
  };

  const clearCache = () => {
    try { localStorage.removeItem(DB_KEY); showToast(t.clearCacheConfirm); } catch {}
  };

  const Toggle = ({ on, onToggle }) => (
    <button onClick={onToggle} aria-pressed={on} style={{
      width: 50, height: 28, borderRadius: 14, background: on ? p.accent : p.border,
      border: "none", cursor: "pointer", position: "relative", transition: "background 0.25s", flexShrink: 0,
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 11, background: "#fff",
        position: "absolute", top: 3, left: on ? 25 : 3,
        transition: "left 0.25s", boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
      }} />
    </button>
  );

  const Row = ({ icon, label, desc, children }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: `1px solid ${p.border}`, gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: p.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name={icon} size={17} color={p.accent} />
        </div>
        <div>
          <div style={{ color: p.text, fontSize: 14, fontWeight: 600 }}>{label}</div>
          {desc && <div style={{ color: p.textMuted, fontSize: 11, marginTop: 2 }}>{desc}</div>}
        </div>
      </div>
      {children}
    </div>
  );

  const langs = [{ v: "pt-BR", l: "PT" }, { v: "en", l: "EN" }, { v: "es", l: "ES" }];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 110px" }}>
      <h2 style={{ color: p.text, fontSize: 20, fontFamily: "Georgia, serif", marginBottom: 6, fontWeight: 700 }}>{t.settings}</h2>
      <p style={{ color: p.textMuted, fontSize: 12, marginBottom: 20 }}>Hoje na Palavra v3.0</p>

      {/* Theme */}
      <Row icon={settings.dark ? "moon" : "sun"} label={t.themeLabel}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: p.textMuted, fontSize: 12 }}>{settings.dark ? t.darkMode : t.lightMode}</span>
          <Toggle on={settings.dark} onToggle={() => upd("dark", !settings.dark)} />
        </div>
      </Row>

      {/* Language */}
      <div style={{ padding: "16px 0", borderBottom: `1px solid ${p.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: p.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="globe" size={17} color={p.accent} />
          </div>
          <div style={{ color: p.text, fontSize: 14, fontWeight: 600 }}>{t.langLabel}</div>
        </div>
        <div style={{ display: "flex", gap: 8, paddingLeft: 48 }}>
          {langs.map(({ v, l }) => (
            <button key={v} onClick={() => upd("lang", v)} style={{
              padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700,
              background: settings.lang === v ? p.accent : p.surfaceAlt,
              color: settings.lang === v ? "#fff" : p.textSec,
              border: `1px solid ${settings.lang === v ? p.accent : p.border}`,
              cursor: "pointer", transition: "all 0.2s", letterSpacing: 0.5,
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <Row icon="bell" label={t.notifLabel} desc={t.notifDesc}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: p.textMuted, fontSize: 11 }}>{settings.notif ? t.notifEnabled : t.notifDisabled}</span>
          <Toggle on={settings.notif} onToggle={toggleNotif} />
        </div>
      </Row>

      {/* API Key */}
      <div style={{ padding: "16px 0", borderBottom: `1px solid ${p.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: p.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="key" size={17} color={p.accent} />
          </div>
          <div>
            <div style={{ color: p.text, fontSize: 14, fontWeight: 600 }}>{t.apiKeyLabel}</div>
            <div style={{ color: p.textMuted, fontSize: 11, marginTop: 1 }}>{t.apiKeyDesc}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, paddingLeft: 48 }}>
          <input
            value={keyInput} onChange={e => setKeyInput(e.target.value)}
            placeholder={t.apiKeyPlaceholder} type="password"
            style={{
              flex: 1, padding: "10px 14px", borderRadius: 12,
              border: `1px solid ${p.border}`, background: p.surfaceAlt,
              color: p.text, fontSize: 13, outline: "none", fontFamily: "system-ui, sans-serif",
            }}
          />
          <button onClick={saveKey} style={{
            background: keySaved ? p.success : p.accent, color: "#fff",
            border: "none", borderRadius: 12, padding: "10px 14px",
            fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "background 0.3s", minWidth: 60,
          }}>
            {keySaved ? <Icon name="check" size={16} color="#fff" /> : t.apiKeySave}
          </button>
        </div>
        {settings.apiKey && (
          <button onClick={() => { setKeyInput(""); upd("apiKey", ""); showToast("Chave removida"); }} style={{
            marginLeft: 48, marginTop: 8, background: "none", border: "none", color: p.error,
            fontSize: 12, cursor: "pointer", padding: 0, fontWeight: 600,
          }}>{t.apiKeyRemove}</button>
        )}
      </div>

      {/* Clear Cache */}
      <Row icon="trash" label={t.clearCache} desc="Regenerar devocionais ao recarregar">
        <button onClick={clearCache} style={{
          background: p.surfaceAlt, border: `1px solid ${p.border}`, color: p.textSec,
          borderRadius: 10, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          {t.clearCache}
        </button>
      </Row>

      {/* About */}
      <div style={{ marginTop: 28, padding: "20px", background: p.surfaceAlt, borderRadius: 18, textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>✦</div>
        <div style={{ color: p.accent, fontSize: 16, fontWeight: 700, fontFamily: "Georgia, serif" }}>{t.aboutDesc}</div>
        <div style={{ color: p.textMuted, fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>{t.aboutSubDesc}</div>
      </div>

      <Toast msg={toast} p={p} />
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const [cfg, setCfg] = useState(loadCfg);
  const [tab, setTab] = useState("home");
  const [favorites, setFavorites] = useState(loadFavs);
  const prevTab = useRef("home");

  const p = PALETTES[cfg.dark ? "dark" : "light"];
  const t = T[cfg.lang] || T["pt-BR"];

  const updateCfg = (next) => { setCfg(next); saveCfg(next); };

  // Hide splash screen when app mounts
  useEffect(() => { if (typeof window.__hideSplash === "function") window.__hideSplash(); }, []);

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

  const CSS = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${p.bg}; font-family: system-ui, -apple-system, sans-serif; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
    @keyframes fadeDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:none; } }
    @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(12px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
    @keyframes shimmer { 0% { transform:translateX(-100%); } 100% { transform:translateX(100%); } }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.55} }
    @keyframes heartPop { 0%{transform:scale(1)} 50%{transform:scale(1.3)} 100%{transform:scale(1)} }
    button { font-family: inherit; }
    input { font-family: inherit; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${p.border}; border-radius: 3px; }
    * { -webkit-tap-highlight-color: transparent; }
  `;

  return (
    <ThemeContext.Provider value={{ p, dark: cfg.dark }}>
      <LangContext.Provider value={{ lang: cfg.lang, t }}>
        <FavoritesContext.Provider value={{ favorites, toggle: toggleFav }}>
          <div style={{
            minHeight: "100dvh", background: p.bg,
            display: "flex", flexDirection: "column",
            maxWidth: 480, margin: "0 auto",
            position: "relative",
            transition: "background 0.3s",
          }}>
            <style>{CSS}</style>

            {/* Screens */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
              {tab === "home" && <HomeScreen p={p} t={t} lang={cfg.lang} apiKey={cfg.apiKey} />}
              {tab === "favorites" && <FavoritesScreen p={p} t={t} lang={cfg.lang} />}
              {tab === "settings" && <SettingsScreen p={p} t={t} settings={cfg} setSettings={updateCfg} />}
            </div>

            {/* Bottom Nav */}
            <div style={{
              position: "sticky", bottom: 0,
              background: p.navBg,
              borderTop: `1px solid ${p.navBorder}`,
              display: "flex",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              zIndex: 100,
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}>
              {tabs.map(tb => {
                const active = tab === tb.id;
                return (
                  <button key={tb.id} onClick={() => setTab(tb.id)} style={{
                    flex: 1, padding: "10px 4px 12px",
                    background: "none", border: "none",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    cursor: "pointer", color: active ? p.accent : p.textMuted,
                    transition: "color 0.2s",
                  }}>
                    <div style={{ position: "relative" }}>
                      {tb.id === "favorites" && favorites.length > 0 && (
                        <span style={{
                          position: "absolute", top: -5, right: -7,
                          background: p.heart, color: "#fff",
                          width: 15, height: 15, borderRadius: 8,
                          fontSize: 9, fontWeight: 800,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>{favorites.length > 9 ? "9+" : favorites.length}</span>
                      )}
                      <div style={{
                        transform: active ? "scale(1.1)" : "scale(1)",
                        transition: "transform 0.2s",
                      }}>
                        <Icon name={active && tb.id === "favorites" ? "heartFill" : tb.icon} size={22} color={active ? p.accent : p.textMuted} />
                      </div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: active ? 800 : 500, letterSpacing: 0.4 }}>{tb.label}</span>
                    {active && <div style={{ width: 4, height: 4, borderRadius: 2, background: p.accent, marginTop: -2 }} />}
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

// Mount app (CDN mode — no bundler)
const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(React.createElement(App));
}
