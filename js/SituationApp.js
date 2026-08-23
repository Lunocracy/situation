class SituationApp {
  async run(env) {
    if (!env || !env.container) throw new Error("run() requires valid container.");
    this.env = env;
    this.targetElement = env.container;
    this.initializeTheme();
    this.loadGoogleFont();
    this.setupState(this.parseRawContent());
    this.loadAppStyles();
    this.handleRoute();
    window.addEventListener("hashchange", () => this.handleRoute());
  }

  destroy() {
    if (this.valueEmberLogo) this.valueEmberLogo.destroy();
    if (this.bfnPlayer) { this.bfnPlayer.destroy(); this.bfnPlayer = null; }
  }

  parseRawContent() { return this.getValuationStaticData(); }

  setupState(data) {
    this.data = data;
    this.activeTab = "all";
    this.resultsRevealed = false;
    this.revealMode = localStorage.getItem("accudraw-reveal-mode") || "no-drama";
    this.motionValue = parseFloat(localStorage.getItem("accudraw-motion-val") || "1.0");
    const hash = window.location.hash;
    if (hash === "#/elder-advocacy") this.currentView = "elder-advocacy";
    else if (hash === "#/caretaker-bias") this.currentView = "caretaker-bias";
    else if (hash === "#/value-assessment" || hash === "#/valuation") this.currentView = "valuation";
    else if (hash === "#/ai-perspective") this.currentView = "ai-perspective";
    else if (hash === "#/current-work") this.currentView = "current-work";
    else this.currentView = "overview";
    this.expandedMessages = {};
  }

  handleRoute() {
    const hash = window.location.hash;
    if (hash === "#/elder-advocacy") this.currentView = "elder-advocacy";
    else if (hash === "#/caretaker-bias") this.currentView = "caretaker-bias";
    else if (hash === "#/value-assessment" || hash === "#/valuation") this.currentView = "valuation";
    else if (hash === "#/ai-perspective") this.currentView = "ai-perspective";
    else if (hash === "#/current-work") this.currentView = "current-work";
    else this.currentView = "overview";
    this.renderApp();
  }

  renderApp() {
    this.targetElement.innerHTML = "";
    const themeClass = this.currentTheme === "light" ? "cad-container cad-grid-bg theme-light" : "cad-container cad-grid-bg";
    const appContainer = makeElement("div", { className: themeClass });
    appContainer.style.setProperty("--motion-scale", String(this.motionValue));
    const innerWrapper = makeElement("div", { className: "cad-wrapper" });

    if (this.currentView === "elder-advocacy") innerWrapper.appendChild(this.buildElderHeader());
    else if (this.currentView === "caretaker-bias") innerWrapper.appendChild(this.buildCaretakerHeader());
    else innerWrapper.appendChild(this.buildMinimalHeader());

    if (this.currentView === "overview") innerWrapper.appendChild(new OverviewPage().render(this));
    else if (this.currentView === "ai-perspective") innerWrapper.appendChild(new AiPerspectivePage().render(this));
    else if (this.currentView === "elder-advocacy") innerWrapper.appendChild(new ElderAdvocacyPage().render(this));
    else if (this.currentView === "caretaker-bias") innerWrapper.appendChild(new CaretakerBiasPage().render(this));
    else if (this.currentView === "current-work") innerWrapper.appendChild(new CurrentWorkPage().render(this));
    else innerWrapper.appendChild(new ValuationPage().render(this));

    innerWrapper.appendChild(this.buildFooter());
    appContainer.appendChild(innerWrapper);
    this.targetElement.appendChild(appContainer);
  }

  buildMinimalHeader() {
    return makeElement("header", { className: "minimal-header" }, [
      makeElement("div", { className: "header-top" }, [
        makeElement("div", { className: "tags-wrapper" }, [
          makeElement("span", { className: "tag-pill tag-pill-blue" }, "Portfolio & Dossier"),
          makeElement("span", { className: "tag-pill tag-pill-slate" }, "1994 - 2026")
        ]),
        this.buildThemeToggle()
      ]),
      makeElement("div", { className: "title-group" }, [
        makeElement("h1", {}, "Career Dossier & Valuation Assessment"),
        makeElement("p", { className: "title-subtitle" }, "A comprehensive situational analysis and economic timeline")
      ]),
      this.buildGlobalNavigation(this.currentView)
    ]);
  }

  buildElderHeader() {
    return makeElement("header", { className: "minimal-header" }, [
      makeElement("div", { className: "header-top" }, [
        makeElement("span", { className: "tag-pill tag-pill-blue" }, "Elder Advocacy Review"),
        this.buildThemeToggle()
      ]),
      makeElement("div", { className: "title-group" }, [
        makeElement("h1", {}, "Care Arrangements & Family Communication Review"),
        makeElement("p", { className: "title-subtitle" }, "A factual analysis of Power of Attorney limits and visitation guidelines")
      ]),
      this.buildGlobalNavigation("elder-advocacy")
    ]);
  }

  buildCaretakerHeader() {
    return makeElement("header", { className: "minimal-header" }, [
      makeElement("div", { className: "header-top" }, [
        makeElement("span", { className: "tag-pill tag-pill-blue" }, "Caretaker Bias Review"),
        this.buildThemeToggle()
      ]),
      makeElement("div", { className: "title-group" }, [
        makeElement("h1", {}, "Caretaker Bias & LinkedIn Exhibits Review"),
        makeElement("p", { className: "title-subtitle" }, "A documentary archive of ideological, personal, and communication obstacles")
      ]),
      this.buildGlobalNavigation("caretaker-bias")
    ]);
  }

  buildGlobalNavigation(activeRoute) {
    return makeElement("div", { className: "global-nav-bar" }, [
      makeElement("a", { href: "#/overview", className: "global-nav-link " + (activeRoute === "overview" ? "active" : ""), onclick: (e) => { e.preventDefault(); window.location.hash = "#/overview"; } }, "Executive Summary"),
      makeElement("a", { href: "#/elder-advocacy", className: "global-nav-link " + (activeRoute === "elder-advocacy" ? "active" : ""), onclick: (e) => { e.preventDefault(); window.location.hash = "#/elder-advocacy"; } }, "Fiduciary & Care Arrangements"),
      makeElement("a", { href: "#/caretaker-bias", className: "global-nav-link " + (activeRoute === "caretaker-bias" ? "active" : ""), onclick: (e) => { e.preventDefault(); window.location.hash = "#/caretaker-bias"; } }, "Caretaker Bias & Exhibits"),
      makeElement("a", { href: "#/ai-perspective", className: "global-nav-link " + (activeRoute === "ai-perspective" ? "active" : ""), onclick: (e) => { e.preventDefault(); window.location.hash = "#/ai-perspective"; } }, "AI & Urgent Timeline"),
      makeElement("a", { href: "#/current-work", className: "global-nav-link " + (activeRoute === "current-work" ? "active" : ""), onclick: (e) => { e.preventDefault(); window.location.hash = "#/current-work"; } }, "Current Work & Vibe Coding"),
      makeElement("a", { href: "#/value-assessment", className: "global-nav-link " + (activeRoute === "valuation" ? "active" : ""), onclick: (e) => { e.preventDefault(); window.location.hash = "#/value-assessment"; } }, "Valuation Assessment"),
      makeElement("button", { className: "global-nav-link deploy-nav-btn", style: { cursor: "pointer", border: "1px solid #10b981", color: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.08)", display: "inline-flex", alignItems: "center", gap: "6px", marginLeft: "auto" }, onclick: (e) => this.triggerGitHubDeploy(e.currentTarget) }, "🚀 Deploy to GitHub")
    ]);
  }

  async triggerGitHubDeploy(btn) {
    if (btn) { btn.disabled = true; btn.textContent = "⏳ Deploying..."; }
    try {
      const res = await fetch("/api/deploy", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ commitMsg: "Automated deployment" }) });
      const d = await res.json();
      if (res.ok && d.success) this.showToastMessage("✨ Deployed successfully to GitHub Pages!");
      else this.showToastMessage("⚠️ Deploy notice: " + (d.error || "Error"));
    } catch(e) { this.showToastMessage("ℹ️ Static mode active. Local server required for deploy."); }
    finally { if (btn) { btn.disabled = false; btn.textContent = "🚀 Deploy to GitHub"; } }
  }

  buildFooter() {
    return makeElement("footer", { className: "dashboard-footer" }, [
      makeElement("div", { className: "footer-content" }, [
        makeElement("p", { className: "footer-left" }, "Documentary archive and analytical mapping of software IP development and career milestones."),
        makeElement("p", { className: "footer-right" }, "Career & Situational Review • 1994 - 2026")
      ])
    ]);
  }

  buildThemeToggle() {
    return makeElement("div", { className: "theme-switcher" }, [
      makeElement("button", { className: this.currentTheme === "light" ? "active" : "", onclick: () => this.setTheme("light") }, "☀️ Light"),
      makeElement("button", { className: this.currentTheme === "dark" ? "active" : "", onclick: () => this.setTheme("dark") }, "🌙 Dark")
    ]);
  }

  setTheme(t) { this.currentTheme = t; localStorage.setItem("accudraw-valuation-theme", t); this.renderApp(); }

  showToastMessage(msg) {
    const existing = document.getElementById("bfn-toast"); if (existing) existing.remove();
    const t = makeElement("div", { id: "bfn-toast", style: { position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", background: "#0f172a", border: "1px solid #3b82f6", color: "#fff", padding: "10px 20px", borderRadius: "8px", zIndex: "100000", fontSize: "12px", fontFamily: "monospace" } }, msg);
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2800);
  }

  openExhibitModal(imgSrc, title, caption) {
    const existing = document.getElementById("logo-exhibit-overlay"); if (existing) existing.remove();
    const overlay = makeElement("div", { id: "logo-exhibit-overlay", style: { position: "fixed", inset: "0", zIndex: "100002", background: "rgba(5, 5, 8, 0.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }, onclick: () => overlay.remove() }, [
      makeElement("img", { src: imgSrc, alt: title, style: { maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain", borderRadius: "6px" } }),
      caption ? makeElement("p", { style: { color: "#cbd5e1", marginTop: "12px", fontSize: "13px", textAlign: "center", maxWidth: "600px" } }, caption) : null
    ]);
    document.body.appendChild(overlay);
  }

  initializeTheme() { document.body.classList.add("js-active"); this.currentTheme = localStorage.getItem("accudraw-valuation-theme") || "dark"; }

  loadGoogleFont() {
    if (!document.getElementById("GoogleFontComfortaa")) {
      const l = makeElement("link", { id: "GoogleFontComfortaa", rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700;900&display=swap" });
      document.head.appendChild(l);
    }
  }

  loadAppStyles() {
    applyCss("html, body { margin: 0 !important; padding: 0 !important; min-height: 100vh; width: 100%; background-color: #070a12; } .cad-container, .cad-container * { box-sizing: border-box; margin: 0; padding: 0; }", "cad-core-reset-styles");
    applyCss(".cad-container { --bg-primary: #070a12; --bg-grid: rgba(255, 255, 255, 0.02); --bg-panel: #0c111d; --bg-panel-inner: #05070a; --text-primary: #cbd5e1; --text-secondary: #94a3b8; --text-title: #ffffff; --border-color: #1e293b; --border-hover: #334155; --btn-bg: #1e293b; --btn-hover: #334155; --btn-text: #e2e8f0; background-color: var(--bg-primary); color: var(--text-primary); font-family: ui-sans-serif, system-ui, sans-serif; min-height: 100vh; width: 100%; padding: 48px 16px; } .cad-wrapper { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 48px; } .cad-panel { background-color: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 12px; padding: 32px; }", "cad-core-layout-styles");
    applyCss(".minimal-header { display: flex; flex-direction: column; gap: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 24px; } .header-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; } .tags-wrapper { display: flex; gap: 8px; } .tag-pill { font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; } .tag-pill-blue { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3); } .tag-pill-slate { background-color: rgba(148, 163, 184, 0.1); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.2); } .title-group h1 { font-size: 32px; font-weight: 800; color: var(--text-title); margin-bottom: 8px; } @media (min-width: 768px) { .title-group h1 { font-size: 44px; } } .title-subtitle { font-size: 12px; text-transform: uppercase; font-family: monospace; color: var(--text-secondary); }", "cad-header-styles");
    applyCss(".theme-switcher { display: flex; gap: 6px; padding: 4px; background-color: var(--btn-bg); border: 1px solid var(--border-color); border-radius: 8px; } .theme-switcher button { padding: 4px 12px; font-size: 11px; font-weight: 600; border-radius: 6px; border: none; cursor: pointer; background: transparent; color: var(--text-secondary); } .theme-switcher button.active { background-color: #3b82f6; color: #fff; }", "cad-theme-switcher-styles");
    applyCss(".global-nav-bar { display: flex; flex-wrap: wrap; gap: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 16px; margin-bottom: 16px; margin-top: 16px; width: 100%; } .global-nav-link { font-size: 11px; font-family: monospace; font-weight: bold; text-transform: uppercase; color: var(--text-secondary); text-decoration: none; border: 1px solid var(--border-color); padding: 8px 16px; border-radius: 8px; background: var(--bg-panel); } .global-nav-link:hover { background: var(--btn-hover); color: var(--text-title); } .global-nav-link.active { background: #3b82f6; color: #fff; border-color: #3b82f6; } .backstory-gradient-card { padding: 32px; border: 1px solid var(--border-color); border-radius: 16px; display: flex; flex-direction: column; gap: 24px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.06), rgba(168, 85, 247, 0.06)); } .backstory-paragraph-highlight { font-size: 16px; font-weight: 500; color: var(--text-primary); line-height: 1.6; } .backstory-paragraph { font-size: 14px; color: var(--text-secondary); line-height: 1.6; } .inline-link-highlight { color: #2563eb; font-weight: 600; text-decoration: underline; }", "cad-navigation-styles");
  }

  getValuationStaticData() {
    return {
      title: "AccuDraw & SmartLine Value Assessment",
      prompts: [
        { id: "1", text: "tell me everything you know about accudraw and smartline in microstation" },
        { id: "2", text: "how important are they to the success of microstation and bentley systems?" },
        { id: "3", text: "what is your rough estimate as to how much value they brought bentley in terms of profit and/or contribution to market cap?" }
      ],
      models: [
        { key: "claude", name: "Claude 3.5 Sonnet", min: "2.0B", max: "5.0B", pct: 33, color: "#f59e0b", url: "https://claude.ai/", quotes: ["My rough estimate: $2-5 billion in enterprise value contribution..."] },
        { key: "gemini", name: "Gemini 3.5 Pro", min: "1.5B", max: "3.5B", pct: 27, color: "#3b82f6", url: "https://aistudio.google.com/", quotes: ["AccuDraw solved the 3D input problem for Bentley years before competitors had an elegant solution."] },
        { key: "chatgpt", name: "ChatGPT-4o", min: "1.0B", max: "3.0B", pct: 22, color: "#10b981", url: "https://chatgpt.com/", quotes: ["Around $1-3 billion as a plausible range for their contribution to Bentley's long-term enterprise value."] },
        { key: "grok", name: "Grok 2", min: "500M", max: "2.0B+", pct: 14, color: "#a855f7", url: "https://x.com/", quotes: ["Overall ballpark: $500 million to $2+ billion in total economic value..."] }
      ]
    };
  }
}

window.SituationApp = SituationApp;
globalThis.SituationApp = SituationApp;
window.AccuDrawValuation = SituationApp;
globalThis.AccuDrawValuation = SituationApp;
