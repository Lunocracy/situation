class SituationApp {
  async run(env) {
    if (!env || !env.container) {
      throw new Error("run() requires an environment object with a valid container.");
    }
    this.env = env;
    this.targetElement = env.container;

    this.initializeTheme();
    this.loadGoogleFont();
    this.setupState(this.parseRawContent());
    this.loadAppStyles();
    this.preloadResources();
    this.setupKeyboardListeners();
    this.handleRoute();

    window.addEventListener('hashchange', () => this.handleRoute());
  }

  destroy() {
    if (this.valueEmberLogo) {
      this.valueEmberLogo.destroy();
    }
    if (this.bfnPlayer) {
      this.bfnPlayer.destroy();
      this.bfnPlayer = null;
    }
    if (this.fallbackTimeout) clearTimeout(this.fallbackTimeout);
    if (this.fallbackTriggerTimeout) clearTimeout(this.fallbackTriggerTimeout);
    const overlay = document.getElementById('bfn-overlay');
    if (overlay) overlay.remove();
    if (this._currentKeydownHandler) {
      window.removeEventListener('keydown', this._currentKeydownHandler);
    }
  }

  parseRawContent() {
    return this.getValuationStaticData();
  }

  setupState(data) {
    this.data = data;
    this.activeTab = 'all';
    this.resultsRevealed = false;
    this.isTransitioning = false;
    this.revealMode = localStorage.getItem('accudraw-reveal-mode') || 'no-drama';
    this.wrongAnswerStage = 0;
    this.justCorrected = false;
    this.isCalculating = false;
    this.showRecalculateButton = false;
    this.showBFNButton = false;
    this.motionValue = parseFloat(localStorage.getItem('accudraw-motion-val') || '1.0');
    
    const hash = window.location.hash;
    if (hash === '#/elder-advocacy') {
      this.currentView = 'elder-advocacy';
    } else if (hash === '#/caretaker-bias') {
      this.currentView = 'caretaker-bias';
    } else if (hash === '#/value-assessment' || hash === '#/valuation') {
      this.currentView = 'valuation';
    } else if (hash === '#/ai-perspective') {
      this.currentView = 'ai-perspective';
    } else if (hash === '#/current-work') {
      this.currentView = 'current-work';
    } else {
      this.currentView = 'overview';
    }
    this.expandedMessages = {};
  }

  handleRoute() {
    const hash = window.location.hash;
    if (hash === '#/elder-advocacy') {
      this.currentView = 'elder-advocacy';
    } else if (hash === '#/caretaker-bias') {
      this.currentView = 'caretaker-bias';
    } else if (hash === '#/value-assessment' || hash === '#/valuation') {
      this.currentView = 'valuation';
    } else if (hash === '#/ai-perspective') {
      this.currentView = 'ai-perspective';
    } else if (hash === '#/current-work') {
      this.currentView = 'current-work';
    } else {
      this.currentView = 'overview';
    }
    this.renderApp();
  }

  renderApp() {
    this.targetElement.innerHTML = "";
    
    const themeClass = this.currentTheme === "light" 
      ? "cad-container cad-grid-bg theme-light" 
      : "cad-container cad-grid-bg";
    
    const appContainer = makeElement("div", { className: themeClass });
    appContainer.style.setProperty("--motion-scale", String(this.motionValue));

    const innerWrapper = makeElement("div", { className: "cad-wrapper" });

    if (this.currentView === "elder-advocacy") {
      innerWrapper.appendChild(this.buildElderHeader());
    } else if (this.currentView === "caretaker-bias") {
      innerWrapper.appendChild(this.buildCaretakerHeader());
    } else {
      innerWrapper.appendChild(this.buildMinimalHeader());
    }

    if (this.currentView === "overview") {
      const page = new OverviewPage();
      innerWrapper.appendChild(page.render(this));
    } else if (this.currentView === "ai-perspective") {
      const page = new AiPerspectivePage();
      innerWrapper.appendChild(page.render(this));
    } else if (this.currentView === "elder-advocacy") {
      const page = new ElderAdvocacyPage();
      innerWrapper.appendChild(page.render(this));
    } else if (this.currentView === "caretaker-bias") {
      const page = new CaretakerBiasPage();
      innerWrapper.appendChild(page.render(this));
    } else if (this.currentView === "current-work") {
      const page = new CurrentWorkPage();
      innerWrapper.appendChild(page.render(this));
    } else {
      const page = new ValuationPage();
      innerWrapper.appendChild(page.render(this));
    }

    innerWrapper.appendChild(this.buildFooter());
    appContainer.appendChild(innerWrapper);
    this.targetElement.appendChild(appContainer);

    if (this.currentView === "valuation" && this.resultsRevealed && !this._isAwaitingRecalculation()) {
      const emberValText = this.targetElement.querySelector(".glowing-consensus-value");
      if (emberValText) {
        if (this.valueEmberLogo) {
          this.valueEmberLogo.destroy();
        }
        this.valueEmberLogo = new ValueEmberLogo(emberValText, {
          isAwake: true,
          emberCountMultiplier: 0.4 * this.motionValue,
          emberSpeedMultiplier: 0.3 * this.motionValue,
          emberSizeMultiplier: 0.4 * this.motionValue
        });
      }
    } else if (this.valueEmberLogo) {
      this.valueEmberLogo.destroy();
      this.valueEmberLogo = null;
    }
  }

  buildMinimalHeader() {
    const revealModeSelect = makeElement('select', {
      className: 'reveal-mode-select',
      onchange: (e) => {
        this.revealMode = e.target.value;
        localStorage.setItem('accudraw-reveal-mode', this.revealMode);
      }
    }, [
      makeElement('option', { value: 'drum-roll' }, 'Drum Roll'),
      makeElement('option', { value: 'no-drama' }, 'No Drama'),
      makeElement('option', { value: 'wrong-answers' }, 'Wrong Answers')
    ]);
    revealModeSelect.value = this.revealMode;

    const controlsGroup = makeElement('div', {
      className: 'flex flex-col items-end gap-1'
    }, [
      this.buildThemeToggle(),
      makeElement('div', { className: 'reveal-mode-row' }, [revealModeSelect]),
      this.buildMotionSlider()
    ]);

    let headerTitle = 'Career Dossier & Valuation Assessment';
    let headerSubtitle = 'A comprehensive situational analysis and economic timeline';

    if (this.currentView === 'overview') {
      headerTitle = 'Executive Summary & Overview';
      headerSubtitle = 'A professional proposal and technical timeline';
    } else if (this.currentView === 'ai-perspective') {
      headerTitle = 'AI Automation & Urgent Career Timeline';
      headerSubtitle = 'The exponential pace of automation and professional time pressure';
    } else if (this.currentView === 'current-work') {
      headerTitle = 'Current Work & Vibe Coding Environment';
      headerSubtitle = 'Next-generation recursively self-improving visual code environments';
    } else if (this.currentView === 'valuation') {
      headerTitle = 'AccuDraw & SmartLine Value Assessment';
      headerSubtitle = 'A comparative analysis of enterprise value contribution';
    }

    return makeElement('header', { className: 'minimal-header' }, [
      makeElement('div', { className: 'header-top' }, [
        makeElement('div', { className: 'tags-wrapper' }, [
          makeElement('span', { className: 'tag-pill tag-pill-blue' }, 'Portfolio & Dossier'),
          makeElement('span', { className: 'tag-pill tag-pill-slate' }, '1994 - 2026')
        ]),
        controlsGroup
      ]),
      
      makeElement('div', { className: 'title-group' }, [
        makeElement('h1', {}, headerTitle),
        makeElement('p', { className: 'title-subtitle' }, headerSubtitle)
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
    return makeElement('div', { className: 'global-nav-bar' }, [
      makeElement('a', {
        href: '#/overview',
        className: 'global-nav-link ' + (activeRoute === 'overview' ? 'active' : ''),
        onclick: (e) => { e.preventDefault(); window.location.hash = '#/overview'; }
      }, 'Executive Summary'),
      makeElement('a', {
        href: '#/elder-advocacy',
        className: 'global-nav-link ' + (activeRoute === 'elder-advocacy' ? 'active' : ''),
        onclick: (e) => { e.preventDefault(); window.location.hash = '#/elder-advocacy'; }
      }, 'Fiduciary & Care Arrangements'),
      makeElement('a', {
        href: '#/caretaker-bias',
        className: 'global-nav-link ' + (activeRoute === 'caretaker-bias' ? 'active' : ''),
        onclick: (e) => { e.preventDefault(); window.location.hash = '#/caretaker-bias'; }
      }, 'Caretaker Bias & Exhibits'),
      makeElement('a', {
        href: '#/ai-perspective',
        className: 'global-nav-link ' + (activeRoute === 'ai-perspective' ? 'active' : ''),
        onclick: (e) => { e.preventDefault(); window.location.hash = '#/ai-perspective'; }
      }, 'AI & Urgent Timeline'),
      makeElement('a', {
        href: '#/current-work',
        className: 'global-nav-link ' + (activeRoute === 'current-work' ? 'active' : ''),
        onclick: (e) => { e.preventDefault(); window.location.hash = '#/current-work'; }
      }, 'Current Work & Vibe Coding'),
      makeElement('a', {
        href: '#/value-assessment',
        className: 'global-nav-link ' + (activeRoute === 'valuation' ? 'active' : ''),
        onclick: (e) => { e.preventDefault(); window.location.hash = '#/value-assessment'; }
      }, 'Valuation Assessment'),
      makeElement('button', {
        className: 'global-nav-link deploy-nav-btn',
        style: {
          cursor: 'pointer',
          border: '1px solid #10b981',
          color: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginLeft: 'auto'
        },
        onclick: (e) => this.triggerGitHubDeploy(e.currentTarget)
      }, '🚀 Deploy to GitHub')
    ]);
  }

  async triggerGitHubDeploy(btnElement) {
    if (btnElement) {
      btnElement.disabled = true;
      btnElement.style.opacity = '0.7';
      btnElement.textContent = '⏳ Deploying...';
    }

    try {
      const res = await fetch('/api/deploy?project=MySituation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: 'MySituation',
          commitMsg: 'Automated 1-tap deployment from Situation App'
        })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        this.showToastMessage('✨ Deployed successfully to GitHub Pages!\n\n' + (data.output || ''));
      } else {
        const errMsg = (data && (data.error || data.message)) || 'Server error during deployment';
        this.openDeployErrorModal(errMsg);
      }
    } catch (e) {
      this.openDeployErrorModal('Network / Server Exception: ' + e.message);
    } finally {
      if (btnElement) {
        btnElement.disabled = false;
        btnElement.style.opacity = '1';
        btnElement.textContent = '🚀 Deploy to GitHub';
      }
    }
  }

  openDeployErrorModal(errorText) {
    const existing = document.getElementById('deploy-error-modal');
    if (existing) existing.remove();

    const overlay = makeElement('div', {
      id: 'deploy-error-modal',
      style: {
        position: 'fixed',
        inset: '0',
        zIndex: '999999',
        background: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        fontFamily: 'ui-monospace, monospace'
      }
    });

    const card = makeElement('div', {
      style: {
        background: '#161b22',
        border: '2px solid #f85149',
        borderRadius: '12px',
        padding: '20px',
        maxWidth: '600px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.8)'
      }
    }, [
      makeElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '8px' }
      }, [
        makeElement('strong', { style: { color: '#ff7b72', fontSize: '15px' } }, '⚠️ GitHub Deploy Terminal Output'),
        makeElement('button', {
          style: { background: '#21262d', color: '#c9d1d9', border: '1px solid #30363d', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' },
          onclick: () => overlay.remove()
        }, '✕')
      ]),
      makeElement('pre', {
        style: {
          background: '#0d1117',
          border: '1px solid #da3633',
          borderRadius: '6px',
          padding: '12px',
          color: '#ff7b72',
          fontSize: '12px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          maxHeight: '300px',
          overflowY: 'auto',
          margin: '0'
        }
      }, errorText),
      makeElement('div', { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' } }, [
        makeElement('button', {
          style: { padding: '8px 16px', background: '#238636', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
          onclick: (e) => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(errorText);
              e.target.textContent = '✓ Copied!';
              setTimeout(() => { e.target.textContent = '📋 Copy Error Output'; }, 2000);
            } else {
              prompt('Copy output:', errorText);
            }
          }
        }, '📋 Copy Error Output'),
        makeElement('button', {
          style: { padding: '8px 16px', background: '#21262d', color: '#c9d1d9', border: '1px solid #30363d', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
          onclick: () => overlay.remove()
        }, 'Close')
      ])
    ]);

    overlay.appendChild(card);
    document.body.appendChild(overlay);
  }

  showToastMessage(msg) {
    const existing = document.getElementById('bfn-toast');
    if (existing) existing.remove();

    const toast = makeElement('div', {
      id: 'bfn-toast',
      style: {
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%) translateY(20px)',
        background: '#0f172a',
        border: '1px solid #3b82f6',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        zIndex: '100000',
        fontSize: '12px',
        fontFamily: 'ui-monospace, monospace',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: '0',
        pointerEvents: 'none',
        whiteSpace: 'pre-line',
        textAlign: 'center'
      }
    }, msg);

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  buildFooter() {
    return makeElement('footer', { className: 'dashboard-footer' }, [
      makeElement('div', { className: 'footer-content' }, [
        makeElement(
          'p',
          { className: 'footer-left' },
          'Documentary archive and analytical mapping of software IP development and career milestones.'
        ),
        makeElement(
          'p',
          { className: 'footer-right' },
          'Career & Situational Review • 1994 - 2026'
        )
      ])
    ]);
  }

  buildThemeToggle() {
    return makeElement('div', { className: 'theme-switcher' }, [
      makeElement('button', {
        className: this.currentTheme === 'light' ? 'active' : '',
        onclick: () => this.setTheme('light')
      }, [
        makeElement('span', { innerHTML: '☀️' }),
        makeElement('span', {}, 'Light')
      ]),
      makeElement('button', {
        className: this.currentTheme === 'dark' ? 'active' : '',
        onclick: () => this.setTheme('dark')
      }, [
        makeElement('span', { innerHTML: '🌙' }),
        makeElement('span', {}, 'Dark')
      ])
    ]);
  }

  buildMotionSlider() {
    const slider = makeElement('input', {
      type: 'range',
      min: '0.1',
      max: '3.0',
      step: '0.1',
      value: String(this.motionValue || 1.0),
      className: 'motion-slider',
      oninput: (e) => {
        this.updateMotionValue(parseFloat(e.target.value));
      }
    });

    return makeElement('div', { className: 'motion-slider-row' }, [
      makeElement('span', { className: 'motion-slider-label' }, 'Motion'),
      slider
    ]);
  }

  updateMotionValue(val) {
    this.motionValue = val;
    localStorage.setItem('accudraw-motion-val', String(val));
    const container = this.targetElement.querySelector('.cad-container');
    if (container) {
      container.style.setProperty('--motion-scale', String(val));
    }
    if (this.valueEmberLogo) {
      this.valueEmberLogo.options.emberCountMultiplier = 0.4 * val;
      this.valueEmberLogo.options.emberSpeedMultiplier = 0.3 * val;
      this.valueEmberLogo.options.emberSizeMultiplier = 0.4 * val;
    }
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    localStorage.setItem('accudraw-valuation-theme', themeName);
    const container = this.targetElement.querySelector('.cad-container');
    if (container) {
      if (themeName === 'light') {
        container.classList.add('theme-light');
      } else {
        container.classList.remove('theme-light');
      }
    }
    this.renderApp();
  }

  _isAwaitingRecalculation() {
    return this.revealMode === 'wrong-answers' && (this.wrongAnswerStage || 0) < 3;
  }

  preloadResources() {
    if (window.SnareDrumAnimation) {
      try {
        SnareDrumAnimation.preload('LogoExperiments/drumroll.mp4');
      } catch (e) {}
    }
  }

  setupKeyboardListeners() {
    if (this._currentKeydownHandler) {
      window.removeEventListener('keydown', this._currentKeydownHandler);
    }
    this._currentKeydownHandler = (e) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            this.showToastMessage('Copied selected text:\n' + text.slice(0, 40));
          }).catch(() => {});
        }
      }
    };
    window.addEventListener('keydown', this._currentKeydownHandler);
  }

  initializeTheme() {
    document.body.classList.add('js-active');
    this.currentTheme = localStorage.getItem('accudraw-valuation-theme') || 'dark';
  }

  loadGoogleFont() {
    const fontId = 'GoogleFontComfortaa';
    if (!document.getElementById(fontId)) {
      const link = makeElement('link', {
        id: fontId,
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700;900&display=swap'
      });
      document.head.appendChild(link);
    }
  }

  loadAppStyles() {
    this.applyCoreResetCSS();
    this.applyCoreLayoutCSS();
    this.applyHeaderCSS();
    this.applyThemeSwitcherCSS();
    this.applyBFNCSS();
    this.applyNavigationCSS();
  }

  applyCoreResetCSS() {
    applyCss("html, body { margin: 0 !important; padding: 0 !important; min-height: 100vh; width: 100%; background-color: #070a12; } .cad-container, .cad-container * { box-sizing: border-box; margin: 0; padding: 0; }", "cad-core-reset-styles");
  }

  applyCoreLayoutCSS() {
    applyCss(".cad-container { --bg-primary: #070a12; --bg-grid: rgba(255, 255, 255, 0.02); --bg-panel: #0c111d; --bg-panel-inner: #05070a; --text-primary: #cbd5e1; --text-secondary: #94a3b8; --text-title: #ffffff; --border-color: #1e293b; --border-hover: #334155; --btn-bg: #1e293b; --btn-hover: #334155; --btn-text: #e2e8f0; --accent-story-from: rgba(59, 130, 246, 0.06); --accent-story-to: rgba(168, 85, 247, 0.06); background-color: var(--bg-primary); color: var(--text-primary); font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; min-height: 100vh; width: 100%; padding: 48px 16px; } .cad-grid-bg { background-size: 32px 32px; background-image: linear-gradient(to right, var(--bg-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--bg-grid) 1px, transparent 1px); } .cad-wrapper { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 48px; } .cad-panel { background-color: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 12px; padding: 32px; }", "cad-core-layout-styles");
  }

  applyHeaderCSS() {
    applyCss(".minimal-header { display: flex; flex-direction: column; gap: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 24px; } .header-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; } .tags-wrapper { display: flex; gap: 8px; } .tag-pill { font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; } .tag-pill-blue { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3); } .tag-pill-slate { background-color: rgba(148, 163, 184, 0.1); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.2); } .title-group h1 { font-size: 32px; font-weight: 800; color: var(--text-title); letter-spacing: -0.02em; margin-bottom: 8px; line-height: 1.1; } @media (min-width: 768px) { .title-group h1 { font-size: 44px; } } .title-subtitle { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-family: ui-monospace, monospace; color: var(--text-secondary); font-weight: 600; }", "cad-header-styles");
  }

  applyThemeSwitcherCSS() {
    applyCss(".theme-switcher { display: flex; align-items: center; gap: 6px; padding: 4px; background-color: var(--btn-bg); border: 1px solid var(--border-color); border-radius: 8px; } .theme-switcher button { padding: 4px 12px; font-size: 11px; font-weight: 600; border-radius: 6px; border: none; cursor: pointer; background: transparent; color: var(--text-secondary); display: flex; align-items: center; gap: 4px; } .theme-switcher button.active { background-color: #3b82f6; color: #ffffff; } .reveal-mode-row { margin-top: 6px; display: flex; justify-content: flex-end; } .reveal-mode-select { appearance: none; background: transparent; border: none; color: var(--text-secondary); font-size: 10px; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.06em; padding: 2px 4px; cursor: pointer; opacity: 0.6; }", "cad-theme-switcher-styles");
  }

  applyBFNCSS() {
    applyCss(".consensus-action-wrapper { display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%; } @media (min-width: 768px) { .consensus-action-wrapper { align-items: flex-end; } } .visualize-bfn-btn { margin-top: 10px; display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #f59e0b, #ef4444); border: none; color: #ffffff; font-size: 11px; font-weight: 800; font-family: ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.08em; padding: 8px 16px; border-radius: 20px; cursor: pointer; } .motion-slider-row { display: flex; align-items: center; gap: 8px; margin-top: 4px; } .motion-slider-label { font-size: 10px; font-family: ui-monospace, monospace; text-transform: uppercase; color: var(--text-secondary); font-weight: bold; } .motion-slider { width: 70px; height: 4px; border-radius: 2px; background: var(--border-color); outline: none; cursor: pointer; }", "cad-bfn-styles");
  }

  applyNavigationCSS() {
    applyCss(".global-nav-bar { display: flex; flex-wrap: wrap; gap: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 16px; margin-bottom: 16px; margin-top: 16px; width: 100%; } .global-nav-link { font-size: 11px; font-family: ui-monospace, monospace; font-weight: bold; text-transform: uppercase; color: var(--text-secondary); text-decoration: none; border: 1px solid var(--border-color); padding: 8px 16px; border-radius: 8px; background: var(--bg-panel); transition: all 0.2s ease-in-out; } .global-nav-link:hover { background: var(--btn-hover); color: var(--text-title); border-color: var(--border-hover); } .global-nav-link.active { background: #3b82f6; color: #ffffff; border-color: #3b82f6; } .backstory-gradient-card { padding: 32px; border: 1px solid var(--border-color); border-radius: 16px; display: flex; flex-direction: column; gap: 24px; background: linear-gradient(135deg, var(--accent-story-from), var(--accent-story-to)); } .backstory-paragraph-highlight { font-size: 16px; font-weight: 500; color: var(--text-primary); line-height: 1.6; } @media (min-width: 768px) { .backstory-paragraph-highlight { font-size: 18px; } } .backstory-paragraph { font-size: 14px; color: var(--text-secondary); line-height: 1.6; } .inline-link-highlight { color: #2563eb; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }", "cad-navigation-styles");
  }

  getValuationStaticData() {
    return {
      title: "AccuDraw & SmartLine Value Assessment",
      prompts: [
        { id: "1", text: "tell me everything you know about accudraw and smartline in microstation" },
        { id: "2", text: "how important are they to the success of microstation and bentley systems?" },
        { id: "3", text: "what is your rough estimate as to how much value they brought bentley in terms of profit and/or contribution to market cap?" }
      ]
    };
  }
}

window.SituationApp = SituationApp;
globalThis.SituationApp = SituationApp;