(() => {
  const state = {
    data: window.FRAMEWORKS_DATA,
    activeCategory: 'all',
    query: '',
    sort: 'default'
  };

  const el = {
    gallery: document.getElementById('gallery'),
    chips:   document.getElementById('filter-chips'),
    search:  document.getElementById('search-input'),
    empty:   document.getElementById('empty-state'),
    modal:   document.getElementById('modal'),
    body:    document.getElementById('modal-content')
  };

  const SPIKE_SVG = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0L9 7L16 8L9 9L8 16L7 9L0 8L7 7z" fill="currentColor"/></svg>`;

  const stars = (n) => {
    const filled = Math.max(0, Math.min(5, Math.round(n)));
    return (
      '<span class="star-fill">' + '★'.repeat(filled) + '</span>' +
      '<span class="star-empty">' + '★'.repeat(5 - filled) + '</span>'
    );
  };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, c =>
      ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  const cat = (id) =>
    state.data.categories.find(c => c.id === id) || { name: '', color: '#888' };

  const fw = (id) => state.data.frameworks.find(f => f.id === id);

  const catVar = (id) => `var(--cat-${id})`;

  const counts = () => {
    const m = {};
    state.data.frameworks.forEach(f => { m[f.category] = (m[f.category] || 0) + 1; });
    return m;
  };

  const setActiveChip = (catId) => {
    document.querySelectorAll('.chip').forEach(b =>
      b.setAttribute('aria-selected', b.dataset.cat === catId ? 'true' : 'false')
    );
  };

  const chipHTML = (cats) => cats.map(x => `
    <button class="chip" type="button" data-cat="${x.id}" aria-selected="false">
      <span class="chip-dot" style="background:${x.color}"></span>
      ${esc(x.name)}<span class="chip-count">${x.count}</span>
    </button>
  `).join('');

  const scrollOffset = () => window.innerWidth <= 768 ? 72 : 132;

  const bindChipClicks = (container, closeMobile) => {
    container.querySelectorAll('.chip[data-cat]').forEach(btn => {
      if (btn.dataset.cat === 'all') return;
      btn.addEventListener('click', () => {
        if (state.sort !== 'default') setSort('default');
        setActiveChip(btn.dataset.cat);
        const catId = btn.dataset.cat;
        if (closeMobile) {
          closeMobileMenu();
          setTimeout(() => {
            const target = document.getElementById('cat-' + catId);
            if (target) smoothScrollTo(target, scrollOffset());
          }, 300);
        } else {
          const target = document.getElementById('cat-' + catId);
          if (target) smoothScrollTo(target, scrollOffset());
        }
      });
    });
  };

  const renderChips = () => {
    const c = counts();
    const total = state.data.frameworks.length;
    const cats = state.data.categories.map(x => ({ ...x, count: c[x.id] || 0 }));
    const html = chipHTML(cats);
    el.chips.innerHTML = html;
    const mobileChips = document.getElementById('mobile-filter-chips');
    if (mobileChips) {
      const allHTML = `<button class="chip chip-all" type="button" data-cat="all" aria-selected="false">전체<span class="chip-count">${total}</span></button>`;
      mobileChips.innerHTML = allHTML + html;
      const allBtn = mobileChips.querySelector('[data-cat="all"]');
      if (allBtn) {
        allBtn.addEventListener('click', () => {
          document.querySelectorAll('.chip').forEach(b => b.setAttribute('aria-selected', 'false'));
          allBtn.setAttribute('aria-selected', 'true');
          closeMobileMenu();
          setTimeout(() => {
            const target = document.getElementById('library');
            if (target) smoothScrollTo(target, 72);
          }, 300);
        });
      }
    }
    const firstCat = cats[0] && cats[0].id;
    if (firstCat) setActiveChip(firstCat);
    bindChipClicks(el.chips, false);
    if (mobileChips) bindChipClicks(mobileChips, true);
  };

  let _spyObserver = null;
  const initScrollSpy = () => {
    if (_spyObserver) _spyObserver.disconnect();
    const sections = el.gallery.querySelectorAll('.cat-section');
    if (!sections.length) return;
    _spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const catId = entry.target.id.replace('cat-', '');
          setActiveChip(catId);
        }
      });
    }, { rootMargin: '-112px 0px -50% 0px', threshold: 0 });
    sections.forEach(s => _spyObserver.observe(s));
  };

  // sticky 헤더(top-nav 64px + filter ~76px) 보정 후 부드럽게 스크롤
  const smoothScrollTo = (target, offset = 132) => {
    const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const cardHTML = (f) => {
    const c = cat(f.category);
    const thumb = window.VIZ ? window.VIZ.thumb(f) : '';
    return `
      <button class="card" type="button" data-id="${f.id}"
              style="--cat-color:${catVar(f.category)}">
        <div class="card-thumb">
          <span class="card-num">${String(f.id).padStart(2,'0')}</span>
          ${thumb}
        </div>
        <div class="card-body">
          <span class="card-cat">${esc(c.name)}</span>
          <h3 class="card-title">${esc(f.name)}</h3>
          <div class="card-alt">${esc(f.altName || '')}</div>
          <p class="card-summary">${esc(f.summary)}</p>
          <div class="card-meta">
            <div class="meta-pair">
              <span class="meta-label">사용 빈도</span>
              <span class="stars" role="img" aria-label="5점 만점에 ${Math.round(f.frequency)}점">${stars(f.frequency)}</span>
            </div>
            <div class="meta-pair">
              <span class="meta-label">효과성</span>
              <span class="stars" role="img" aria-label="5점 만점에 ${Math.round(f.effectiveness)}점">${stars(f.effectiveness)}</span>
            </div>
          </div>
        </div>
      </button>
    `;
  };

  const matches = (f, q) => {
    if (!q) return true;
    const cName = cat(f.category).name;
    return [f.name, f.altName, f.summary, cName].join(' ').toLowerCase().includes(q);
  };

  const bindCardClicks = () => {
    el.gallery.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => openModal(Number(card.dataset.id)));
    });
  };

  const renderGallery = () => {
    const q = state.query.trim().toLowerCase();
    const cnts = counts();

    // 정렬 모드: 카테고리 섹션 대신 단일 랭킹 그리드
    if (state.sort !== 'default') {
      const key = state.sort;
      const items = state.data.frameworks
        .filter(f => matches(f, q))
        .slice()
        .sort((a, b) => (b[key] - a[key]) || (b.effectiveness - a.effectiveness) || (b.frequency - a.frequency) || (a.id - b.id));
      if (!items.length) { el.gallery.innerHTML = ''; el.empty.hidden = false; return; }
      el.empty.hidden = true;
      const label = key === 'frequency' ? '사용 빈도순' : '효과성순';
      el.gallery.innerHTML = `
        <section class="cat-section" id="cat-sorted">
          <div class="cat-head">
            <h3><span class="cat-dot" style="background:var(--primary)"></span>${label} 전체</h3>
            <span class="cat-count">${items.length}개${q ? ' 매칭' : ''}</span>
          </div>
          <div class="gallery">${items.map(cardHTML).join('')}</div>
        </section>`;
      bindCardClicks();
      return;
    }

    const sections = state.data.categories.map(c => {
      const items = state.data.frameworks
        .filter(f => f.category === c.id)
        .filter(f => matches(f, q));
      if (!items.length) return '';
      return `
        <section class="cat-section" id="cat-${c.id}" style="--cat-color:${catVar(c.id)}">
          <div class="cat-head">
            <h3><span class="cat-dot"></span>${esc(c.name)}</h3>
            <span class="cat-count">${items.length}개${q ? ` (전체 ${cnts[c.id] || 0}개 중 매칭)` : ''}</span>
          </div>
          <div class="gallery">${items.map(cardHTML).join('')}</div>
        </section>
      `;
    }).join('');

    if (!sections.trim()) {
      el.gallery.innerHTML = '';
      el.empty.hidden = false;
      return;
    }
    el.empty.hidden = true;
    el.gallery.innerHTML = sections;
    bindCardClicks();
  };

  const setSort = (sort) => {
    state.sort = sort;
    document.querySelectorAll('.sort-btn').forEach(b =>
      b.setAttribute('aria-pressed', b.dataset.sort === sort ? 'true' : 'false'));
    renderGallery();
    initScrollSpy();
  };

  const bindSort = () => {
    document.querySelectorAll('.sort-btn').forEach(btn => {
      btn.addEventListener('click', () => setSort(btn.dataset.sort));
    });
  };

  const bindHeroDemo = () => {
    document.querySelectorAll('.hero-demo-q[data-demo]').forEach(btn => {
      btn.addEventListener('click', () => openModal(Number(btn.dataset.demo)));
    });
  };

  const renderList = (arr) => arr.map(s => `<li>${esc(s)}</li>`).join('');

  const openModal = (id) => {
    const f = fw(id);
    if (!f) return;
    const c = cat(f.category);
    const fullViz = window.VIZ ? window.VIZ.full(f) : '';
    const related = (f.related || []).map(rid => {
      const r = fw(rid);
      return r ? `<a data-related="${r.id}">${esc(r.name)}</a>` : '';
    }).join('');

    el.body.innerHTML = `
      <div class="m-layout" style="--cat-color:${catVar(f.category)}">
        <section class="m-stage">
          ${fullViz}
        </section>
        <aside class="m-side">
          <div class="m-cat-row">
            <span class="cat-dot"></span>
            ${esc(c.name)} · ${String(f.id).padStart(2,'0')}번
          </div>
          <h2 class="m-title">${esc(f.name)}</h2>
          <p class="m-alt">${esc(f.altName || '')}</p>

          <div class="m-ratings">
            <div class="m-rating-item">
              <span class="m-rating-label">사용 빈도</span>
              <span class="stars" role="img" aria-label="5점 만점에 ${Math.round(f.frequency)}점">${stars(f.frequency)}</span>
            </div>
            <div class="m-rating-item">
              <span class="m-rating-label">효과성</span>
              <span class="stars" role="img" aria-label="5점 만점에 ${Math.round(f.effectiveness)}점">${stars(f.effectiveness)}</span>
            </div>
          </div>

          <div class="m-section">
            <h3>개요</h3>
            <p>${esc(f.overview)}</p>
          </div>

          <div class="m-section">
            <h3>언제 쓰는가</h3>
            <ul>${renderList(f.whenToUse)}</ul>
          </div>

          <div class="m-section">
            <h3>구성 요소</h3>
            <ul>${renderList(f.components)}</ul>
          </div>

          <div class="m-section">
            <h3>사용 절차</h3>
            <ul>${renderList(f.steps)}</ul>
          </div>

          <div class="m-section example">
            <h3>실전 예시</h3>
            <p>${esc(f.example)}</p>
          </div>

          <div class="m-section">
            <h3>한계와 주의점</h3>
            <ul>${renderList(f.limitations)}</ul>
          </div>

          ${related ? `
            <div class="m-section">
              <h3>관련 도구</h3>
              <div class="m-related">${related}</div>
            </div>
          ` : ''}
        </aside>
      </div>
    `;

    el.body.querySelectorAll('[data-related]').forEach(a => {
      a.setAttribute('tabindex', '0');
      a.setAttribute('role', 'link');
      const go = () => {
        openModal(Number(a.dataset.related));
        const side = el.body.querySelector('.m-side');
        if (side) side.scrollTop = 0;
      };
      a.addEventListener('click', e => { e.preventDefault(); go(); });
      a.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });

    // 시각화 요소를 키보드 포커스 + 스크린리더로 접근 가능하게
    el.body.querySelectorAll('.viz-svg [data-tip]').forEach(g => {
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'img');
      const t = g.getAttribute('data-tip-title') || '';
      const d = g.getAttribute('data-tip') || '';
      g.setAttribute('aria-label', (t ? t + '. ' : '') + d);
    });

    el.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  };

  const closeModal = () => {
    el.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  };

  const bindModal = () => {
    el.modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && el.modal.getAttribute('aria-hidden') === 'false') closeModal();
    });
  };
  const bindSearch = () => {
    el.search.addEventListener('input', e => {
      state.query = e.target.value;
      renderGallery();
      initScrollSpy();
    });
  };

  /* ----- Tooltip ----- */
  const tooltip = (() => {
    const node = document.createElement('div');
    node.className = 'fw-tooltip';
    node.setAttribute('role', 'tooltip');
    document.body.appendChild(node);

    let visible = false;
    const show = (html) => {
      node.innerHTML = html;
      node.classList.add('visible');
      visible = true;
    };
    const hide = () => {
      node.classList.remove('visible');
      node.style.transform = 'translate(-9999px, -9999px)';
      visible = false;
    };
    const move = (x, y) => {
      const pad = 16;
      const tw = node.offsetWidth || 240;
      const th = node.offsetHeight || 60;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let nx = x + pad;
      let ny = y + pad;
      if (nx + tw > vw - 8) nx = x - tw - pad;
      if (ny + th > vh - 8) ny = y - th - pad;
      node.style.transform = `translate(${nx}px, ${ny}px)`;
    };

    const tipHTML = (tgt) => {
      const title = tgt.dataset.tipTitle || '';
      const body = tgt.dataset.tip || '';
      const sub  = tgt.dataset.tipSub || '';
      return (title ? `<strong>${title}</strong>` : '') + body + (sub ? `<em>${sub}</em>` : '');
    };
    document.addEventListener('mouseover', (e) => {
      const tgt = e.target.closest && e.target.closest('[data-tip]');
      if (!tgt) return;
      show(tipHTML(tgt));
      move(e.clientX, e.clientY);
    });
    // 키보드 포커스로도 툴팁 표시 (접근성)
    document.addEventListener('focusin', (e) => {
      const tgt = e.target.closest && e.target.closest('[data-tip]');
      if (!tgt) return;
      show(tipHTML(tgt));
      const r = tgt.getBoundingClientRect();
      move(r.left + r.width / 2, r.top + r.height / 2);
    });
    document.addEventListener('focusout', (e) => {
      const tgt = e.target.closest && e.target.closest('[data-tip]');
      if (tgt) hide();
    });
    document.addEventListener('mousemove', (e) => {
      if (!visible) return;
      move(e.clientX, e.clientY);
    });
    document.addEventListener('mouseout', (e) => {
      const tgt = e.target.closest && e.target.closest('[data-tip]');
      if (!tgt) return;
      const next = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-tip]');
      if (next === tgt) return;
      hide();
    });
    document.addEventListener('scroll', hide, { passive: true });
    return { show, hide, move };
  })();

  const toggleTheme = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const initTheme = () => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    const mobileToggle = document.getElementById('theme-toggle-mobile');
    if (mobileToggle) mobileToggle.addEventListener('click', toggleTheme);
  };

  const closeMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    const btn  = document.getElementById('hamburger');
    if (!menu) return;
    menu.setAttribute('aria-hidden', 'true');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  };

  const initMobileMenu = () => {
    const btn  = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    const mSearch = document.getElementById('mobile-search');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const open = menu.getAttribute('aria-hidden') === 'false';
      menu.setAttribute('aria-hidden', open ? 'true' : 'false');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    if (mSearch) {
      mSearch.addEventListener('input', e => {
        state.query = e.target.value;
        el.search.value = e.target.value;
        renderGallery();
        initScrollSpy();
      });
    }

    document.addEventListener('click', e => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        closeMobileMenu();
      }
    });
  };

  const bindFooterLinks = () => {
    document.querySelectorAll('[data-scroll-cat]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById('cat-' + a.dataset.scrollCat);
        if (target) smoothScrollTo(target);
      });
    });
  };

  const init = () => {
    if (!state.data) {
      el.gallery.innerHTML = '<p style="padding:24px;color:#c00">데이터가 로드되지 않았습니다.</p>';
      return;
    }
    initTheme();
    renderChips();
    renderGallery();
    initScrollSpy();
    bindModal();
    bindSearch();
    bindSort();
    bindHeroDemo();
    bindFooterLinks();
    initMobileMenu();
  };

  init();
})();
