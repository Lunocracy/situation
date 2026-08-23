class CaretakerBiasPage {
  render(app) {
    this.app = app;
    this.applyStyles();
    const container = makeElement('div', { className: 'space-y-8' });
    container.appendChild(this.buildCaretakerIntroBlock(app));
    container.appendChild(this.buildCaretakerTimelineBlock(app));
    container.appendChild(this.buildLinkedInExhibitsPanel(app));
    container.appendChild(this.buildVotingContrastPanel(app));
    container.appendChild(this.buildCaretakerHistoryGrid(app));
    return container;
  }

  buildCaretakerIntroBlock(app) {
    const p1 = [
      "This dossier has been compiled to document a consistent, verifiable ",
      "pattern of personal animosity, ideological bias, and communication ",
      "barriers on the part of Kathleen Brown. Crucially, she is not merely ",
      "managing our 94-year-old mother's personal care; she acts as the sole ",
      "administrator of the financial trust and transition plan established by ",
      "our mother to help me get back on my feet. By structuring this legal agreement ",
      "in an extremely restrictive and punitive manner, she has actively worked ",
      "contrary to our mother's supportive intent."
    ].join("");

    const p2 = [
      "This analysis demonstrates that the initial design of the plan, the systemic ",
      "gatekeeping of our mother and the termination of my transition runway are ",
      "motivated by a long-standing personal grudge, fueled by radicalized tribal ",
      "beliefs that justify demonizing close family members."
    ].join("");

    return makeElement('div', { className: 'backstory-gradient-card' }, [
      makeElement('h3', { className: 'text-lg font-bold text-[var(--text-title)]' }, 'Fiduciary Role & Objective of This Dossier'),
      makeElement('p', { className: 'backstory-paragraph-highlight' }, p1),
      makeElement('p', { className: 'backstory-paragraph' }, p2)
    ]);
  }

  buildCaretakerTimelineBlock(app) {
    const item1Text = "During a late-night discussion in Virginia regarding intellectual property economics, Kathy's husband Jack asserted: 'If it doesn\'t make you money, it doesn\'t have value.' Kathy became agitated and suddenly stated: 'We\'ve got a lot of guns and we\'re not afraid to use them.' Rob\'s query ('Is that a threat?') was met with complete silence as she walked out.";
    const item2Text = "Shortly after the Virginia incident, Rob discovered that Kathy had been publicly posting condescending and hostile comments on her professional LinkedIn profile. The realization that she was publicly denigrating his character combined with the active gun threat devastated Rob\'s emotional health and necessitated professional therapy.";
    const item3Text = "Now acting as primary care coordinator and sole trust administrator, Kathy\'s long-standing grudge culminated in a complete communication firewall. Care supervisor Shirley confirmed she was under strict instructions to block any direct video contact between Rob and his mother unless explicitly cleared by Kathy, selectively isolating Rob while his sisters maintain unmonitored access.";

    return makeElement('section', { className: 'cad-panel space-y-6' }, [
      makeElement('h2', { 
        className: 'text-xl font-bold text-[var(--text-title)] uppercase tracking-wide', 
        style: { fontFamily: 'ui-monospace, monospace' } 
      }, 'Timeline of the Gatekeeping Grudge'),
      
      makeElement('div', { className: 'timeline-flow space-y-6' }, [
        this.buildTimelineItem('Early 2022 (The Virginia Threat)', item1Text, '🔴 The Gun Threat'),
        this.buildTimelineItem('Early 2022 (Soon After / Discoveries)', item2Text, '💬 LinkedIn Discovery & Therapy'),
        this.buildTimelineItem('Early 2026 (The Current Embargo)', item3Text, '🔒 Systemic Gatekeeping')
      ])
    ]);
  }

  buildTimelineItem(time, desc, badge) {
    return makeElement('div', { className: 'timeline-item pl-6 relative' }, [
      makeElement('span', { className: 'timeline-item-dot' }),
      makeElement('div', { className: 'flex justify-between items-center mb-2' }, [
        makeElement('span', { className: 'timeline-time font-bold text-[#3b82f6] text-sm' }, time),
        makeElement('span', { className: 'elder-card-badge' }, badge)
      ]),
      makeElement('p', { className: 'text-sm text-[var(--text-secondary)] leading-relaxed' }, desc)
    ]);
  }

  buildLinkedInExhibitsPanel(app) {
    const specs = [
      {
        title: 'Exhibit 1: The "Owes You" Yellow Pad',
        imgSrc: 'images/k_owesYou.png',
        analysis: "This yellow notepad graphic remains active on Kathleen Brown's professional LinkedIn profile, representing her core philosophy of extreme self-reliance. When Rob was forced to negotiate a transition runway, she asked condescendingly: 'Do you think they owe you something?' completely ignoring his historic technical legacy.",
        transcript: 'Kathleen Brown likes this: "Here is a comprehensive list of everything you\'re entitled to and what the world owes you." (Blank yellow pad)'
      },
      {
        title: 'Exhibit 2: Support for Suspended Figures (Pierre Kory)',
        imgSrc: 'images/k_kory.png',
        analysis: "Kathleen Brown endorsed and commented in support of fringe, unscientific alternative COVID-19 claims. Doctors leveraging professional credentials to validate unscientific alternative paths allowed ideological tribal partisanship to override medical evidence and safety.",
        transcript: 'Kathleen Brown likes and comments: "We need you and your colleagues. Thank you for all your efforts!"'
      },
      {
        title: 'Exhibit 3: Anti-California Hostility',
        imgSrc: 'images/k_california.png',
        analysis: "Following a visit to California, Kathy publicly commented on the Gavin Newsom recall election, asserting that its failure 'tells you something about the people who do live there,' viewing her brother's home through a deeply hostile lens.",
        transcript: 'Kathleen Brown comments: "That Gavin Newsom survived recall tells you something about the people who do live there..."'
      },
      {
        title: 'Exhibit 4: Martin Geddes / Family Demonization',
        imgSrc: 'images/k_qanon.png',
        analysis: "Kathleen Brown publicly endorsed a publication by QAnon conspiracist Martin Geddes that focuses on demonizing family members who hold mainstream views, declaring relatives as 'satanic' or in a 'cult,' normalizing the cutting off of close family bonds.",
        transcript: 'Kathleen Brown likes: "We will have to face up to many being orphaned... we cannot buckle or bend the knee..."'
      }
    ];

    return makeElement('section', { className: 'cad-panel space-y-8' }, [
      makeElement('div', { className: 'dashboard-header-group mb-4' }, [
        makeElement('h3', {}, 'Documented LinkedIn Activity'),
        makeElement('p', {}, 'Verified documentary screenshots of public activity reflecting ideological and personal hostility.')
      ]),
      makeElement('div', { className: 'space-y-8' }, ...specs.map(s => this.buildExhibitItem(app, s.title, s.imgSrc, s.analysis, s.transcript)))
    ]);
  }

  buildExhibitItem(app, title, imgSrc, analysis, transcriptText) {
    return makeElement('div', { className: 'exhibit-item-row' }, [
      makeElement('div', { className: 'exhibit-image-wrapper' }, [
        makeElement('img', {
          src: imgSrc,
          alt: title,
          className: 'exhibit-image cursor-pointer',
          onclick: () => app.openExhibitModal(imgSrc, title, analysis),
          onerror: (e) => { e.target.style.display = 'none'; }
        })
      ]),
      makeElement('div', { className: 'exhibit-content-wrapper' }, [
        makeElement('h4', { className: 'text-base font-bold text-[var(--text-title)] mb-2' }, title),
        makeElement('p', { className: 'text-sm text-[var(--text-primary)] leading-relaxed mb-3' }, analysis),
        makeElement('div', { className: 'transcript-quote-box text-xs italic border-l-2 border-[#f59e0b] pl-3' }, [
          makeElement('span', { className: 'font-bold not-italic text-[var(--text-title)] block mb-1 text-[10px] uppercase tracking-wider' }, 'Verbatim Activity Transcript'),
          transcriptText
        ])
      ])
    ]);
  }

  buildVotingContrastPanel(app) {
    return makeElement('section', { className: 'cad-panel space-y-6' }, [
      makeElement('div', { className: 'dashboard-header-group' }, [
        makeElement('h3', {}, "Rob's Public Advocacy & Depolarization"),
        makeElement('p', {}, "A direct contrast showcasing Rob's multi-year research into unifying median-based voting systems versus Kathy's explicit rejection of consensus.")
      ]),

      makeElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' }, [
        makeElement('div', { className: 'elder-analysis-card p-6 border-l-4 border-emerald-500' }, [
          makeElement('span', { className: 'elder-card-badge bg-emerald-950/20 text-emerald-400 border-emerald-500/20' }, "Rob's Depolarization Advocacy"),
          makeElement('h4', { className: 'font-bold text-sm text-[var(--text-title)] my-2' }, 'Consensus & Majority Judgment Systems'),
          makeElement('p', { className: 'text-xs text-[var(--text-secondary)] leading-relaxed italic' }, 
            '"To reduce tribalism, we must replace standard plurality voting with median-based systems like Majority Judgment, where candidates are graded qualitatively. Extreme candidates receive polarized grades, so the system mathematically favors unifying centrist candidates."'
          )
        ]),

        makeElement('div', { className: 'elder-analysis-card p-6 border-l-4 border-red-500 flex flex-col justify-between' }, [
          makeElement('div', {}, [
            makeElement('span', { className: 'elder-card-badge bg-red-950/20 text-red-400 border-red-500/20' }, "Kathy's Polarizing Mandate"),
            makeElement('h4', { className: 'font-bold text-sm text-[var(--text-title)] my-2' }, 'Rejection of the Median'),
            makeElement('blockquote', { className: 'text-xs text-[var(--text-secondary)] leading-relaxed italic border-l border-red-500/30 pl-3 my-2' }, 
              '"I find consensus-seeking offensive... I believe people in the median are some of the worst."'
            )
          ])
        ])
      ])
    ]);
  }

  buildCaretakerHistoryGrid(app) {
    const historyCards = [
      { title: 'Refusal to Support Mother (20 Years Ago)', text: 'When their mother experienced controlling behavior from their father, Rob proposed a unified sibling alliance. Kathy refused to assist, stating their mother brought the situation on herself.', badge: '❌ Refusal of Aid' },
      { title: 'Refusal of Mediation in San Francisco', text: 'During a looming custody crisis, Rob asked Kathy (visiting SF) to spend one hour speaking with his then-wife to help mediate. Citing individual responsibility, she flatly refused, preceding a years-long custody dispute.', badge: '❌ Refusal of Mediation' },
      { title: 'Refusal to Assist with Family Interference', text: 'When their late father was micromanaging Rob\'s legal defense during cognitive decline, Rob asked Kathy to intervene. She refused, stating: "If you accept help, it\'s going to have strings attached."', badge: '❌ Refusal of Protection' },
      { title: 'Contrast: Rob\'s 2020 Defense of Kathy', text: 'When their uncle sent an abusive email slamming Kathy, Rob immediately wrote a strong defense of her at personal risk, showing loyalty she has consistently failed to return.', badge: '💚 Rob\'s Loyal Defense' }
    ];

    return makeElement('section', { className: 'cad-panel space-y-6' }, [
      makeElement('h2', { 
        className: 'text-xl font-bold text-[var(--text-title)] uppercase tracking-wide', 
        style: { fontFamily: 'ui-monospace, monospace' } 
      }, 'Historical Inconsistencies of "Self-Reliance"'),
      makeElement('div', { className: 'elder-analysis-grid' }, 
        historyCards.map(c => makeElement('div', { className: 'elder-analysis-card' }, [
          makeElement('span', { className: 'elder-card-badge mb-2 inline-block' }, c.badge),
          makeElement('h4', { className: 'text-base font-bold text-[var(--text-title)] mb-2' }, c.title),
          makeElement('p', { className: 'text-sm text-[var(--text-secondary)] leading-relaxed' }, c.text)
        ]))
      )
    ]);
  }

  applyStyles() {
    applyCss(`
      .timeline-item {
        border-left: 2px solid #3b82f6;
        padding-left: 24px;
        position: relative;
        padding-bottom: 24px;
      }
      .timeline-item-dot {
        position: absolute;
        left: -5px;
        top: 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #3b82f6;
      }
      .exhibit-item-row {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px;
        background-color: var(--bg-panel-inner);
        border: 1px solid var(--border-color);
        border-radius: 12px;
      }
      @media (min-width: 768px) {
        .exhibit-item-row { flex-direction: row; align-items: start; }
        .exhibit-image-wrapper { width: 260px; flex-shrink: 0; }
      }
      .exhibit-image {
        width: 100%;
        height: auto;
        border-radius: 8px;
        border: 1px solid var(--border-color);
      }
      .exhibit-content-wrapper { flex: 1; }
    `, 'caretaker-custom-styles');
  }
}

window.CaretakerBiasPage = CaretakerBiasPage;
