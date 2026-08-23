class OverviewPage {
  render(app) {
    const container = makeElement('div', { className: 'flex flex-col gap-8' });

    // ⚡ COMING SOON / LIVE UPDATES NOTICE BANNER
    const updatesBanner = makeElement('div', {
      className: 'cad-panel',
      style: {
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid #3b82f6',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '16px',
        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15)'
      }
    }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' } }, [
        makeElement('strong', { style: { color: '#38bdf8', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'ui-monospace, monospace' } }, '⚡ COMING SOON: Live Situational Updates & Expanded Case Exhibits'),
        makeElement('span', { style: { fontSize: '11px', fontWeight: 'bold', color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', padding: '3px 10px', borderRadius: '12px', fontFamily: 'ui-monospace, monospace' } }, '● Active Work')
      ]),
      makeElement('p', { style: { color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5', margin: 0 } },
        'Additional analytical case exhibits, expanded documentary appendices, and real-time interactive technical benchmarks are currently being compiled and will appear here shortly.'
      )
    ]);

    container.appendChild(updatesBanner);

    // 1. Executive Summary Panel
    const executivePanel = makeElement('div', { className: 'cad-panel flex flex-col gap-6' }, [
      makeElement('div', { className: 'flex justify-between items-center border-b border-slate-800 pb-4' }, [
        makeElement('h2', { className: 'text-xl font-bold text-white tracking-tight' }, 'Executive Summary & Background'),
        makeElement('span', { className: 'tag-pill tag-pill-blue' }, 'Overview')
      ]),
      makeElement('div', { className: 'backstory-gradient-card' }, [
        makeElement('p', { className: 'backstory-paragraph-highlight' }, 
          'This dossier documents the economic contribution, software intellectual property history, and technical timeline of AccuDraw, SmartLine, and subsequent visual programming architectures.'
        ),
        makeElement('p', { className: 'backstory-paragraph' }, 
          'During the 1990s, the introduction of intuitive cursor-based geometric input fundamentally redefined Computer-Aided Design (CAD) productivity, serving as a primary driver of enterprise adoption and market capitalization growth.'
        ),
        makeElement('p', { className: 'backstory-paragraph' }, 
          'In recent years, caretaking obligations and family legal disputes created artificial career interruptions. This dossier provides factual documentation, objective valuation consensus from leading AI analytical engines, and proposals for equitable resolution.'
        )
      ])
    ]);
    container.appendChild(executivePanel);

    // 2. Navigation Highlights Grid
    const highlightsGrid = makeElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' }, [
      makeElement('div', {
        className: 'cad-panel flex flex-col gap-3 cursor-pointer',
        style: { border: '1px solid #3b82f6' },
        onclick: () => { window.location.hash = '#/value-assessment'; }
      }, [
        makeElement('div', { className: 'flex justify-between items-center' }, [
          makeElement('strong', { className: 'text-blue-400 font-mono text-sm' }, '💰 Valuation Assessment'),
          makeElement('span', { className: 'text-xs text-slate-400 font-mono' }, '➔')
        ]),
        makeElement('p', { className: 'text-xs text-slate-400 leading-relaxed' }, 
          'Consensus economic valuation models from Claude 3.5, GPT-4o, Gemini, and Grok evaluating the multi-billion dollar enterprise value impact of AccuDraw & SmartLine.'
        )
      ]),

      makeElement('div', {
        className: 'cad-panel flex flex-col gap-3 cursor-pointer',
        style: { border: '1px solid #10b981' },
        onclick: () => { window.location.hash = '#/current-work'; }
      }, [
        makeElement('div', { className: 'flex justify-between items-center' }, [
          makeElement('strong', { className: 'text-emerald-400 font-mono text-sm' }, '⚡ Current Work & Vibe Coding'),
          makeElement('span', { className: 'text-xs text-slate-400 font-mono' }, '➔')
        ]),
        makeElement('p', { className: 'text-xs text-slate-400 leading-relaxed' }, 
          'Next-generation recursively self-improving visual programming environments, live telemetry monitors, and automated code synthesis pipelines.'
        )
      ]),

      makeElement('div', {
        className: 'cad-panel flex flex-col gap-3 cursor-pointer',
        style: { border: '1px solid #a855f7' },
        onclick: () => { window.location.hash = '#/ai-perspective'; }
      }, [
        makeElement('div', { className: 'flex justify-between items-center' }, [
          makeElement('strong', { className: 'text-purple-400 font-mono text-sm' }, '🤖 AI & Urgent Timeline'),
          makeElement('span', { className: 'text-xs text-slate-400 font-mono' }, '➔')
        ]),
        makeElement('p', { className: 'text-xs text-slate-400 leading-relaxed' }, 
          'The compounding acceleration of AI code synthesis and why resolving career and situational obstacles is time-critical.'
        )
      ]),

      makeElement('div', {
        className: 'cad-panel flex flex-col gap-3 cursor-pointer',
        style: { border: '1px solid #f59e0b' },
        onclick: () => { window.location.hash = '#/elder-advocacy'; }
      }, [
        makeElement('div', { className: 'flex justify-between items-center' }, [
          makeElement('strong', { className: 'text-amber-400 font-mono text-sm' }, '🛡️ Fiduciary & Care Review'),
          makeElement('span', { className: 'text-xs text-slate-400 font-mono' }, '➔')
        ]),
        makeElement('p', { className: 'text-xs text-slate-400 leading-relaxed' }, 
          'Factual documentary analysis of Power of Attorney duties, care arrangements, and communication records.'
        )
      ])
    ]);
    container.appendChild(highlightsGrid);

    return container;
  }
}

window.OverviewPage = OverviewPage;
globalThis.OverviewPage = OverviewPage;
if (typeof module !== 'undefined' && module.exports) module.exports = OverviewPage;