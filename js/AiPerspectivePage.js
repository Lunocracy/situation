class AiPerspectivePage {
  render(app) {
    this.app = app;
    this.applyStyles();
    return makeElement('div', { className: 'quora-reader-container' }, [
      this.buildContextCard(),
      this.buildQuoraPost()
    ]);
  }

  buildContextCard() {
    return makeElement('div', { className: 'backstory-gradient-card' }, [
      makeElement('h3', { className: 'text-xl font-bold text-[var(--text-title)]' }, 'The Core Thesis: Automation Timing & Career Recovery'),
      makeElement('p', { className: 'backstory-paragraph-highlight' }, 
        "The speed AI is moving at has created an extremely narrow window to get things sorted out career-wise. The common advice to 'just take any low-level survival job now and rebuild your career later' is completely blind to the actual trajectory. Spending a year digging ditches or doing menial labor at this critical juncture means missing the boat entirely on the generative transition. By the time you try to return, standard coding and interface modeling will be fully automated, shutting the door on my visual systems engineering skills for good."
      ),
      makeElement('p', { className: 'backstory-paragraph' }, 
        "With technology changing faster than at any point in human history, the opportunity cost of forced professional exile is absolute. Below is an analytical essay detailing the sheer velocity of generative graphics, spatial models, and robotics, and why establishing an immediate, focused technical runway is a matter of urgent survival."
      )
    ]);
  }

  buildQuoraPost() {
    return makeElement('article', { className: 'quora-post-card' }, [
      makeElement('h1', { className: 'quora-question-title' }, 'Do you believe AI will replace most all professions?'),
      this.buildQuoraAuthorRow(),
      this.buildQuoraEssayContent()
    ]);
  }

  buildQuoraAuthorRow() {
    return makeElement('div', { className: 'quora-author-row' }, [
      makeElement('div', { className: 'quora-author-avatar' }, 'RB'),
      makeElement('div', { className: 'quora-author-info' }, [
        makeElement('span', { className: 'quora-author-name' }, 'Rob Brown'),
        makeElement('span', { className: 'quora-author-bio' }, 'Software developer and interface architect'),
        makeElement('span', { className: 'quora-post-date' }, 'Updated June 2026')
      ])
    ]);
  }

  buildVideoCard(videoId, title, caption, startTime = 0) {
    const thumbnailSrc = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    return makeElement('div', { className: 'quora-video-card' }, [
      makeElement('div', {
        className: 'quora-video-thumbnail-wrapper',
        onclick: () => this.app.openExhibitModal(`https://www.youtube.com/embed/${videoId}?autoplay=1`, title, caption)
      }, [
        makeElement('img', {
          src: thumbnailSrc,
          alt: title,
          className: 'quora-video-thumbnail'
        }),
        makeElement('div', { className: 'quora-video-play-overlay' }, [
          makeElement('div', { className: 'quora-video-play-btn' }, [
            makeElement('span', { className: 'quora-video-play-icon' }, '▶')
          ])
        ])
      ]),
      makeElement('div', { className: 'quora-image-info' }, [
        makeElement('strong', { className: 'block text-sm text-[var(--text-title)] mb-1' }, title),
        makeElement('span', { className: 'quora-image-caption' }, caption)
      ])
    ]);
  }

  buildImageCard(imgSrc, title, caption) {
    return makeElement('div', { className: 'quora-image-card' }, [
      makeElement('div', {
        className: 'quora-image-wrapper',
        onclick: () => this.app.openExhibitModal(imgSrc, title, caption)
      }, [
        makeElement('img', {
          src: imgSrc,
          alt: title,
          className: 'quora-image',
          onerror: (e) => {
            e.target.style.display = 'none';
          }
        }),
        makeElement('div', { className: 'quora-image-hover-overlay' }, [
          makeElement('span', {}, 'Click to expand 🔍')
        ])
      ]),
      makeElement('div', { className: 'quora-image-info' }, [
        makeElement('span', { className: 'quora-image-caption' }, caption)
      ])
    ]);
  }

  buildDallEComparisonGrid() {
    return makeElement('div', { className: 'quora-dalle-grid' }, [
      this.buildImageCard(
        'images/compareDallE_1.webp', 
        'Prompt Comparisons: Group A', 
        'Group A prompts (glass dog, winged unicorn dog, robot hand). Left column shows mid-2022 outputs; right column shows late-2023 outputs.'
      ),
      this.buildImageCard(
        'images/compareDallE_2.webp', 
        'Prompt Comparisons: Group B', 
        'Group B prompts (cyborg pianist, ceramic elephant). Left column shows mid-2022 outputs; right column shows late-2023 outputs.'
      )
    ]);
  }

  buildCarReflectionGrid() {
    return makeElement('div', { className: 'quora-car-grid' }, [
      this.buildImageCard('images/carOriginal.webp', 'Original Red Car', 'Input: Photo of classic car'),
      this.buildImageCard('images/carStreetArt.png', 'Street Art Swap', 'Reflections painted on metallic body with coherent light transport'),
      this.buildImageCard('images/carMossy.png', 'Forest Moss Swap', 'Completely transformed forest environment')
    ]);
  }

  buildQuoraEssayContent() {
    const stream = makeElement('div', { className: 'quora-essay-stream' });
    
    stream.appendChild(makeElement('p', { className: 'quora-paragraph font-medium' }, 
      "Yeah, I think AI is going to replace almost every job. This is an incredibly difficult thing for many to accept because it challenges our fundamental assumptions about society -- specifically, the link between work, income, and basic survival."
    ));

    stream.appendChild(makeElement('p', { className: 'quora-paragraph' }, 
      "A common bias is to look at your own job and assert: 'AI won't replace my job because what I do has these unique, highly complex challenges.' That is a dangerous defense mechanism. I suggest stepping back, analyzing the larger trajectory across multiple industries, and looking honestly at the rate of improvement."
    ));

    stream.appendChild(makeElement('h2', { className: 'quora-section-title' }, '1. The Star Wars Paradigm Shift'));
    stream.appendChild(makeElement('p', { className: 'quora-paragraph' }, 
      "Look at what AI can do with de-aging. Doing this with traditional 3D rendering is incredibly hard, expensive, and always looks slightly wrong and creepy. Today, AI does it without missing a beat for next to nothing."
    ));
    stream.appendChild(this.buildImageCard('images/starWarsDeAging.webp', 'Luke, Leia, and Lando Young Again', 'Young faces synthesized without spending millions on studio rendering.'));

    stream.appendChild(makeElement('h2', { className: 'quora-section-title' }, '2. Mapping the Exponential Curve'));
    stream.appendChild(this.buildDallEComparisonGrid());

    stream.appendChild(makeElement('h2', { className: 'quora-section-title' }, '3. Spatial Material Understanding & Light Transport'));
    stream.appendChild(this.buildCarReflectionGrid());

    stream.appendChild(makeElement('h2', { className: 'quora-section-title' }, '4. True Spatial Coherence'));
    stream.appendChild(this.buildImageCard('images/housePhotoAndIllustration.webp', 'Houses Reconstructed as Line Drawing', 'From a single photographic input, the model projects a line drawing from a completely new virtual perspective angle.'));

    stream.appendChild(makeElement('h2', { className: 'quora-section-title' }, '5. Connecting the Dots'));
    stream.appendChild(makeElement('p', { className: 'quora-paragraph font-bold text-emerald-400' }, 
      "I see it mostly in programming, where it has even more superhuman capabilities than in film and animation. Programming is absolutely at the front of the pack of AI skills."
    ));

    return stream;
  }

  applyStyles() {
    applyCss(`
      .quora-reader-container {
        display: flex;
        flex-direction: column;
        gap: 32px;
        max-width: 860px;
        margin: 0 auto;
        width: 100%;
      }
      .quora-post-card {
        background-color: var(--bg-panel);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 32px;
      }
      .quora-question-title {
        font-size: 26px;
        font-weight: 800;
        color: var(--text-title);
        line-height: 1.35;
        margin-bottom: 20px;
      }
      .quora-author-row {
        display: flex;
        align-items: center;
        gap: 14px;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 20px;
        margin-bottom: 28px;
      }
      .quora-author-avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 15px;
      }
      .quora-author-name {
        font-size: 15px;
        font-weight: 700;
        color: var(--text-title);
        display: block;
      }
      .quora-author-bio {
        font-size: 12px;
        color: var(--text-secondary);
        display: block;
      }
      .quora-post-date {
        font-size: 11px;
        color: var(--text-secondary);
        opacity: 0.7;
      }
      .quora-paragraph {
        font-size: 15.5px;
        line-height: 1.8;
        color: var(--text-primary);
        margin-bottom: 20px;
      }
      .quora-section-title {
        font-size: 16px;
        font-weight: 800;
        color: var(--text-title);
        margin: 36px 0 16px 0;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-family: ui-monospace, monospace;
        border-left: 3px solid #3b82f6;
        padding-left: 12px;
      }
      .quora-image-card {
        background-color: var(--bg-panel-inner);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        overflow: hidden;
        margin: 24px 0;
      }
      .quora-image-wrapper {
        position: relative;
        cursor: pointer;
        background-color: #05070a;
      }
      .quora-image {
        width: 100%;
        height: auto;
        display: block;
      }
      .quora-image-info {
        padding: 16px 20px;
        border-top: 1px solid var(--border-color);
      }
      .quora-image-caption {
        font-size: 13px;
        color: var(--text-secondary);
        font-style: italic;
        line-height: 1.5;
      }
      .quora-dalle-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        margin: 20px 0;
      }
      @media (min-width: 640px) {
        .quora-dalle-grid { grid-template-columns: repeat(2, 1fr); }
      }
      .quora-car-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 14px;
        margin: 20px 0;
      }
      @media (min-width: 768px) {
        .quora-car-grid { grid-template-columns: repeat(3, 1fr); }
      }
    `, 'ai-perspective-quora-styles');
  }
}

window.AiPerspectivePage = AiPerspectivePage;
