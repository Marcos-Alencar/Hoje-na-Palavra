<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#C47B22" />
  <meta name="description" content="Hoje na Palavra — Reflexões bíblicas diárias com Inteligência Artificial" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="Hoje na Palavra" />

  <!-- Open Graph -->
  <meta property="og:title" content="Hoje na Palavra" />
  <meta property="og:description" content="Reflexões bíblicas diárias geradas com IA" />
  <meta property="og:type" content="website" />

  <title>Hoje na Palavra ✦</title>

  <!-- Favicon inline SVG -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>" />

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root {
      height: 100%;
      background: #FAF8F3;
      font-family: system-ui, -apple-system, sans-serif;
    }
    body {
      display: flex;
      justify-content: center;
      min-height: 100dvh;
    }
    #root {
      width: 100%;
      max-width: 480px;
      display: flex;
      flex-direction: column;
    }
    /* Splash / loading */
    #splash {
      position: fixed;
      inset: 0;
      background: #FAF8F3;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    }
    #splash.hide { opacity: 0; pointer-events: none; }
    #splash-icon { font-size: 52px; animation: splashPulse 1.5s ease-in-out infinite; }
    #splash-title {
      font-family: Georgia, serif;
      color: #C47B22;
      font-size: 22px;
      font-weight: 700;
      margin-top: 14px;
      letter-spacing: -0.3px;
    }
    #splash-sub {
      color: #9A8E82;
      font-size: 12px;
      margin-top: 6px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    #splash-bar {
      width: 120px;
      height: 3px;
      background: #E5DDD0;
      border-radius: 3px;
      margin-top: 28px;
      overflow: hidden;
    }
    #splash-progress {
      height: 100%;
      background: linear-gradient(90deg, #C47B22, #E09030);
      border-radius: 3px;
      animation: loadBar 1.8s ease-in-out forwards;
    }
    @keyframes splashPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.08); opacity: 0.85; }
    }
    @keyframes loadBar {
      0% { width: 0%; }
      60% { width: 75%; }
      100% { width: 100%; }
    }
  </style>
</head>
<body>

  <!-- Splash screen -->
  <div id="splash">
    <div id="splash-icon">✦</div>
    <div id="splash-title">Hoje na Palavra</div>
    <div id="splash-sub">Reflexão Bíblica Diária</div>
    <div id="splash-bar"><div id="splash-progress"></div></div>
  </div>

  <!-- React root -->
  <div id="root"></div>

  <!-- React + Babel via CDN (sem bundler necessário) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js"></script>

  <!-- App -->
  <script type="text/babel" src="app.jsx" data-presets="react"></script>

  <script>
    // Hide splash after app mounts
    window.__hideSplash = function () {
      const splash = document.getElementById('splash');
      if (splash) {
        splash.classList.add('hide');
        setTimeout(() => splash.remove(), 600);
      }
    };

    // Trigger splash hide after 2s (fallback) or when React renders
    setTimeout(window.__hideSplash, 2200);
  </script>

</body>
</html>
