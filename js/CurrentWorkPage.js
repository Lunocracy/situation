class CurrentWorkPage {
  render(app) {
    this.app = app;
    this.applyStyles();

    const mainContainer = makeElement("div", { className: "current-work-editorial-wrapper space-y-8" });
    mainContainer.appendChild(this.buildStatusCard());
    mainContainer.appendChild(this.buildNarrativeCard());
    mainContainer.appendChild(this.buildSystemHighlightsGrid());
    mainContainer.appendChild(this.buildVideoShowcase());

    return mainContainer;
  }

  buildStatusCard() {
    return makeElement("div", { className: "current-work-status-banner" }, [
      makeElement("h3", { className: "text-base font-bold text-amber-500 uppercase tracking-wider mb-2" }, "Presentation Enhancements In Progress"),
      makeElement("p", { className: "text-sm text-[var(--text-secondary)] leading-relaxed" }, 
        "Please note that this section is actively being enhanced. The explanatory documentation and video walkthroughs are currently being updated to be shorter and directly to the point. However, the underlying software product is fully complete, functional, and structurally sound."
      )
    ]);
  }

  buildNarrativeCard() {
    return makeElement("div", { className: "backstory-gradient-card" }, [
      makeElement("h2", { className: "text-xl font-bold text-[var(--text-title)]" }, "Foundational Moats, Earning Potential, and Personal Horizons"),
      makeElement("p", { className: "backstory-paragraph-highlight" }, 
        "Building recursively self-improving Visual and Vibe Coding environments requires substantial stability, time, and focus. There is a stark, undeniable contrast between authoring core UX paradigms (such as AccuDraw and SmartLine) that historically created an estimated $2.3 billion in return on investment for major enterprise CAD vendors, and the disruptive personal dislocations of the recent past."
      ),
      makeElement("p", { className: "backstory-paragraph" }, 
        "Unlike hourly development work, which is extremely vulnerable to rapid AI automation, this system is designed to generate passive income and a sustainable 15-year career runway through subscription software or establishing a modern online visual programming academy."
      )
    ]);
  }

  buildSystemHighlightsGrid() {
    const highlights = [
      { title: "Recursive System Generation", text: "The system writes, refactors, and deploys its own codebase in real-time using AST management client-side without relying on fragile server frameworks.", badge: "⚙️ Self-Improving Code" },
      { title: "AccuDraw & SmartLine Core Bridge", text: "Ties the visual workspace back to 1994 CAD interface innovations, combining coordinate guidance and hotkey drafting with natural language generation.", badge: "🎯 CAD Heritage" },
      { title: "The Educational Pathway", text: "An option to build an online academy teaching next-generation visual coding and layout tools, fulfilling a long-standing career direction.", badge: "🎓 Teaching & Mentorship" },
      { title: "Passive Income Generation", text: "Creating an independent development platform that safeguards against labor shifts through subscription and license-based non-hourly revenue.", badge: "💰 Non-Hourly Solvency" }
    ];

    return makeElement("section", { className: "cad-panel space-y-6" }, [
      makeElement("h2", { 
        className: "text-xl font-bold text-[var(--text-title)] uppercase tracking-wide", 
        style: { fontFamily: "ui-monospace, monospace" } 
      }, "Key System Pathways"),
      makeElement("div", { className: "elder-analysis-grid" }, 
        highlights.map(h => makeElement("div", { className: "elder-analysis-card" }, [
          makeElement("span", { className: "elder-card-badge mb-2 inline-block" }, h.badge),
          makeElement("h4", { className: "text-base font-bold text-[var(--text-title)] mb-2" }, h.title),
          makeElement("p", { className: "text-sm text-[var(--text-secondary)] leading-relaxed" }, h.text)
        ]))
      )
    ]);
  }

  buildVideoShowcase() {
    const demos = [
      { title: "1. Core Technical Walkthrough & Vibe Coding Engine", desc: "Demonstrates how the browser-based environment uses natural language prompts to recursively inspect, refactor, and rewrite its own JavaScript source files.", videoId: "sDSFBj6MuzY" },
      { title: "2. Ad-Free YouTube Playlists & Visual Piano Keyboard", desc: "Highlights an ad-free playlist aggregator and a proprietary digital piano with sub-millisecond visual latency.", videoId: "ply26G4DdcM" },
      { title: "3. Interactive Screen Layouts & Media Player Showcase", desc: "Showcases responsive full-screen layouts that dynamically adjust viewports and interactive media streams.", videoId: "7VV6poSrk3Y" }
    ];

    return makeElement("section", { className: "cad-panel space-y-6" }, [
      makeElement("h3", { 
        className: "text-lg font-bold text-[var(--text-title)] uppercase tracking-wide",
        style: { fontFamily: "ui-monospace, monospace" }
      }, "Technical Video Demonstrations"),
      makeElement("div", { className: "space-y-6" }, 
        demos.map(d => makeElement("div", { className: "border-b border-[var(--border-color)] pb-6 last:border-0" }, [
          makeElement("h4", { className: "text-base font-bold text-[var(--text-title)] mb-1" }, d.title),
          makeElement("p", { className: "text-sm text-[var(--text-secondary)] mb-3" }, d.desc),
          makeElement("div", {
            className: "aspect-video bg-black rounded-lg overflow-hidden border border-[var(--border-color)]",
            style: { width: "100%", maxWidth: "720px" }
          }, [
            makeElement("iframe", {
              src: `https://www.youtube.com/embed/${d.videoId}`,
              style: { width: "100%", height: "100%", border: "none" },
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
              allowfullscreen: "true"
            })
          ])
        ]))
      )
    ]);
  }

  applyStyles() {
    applyCss(`
      .current-work-status-banner {
        background-color: rgba(245, 158, 11, 0.05);
        border: 1px solid rgba(245, 158, 11, 0.25);
        padding: 20px;
        border-radius: 12px;
      }
    `, 'current-work-custom-styles');
  }
}

window.CurrentWorkPage = CurrentWorkPage;
