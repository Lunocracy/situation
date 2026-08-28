class OverviewPage {
  render(app) {
    const container = makeElement('div', { className: 'flex flex-col gap-8' });

    // 1. Critical Situational Notice & Human Services Coordination
    const statusBanner = makeElement('div', {
      className: 'cad-panel',
      style: {
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
      }
    }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' } }, [
        makeElement('strong', { style: { color: '#f87171', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'ui-monospace, monospace' } }, '⚠️ Current Logistical Status & Urgent Priorities'),
        makeElement('span', { style: { fontSize: '11px', fontWeight: 'bold', color: '#f87171', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #f87171', padding: '3px 10px', borderRadius: '12px', fontFamily: 'ui-monospace, monospace' } }, '● Urgent Transition')
      ]),
      makeElement('p', { style: { color: '#cbd5e1', fontSize: '13.5px', lineHeight: '1.6', margin: 0 } },
        'Immediate priorities are focused on resolving critical utility outages, addressing housing eviction notices, and securing stable basic necessities. Active coordination is underway with local support liaison Don and municipal Human Services to secure appropriate housing and support.'
      )
    ]);
    container.appendChild(statusBanner);

    // 2. Recent Events & Chronological Log
    const timelinePanel = makeElement('div', { className: 'cad-panel flex flex-col gap-6' }, [
      makeElement('div', { className: 'dashboard-header-group mb-2' }, [
        makeElement('h3', {}, 'Chronological Log: Recent Events & Challenges'),
        makeElement('p', {}, 'A documented record of recent transitions, shelter challenges, and support coordination.')
      ]),
      makeElement('div', { className: 'space-y-4' }, [
        this.buildTimelineCard(
          'August 2026',
          'Emergency Travel & Shelter Attempt',
          'Traveled to San Francisco in search of emergency lodging and stable internet connectivity. Subsequently attempted temporary lodging at a local group facility in Chico; however, high ambient heat, crowded bunk quarters, and severe reactivity from service/companion dog Rocky made the group environment unsustainable, requiring a return to the apartment.',
          '🚗 Travel & Lodging'
        ),
        this.buildTimelineCard(
          'August 2026',
          'Utility Disruption & Eviction Notice',
          'Received formal eviction notice following extended rent non-payment during financial distress. Residential electrical and cellular service remain disconnected, requiring borrowed power and public connections to maintain development work on mobile devices.',
          '⚡ Utility & Housing'
        ),
        this.buildTimelineCard(
          'August 2026',
          'Support Liaison & Human Services Intake',
          'Coordination established with private investigator Don, who provided emergency food supplies and is facilitating an intake meeting with municipal Human Services to explore stable emergency housing and assistance.',
          '🤝 Support Outreach'
        ),
        this.buildTimelineCard(
          'Ongoing',
          'Family Communication Barriers & Isolation',
          'Continued communication barriers with family members and restricted contact with 94-year-old mother. Efforts to establish open, supportive dialogue regarding health, executive function challenges, and career runway remain unresolved.',
          '🔒 Communication'
        )
      ])
    ]);
    container.appendChild(timelinePanel);

    // 3. Complete Inventions & Product Catalog
    const productPanel = makeElement('div', { className: 'cad-panel flex flex-col gap-6' }, [
      makeElement('div', { className: 'dashboard-header-group mb-2' }, [
        makeElement('h3', {}, 'Active Intellectual Property & Product Inventory'),
        makeElement('p', {}, 'Detailed overview of physical assets, software platforms, and interactive training tools ready for commercialization.')
      ]),
      makeElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' }, [
        makeElement('div', { className: 'elder-analysis-card' }, [
          makeElement('span', { className: 'elder-card-badge mb-2 inline-block' }, '📦 Physical Inventory (3,000 Units)'),
          makeElement('h4', { className: 'text-base font-bold text-[var(--text-title)] mb-2' }, 'Full-Bleed Silicone Piano Key Guides'),
          makeElement('p', { className: 'text-sm text-[var(--text-secondary)] leading-relaxed mb-3' }, 
            'Manufactured inventory of ~3,000 custom silicone keyboard strips (15 boxes / ~375 lbs total). Unlike existing market alternatives, these feature full-bleed edge color printing aligned with standard rainbow notation and direct software integration.'
          ),
          makeElement('div', { className: 'text-xs font-mono text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800' },
            'Status: In storage, ready for direct-to-consumer and e-commerce distribution.'
          )
        ]),

        makeElement('div', { className: 'elder-analysis-card' }, [
          makeElement('span', { className: 'elder-card-badge mb-2 inline-block' }, '🎵 Interactive Training Software'),
          makeElement('h4', { className: 'text-base font-bold text-[var(--text-title)] mb-2' }, 'Ear Training & Dynamic Staff Games'),
          makeElement('p', { className: 'text-sm text-[var(--text-secondary)] leading-relaxed mb-3' }, 
            'Browser-based gamified music learning system featuring: (1) Missing-note harmonic ear training, (2) Real-time interactive staff reading across treble and bass clefs with key signatures, and (3) Play-along YouTube integration.'
          ),
          makeElement('div', { className: 'text-xs font-mono text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800' },
            'Engine: 2D SVG & Three.js 3D modeled keyboard with authentic key geometries and low latency.'
          )
        ]),

        makeElement('div', { className: 'elder-analysis-card' }, [
          makeElement('span', { className: 'elder-card-badge mb-2 inline-block' }, '💻 Visual & Mobile Coding Platform'),
          makeElement('h4', { className: 'text-base font-bold text-[var(--text-title)] mb-2' }, 'Natural Language Browser IDE'),
          makeElement('p', { className: 'text-sm text-[var(--text-secondary)] leading-relaxed mb-3' }, 
            'A fully bootstrapped, mobile-first visual coding environment capable of building, modifying, and live-patching web applications directly on mobile devices without complex local toolchains.'
          ),
          makeElement('div', { className: 'text-xs font-mono text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800' },
            'Capabilities: AST parsing, IndexedDB state caching, and one-tap GitHub Pages deployment.'
          )
        ]),

        makeElement('div', { className: 'elder-analysis-card' }, [
          makeElement('span', { className: 'elder-card-badge mb-2 inline-block' }, '📐 CAD & Spatial Modeling Legacy'),
          makeElement('h4', { className: 'text-base font-bold text-[var(--text-title)] mb-2' }, 'AccuDraw & 3D Web Implementation'),
          makeElement('p', { className: 'text-sm text-[var(--text-secondary)] leading-relaxed mb-3' }, 
            'Three-decade legacy of high-leverage CAD UI design (originating MicroStation AccuDraw and SmartLine), now adapted into modern Three.js geometric manipulation tools following patent expiration.'
          ),
          makeElement('div', { className: 'text-xs font-mono text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800' },
            'Valuation: Multi-billion dollar enterprise impact verified across four major AI consensus models.'
          )
        ])
      ])
    ]);
    container.appendChild(productPanel);

    // 4. Navigation Links Grid
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
          'Consensus economic models assessing the multi-decade enterprise value contribution of AccuDraw & SmartLine.'
        )
      ]),

      makeElement('div', {
        className: 'cad-panel flex flex-col gap-3 cursor-pointer',
        style: { border: '1px solid #10b981' },
        onclick: () => { window.location.hash = '#/current-work'; }
      }, [
        makeElement('div', { className: 'flex justify-between items-center' }, [
          makeElement('strong', { className: 'text-emerald-400 font-mono text-sm' }, '⚡ Current Work & Demos'),
          makeElement('span', { className: 'text-xs text-slate-400 font-mono' }, '➔')
        ]),
        makeElement('p', { className: 'text-xs text-slate-400 leading-relaxed' }, 
          'Technical video walkthroughs of the coding environment, interactive layouts, and media toolsets.'
        )
      ]),

      makeElement('div', {
        className: 'cad-panel flex flex-col gap-3 cursor-pointer',
        style: { border: '1px solid #a855f7' },
        onclick: () => { window.location.hash = '#/ai-perspective'; }
      }, [
        makeElement('div', { className: 'flex justify-between items-center' }, [
          makeElement('strong', { className: 'text-purple-400 font-mono text-sm' }, '🤖 AI & Timeline Analysis'),
          makeElement('span', { className: 'text-xs text-slate-400 font-mono' }, '➔')
        ]),
        makeElement('p', { className: 'text-xs text-slate-400 leading-relaxed' }, 
          'Analysis of accelerating automated workflows and the urgency of establishing professional stability.'
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
          'Factual record and legal analyses regarding Power of Attorney guidelines and communication protocols.'
        )
      ])
    ]);
    container.appendChild(highlightsGrid);

    return container;
  }

  buildTimelineCard(date, title, description, badge) {
    return makeElement('div', {
      style: {
        padding: '16px 20px',
        backgroundColor: 'var(--bg-panel-inner)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
        makeElement('span', { className: 'text-xs font-mono font-bold text-blue-400' }, date),
        makeElement('span', { className: 'elder-card-badge text-[10px]' }, badge)
      ]),
      makeElement('h4', { className: 'text-sm font-bold text-[var(--text-title)]' }, title),
      makeElement('p', { className: 'text-xs text-[var(--text-secondary)] leading-relaxed' }, description)
    ]);
  }
}

window.OverviewPage = OverviewPage;
globalThis.OverviewPage = OverviewPage;
if (typeof module !== 'undefined' && module.exports) module.exports = OverviewPage;