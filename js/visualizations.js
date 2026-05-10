/**
 * 16개 프레임워크 시각 템플릿 (SVG)
 * Editorial palette — cream paper + warm ink + coral accent.
 *
 *  thumb(): 갤러리 카드용 (구조만, 텍스트 최소)
 *  full():  모달용 (라벨 + 모든 영역에 hover 툴팁)
 *
 * 모든 의미 있는 영역에 data-tip-title + data-tip 부여
 * (글로벌 툴팁 시스템이 app.js에서 자동으로 표시)
 */
window.VIZ = (() => {
  const INK = '#141413';
  const BODY = '#3d3d3a';
  const MUTED = '#6c6a64';
  const MUTED_SOFT = '#8e8b82';
  const HAIRLINE = '#e6dfd8';
  const PAPER = '#faf9f5';
  const CARD = '#efe9de';
  const CREAM_STR = '#e8e0d2';
  const PRIMARY = '#cc785c';
  const PRIMARY_SOFT = '#f0d4c8';
  const AMBER = '#e8a55a';
  const AMBER_SOFT = '#fbe5c2';
  const TEAL = '#5db8a6';
  const DARK = '#181715';
  const ON_DARK = '#faf9f5';

  // SVG 안전 escape
  const a = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ============================================================
     1. BMC — 9블록 표준 캔버스
     ============================================================ */
  const bmcThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <g fill="${CARD}" stroke="${INK}" stroke-width="1.2">
        <rect x="20" y="20"  width="48" height="92"/>
        <rect x="68" y="20"  width="48" height="46"/>
        <rect x="68" y="66"  width="48" height="46"/>
        <rect x="116" y="20" width="48" height="92" fill="${PRIMARY_SOFT}"/>
        <rect x="164" y="20" width="48" height="46"/>
        <rect x="164" y="66" width="48" height="46"/>
        <rect x="212" y="20" width="48" height="92"/>
        <rect x="20" y="112" width="120" height="48"/>
        <rect x="140" y="112" width="120" height="48"/>
      </g>
    </svg>`;

  const bmcFull = () => {
    const cell = (x, y, w, h, num, ko, en, tip, hi) => `
      <g data-tip-title="${a(ko)} (${a(en)})" data-tip="${a(tip)}">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${hi ? PRIMARY_SOFT : PAPER}" stroke="${INK}" stroke-width="1.2"/>
        <text x="${x + w - 14}" y="${y + 22}" text-anchor="end" font-size="10" font-weight="500" letter-spacing="0.08em" fill="${MUTED}">${String(num).padStart(2, '0')}</text>
        <text x="${x + 14}" y="${y + 30}" font-size="14" font-weight="600" fill="${INK}">${ko}</text>
        <text x="${x + 14}" y="${y + 48}" font-size="11" fill="${MUTED}">${en}</text>
      </g>`;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        ${cell(20,  20, 140, 240, 8, '핵심 파트너', 'Key Partners',         '사업 운영을 위해 필요한 외부 파트너와 공급사. 협력으로 자원·역량을 확보합니다.')}
        ${cell(160, 20, 140, 120, 7, '핵심 활동',   'Key Activities',       '가치 제공을 위해 반드시 수행해야 하는 활동. 제조·서비스·플랫폼 운영 등.')}
        ${cell(160,140, 140, 120, 6, '핵심 자원',   'Key Resources',        '가치 제공에 필수적인 자원. 사람·시설·IP·데이터 등.')}
        ${cell(300, 20, 140, 240, 2, '가치 제안',   'Value Propositions',   '고객이 우리를 선택해야 하는 이유. 사업의 심장이며 다른 8블록의 기준입니다.', true)}
        ${cell(440, 20, 140, 120, 4, '고객 관계',   'Customer Relationships','고객과 어떤 방식으로 관계를 유지할 것인가. 셀프 서비스·전담 매니저·커뮤니티 등.')}
        ${cell(440,140, 140, 120, 3, '채널',        'Channels',             '고객에게 가치를 전달하는 경로. 직판·온라인·파트너 등.')}
        ${cell(580, 20, 160, 240, 1, '고객 세그먼트','Customer Segments',   '누구의 어떤 문제를 푸는가. 시장을 의미 단위로 쪼개 표적을 정합니다.')}
        ${cell(20, 260, 360, 100, 9, '비용 구조',   'Cost Structure',       '사업 운영에 드는 비용. 고정비·변동비·규모의 경제·범위의 경제.')}
        ${cell(380,260, 360, 100, 5, '수익원',      'Revenue Streams',      '어떤 형태로 매출이 발생하는가. 판매·구독·수수료·라이선스 등.')}
      </svg>
      <div class="viz-caption">9블록 캔버스 · 번호는 표준 작성 순서입니다</div>
    </div>`;
  };

  /* ============================================================
     2. 이익 방정식
     ============================================================ */
  const profitThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <text x="140" y="48" text-anchor="middle" font-style="italic" font-size="22" fill="${INK}">π = (P − V)·Q − F</text>
      <line x1="140" y1="62" x2="140" y2="86" stroke="${INK}" stroke-width="1"/>
      <line x1="46" y1="86" x2="234" y2="86" stroke="${INK}" stroke-width="1"/>
      ${[['P', 46, PRIMARY], ['V', 110, INK], ['Q', 174, AMBER], ['F', 234, MUTED]].map(([l, x, c]) => `
        <line x1="${x}" y1="86" x2="${x}" y2="100" stroke="${INK}" stroke-width="1"/>
        <rect x="${x - 22}" y="100" width="44" height="32" rx="4" fill="${PAPER}" stroke="${c}" stroke-width="1.5"/>
        <text x="${x}" y="121" text-anchor="middle" font-size="16" fill="${c}">${l}</text>
      `).join('')}
    </svg>`;

  const profitFull = () => {
    const branch = (x, color, fillBg, emphasized, letter, koName, enName, tip, dir, dirSign, items) => {
      const cx = x + 82.5;
      const stroke = emphasized ? '1.5' : '1';
      return `
      <g data-tip-title="${a(letter)} · ${a(koName)} (${a(enName)})" data-tip="${a(tip)}">
        <line x1="${cx}" y1="110" x2="${cx}" y2="138" stroke="${INK}" stroke-width="1"/>
        <rect x="${x}" y="138" width="165" height="208" rx="10" fill="${fillBg}" stroke="${color}" stroke-width="${stroke}"/>
        <rect x="${x + 14}" y="154" width="42" height="42" rx="8" fill="${color}"/>
        <text x="${x + 35}" y="184" text-anchor="middle" font-size="24" font-weight="700" fill="${ON_DARK}">${letter}</text>
        <text x="${x + 66}" y="172" font-size="14" font-weight="700" fill="${INK}">${koName}</text>
        <text x="${x + 66}" y="188" font-size="9.5" letter-spacing="0.08em" fill="${MUTED}">${enName.toUpperCase()}</text>
        <rect x="${x + 14}" y="212" width="70" height="22" rx="11" fill="${PAPER}" stroke="${color}" stroke-width="1"/>
        <text x="${x + 49}" y="227" text-anchor="middle" font-size="11" font-weight="600" fill="${color}">${dirSign} ${dir}</text>
        <line x1="${x + 14}" y1="252" x2="${x + 151}" y2="252" stroke="${HAIRLINE}" stroke-width="1"/>
        ${items.map((t, i) => `
          <circle cx="${x + 22}" cy="${274 + i * 22}" r="1.8" fill="${color}"/>
          <text x="${x + 32}" y="${278 + i * 22}" font-size="12" fill="${BODY}">${t}</text>
        `).join('')}
      </g>`;
    };
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        <g data-tip-title="이익 방정식" data-tip="이익(π)은 4개 변수가 결정합니다. 가격에서 변동비를 뺀 공헌이익(P−V)에 수량(Q)을 곱하고, 고정비(F)를 빼서 산출합니다.">
          <rect x="180" y="20" width="400" height="64" rx="10" fill="${DARK}"/>
          <text x="380" y="62" text-anchor="middle" font-style="italic" font-size="30" fill="${ON_DARK}">π = (P − V) · Q − F</text>
        </g>
        <line x1="380" y1="84" x2="380" y2="110" stroke="${INK}" stroke-width="1"/>
        <line x1="102.5" y1="110" x2="657.5" y2="110" stroke="${INK}" stroke-width="1"/>
        ${branch(20,  PRIMARY, PRIMARY_SOFT, true, 'P', '가격', 'Price',
          '단위당 판매 가격입니다. 1% 인상이 가장 큰 이익 효과를 내는 경우가 많지만, 수요 탄력성과 함께 보아야 합니다.',
          '인상', '↑',
          ['프리미엄 라인', '번들·옵션', '가격 차별화'])}
        ${branch(205, INK, PAPER, false, 'V', '변동비', 'Variable Cost',
          '판매량에 비례해 발생하는 비용입니다. 원자재, 공정비, 외주비 등이 해당하며, 절감 시 공헌이익이 직접 늘어납니다.',
          '절감', '↓',
          ['원자재 협상', '공정 효율', '외주 재구성'])}
        ${branch(390, AMBER, AMBER_SOFT, true, 'Q', '수량', 'Quantity',
          '판매 수량입니다. 신규 채널, 전환율 개선, 재구매 유도로 늘립니다. 단, 수량 증가에 비례해 변동비도 늘어납니다.',
          '증대', '↑',
          ['신규 채널', '전환율 개선', '재구매 유도'])}
        ${branch(575, INK, PAPER, false, 'F', '고정비', 'Fixed Cost',
          '판매량과 무관하게 발생하는 비용입니다. 인건비, 시설, 시스템 유지비. 한 번 줄이면 매 기간 누적 효과가 큽니다.',
          '절감', '↓',
          ['인건비 효율', '시설·임대', '시스템 통합'])}
      </svg>
      <div class="viz-caption">4개 변수 중 어떤 레버를 움직일지 정량으로 진단합니다</div>
    </div>`;
  };

  /* ============================================================
     3. 수익 모델
     ============================================================ */
  const REV = [
    { l: '구독', en: 'Subscription', tip: '정기 결제로 반복 매출이 발생합니다. 예측 가능성이 높고 LTV 계산이 쉽습니다. 예: Netflix, Spotify' },
    { l: '거래', en: 'Transaction',  tip: '거래액의 일정 비율을 수수료로 수취합니다. 거래량이 늘면 자동으로 매출도 늘어납니다. 예: 토스, 쿠팡' },
    { l: '광고', en: 'Advertising',  tip: '트래픽이나 노출을 광고주에게 판매합니다. 사용자에게는 무료지만 데이터·시간이 자원입니다. 예: Google, Meta' },
    { l: '라이선스', en: 'Licensing', tip: '특허·기술·콘텐츠 IP의 사용권을 판매합니다. 한 번 만들고 반복 수취가 가능합니다. 예: ARM, Disney' },
    { l: '프리미엄', en: 'Freemium', tip: '무료 사용자 풀을 키우고 일부를 유료로 전환합니다. 전환율이 핵심 지표입니다. 예: Notion, Slack' },
    { l: '판매', en: 'Sales',        tip: '제품·서비스를 일회성으로 직접 판매합니다. 가장 전통적인 모델이며 마진과 회전율이 핵심입니다.' }
  ];
  const revThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${REV.map((t, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const x = 18 + col * 84, y = 20 + row * 76;
        return `
          <rect x="${x}" y="${y}" width="76" height="68" rx="4" fill="${PAPER}" stroke="${INK}" stroke-width="1"/>
          <circle cx="${x + 18}" cy="${y + 22}" r="7" fill="${PRIMARY}"/>
          <text x="${x + 32}" y="${y + 26}" font-size="11" font-weight="600" fill="${INK}">${t.l}</text>`;
      }).join('')}
    </svg>`;
  const revFull = () => `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        ${REV.map((t, i) => {
          const col = i % 3, row = Math.floor(i / 3);
          const x = 20 + col * 246, y = 20 + row * 174;
          return `
            <g data-tip-title="${a(t.l)} (${a(t.en)})" data-tip="${a(t.tip)}">
              <rect x="${x}" y="${y}" width="226" height="154" rx="8" fill="${PAPER}" stroke="${INK}" stroke-width="1"/>
              <line x1="${x}" y1="${y + 60}" x2="${x + 226}" y2="${y + 60}" stroke="${HAIRLINE}" stroke-width="1"/>
              <circle cx="${x + 32}" cy="${y + 32}" r="10" fill="${PRIMARY}"/>
              <text x="${x + 52}" y="${y + 38}" font-size="20" font-weight="700" fill="${INK}">${t.l}</text>
              <text x="${x + 24}" y="${y + 88}" font-size="11" letter-spacing="0.08em" fill="${MUTED}">${t.en.toUpperCase()}</text>
              <text x="${x + 24}" y="${y + 116}" font-size="13" fill="${BODY}">대표 패턴 · 단가와 주기를 결정</text>
            </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">Payer, Pricing 단위, 결제 주기, 수익화 시점을 조합해 모델을 결정합니다</div>
    </div>`;

  /* ============================================================
     4. 3C — 3원 Venn
     ============================================================ */
  const tcThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <g fill="${PRIMARY}" fill-opacity="0.32" stroke="${PRIMARY}" stroke-width="1.5">
        <circle cx="140" cy="58" r="46"/>
        <circle cx="100" cy="118" r="46"/>
        <circle cx="180" cy="118" r="46"/>
      </g>
      <g font-size="13" font-weight="600" fill="${INK}" text-anchor="middle">
        <text x="140" y="34">Customer</text>
        <text x="76"  y="148">Competitor</text>
        <text x="204" y="148">Company</text>
      </g>
    </svg>`;
  const tcFull = () => `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 460" xmlns="http://www.w3.org/2000/svg">
        <g data-tip-title="Customer · 고객" data-tip="시장 규모, 성장 속도, 세그먼트 구분, 니즈 변화. 누구의 어떤 문제를 푸는지 정의합니다.">
          <circle cx="380" cy="170" r="135" fill="${PRIMARY}" fill-opacity="0.28" stroke="${PRIMARY}" stroke-width="2"/>
        </g>
        <g data-tip-title="Competitor · 경쟁자" data-tip="직간접 경쟁자의 점유율, 전략, 강점과 약점을 분석합니다. 경쟁사가 못 채우는 빈틈을 찾는 것이 핵심입니다.">
          <circle cx="285" cy="305" r="135" fill="${PRIMARY}" fill-opacity="0.28" stroke="${PRIMARY}" stroke-width="2"/>
        </g>
        <g data-tip-title="Company · 자사" data-tip="자사의 자원, 역량, 강점과 약점, 재무 상태를 점검합니다. 무엇을 줄 수 있고 무엇이 부족한지 솔직히 정리합니다.">
          <circle cx="475" cy="305" r="135" fill="${PRIMARY}" fill-opacity="0.28" stroke="${PRIMARY}" stroke-width="2"/>
        </g>
        <g text-anchor="middle" pointer-events="none">
          <text x="380" y="78"  font-size="24" font-weight="700" fill="${INK}">Customer</text>
          <text x="380" y="100" font-size="12" letter-spacing="0.08em" fill="${MUTED}">고객 · 시장 · 니즈</text>
          <text x="200" y="370" font-size="24" font-weight="700" fill="${INK}">Competitor</text>
          <text x="200" y="392" font-size="12" letter-spacing="0.08em" fill="${MUTED}">경쟁자 · 점유 · 전략</text>
          <text x="560" y="370" font-size="24" font-weight="700" fill="${INK}">Company</text>
          <text x="560" y="392" font-size="12" letter-spacing="0.08em" fill="${MUTED}">자사 · 자원 · 역량</text>
        </g>
        <g data-tip-title="KSF · 핵심 성공 요인" data-tip="고객이 원하면서, 경쟁사는 못 주고, 자사는 줄 수 있는 영역. 이 교집합이 전략의 출발점입니다.">
          <circle cx="380" cy="270" r="42" fill="${PRIMARY}" fill-opacity="0" stroke="${PRIMARY}" stroke-width="0"/>
          <text x="380" y="262" text-anchor="middle" font-size="20" font-weight="700" fill="${PRIMARY}">KSF</text>
          <text x="380" y="284" text-anchor="middle" font-size="12" fill="${INK}" opacity="0.7">핵심 성공 요인</text>
        </g>
      </svg>
      <div class="viz-caption">세 원의 교집합에서 핵심 성공 요인(KSF)을 도출합니다</div>
    </div>`;

  /* ============================================================
     5. SWOT — 2×2
     ============================================================ */
  const swotThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="${INK}" stroke-width="1.2">
        <rect x="40"  y="30" width="100" height="60" fill="${PRIMARY_SOFT}"/>
        <rect x="140" y="30" width="100" height="60" fill="${CARD}"/>
        <rect x="40"  y="90" width="100" height="60" fill="${CARD}"/>
        <rect x="140" y="90" width="100" height="60" fill="${CREAM_STR}"/>
      </g>
      <g font-size="22" font-weight="700" text-anchor="middle" fill="${INK}">
        <text x="90"  y="68">S</text>
        <text x="190" y="68">W</text>
        <text x="90"  y="128">O</text>
        <text x="190" y="128">T</text>
      </g>
    </svg>`;
  const swotFull = () => {
    const cell = (x, y, fill, letter, name, ko, axis, tip) => `
      <g data-tip-title="${a(letter)} · ${a(name)} (${a(ko)})" data-tip="${a(tip)}">
        <rect x="${x}" y="${y}" width="320" height="150" fill="${fill}" stroke="${INK}" stroke-width="1"/>
        <text x="${x + 24}" y="${y + 76}" font-size="56" font-weight="700" fill="${INK}">${letter}</text>
        <text x="${x + 86}" y="${y + 50}" font-size="20" font-weight="600" fill="${INK}">${name}</text>
        <text x="${x + 86}" y="${y + 70}" font-size="13" fill="${BODY}">${ko}</text>
        <text x="${x + 86}" y="${y + 94}" font-size="11" letter-spacing="0.12em" fill="${MUTED}">${axis}</text>
      </g>`;
    const tact = (x, l, t, tip) => `
      <g data-tip-title="${a(l)} 전략" data-tip="${a(tip)}">
        <rect x="${x}" y="340" width="156" height="70" rx="6" fill="${PAPER}" stroke="${PRIMARY}" stroke-width="1.5"/>
        <text x="${x + 78}" y="370" text-anchor="middle" font-size="22" font-weight="700" fill="${PRIMARY}">${l}</text>
        <text x="${x + 78}" y="392" text-anchor="middle" font-size="11" fill="${MUTED}">${t}</text>
      </g>`;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 460" xmlns="http://www.w3.org/2000/svg">
        ${cell(60,  20, PRIMARY_SOFT, 'S', 'Strengths',     '강점', '내부 · 긍정',
          '자사가 잘하는 것. 자원, 브랜드, 기술, 인재 등 경쟁사 대비 우위를 점하는 영역.')}
        ${cell(380, 20, CARD,         'W', 'Weaknesses',    '약점', '내부 · 부정',
          '자사가 부족한 것. 자본·역량·브랜드 인지도 등 경쟁사 대비 열위인 영역.')}
        ${cell(60, 170, CARD,         'O', 'Opportunities', '기회', '외부 · 긍정',
          '시장과 환경이 우리에게 유리하게 변하는 흐름. 규제 완화, 신기술, 새로운 고객 니즈 등.')}
        ${cell(380,170, CREAM_STR,    'T', 'Threats',       '위협', '외부 · 부정',
          '시장과 환경의 위협. 신규 진입자, 규제 강화, 대체재 출현, 수요 위축 등.')}
        ${tact(60,  'SO', '강점 × 기회로 공격',
          '강점과 기회가 맞물리는 영역. 자원 집중으로 시장을 적극 확장하는 가장 강력한 전략.')}
        ${tact(224, 'WO', '약점 보완 · 기회 활용',
          '기회는 보이지만 약점 때문에 못 잡는 상황. 약점을 보완하거나 외부 자원으로 메워 기회를 잡습니다.')}
        ${tact(388, 'ST', '강점으로 위협 방어',
          '강점을 활용해 위협을 무력화합니다. 차별화나 진입 장벽 강화가 대표적입니다.')}
        ${tact(552, 'WT', '최악 시나리오 회피',
          '약점과 위협이 겹치는 위험 영역. 사업 축소, 철수, 제휴 등 방어적 선택을 검토합니다.')}
      </svg>
      <div class="viz-caption">4분면을 채운 뒤 SO/WO/ST/WT 4교차 전략까지 만듭니다</div>
    </div>`;
  };

  /* ============================================================
     6. 5 Forces
     ============================================================ */
  const fivefThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="${INK}" stroke-width="1.2" fill="${PAPER}">
        <rect x="110" y="20"  width="60" height="36" rx="4"/>
        <rect x="110" y="124" width="60" height="36" rx="4"/>
        <rect x="20"  y="72"  width="60" height="36" rx="4"/>
        <rect x="200" y="72"  width="60" height="36" rx="4"/>
      </g>
      <rect x="100" y="65" width="80" height="50" rx="6" fill="${PRIMARY}" stroke="${PRIMARY}"/>
      <g stroke="${PRIMARY}" stroke-width="2" fill="none">
        <path d="M140 56 L140 65"/>
        <path d="M140 124 L140 115"/>
        <path d="M80 90 L100 90"/>
        <path d="M200 90 L180 90"/>
      </g>
    </svg>`;
  const fivefFull = () => {
    const force = (x, y, w, h, ko, en, tip) => `
      <g data-tip-title="${a(ko)} (${a(en)})" data-tip="${a(tip)}">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${PAPER}" stroke="${INK}" stroke-width="1.2"/>
        <text x="${x + w/2}" y="${y + h/2 - 6}" text-anchor="middle" font-size="17" font-weight="600" fill="${INK}">${ko}</text>
        <text x="${x + w/2}" y="${y + h/2 + 14}" text-anchor="middle" font-size="11" fill="${MUTED}">${en}</text>
      </g>`;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 460" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="ft-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <polygon points="0,0 10,5 0,10" fill="${PRIMARY}"/>
          </marker>
        </defs>
        ${force(280, 20,  200, 80, '신규 진입자의 위협', '새로운 사업자가 시장에 진입할 가능성',
          '진입 장벽이 낮으면 위협이 큽니다. 자본 요구, 규제, 브랜드 충성도, 규모의 경제가 진입 장벽을 결정합니다.')}
        ${force(280, 360, 200, 80, '대체재의 위협', '다른 방식으로 같은 가치를 제공',
          '직접 경쟁자가 아니어도 같은 니즈를 채우면 위협입니다. 예: 항공의 대체재는 KTX와 화상회의입니다.')}
        ${force(20,  190, 200, 80, '공급자 협상력', '원자재·부품·인력 공급자',
          '공급자가 소수이거나 핵심 자원을 가지면 협상력이 큽니다. 단가 인상 압박과 품질 통제력에 영향을 줍니다.')}
        ${force(540, 190, 200, 80, '구매자 협상력', '고객의 가격·조건 압박',
          '구매자가 대량 구매하거나 대안이 많으면 협상력이 큽니다. 가격 인하 압박과 수익성에 직결됩니다.')}
        <g data-tip-title="기존 경쟁 강도 (Competitive Rivalry)" data-tip="산업 내 경쟁사들 사이의 경쟁 격렬함입니다. 다른 4가지 힘이 강할수록 이 중심도 강해지며, 산업의 장기 수익성을 결정합니다.">
          <rect x="270" y="170" width="220" height="120" rx="10" fill="${PRIMARY}"/>
          <text x="380" y="220" text-anchor="middle" font-size="22" font-weight="700" fill="${ON_DARK}">기존 경쟁 강도</text>
          <text x="380" y="244" text-anchor="middle" font-size="12" fill="${ON_DARK}" opacity="0.78">중심 · 산업 내 경쟁</text>
          <text x="380" y="266" text-anchor="middle" font-size="11" fill="${ON_DARK}" opacity="0.55">다른 4가지 힘이 모이는 곳</text>
        </g>
        <g stroke="${PRIMARY}" stroke-width="2.5" fill="none" pointer-events="none">
          <path d="M380 100 L380 168" marker-end="url(#ft-arrow)"/>
          <path d="M380 360 L380 292" marker-end="url(#ft-arrow)"/>
          <path d="M220 230 L268 230" marker-end="url(#ft-arrow)"/>
          <path d="M540 230 L492 230" marker-end="url(#ft-arrow)"/>
        </g>
      </svg>
      <div class="viz-caption">5가지 힘이 강할수록 산업 매력도(장기 수익성)는 낮아집니다</div>
    </div>`;
  };

  /* ============================================================
     7. PESTEL
     ============================================================ */
  const PESTEL = [
    { l: 'P', en: 'Political',     ko: '정치 · 규제',     tip: '정부 정책, 규제 변화, 정치적 안정성, 세금 제도 등. 규제 산업(금융·의료·통신)에서 특히 중요합니다.' },
    { l: 'E', en: 'Economic',      ko: '경제 · 금리',     tip: '경제 성장률, 금리, 환율, 인플레이션, 소비 심리. 사업 수요와 비용 구조에 직접 영향을 줍니다.' },
    { l: 'S', en: 'Social',        ko: '인구 · 문화',     tip: '인구 구조, 라이프스타일, 가치관, 소비 트렌드. 장기적으로 시장 자체를 만들거나 사라지게 하는 힘입니다.' },
    { l: 'T', en: 'Technological', ko: '기술 · 디지털',   tip: '신기술, 디지털화, R&D 동향. 산업의 게임 룰을 통째로 바꾸는 가장 빠른 변수입니다.' },
    { l: 'E', en: 'Environmental', ko: '환경 · ESG',      tip: '기후 변화, 환경 규제, ESG 요구. 제조·에너지·운송 산업에서 비용과 평판에 영향을 미칩니다.' },
    { l: 'L', en: 'Legal',         ko: '법 · 노동',       tip: '법, 소송, 노동법, 지식재산권. 사업 모델 자체의 합법성을 결정합니다.' }
  ];
  const pestelThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${PESTEL.map((it, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const x = 30 + col * 80, y = 28 + row * 70;
        return `
          <rect x="${x}" y="${y}" width="64" height="56" rx="4" fill="${PAPER}" stroke="${INK}" stroke-width="1"/>
          <text x="${x + 32}" y="${y + 32}" text-anchor="middle" font-size="22" font-weight="700" fill="${PRIMARY}">${it.l}</text>
          <text x="${x + 32}" y="${y + 48}" text-anchor="middle" font-size="9" fill="${MUTED}">${it.en.slice(0,7)}</text>`;
      }).join('')}
    </svg>`;
  const pestelFull = () => `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        ${PESTEL.map((it, i) => {
          const col = i % 3, row = Math.floor(i / 3);
          const x = 20 + col * 246, y = 20 + row * 174;
          return `
            <g data-tip-title="${a(it.l)} · ${a(it.en)} (${a(it.ko)})" data-tip="${a(it.tip)}">
              <rect x="${x}" y="${y}" width="226" height="154" rx="8" fill="${PAPER}" stroke="${INK}" stroke-width="1"/>
              <rect x="${x}" y="${y}" width="4" height="154" fill="${PRIMARY}"/>
              <text x="${x + 24}" y="${y + 60}" font-size="44" font-weight="700" fill="${PRIMARY}">${it.l}</text>
              <text x="${x + 80}" y="${y + 42}" font-size="18" font-weight="600" fill="${INK}">${it.ko}</text>
              <text x="${x + 80}" y="${y + 60}" font-size="12" fill="${MUTED}">${it.en}</text>
              <line x1="${x + 24}" y1="${y + 92}" x2="${x + 200}" y2="${y + 92}" stroke="${HAIRLINE}"/>
              <text x="${x + 24}" y="${y + 116}" font-size="11" fill="${MUTED}">변화 요인 · 영향력 평가</text>
            </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">6개 거시 변수의 영향력을 평가해 핵심 3~5개로 압축합니다</div>
    </div>`;

  /* ============================================================
     8. 4P
     ============================================================ */
  const FOURP = [
    { l: 'Product',   ko: '제품 · 품질 · 라인업', tip: '고객에게 무엇을 줄 것인가. 제품 사양, 품질, 디자인, 브랜드, 라인업 구성. 4P의 출발점입니다.' },
    { l: 'Price',     ko: '가격 · 할인 · 결제',    tip: '얼마에, 어떻게 받을 것인가. 가격 책정, 할인 정책, 결제 조건, 가격 차별화 전략.' },
    { l: 'Place',     ko: '유통 · 매장 · 온라인',   tip: '어디서 살 수 있게 할 것인가. 유통 채널, 매장, 온라인, 물류와 배송 네트워크.' },
    { l: 'Promotion', ko: '광고 · PR · 세일즈',     tip: '어떻게 알리고 설득할 것인가. 광고, PR, 프로모션, 디지털 마케팅, 세일즈 활동.' }
  ];
  const fourpThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="${INK}" stroke-width="1.2" fill="${PAPER}">
        <rect x="40"  y="20"  width="80" height="64" rx="4"/>
        <rect x="160" y="20"  width="80" height="64" rx="4"/>
        <rect x="40"  y="96"  width="80" height="64" rx="4"/>
        <rect x="160" y="96"  width="80" height="64" rx="4"/>
      </g>
      <circle cx="140" cy="90" r="22" fill="${PRIMARY}" stroke="${INK}" stroke-width="1.2"/>
      <text x="140" y="94" text-anchor="middle" font-size="10" font-weight="600" fill="${ON_DARK}">Target</text>
      <g font-size="14" font-weight="700" fill="${INK}" text-anchor="middle">
        <text x="80"  y="58">P</text>
        <text x="200" y="58">P</text>
        <text x="80"  y="134">P</text>
        <text x="200" y="134">P</text>
      </g>
    </svg>`;
  const fourpFull = () => `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 460" xmlns="http://www.w3.org/2000/svg">
        ${FOURP.map((p, i) => {
          const col = i % 2, row = Math.floor(i / 2);
          const x = 60 + col * 360, y = 20 + row * 200;
          return `
            <g data-tip-title="${a(p.l)}" data-tip="${a(p.tip)}">
              <rect x="${x}" y="${y}" width="320" height="170" rx="8" fill="${PAPER}" stroke="${INK}" stroke-width="1"/>
              <text x="${x + 28}" y="${y + 56}" font-size="28" font-weight="700" fill="${INK}">${p.l}</text>
              <line x1="${x + 28}" y1="${y + 76}" x2="${x + 80}" y2="${y + 76}" stroke="${PRIMARY}" stroke-width="2"/>
              <text x="${x + 28}" y="${y + 110}" font-size="14" fill="${BODY}">${p.ko}</text>
            </g>`;
        }).join('')}
        <g data-tip-title="Target · 표적 고객" data-tip="STP에서 정한 표적 고객입니다. 4P의 모든 결정이 이 고객을 향해 일관되게 정렬되어야 합니다.">
          <circle cx="380" cy="220" r="60" fill="${PRIMARY}" stroke="${INK}" stroke-width="1.5"/>
          <text x="380" y="218" text-anchor="middle" font-size="16" font-weight="700" fill="${ON_DARK}">Target</text>
          <text x="380" y="240" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.85)">표적 고객</text>
        </g>
      </svg>
      <div class="viz-caption">표적 고객(STP)을 중심으로 4P의 일관성을 점검합니다</div>
    </div>`;

  /* ============================================================
     9. STP — 깔때기
     ============================================================ */
  const stpThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="${INK}" stroke-width="1.2">
        <polygon points="20,30 260,30 230,80 50,80" fill="${PAPER}"/>
        <polygon points="55,86 225,86 200,130 80,130" fill="${PRIMARY_SOFT}"/>
        <polygon points="85,136 195,136 175,170 105,170" fill="${PRIMARY}"/>
      </g>
      <g font-size="18" font-weight="700" text-anchor="middle">
        <text x="140" y="62" fill="${INK}">S</text>
        <text x="140" y="114" fill="${INK}">T</text>
        <text x="140" y="160" fill="${ON_DARK}">P</text>
      </g>
    </svg>`;
  const stpFull = () => `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        <g data-tip-title="S · Segmentation (시장 세분화)" data-tip="전체 시장을 의미 있는 단위로 쪼갭니다. 인구통계, 심리, 행동, 니즈, 사용 상황 등 변수에 따라 세그먼트가 갈립니다.">
          <polygon points="60,30 700,30 640,130 120,130" fill="${PAPER}" stroke="${INK}" stroke-width="1"/>
          <text x="380" y="68" text-anchor="middle" font-size="36" font-weight="700" fill="${INK}">S</text>
          <text x="380" y="96" text-anchor="middle" font-size="15" font-weight="600" fill="${INK}">Segmentation · 시장 세분화</text>
          <text x="380" y="116" text-anchor="middle" font-size="11" fill="${MUTED}">의미 있는 단위로 쪼개기 (인구·심리·행동·니즈)</text>
        </g>
        <g data-tip-title="T · Targeting (표적 시장 선정)" data-tip="여러 세그먼트 중 어디에 집중할지 결정합니다. 집중·차별·비차별 전략 중 자원과 상황에 맞는 방식을 고릅니다.">
          <polygon points="126,140 634,140 574,240 186,240" fill="${PRIMARY_SOFT}" stroke="${INK}" stroke-width="1"/>
          <text x="380" y="178" text-anchor="middle" font-size="36" font-weight="700" fill="${INK}">T</text>
          <text x="380" y="206" text-anchor="middle" font-size="15" font-weight="600" fill="${INK}">Targeting · 표적 시장 선정</text>
          <text x="380" y="226" text-anchor="middle" font-size="11" fill="${MUTED}">집중 / 차별 / 비차별 중 선택</text>
        </g>
        <g data-tip-title="P · Positioning (포지셔닝)" data-tip="표적 고객의 머릿속에 어떤 위치를 차지할지 결정합니다. 경쟁사 대비 차별점이 한 문장으로 정리되어야 합니다.">
          <polygon points="192,250 568,250 508,350 252,350" fill="${PRIMARY}" stroke="${INK}" stroke-width="1"/>
          <text x="380" y="288" text-anchor="middle" font-size="36" font-weight="700" fill="${ON_DARK}">P</text>
          <text x="380" y="316" text-anchor="middle" font-size="15" font-weight="600" fill="${ON_DARK}">Positioning · 포지셔닝</text>
          <text x="380" y="336" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.88)">고객 인지 위치 결정</text>
        </g>
      </svg>
      <div class="viz-caption">전체 시장에서 표적을, 표적에서 인지 위치를 정합니다. 4P 실행의 전제입니다</div>
    </div>`;

  /* ============================================================
     10. CJM
     ============================================================ */
  const STAGES = ['인지', '고려', '구매', '사용', '재구매'];
  const STAGES_EN = ['Awareness', 'Consideration', 'Purchase', 'Use', 'Loyalty'];
  const STAGE_TIPS = [
    '우리 제품을 처음 알게 되는 단계입니다. 광고, SNS, 검색이 주된 접점입니다.',
    '구매 전 비교·검토하는 단계입니다. 리뷰, 가격 비교, 추천이 영향을 미칩니다.',
    '실제 결제 단계입니다. 페이먼트 마찰, 가격 충격, 신뢰 부족이 이탈의 주된 이유입니다.',
    '제품을 실제로 사용하며 가치를 경험합니다. 첫인상과 학습 곡선이 만족도를 결정합니다.',
    '재구매하거나 추천하는 단계입니다. 충성 고객 비중이 LTV의 핵심입니다.'
  ];
  const EMO = [50, 70, 95, 60, 30];
  const cjmThumb = () => {
    const xs = STAGES.map((_, i) => 30 + i * 55);
    const ys = EMO.map(e => 30 + (e / 100) * 100);
    const path = xs.map((x, i) => (i ? `L ${x} ${ys[i]}` : `M ${x} ${ys[i]}`)).join(' ');
    return `
      <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${HAIRLINE}" stroke-width="1">
          ${xs.map(x => `<line x1="${x}" y1="20" x2="${x}" y2="160"/>`).join('')}
          <line x1="20" y1="80" x2="260" y2="80"/>
        </g>
        <path d="${path}" stroke="${PRIMARY}" stroke-width="2.5" fill="none"/>
        ${xs.map((x, i) => `<circle cx="${x}" cy="${ys[i]}" r="4" fill="${PRIMARY}" stroke="${PAPER}" stroke-width="1.5"/>`).join('')}
        ${xs.map((x, i) => `<text x="${x}" y="172" text-anchor="middle" font-size="9" fill="${MUTED}">${STAGES[i]}</text>`).join('')}
      </svg>`;
  };
  const cjmFull = () => {
    const xs = [140, 260, 380, 500, 620];
    const ys = EMO.map(e => 140 + (e / 100) * 100);
    const path = xs.map((x, i) => (i ? `L ${x} ${ys[i]}` : `M ${x} ${ys[i]}`)).join(' ');
    const action = ['검색', '비교', '결제', '사용', '재구매'];
    const touch = ['광고·SNS', '리뷰·웹', '앱·매장', '제품·CS', '추천·로열티'];
    const rowLabel = (y, ko, en) => `
      <text x="24" y="${y}" font-size="12" font-weight="600" fill="${INK}">${ko}</text>
      <text x="24" y="${y + 16}" font-size="9" letter-spacing="0.1em" fill="${MUTED}">${en.toUpperCase()}</text>`;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg">
        ${xs.map((x, i) => `
          <g data-tip-title="${a(STAGES[i])} · ${a(STAGES_EN[i])}" data-tip="${a(STAGE_TIPS[i])}">
            <text x="${x}" y="40" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}">${STAGES[i]}</text>
            <text x="${x}" y="60" text-anchor="middle" font-size="10" letter-spacing="0.08em" fill="${MUTED}">${STAGES_EN[i].toUpperCase()}</text>
          </g>
        `).join('')}
        <line x1="80" y1="84" x2="680" y2="84" stroke="${HAIRLINE}" stroke-width="1"/>
        ${xs.map(x => `<line x1="${x}" y1="92" x2="${x}" y2="412" stroke="${HAIRLINE}" stroke-width="1" stroke-dasharray="2 5"/>`).join('')}
        <line x1="80" y1="266" x2="680" y2="266" stroke="${HAIRLINE}" stroke-width="1"/>
        <line x1="80" y1="340" x2="680" y2="340" stroke="${HAIRLINE}" stroke-width="1"/>
        ${rowLabel(132, '감정 곡선', 'Emotion')}
        <g data-tip-title="감정 곡선 (Emotion)" data-tip="단계마다 고객이 느끼는 긴장도와 만족도입니다. 곡선이 높을수록 고객 부담이 크다는 의미이며, 페인포인트의 위치가 드러납니다.">
          <path d="${path}" stroke="${PRIMARY}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          ${xs.map((x, i) => `<circle cx="${x}" cy="${ys[i]}" r="6" fill="${PRIMARY}" stroke="${PAPER}" stroke-width="2"/>`).join('')}
        </g>
        ${rowLabel(296, '행동', 'Behavior')}
        ${xs.map((x, i) => `<text x="${x}" y="310" text-anchor="middle" font-size="13" font-weight="500" fill="${INK}">${action[i]}</text>`).join('')}
        ${rowLabel(372, '터치포인트', 'Touchpoint')}
        ${xs.map((x, i) => `<text x="${x}" y="386" text-anchor="middle" font-size="12" fill="${BODY}">${touch[i]}</text>`).join('')}
      </svg>
      <div class="viz-caption">단계마다 행동·감정·터치포인트를 매핑해 페인포인트와 개선 기회를 찾습니다</div>
    </div>`;
  };

  /* ============================================================
     11. 가치 사슬
     ============================================================ */
  const VC_PRIMARY = [
    { name: 'Inbound\nLogistics', tip: '원자재·부품 입고. 공급사 관리, 입고 검수, 재고 보관 등 가치 사슬의 시작점입니다.' },
    { name: 'Operations',         tip: '제품·서비스 생산 단계. 제조·조립·서비스 운영 등 핵심 변환 활동이 일어납니다.' },
    { name: 'Outbound\nLogistics', tip: '완제품 출고. 보관, 포장, 운송, 배송. 고객에게 도달하기까지의 물류입니다.' },
    { name: 'Marketing\n& Sales', tip: '마케팅과 영업. 광고, 프로모션, 채널 관리, 가격 정책, 판매 활동.' },
    { name: 'Service',            tip: 'A/S와 고객 서비스. 설치, 수리, 교육, 부품 공급 등 사후 가치 활동.' }
  ];
  const VC_SUPPORT = [
    { name: 'Firm Infrastructure',       tip: '경영, 기획, 재무, 법무 등 전사 인프라. 모든 활동을 떠받치는 토대입니다.' },
    { name: 'Human Resource Management', tip: '채용, 교육, 평가, 보상. 인력의 양과 질을 결정해 모든 활동의 수준을 좌우합니다.' },
    { name: 'Technology Development',    tip: '기술 개발과 R&D. 제품 기술뿐 아니라 공정·시스템 기술까지 포괄합니다.' },
    { name: 'Procurement',               tip: '조달. 원자재·부품·서비스 구매 활동. 협상력과 단가 관리가 핵심입니다.' }
  ];
  const vcThumb = () => {
    const X0=14, X1=218, X2=262, Y0=14, Y1=164, Ymid=89, divY=82;
    const cW=X1-X0, colW=cW/5, barH=(Y1-divY)/4;
    const cols = VC_PRIMARY.map((_,i)=>
      i===0?'':`<line x1="${X0+i*colW}" y1="${Y0}" x2="${X0+i*colW}" y2="${divY}" stroke="${INK}" stroke-width="0.8"/>`
    ).join('');
    const bars = [0,1,2,3].map(i=>{
      const y=divY+i*barH;
      return i===0?'':`<line x1="${X0}" y1="${y}" x2="${X1}" y2="${y}" stroke="${INK}" stroke-width="0.8"/>`;
    }).join('');
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="${X0}" y="${Y0}" width="${cW}" height="${divY-Y0}" fill="${PAPER}"/>
      <rect x="${X0}" y="${divY}" width="${cW}" height="${Y1-divY}" fill="${CARD}"/>
      <polygon points="${X1},${Y0} ${X2},${Ymid} ${X1},${Y1}" fill="${PRIMARY}" stroke="${INK}" stroke-width="0.8"/>
      <line x1="${X0}" y1="${divY}" x2="${X1}" y2="${divY}" stroke="${INK}" stroke-width="0.8"/>
      ${cols}${bars}
      <polygon points="${X0},${Y0} ${X1},${Y0} ${X2},${Ymid} ${X1},${Y1} ${X0},${Y1}" fill="none" stroke="${INK}" stroke-width="1"/>
      <text x="${X1+(X2-X1)/2}" y="${Ymid+4}" text-anchor="middle" font-size="8" font-weight="700" fill="${ON_DARK}">Value</text>
    </svg>`;
  };
  const vcFull = () => {
    const X0=20, X1=650, X2=740, Y0=20, Y1=420, Ymid=220, divY=200;
    const cW=X1-X0, colW=cW/5, pMidY=(Y0+divY)/2;
    const sH=Y1-divY, barH=sH/4;
    const primaryCols = VC_PRIMARY.map((p,i)=>{
      const x=X0+i*colW, cx=x+colW/2, lines=p.name.split('\n');
      return `<g class="vc-item" data-tip-title="${a(p.name.replace(/\n/g,' '))}" data-tip="${a(p.tip)}">
        <rect class="vc-hover" x="${x}" y="${Y0}" width="${colW}" height="${divY-Y0}" fill="transparent"/>
        ${i>0?`<line x1="${x}" y1="${Y0}" x2="${x}" y2="${divY}" stroke="${INK}" stroke-width="1" pointer-events="none"/>`:''}
        ${lines.map((l,li)=>`<text x="${cx}" y="${pMidY+(li-(lines.length-1)/2)*20}" text-anchor="middle" font-size="14" font-weight="600" fill="${INK}" pointer-events="none">${l}</text>`).join('')}
      </g>`;
    }).join('');
    const supportBars = [...VC_SUPPORT].reverse().map((s,i)=>{
      const y=divY+i*barH;
      return `<g class="vc-item" data-tip-title="${a(s.name)}" data-tip="${a(s.tip)}">
        <rect class="vc-hover" x="${X0}" y="${y}" width="${cW}" height="${barH}" fill="transparent"/>
        ${i>0?`<line x1="${X0}" y1="${y}" x2="${X1}" y2="${y}" stroke="${INK}" stroke-width="1" pointer-events="none"/>`:''}
        <text x="${X0+20}" y="${y+barH/2+6}" font-size="14" font-weight="600" fill="${INK}" pointer-events="none">${s.name}</text>
      </g>`;
    }).join('');
    const vx = X1+(X2-X1)/2;
    return `<div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg">
        <style>
          .vc-item { cursor: pointer; }
          .vc-item:hover .vc-hover { fill: rgba(0,0,0,0.08); }
          .vc-value { cursor: pointer; }
          .vc-value:hover .vc-value-poly { filter: brightness(0.88); }
        </style>
        <rect x="${X0}" y="${Y0}" width="${cW}" height="${divY-Y0}" fill="${PAPER}"/>
        <rect x="${X0}" y="${divY}" width="${cW}" height="${Y1-divY}" fill="${CARD}"/>
        <polygon class="vc-value-poly" points="${X1},${Y0} ${X2},${Ymid} ${X1},${Y1}" fill="${PRIMARY}" stroke="${INK}" stroke-width="1.5"/>
        <line x1="${X0}" y1="${divY}" x2="${X1}" y2="${divY}" stroke="${INK}" stroke-width="1.2"/>
        ${primaryCols}
        ${supportBars}
        <polygon points="${X0},${Y0} ${X1},${Y0} ${X2},${Ymid} ${X1},${Y1} ${X0},${Y1}" fill="none" stroke="${INK}" stroke-width="1.5"/>
        <g class="vc-value" data-tip-title="Value · 가치" data-tip="모든 활동이 만들어낸 가치의 합에서 비용 합을 뺀 결과입니다. 가치 사슬의 모든 활동이 Value에 기여해야 합니다.">
          <polygon class="vc-value-poly" points="${X1},${Y0} ${X2},${Ymid} ${X1},${Y1}" fill="transparent"/>
          <text x="${vx}" y="${Ymid+6}" text-anchor="middle" font-size="15" font-weight="700" fill="${ON_DARK}" pointer-events="none">Value</text>
        </g>
        <text x="${X0+8}" y="${Y0+15}" font-size="10" font-weight="700" letter-spacing="0.06em" fill="${MUTED}" pointer-events="none">PRIMARY ACTIVITIES</text>
        <text x="${X0+8}" y="${divY+15}" font-size="10" font-weight="700" letter-spacing="0.06em" fill="${MUTED}" pointer-events="none">SUPPORT ACTIVITIES</text>
      </svg>
      <div class="viz-caption">본원적 활동과 지원 활동을 함께 보며 가치(마진)의 원천을 진단합니다</div>
    </div>`;
  };

  /* ============================================================
     12. 7S
     ============================================================ */
  const SEVENS = [
    { l: 'Strategy',  ko: '전략',  hard: true,  tip: 'Hard 3S. 사업의 방향과 우선순위. 다른 6S가 정렬되어야 할 기준점입니다.' },
    { l: 'Structure', ko: '구조',  hard: true,  tip: 'Hard 3S. 조직 구조와 보고 라인. 의사결정 속도와 책임 명확성에 영향을 줍니다.' },
    { l: 'System',    ko: '시스템', hard: true,  tip: 'Hard 3S. 프로세스, 정보 시스템, 관리 체계. 일이 굴러가는 메커니즘입니다.' },
    { l: 'Style',     ko: '스타일', hard: false, tip: 'Soft S. 리더십 스타일과 의사결정 방식. 조직 문화의 톤을 결정합니다.' },
    { l: 'Staff',     ko: '인력',  hard: false, tip: 'Soft S. 인력 구성, 채용, 육성, 보상. 전략 실행 역량의 인적 토대입니다.' },
    { l: 'Skills',    ko: '역량',  hard: false, tip: 'Soft S. 조직의 핵심 역량과 기술. 경쟁우위의 원천이 되는 능력 풀입니다.' }
  ];
  const sevensThumb = () => {
    const cx = 140, cy = 90, r = 60;
    const pts = SEVENS.map((_, i) => {
      const a = (-Math.PI / 2) + (i * Math.PI * 2) / 6;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    });
    return `
      <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${MUTED_SOFT}" stroke-width="1" stroke-dasharray="3 3">
          ${pts.map(([x, y]) => `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`).join('')}
        </g>
        ${pts.map(([x, y], i) =>
          `<circle cx="${x}" cy="${y}" r="14" fill="${SEVENS[i].hard ? PAPER : PRIMARY_SOFT}" stroke="${INK}" stroke-width="1.2"/>`
        ).join('')}
        <circle cx="${cx}" cy="${cy}" r="22" fill="${DARK}"/>
        <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="${ON_DARK}">SV</text>
      </svg>`;
  };
  const sevensFull = () => {
    const cx = 380, cy = 230, r = 165;
    const pts = SEVENS.map((_, i) => {
      const ang = (-Math.PI / 2) + (i * Math.PI * 2) / 6;
      return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
    });
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 460" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${MUTED_SOFT}" stroke-width="1.2" stroke-dasharray="6 4" pointer-events="none">
          ${pts.map(([x, y]) => `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`).join('')}
        </g>
        ${pts.map(([x, y], i) => {
          const s = SEVENS[i];
          return `
            <g data-tip-title="${a(s.l)} · ${a(s.ko)}" data-tip="${a(s.tip)}">
              <circle cx="${x}" cy="${y}" r="50" fill="${s.hard ? PAPER : PRIMARY_SOFT}" stroke="${INK}" stroke-width="1.2"/>
              <text x="${x}" y="${y - 4}" text-anchor="middle" font-size="16" font-weight="600" fill="${INK}">${s.l}</text>
              <text x="${x}" y="${y + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">${s.ko}</text>
            </g>`;
        }).join('')}
        <g data-tip-title="Shared Values · 핵심 가치" data-tip="조직이 공유하는 핵심 가치와 문화. 7S의 중심에 위치하며 다른 6S 모두가 이 가치와 정렬되어야 전략이 실행됩니다.">
          <circle cx="${cx}" cy="${cy}" r="64" fill="${DARK}"/>
          <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="16" font-weight="700" fill="${ON_DARK}">Shared Values</text>
          <text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.85)">핵심 가치</text>
        </g>
        <g font-size="11" fill="${MUTED}" pointer-events="none">
          <rect x="20" y="20" width="14" height="14" fill="${PAPER}" stroke="${INK}"/>
          <text x="40" y="32">Hard 3S</text>
          <rect x="20" y="40" width="14" height="14" fill="${PRIMARY_SOFT}" stroke="${INK}"/>
          <text x="40" y="52">Soft 3S</text>
        </g>
      </svg>
      <div class="viz-caption">7개 요소의 정렬이 곧 전략 실행력입니다</div>
    </div>`;
  };

  /* ============================================================
     13. 성숙도
     ============================================================ */
  const MAT = [
    { l: 1, n: 'Initial',                d: '임시 · 영웅 의존', tip: '프로세스가 표준화되지 않고 개인 역량에 의존합니다. 결과의 재현성이 낮고 사람이 바뀌면 무너집니다.' },
    { l: 2, n: 'Managed',                d: '문서화 시작',    tip: '핵심 프로세스가 관리되기 시작합니다. 기본적인 문서화와 일정 관리가 정착됩니다.' },
    { l: 3, n: 'Defined',                d: '전사 표준화',    tip: '전사적으로 표준 프로세스가 정의되고 따라집니다. 부서 간 일관성이 확보됩니다.' },
    { l: 4, n: 'Quantitatively Managed', d: '지표 기반 관리', tip: '측정 가능한 지표로 프로세스를 관리합니다. 데이터 기반 의사결정과 예측이 가능해집니다.' },
    { l: 5, n: 'Optimizing',             d: '지속 개선',      tip: '데이터 기반으로 지속적으로 개선이 일어납니다. 학습 조직이 자리잡고 혁신이 자연스럽게 발생합니다.' }
  ];
  const matThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${MAT.map((m, i) => {
        const w = 32, h = 22;
        const x = 30 + i * 44;
        const fillH = (i + 1) * h;
        const y = 150 - fillH + h;
        return `
          <rect x="${x}" y="${y}" width="${w}" height="${fillH}" fill="${i === 4 ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1"/>
          <text x="${x + w / 2}" y="${y + 16}" text-anchor="middle" font-size="11" font-weight="700" fill="${i === 4 ? ON_DARK : INK}">L${m.l}</text>`;
      }).join('')}
    </svg>`;
  const matFull = () => `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 460" xmlns="http://www.w3.org/2000/svg">
        ${MAT.map((m, i) => {
          const w = 130, h = 60;
          const x = 80 + i * 130;
          const fillH = (i + 1) * h;
          const y = 380 - fillH + h;
          const isMax = i === MAT.length - 1;
          return `
            <g data-tip-title="L${m.l} · ${a(m.n)}" data-tip="${a(m.tip)}">
              <rect x="${x}" y="${y}" width="${w}" height="${fillH}" fill="${isMax ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1.2"/>
              <text x="${x + w / 2}" y="${y + 36}" text-anchor="middle" font-size="28" font-weight="700" fill="${isMax ? ON_DARK : INK}">L${m.l}</text>
              <text x="${x + w / 2}" y="${y + 58}" text-anchor="middle" font-size="11" fill="${isMax ? 'rgba(255,255,255,0.9)' : MUTED}">${m.d}</text>
              <text x="${x + w / 2}" y="${y + 80}" text-anchor="middle" font-size="11" font-weight="600" fill="${isMax ? 'rgba(255,255,255,0.9)' : INK}">${m.n}</text>
            </g>`;
        }).join('')}
        <line x1="60" y1="440" x2="720" y2="440" stroke="${INK}" stroke-width="1" pointer-events="none"/>
        <text x="60" y="55" font-size="12" font-weight="600" fill="${MUTED}">역량 성숙도</text>
        <text x="700" y="55" text-anchor="end" font-size="11" font-weight="500" fill="${MUTED}">L1 → L5</text>
      </svg>
      <div class="viz-caption">현재 레벨과 목표 레벨의 갭을 분석해 단계별 로드맵을 만듭니다</div>
    </div>`;

  /* ============================================================
     14. 프로세스 분해
     ============================================================ */
  const PROC = [
    { n: '신청',      t: '10분',  type: 'ok',         tip: '고객이 신청서를 작성합니다. 처리 시간 10분, 자동화 가능성 높음.' },
    { n: '서류 제출', t: '5분',   type: 'ok',         tip: '필요 서류를 제출합니다. 디지털 첨부로 거의 즉시 완료됩니다.' },
    { n: '심사 대기', t: '3일',   type: 'bottleneck', tip: '병목 구간. 심사 담당자 배정과 검토에 3일이 소요됩니다. 전체 리드타임의 90%를 차지하므로 자동 심사 도입이 우선과제입니다.' },
    { n: '한도 산정', t: '1시간', type: 'ok',         tip: '신용 점수와 정책에 따라 한도를 산정합니다. 룰 기반이라 자동화 적합.' },
    { n: '약정',      t: '1일',   type: 'wait',       tip: '대기 구간. 고객의 약정서 확인과 동의가 필요해 시간이 걸립니다. 모바일 전자 약정으로 단축 가능합니다.' },
    { n: '입금',      t: '10분',  type: 'ok',         tip: '약정 완료 후 계좌로 입금됩니다. 시스템이 자동 처리합니다.' }
  ];
  const procColors = (t) => t === 'bottleneck'
    ? { fill: PRIMARY_SOFT, stroke: PRIMARY }
    : t === 'wait'
      ? { fill: AMBER_SOFT, stroke: AMBER }
      : { fill: PAPER, stroke: INK };
  const procThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${PROC.map((s, i) => {
        const x = 20 + i * 42, y = 70;
        const c = procColors(s.type);
        return `
          <rect x="${x}" y="${y}" width="36" height="40" rx="4" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.2"/>
          <text x="${x + 18}" y="${y + 26}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${i + 1}</text>
          ${i < PROC.length - 1 ? `<line x1="${x + 36}" y1="${y + 20}" x2="${x + 42}" y2="${y + 20}" stroke="${INK}" stroke-width="1"/>` : ''}`;
      }).join('')}
    </svg>`;
  const procFull = () => `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="proc-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <polygon points="0,0 10,5 0,10" fill="${INK}"/>
          </marker>
        </defs>
        ${PROC.map((s, i) => {
          const w = 110, h = 96, x = 20 + i * 122, y = 120;
          const c = procColors(s.type);
          return `
            <g data-tip-title="Step ${i + 1} · ${a(s.n)} (${a(s.t)})" data-tip="${a(s.tip)}">
              <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.5"/>
              <text x="${x + w / 2}" y="${y + 32}" text-anchor="middle" font-size="13" font-weight="600" fill="${MUTED}">Step ${i + 1}</text>
              <text x="${x + w / 2}" y="${y + 56}" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}">${s.n}</text>
              <text x="${x + w / 2}" y="${y + 78}" text-anchor="middle" font-size="12" font-weight="600" fill="${c.stroke}">${s.t}</text>
            </g>
            ${i < PROC.length - 1 ? `<line x1="${x + w}" y1="${y + h / 2}" x2="${x + w + 12}" y2="${y + h / 2}" stroke="${INK}" stroke-width="1.2" marker-end="url(#proc-arr)" pointer-events="none"/>` : ''}`;
        }).join('')}
        <g font-size="11" fill="${MUTED}" pointer-events="none">
          <rect x="220" y="280" width="14" height="14" fill="${PRIMARY_SOFT}" stroke="${PRIMARY}"/>
          <text x="242" y="292">병목</text>
          <rect x="290" y="280" width="14" height="14" fill="${AMBER_SOFT}" stroke="${AMBER}"/>
          <text x="312" y="292">대기</text>
          <rect x="360" y="280" width="14" height="14" fill="${PAPER}" stroke="${INK}"/>
          <text x="382" y="292">처리</text>
        </g>
        <text x="380" y="56" text-anchor="middle" font-size="17" font-weight="600" fill="${INK}">예: 은행 신용대출 (총 4일+)</text>
        <text x="380" y="80" text-anchor="middle" font-size="12" fill="${MUTED}">대기 시간이 90% 이상 → 자동화·통합 대상</text>
      </svg>
      <div class="viz-caption">단계별 시간을 측정해 병목과 대기를 찾고, 자동화·통합·삭제 대상을 도출합니다</div>
    </div>`;

  /* ============================================================
     15. SIPOC
     ============================================================ */
  const SIPOC = [
    { l: 'S', n: 'Supplier', tip: '입력을 제공하는 주체입니다. 외부 공급사, 내부 부서, 시스템 등이 해당합니다.', items: ['공급사', '내부 부서', '시스템'] },
    { l: 'I', n: 'Input',    tip: '프로세스에 들어가는 것입니다. 원자재, 데이터, 문서, 요청 등.',                        items: ['원자재', '데이터', '문서'] },
    { l: 'P', n: 'Process',  tip: '핵심 처리 단계입니다. 보통 5~7개로 압축하며, SIPOC의 중심이자 출발점입니다.',         items: ['Step 1', 'Step 2', '… Step N'] },
    { l: 'O', n: 'Output',   tip: '프로세스가 만들어내는 결과물입니다. 제품, 보고서, 서비스 등.',                          items: ['제품', '리포트', '서비스'] },
    { l: 'C', n: 'Customer', tip: '출력을 받는 주체입니다. 외부 고객뿐 아니라 내부 사용자, 다음 부서 등도 포함합니다.',  items: ['최종 고객', '내부 사용자', '파트너'] }
  ];
  const sipocThumb = () => {
    const w=48, H=140, hdrH=32, X0=20, Y0=20;
    const cols = SIPOC.map((c,i)=>{
      const x=X0+i*w, isP=i===2;
      return `
        <rect x="${x}" y="${Y0}" width="${w}" height="${H}" fill="${isP?PRIMARY_SOFT:PAPER}"/>
        <rect x="${x}" y="${Y0}" width="${w}" height="${hdrH}" fill="${isP?PRIMARY:DARK}"/>
        <text x="${x+w/2}" y="${Y0+hdrH-8}" text-anchor="middle" font-size="16" font-weight="700" fill="${ON_DARK}">${c.l}</text>
        ${i>0?`<line x1="${x}" y1="${Y0}" x2="${x}" y2="${Y0+H}" stroke="${INK}" stroke-width="0.8"/>`:''}`;
    }).join('');
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${cols}
      <rect x="${X0}" y="${Y0}" width="${w*5}" height="${H}" fill="none" stroke="${INK}" stroke-width="1"/>
      <line x1="${X0}" y1="${Y0+hdrH}" x2="${X0+w*5}" y2="${Y0+hdrH}" stroke="${INK}" stroke-width="0.8"/>
    </svg>`;
  };
  const sipocFull = () => {
    const w=144, H=320, hdrH=60, X0=20, Y0=20;
    const cols = SIPOC.map((c,i)=>{
      const x=X0+i*w, isP=i===2;
      return `
        <g class="vc-item" data-tip-title="${a(c.l)} · ${a(c.n)}" data-tip="${a(c.tip)}">
          <rect class="vc-hover" x="${x}" y="${Y0}" width="${w}" height="${H}" fill="${isP?PRIMARY_SOFT:PAPER}"/>
          <rect x="${x}" y="${Y0}" width="${w}" height="${hdrH}" fill="${isP?PRIMARY:DARK}" pointer-events="none"/>
          ${i>0?`<line x1="${x}" y1="${Y0}" x2="${x}" y2="${Y0+H}" stroke="${INK}" stroke-width="1" pointer-events="none"/>`:''}
          <text x="${x+w/2}" y="${Y0+38}" text-anchor="middle" font-size="26" font-weight="700" fill="${ON_DARK}" pointer-events="none">${c.l}</text>
          <text x="${x+w/2}" y="${Y0+56}" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.85)" pointer-events="none">${c.n}</text>
          ${c.items.map((it,ii)=>`
            <text x="${x+16}" y="${Y0+hdrH+32+ii*30}" font-size="${isP?'15':'14'}" font-weight="500" fill="${INK}" pointer-events="none">· ${it}</text>
          `).join('')}
        </g>`;
    }).join('');
    return `<div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        <style>
          .vc-item { cursor: pointer; }
          .vc-item:hover .vc-hover { filter: brightness(0.93); }
        </style>
        ${cols}
        <rect x="${X0}" y="${Y0}" width="${w*5}" height="${H}" fill="none" stroke="${INK}" stroke-width="1.2"/>
        <line x1="${X0}" y1="${Y0+hdrH}" x2="${X0+w*5}" y2="${Y0+hdrH}" stroke="${INK}" stroke-width="1" pointer-events="none"/>
      </svg>
      <div class="viz-caption">5열로 프로세스의 시작, 끝, 이해관계자를 한 장에 정리합니다</div>
    </div>`;
  };

  /* ============================================================
     16. RACI
     ============================================================ */
  const RACI_ACTS = ['요구사항 정의', '설계', '구현', '테스트', '런칭 결정'];
  const RACI_ROLES = ['PM', '사업부장', '개발팀', '디자인', 'QA'];
  const RACI_M = [
    ['A', 'C', 'R', 'C', 'I'],
    ['R', 'A', 'C', 'R', 'I'],
    ['C', 'I', 'A', 'C', 'C'],
    ['C', 'I', 'C', '-', 'A'],
    ['R', 'A', 'I', 'I', 'C']
  ];
  const RACI_TIP = {
    'A': 'Accountable · 최종 책임. 결과에 책임을 지는 단 1명입니다. 의사결정의 최종 권한을 가집니다.',
    'R': 'Responsible · 실행. 실제로 일을 하는 사람입니다. 한 활동에 여러 명이 있을 수 있습니다.',
    'C': 'Consulted · 협의. 사전에 의견을 듣는 양방향 소통입니다. 도메인 전문가가 주로 해당합니다.',
    'I': 'Informed · 통보. 결과를 통보받는 일방 소통입니다. 진행 상황을 알 필요가 있는 이해관계자입니다.',
    '-': '해당 역할이 이 활동에 직접적으로 관여하지 않습니다.'
  };
  const RACI_TITLE = {
    'A': 'A · Accountable (최종 책임)',
    'R': 'R · Responsible (실행)',
    'C': 'C · Consulted (협의)',
    'I': 'I · Informed (통보)',
    '-': '관여 없음'
  };
  const raciColor = v => v === 'A' ? PRIMARY : v === 'R' ? INK : v === 'C' ? AMBER : v === 'I' ? MUTED_SOFT : HAIRLINE;
  const raciThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="${HAIRLINE}" stroke-width="1" fill="${PAPER}">
        ${RACI_ACTS.map((_, r) => `<rect x="60" y="${30 + r * 24}" width="180" height="22"/>`).join('')}
      </g>
      ${RACI_M.map((row, r) => row.map((v, c) => `
        <circle cx="${82 + c * 36}" cy="${41 + r * 24}" r="6" fill="${raciColor(v)}"/>
      `).join('')).join('')}
    </svg>`;
  const raciFull = () => {
    const cellW = 100, cellH = 42, ox = 200, oy = 100;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        ${RACI_ROLES.map((r, i) => `
          <text x="${ox + i * cellW + cellW / 2}" y="${oy - 12}" text-anchor="middle" font-size="14" font-weight="600" fill="${INK}">${r}</text>
        `).join('')}
        ${RACI_ACTS.map((act, i) => `
          <g data-tip-title="${a(act)}" data-tip="${a('이 활동의 행. 각 셀의 R/A/C/I는 해당 역할이 어떻게 관여하는지를 나타냅니다.')}">
            <rect x="${ox - 180}" y="${oy + i * cellH}" width="180" height="${cellH}" fill="transparent"/>
            <text x="${ox - 16}" y="${oy + i * cellH + cellH / 2 + 4}" text-anchor="end" font-size="14" font-weight="600" fill="${INK}">${act}</text>
          </g>
        `).join('')}
        <g stroke="${HAIRLINE}" stroke-width="1" pointer-events="none">
          ${RACI_ACTS.map((_, r) => `<rect x="${ox}" y="${oy + r * cellH}" width="${cellW * RACI_ROLES.length}" height="${cellH}" fill="${r % 2 ? CARD : PAPER}"/>`).join('')}
          ${RACI_ROLES.map((_, c) => `<line x1="${ox + (c + 1) * cellW}" y1="${oy}" x2="${ox + (c + 1) * cellW}" y2="${oy + RACI_ACTS.length * cellH}"/>`).join('')}
        </g>
        ${RACI_M.map((row, r) => row.map((v, c) => `
          <g data-tip-title="${a(RACI_TITLE[v])}" data-tip="${a(RACI_TIP[v])}" data-tip-sub="${a(RACI_ACTS[r] + ' · ' + RACI_ROLES[c])}">
            <circle cx="${ox + c * cellW + cellW / 2}" cy="${oy + r * cellH + cellH / 2}" r="14" fill="${raciColor(v)}"/>
            <text x="${ox + c * cellW + cellW / 2}" y="${oy + r * cellH + cellH / 2 + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="${v === '-' ? MUTED : ON_DARK}">${v}</text>
          </g>
        `).join('')).join('')}
        <g font-size="11" font-weight="600" fill="${INK}" pointer-events="none">
          <circle cx="100" cy="370" r="9" fill="${PRIMARY}"/><text x="118" y="375">A · 책임 (1명)</text>
          <circle cx="240" cy="370" r="9" fill="${INK}"/><text x="258" y="375">R · 실행</text>
          <circle cx="340" cy="370" r="9" fill="${AMBER}"/><text x="358" y="375">C · 협의</text>
          <circle cx="440" cy="370" r="9" fill="${MUTED_SOFT}"/><text x="458" y="375">I · 통보</text>
        </g>
      </svg>
      <div class="viz-caption">활동(행) × 역할(열) · A는 행마다 정확히 1명입니다</div>
    </div>`;
  };

  /* ============================================================
     25. Jobs-to-be-Done (JTBD)
     ============================================================ */
  const jtbdThumb = () => {
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <circle cx="140" cy="90" r="60" fill="${PAPER}" stroke="${INK}" stroke-width="1.5"/>
      <circle cx="140" cy="90" r="40" fill="${CARD}" stroke="${INK}" stroke-width="1"/>
      <circle cx="140" cy="90" r="20" fill="${PRIMARY_SOFT}" stroke="${INK}" stroke-width="1"/>
      <text x="140" y="94" text-anchor="middle" font-size="9" font-weight="700" fill="${INK}">Job</text>
      <text x="140" y="62" text-anchor="middle" font-size="9" fill="${MUTED}">감성적</text>
      <text x="140" y="130" text-anchor="middle" font-size="9" fill="${MUTED}">사회적</text>
      <text x="72" y="94" text-anchor="middle" font-size="9" fill="${INK}">기능적</text>
    </svg>`;
  };
  const jtbdFull = () => {
    const jobs = [
      { r:250, fill:PAPER, stroke:INK, label:'사회적 Job', sub:'Social', tip:'타인에게 어떻게 보이고 싶은가. "성공한 사람처럼 보이고 싶다", "환경을 생각하는 사람으로 인정받고 싶다" 등.' },
      { r:175, fill:AMBER_SOFT, stroke:INK, label:'감성적 Job', sub:'Emotional', tip:'그 과정에서 느끼고 싶은 감정. "안전하다는 느낌", "자신감", "편안함" 등. 기능적 Job보다 강력한 구매 동기가 되는 경우가 많습니다.' },
      { r:100, fill:PRIMARY_SOFT, stroke:INK, label:'기능적 Job', sub:'Functional', tip:'실용적으로 해결해야 할 과제. "A에서 B로 이동한다", "보고서를 빠르게 만든다" 등. 가장 표면적인 니즈입니다.' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        ${jobs.map(j=>`
          <g data-tip-title="${a(j.label)} (${a(j.sub)})" data-tip="${a(j.tip)}">
            <circle cx="380" cy="200" r="${j.r}" fill="${j.fill}" stroke="${j.stroke}" stroke-width="1.2"/>
          </g>`).join('')}
        <text x="380" y="196" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}">기능적 Job</text>
        <text x="380" y="216" text-anchor="middle" font-size="12" fill="${MUTED}">Functional</text>
        <text x="380" y="100" text-anchor="middle" font-size="14" font-weight="600" fill="${INK}">감성적 Job</text>
        <text x="380" y="118" text-anchor="middle" font-size="11" fill="${MUTED}">Emotional</text>
        <text x="380" y="318" text-anchor="middle" font-size="14" font-weight="600" fill="${INK}">사회적 Job</text>
        <text x="380" y="336" text-anchor="middle" font-size="11" fill="${MUTED}">Social</text>
        <rect x="20" y="345" width="720" height="60" rx="6" fill="${CARD}" stroke="${HAIRLINE}" stroke-width="1"/>
        <text x="380" y="368" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">핵심 원칙: 고객은 제품을 "고용"한다</text>
        <text x="380" y="388" text-anchor="middle" font-size="11" fill="${BODY}">어떤 상황에서 어떤 Job을 해결하기 위해 우리 제품을 고용하는가를 파악하면 진짜 경쟁자가 보입니다</text>
      </svg>
      <div class="viz-caption">기능적 Job은 쉽게 보이지만 감성적·사회적 Job이 실제 구매 결정을 좌우합니다</div>
    </div>`;
  };

  /* ============================================================
     26. Lean Canvas
     ============================================================ */
  const leanCanvasThumb = () => {
    const cells = [
      { x:20,  y:20,  w:50, h:74 },
      { x:20,  y:94,  w:50, h:36 },
      { x:70,  y:20,  w:50, h:50 },
      { x:70,  y:70,  w:50, h:60 },
      { x:120, y:20,  w:60, h:110, hi:true },
      { x:180, y:20,  w:50, h:50 },
      { x:180, y:70,  w:50, h:60 },
      { x:230, y:20,  w:50, h:110 },
      { x:20,  y:130, w:120, h:30 },
      { x:140, y:130, w:140, h:30 }
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${cells.map(c=>`<rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" fill="${c.hi?PRIMARY_SOFT:PAPER}" stroke="${INK}" stroke-width="0.8"/>`).join('')}
    </svg>`;
  };
  const leanCanvasFull = () => {
    const cell = (x,y,w,h,num,ko,en,tip,hi)=>`
      <g data-tip-title="${a(ko)} (${a(en)})" data-tip="${a(tip)}">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${hi?PRIMARY_SOFT:PAPER}" stroke="${INK}" stroke-width="1.2"/>
        <text x="${x+w-14}" y="${y+22}" text-anchor="end" font-size="10" font-weight="500" fill="${MUTED}">${String(num).padStart(2,'0')}</text>
        <text x="${x+14}" y="${y+30}" font-size="13" font-weight="600" fill="${INK}">${ko}</text>
        <text x="${x+14}" y="${y+46}" font-size="10" fill="${MUTED}">${en}</text>
      </g>`;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        ${cell(20,  20,  148, 180, 1, '문제', 'Problem', '고객이 겪는 상위 3가지 문제. 기존 대안(경쟁자)도 함께 적습니다.')}
        ${cell(20,  200, 148, 80,  2, '핵심 지표', 'Key Metrics', '사업 건강을 측정하는 핵심 숫자 하나(OMTM). 지금 단계에서 가장 중요한 지표.')}
        ${cell(168, 20,  148, 100, 3, '고유 가치 제안', 'Unique Value Proposition', '단 한 문장으로 표현하는 차별화. 왜 우리인가?', true)}
        ${cell(168, 120, 148, 160, 4, '해결책', 'Solution', '각 문제에 대한 최소 솔루션. MVP 수준으로 기술합니다.')}
        ${cell(316, 20,  148, 100, 5, '불공정 우위', 'Unfair Advantage', '복제하거나 구매할 수 없는 차별적 강점. 없으면 비워둡니다.')}
        ${cell(316, 120, 148, 160, 6, '채널', 'Channels', '고객에게 도달하는 경로. 유료·무료, 인바운드·아웃바운드.')}
        ${cell(464, 20,  276, 260, 7, '고객 세그먼트', 'Customer Segments', '표적 고객과 얼리어답터. 얼리어답터가 가장 먼저 검증해야 할 집단입니다.')}
        ${cell(20,  280, 360, 80,  8, '비용 구조', 'Cost Structure', '주요 비용 항목. 고정비·변동비·CAC·운영비.')}
        ${cell(380, 280, 360, 80,  9, '수익원', 'Revenue Streams', '돈 버는 방법. 가격 모델과 LTV 가설.')}
      </svg>
      <div class="viz-caption">BMC의 스타트업 버전 · 문제→해결책→UVP 순으로 가설을 세우고 인터뷰로 검증합니다</div>
    </div>`;
  };

  /* ============================================================
     27. Kano 모델
     ============================================================ */
  const kanoThumb = () => {
    const curves = [
      { pts:[20,100,80,60,140,40,200,30,260,25], stroke:PRIMARY, label:'매력', lx:200, ly:24 },
      { pts:[20,140,80,100,140,80,200,60,260,40], stroke:INK, label:'성능', lx:200, ly:38 },
      { pts:[20,160,80,155,140,155,200,155,260,100], stroke:AMBER, label:'기본', lx:200, ly:98 }
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="20" x2="20" y2="165" stroke="${INK}" stroke-width="1"/>
      <line x1="20" y1="165" x2="265" y2="165" stroke="${INK}" stroke-width="1"/>
      ${curves.map(c=>`<polyline points="${c.pts.join(',')}" fill="none" stroke="${c.stroke}" stroke-width="2"/>`).join('')}
      ${curves.map(c=>`<text x="${c.lx}" y="${c.ly}" font-size="9" fill="${c.stroke}" font-weight="600">${c.label}</text>`).join('')}
      <text x="14" y="90" text-anchor="middle" font-size="8" fill="${MUTED}" transform="rotate(-90,14,90)">고객 만족도</text>
      <text x="142" y="175" text-anchor="middle" font-size="8" fill="${MUTED}">기능 충족도 →</text>
    </svg>`;
  };
  const kanoFull = () => {
    const types = [
      { y:40, fill:PRIMARY_SOFT, ko:'매력 기능', en:'Attractive / Delighter', tip:'있으면 크게 기쁘지만 없어도 불만이 없습니다. 경쟁 차별화의 핵심. 시간이 지나면 성능 기능으로 이동합니다. 예: 스마트폰 무선 충전 (초기)', curve:'M60,220 C160,180 260,100 420,60', color:PRIMARY },
      { y:140, fill:AMBER_SOFT, ko:'성능 기능', en:'Performance / Linear', tip:'충족될수록 만족도가 선형으로 올라갑니다. 더 빠를수록, 더 클수록, 더 저렴할수록 좋습니다. 예: 배터리 지속 시간', curve:'M60,240 C160,210 260,160 420,120', color:AMBER },
      { y:240, fill:CARD, ko:'기본 기능', en:'Must-be / Basic', tip:'없으면 극심한 불만이지만 있어도 당연히 여깁니다. 자원을 집중할 영역이 아니라 결함이 없어야 할 영역입니다. 예: 화장실의 온수', curve:'M60,280 C160,278 260,270 420,240', color:MUTED }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        ${types.map(t=>`
          <g data-tip-title="${a(t.ko)} (${a(t.en)})" data-tip="${a(t.tip)}">
            <rect x="20" y="${t.y}" width="400" height="86" rx="6" fill="${t.fill}" stroke="${INK}" stroke-width="1.2"/>
            <text x="40" y="${t.y+32}" font-size="16" font-weight="700" fill="${INK}">${t.ko}</text>
            <text x="40" y="${t.y+50}" font-size="11" letter-spacing="0.06em" fill="${MUTED}">${t.en}</text>
          </g>`).join('')}
        <rect x="460" y="20" width="280" height="340" rx="8" fill="${PAPER}" stroke="${INK}" stroke-width="1.2"/>
        <text x="600" y="48" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">만족도 곡선</text>
        <line x1="480" y1="200" x2="730" y2="200" stroke="${HAIRLINE}" stroke-width="1"/>
        <line x1="595" y1="40" x2="595" y2="350" stroke="${HAIRLINE}" stroke-width="1"/>
        ${types.map(t=>`<path d="${t.curve.replace('M60','M475').replace('420','730')}" fill="none" stroke="${t.color}" stroke-width="2.5"/>`).join('')}
        <text x="600" y="360" text-anchor="middle" font-size="11" fill="${MUTED}">기능 충족도 →</text>
        <text x="470" y="200" font-size="10" fill="${MUTED}" transform="rotate(-90,470,200)">고객 만족도 ↑</text>
        <text x="720" y="72" font-size="10" fill="${PRIMARY}" font-weight="600">매력</text>
        <text x="720" y="128" font-size="10" fill="${AMBER}" font-weight="600">성능</text>
        <text x="720" y="248" font-size="10" fill="${MUTED}" font-weight="600">기본</text>
      </svg>
      <div class="viz-caption">기본 기능 결함 제거 → 성능 기능 강화 → 매력 기능으로 차별화 순서로 우선순위를 설정합니다</div>
    </div>`;
  };

  /* ============================================================
     21. GE-McKinsey 9Box 매트릭스
     ============================================================ */
  const ge9Thumb = () => {
    const colors = [PRIMARY_SOFT,PRIMARY_SOFT,AMBER_SOFT,PRIMARY_SOFT,AMBER_SOFT,CARD,AMBER_SOFT,CARD,CARD];
    const W=72, H=46, ox=24, oy=20;
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${colors.map((c,i)=>{const col=i%3,row=Math.floor(i/3);return `<rect x="${ox+col*W}" y="${oy+row*H}" width="${W}" height="${H}" fill="${c}" stroke="${INK}" stroke-width="0.8"/>`;}).join('')}
      <text x="140" y="170" text-anchor="middle" font-size="8" fill="${MUTED}">사업 경쟁력 →</text>
      <text x="14" y="95" text-anchor="middle" font-size="8" fill="${MUTED}" transform="rotate(-90,14,95)">산업 매력도 →</text>
    </svg>`;
  };
  const ge9Full = () => {
    const labels = [
      '투자·성장','투자·성장','선택적 투자',
      '투자·성장','선택적 투자','수확·철수',
      '선택적 투자','수확·철수','수확·철수'
    ];
    const colors = [PRIMARY_SOFT,PRIMARY_SOFT,AMBER_SOFT,PRIMARY_SOFT,AMBER_SOFT,CARD,AMBER_SOFT,CARD,CARD];
    const tips = [
      '최우선 투자. 산업 매력도도 높고 우리 경쟁력도 강합니다. 공격적으로 성장시킵니다.',
      '투자 우선. 매력도 높고 경쟁력도 상위권입니다. 선도적 포지션을 유지하며 성장합니다.',
      '신중히 투자. 매력도는 높지만 경쟁력이 낮습니다. 역량 확보 후 투자하거나 틈새 집중.',
      '투자 유지. 경쟁력이 강하지만 매력도가 중간입니다. 선택적으로 강점을 강화합니다.',
      '선택적 집중. 매력도와 경쟁력 모두 중간. 강점 집중으로 차별화합니다.',
      '수익 방어. 경쟁력은 약하고 매력도도 중간. 원가 절감과 수익 확보에 집중합니다.',
      '수익 최대화. 매력도가 낮지만 경쟁력은 있습니다. 투자를 줄이고 현금 흐름을 최대화합니다.',
      '최소 투자. 매력도 낮고 경쟁력도 약합니다. 철수를 검토합니다.',
      '철수 검토. 매력도도 최저, 경쟁력도 최저. 투자를 중단하고 매각을 검토합니다.'
    ];
    const W=200, H=100, ox=60, oy=40;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        <text x="260" y="28" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">사업 경쟁력 (강 → 약)</text>
        <text x="460" y="28" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">────────────────────</text>
        <text x="36" y="190" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}" transform="rotate(-90,36,190)">산업 매력도 (고 → 저)</text>
        ${colors.map((c,i)=>{
          const col=i%3, row=Math.floor(i/3);
          const x=ox+col*W, y=oy+row*H;
          return `
          <g data-tip-title="${a(labels[i])}" data-tip="${a(tips[i])}">
            <rect x="${x}" y="${y}" width="${W}" height="${H}" fill="${c}" stroke="${INK}" stroke-width="1"/>
            <text x="${x+W/2}" y="${y+H/2+5}" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}">${labels[i]}</text>
          </g>`;
        }).join('')}
        <rect x="60" y="340" width="100" height="18" rx="4" fill="${PRIMARY_SOFT}" stroke="${INK}" stroke-width="1"/>
        <text x="110" y="354" text-anchor="middle" font-size="10" fill="${INK}">투자·성장</text>
        <rect x="240" y="340" width="100" height="18" rx="4" fill="${AMBER_SOFT}" stroke="${INK}" stroke-width="1"/>
        <text x="290" y="354" text-anchor="middle" font-size="10" fill="${INK}">선택적 투자</text>
        <rect x="420" y="340" width="100" height="18" rx="4" fill="${CARD}" stroke="${INK}" stroke-width="1"/>
        <text x="470" y="354" text-anchor="middle" font-size="10" fill="${INK}">수확·철수</text>
      </svg>
      <div class="viz-caption">각 축은 5~7개 요소의 가중 합산 점수 · 버블 크기 = 사업 매출 규모</div>
    </div>`;
  };

  /* ============================================================
     22. 시나리오 플래닝
     ============================================================ */
  const scenarioThumb = () => {
    const X0=20, XM=140, X2=260, Y0=20, YM=90, Y2=160;
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="${X0}" y="${Y0}" width="${XM-X0}" height="${YM-Y0}" fill="${PRIMARY_SOFT}"/>
      <rect x="${XM}" y="${Y0}" width="${X2-XM}" height="${YM-Y0}" fill="${AMBER_SOFT}"/>
      <rect x="${X0}" y="${YM}" width="${XM-X0}" height="${Y2-YM}" fill="${CARD}"/>
      <rect x="${XM}" y="${YM}" width="${X2-XM}" height="${Y2-YM}" fill="${PAPER}"/>
      <rect x="${X0}" y="${Y0}" width="${X2-X0}" height="${Y2-Y0}" fill="none" stroke="${INK}" stroke-width="1"/>
      <line x1="${X0}" y1="${YM}" x2="${X2}" y2="${YM}" stroke="${INK}" stroke-width="1"/>
      <line x1="${XM}" y1="${Y0}" x2="${XM}" y2="${Y2}" stroke="${INK}" stroke-width="1"/>
      <text x="${(X0+XM)/2}" y="${(Y0+YM)/2+4}" text-anchor="middle" font-size="10" font-weight="600" fill="${INK}">시나리오 A</text>
      <text x="${(XM+X2)/2}" y="${(Y0+YM)/2+4}" text-anchor="middle" font-size="10" font-weight="600" fill="${INK}">시나리오 B</text>
      <text x="${(X0+XM)/2}" y="${(YM+Y2)/2+4}" text-anchor="middle" font-size="10" font-weight="600" fill="${INK}">시나리오 C</text>
      <text x="${(XM+X2)/2}" y="${(YM+Y2)/2+4}" text-anchor="middle" font-size="10" font-weight="600" fill="${INK}">시나리오 D</text>
      <text x="${(X0+X2)/2}" y="14" text-anchor="middle" font-size="8" fill="${MUTED}">드라이버 1</text>
      <text x="10" y="${(Y0+Y2)/2+4}" text-anchor="middle" font-size="8" fill="${MUTED}" transform="rotate(-90,10,${(Y0+Y2)/2})">드라이버 2</text>
    </svg>`;
  };
  const scenarioFull = () => {
    const X0=40, XM=380, X2=720, Y0=40, YM=210, Y2=380;
    const quads = [
      { x:X0, y:Y0, w:XM-X0, h:YM-Y0, fill:PRIMARY_SOFT, label:'시나리오 A', name:'기술 가속·협력 강화', tip:'기술 변화가 빠르고 글로벌 협력이 유지되는 세계. 플랫폼·AI 선도 기업이 가장 유리합니다.' },
      { x:XM, y:Y0, w:X2-XM, h:YM-Y0, fill:AMBER_SOFT,   label:'시나리오 B', name:'기술 가속·분절화',   tip:'기술은 빠르게 진화하지만 지정학적 분절로 공급망이 갈린 세계. 지역별 현지화 역량이 핵심입니다.' },
      { x:X0, y:YM, w:XM-X0, h:Y2-YM, fill:CARD,          label:'시나리오 C', name:'기술 지체·협력 유지', tip:'기술 발전이 느리고 규제가 강한 세계. 전통 역량과 규제 대응력을 가진 기업이 안정적 위치를 유지합니다.' },
      { x:XM, y:YM, w:X2-XM, h:Y2-YM, fill:PAPER,         label:'시나리오 D', name:'기술 지체·분절 심화', tip:'가장 어려운 시나리오. 기술 성장도 느리고 지정학 갈등도 극심합니다. 수비적 전략과 비용 효율화가 생존 키입니다.' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        ${quads.map(q=>`
          <g data-tip-title="${a(q.label)} · ${a(q.name)}" data-tip="${a(q.tip)}">
            <rect x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}" fill="${q.fill}"/>
            <text x="${q.x+q.w/2}" y="${q.y+q.h/2-8}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${q.label}</text>
            <text x="${q.x+q.w/2}" y="${q.y+q.h/2+12}" text-anchor="middle" font-size="12" fill="${MUTED}">${q.name}</text>
          </g>`).join('')}
        <rect x="${X0}" y="${Y0}" width="${X2-X0}" height="${Y2-Y0}" fill="none" stroke="${INK}" stroke-width="1.5"/>
        <line x1="${X0}" y1="${YM}" x2="${X2}" y2="${YM}" stroke="${INK}" stroke-width="1.5"/>
        <line x1="${XM}" y1="${Y0}" x2="${XM}" y2="${Y2}" stroke="${INK}" stroke-width="1.5"/>
        <text x="${(X0+XM)/2}" y="28" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">글로벌 협력 강화</text>
        <text x="${(XM+X2)/2}" y="28" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">지정학 분절 심화</text>
        <text x="28" y="${(Y0+YM)/2+4}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}" transform="rotate(-90,28,${(Y0+YM)/2})">기술 가속</text>
        <text x="28" y="${(YM+Y2)/2+4}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}" transform="rotate(-90,28,${(YM+Y2)/2})">기술 지체</text>
      </svg>
      <div class="viz-caption">드라이버 축은 프로젝트마다 다르게 설정 · 선행 지표로 어느 시나리오로 가는지 모니터링합니다</div>
    </div>`;
  };

  /* ============================================================
     23. OKR
     ============================================================ */
  const okrThumb = () => {
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="240" height="38" rx="4" fill="${PRIMARY_SOFT}" stroke="${INK}" stroke-width="1"/>
      <text x="140" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">O · 목표 (Objective)</text>
      ${[0,1,2].map(i=>`
        <rect x="20" y="${72+i*34}" width="240" height="28" rx="3" fill="${CARD}" stroke="${INK}" stroke-width="0.8"/>
        <text x="36" y="${89+i*34}" font-size="10" font-weight="600" fill="${PRIMARY}">KR${i+1}</text>
        <text x="60" y="${89+i*34}" font-size="10" fill="${INK}">핵심 결과 ${i+1}</text>
        <rect x="170" y="${76+i*34}" width="72" height="14" rx="7" fill="${HAIRLINE}"/>
        <rect x="170" y="${76+i*34}" width="${[45,30,60][i]}" height="14" rx="7" fill="${PRIMARY}"/>
      `).join('')}
    </svg>`;
  };
  const okrFull = () => {
    const krs = [
      { n:'KR 1', label:'검색 정확도 개선', target:'20%', cur:'14%', pct:70, tip:'측정 가능한 수치로 정의합니다. 0.7 달성이 이상적입니다.' },
      { n:'KR 2', label:'페이지 로딩 속도', target:'100ms 이내', cur:'142ms', pct:40, tip:'현재 142ms. 100ms까지 줄여야 합니다. 기술 최적화 필요.' },
      { n:'KR 3', label:'쿼리당 클릭률', target:'+10%', cur:'+6%', pct:60, tip:'CTR 개선은 검색 품질과 직결됩니다. UX 개선과 병행해야 합니다.' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        <g data-tip-title="Objective (목표)" data-tip="달성하고 싶은 질적 목표입니다. 도전적이고 명확해야 합니다. '무엇을 달성할 것인가'를 한 문장으로 표현합니다.">
          <rect x="40" y="30" width="680" height="64" rx="10" fill="${PRIMARY_SOFT}" stroke="${INK}" stroke-width="1.5"/>
          <text x="380" y="62" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}">O · 검색 품질을 세계 최고 수준으로 만든다</text>
          <text x="380" y="82" text-anchor="middle" font-size="12" fill="${MUTED}">Objective · 분기 목표 · 도전적이되 달성 가능한 수준</text>
        </g>
        ${krs.map((kr,i)=>`
          <g data-tip-title="${a(kr.n)} · ${a(kr.label)}" data-tip="${a(kr.tip)}">
            <rect x="40" y="${130+i*76}" width="680" height="62" rx="8" fill="${PAPER}" stroke="${INK}" stroke-width="1"/>
            <rect x="60" y="${146+i*76}" width="36" height="28" rx="6" fill="${INK}"/>
            <text x="78" y="${166+i*76}" text-anchor="middle" font-size="11" font-weight="700" fill="${ON_DARK}">${kr.n}</text>
            <text x="116" y="${158+i*76}" font-size="14" font-weight="600" fill="${INK}">${kr.label}</text>
            <text x="116" y="${175+i*76}" font-size="11" fill="${MUTED}">목표: ${kr.target}  /  현재: ${kr.cur}</text>
            <rect x="420" y="${152+i*76}" width="260" height="14" rx="7" fill="${HAIRLINE}"/>
            <rect x="420" y="${152+i*76}" width="${260*kr.pct/100}" height="14" rx="7" fill="${PRIMARY}"/>
            <text x="${420+260*kr.pct/100+8}" y="${163+i*76}" font-size="11" font-weight="600" fill="${PRIMARY}">${kr.pct}%</text>
          </g>`).join('')}
        <text x="40" y="370" font-size="11" fill="${MUTED}">채점 기준: 0.0 실패 · 0.5~0.7 도전적 달성 ✓ · 1.0 목표가 너무 쉬웠는지 재검토</text>
      </svg>
      <div class="viz-caption">O는 질적 방향 · KR은 숫자로 측정 가능한 결과 · 분기별 설정 및 리뷰</div>
    </div>`;
  };

  /* ============================================================
     24. 블루오션 전략 (전략 캔버스)
     ============================================================ */
  const blueOceanThumb = () => {
    const pts1 = [20,80, 60,60, 100,90, 140,50, 180,70, 220,40, 260,55];
    const pts2 = [20,100,60,80, 100,60, 140,90, 180,50, 220,80, 260,35];
    const toPath = pts => {
      const arr = [];
      for(let i=0;i<pts.length;i+=2) arr.push(`${pts[i]},${pts[i+1]}`);
      return 'M'+arr.join(' L');
    };
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="20" x2="20" y2="160" stroke="${INK}" stroke-width="1"/>
      <line x1="20" y1="160" x2="260" y2="160" stroke="${INK}" stroke-width="1"/>
      <path d="${toPath(pts1)}" fill="none" stroke="${MUTED}" stroke-width="2" stroke-dasharray="5,3"/>
      <path d="${toPath(pts2)}" fill="none" stroke="${PRIMARY}" stroke-width="2.5"/>
      <text x="140" y="175" text-anchor="middle" font-size="8" fill="${MUTED}">경쟁 요소</text>
      <rect x="200" y="20" width="40" height="10" rx="2" fill="${PRIMARY}"/>
      <text x="244" y="29" font-size="8" fill="${INK}">자사</text>
      <rect x="200" y="34" width="40" height="6" rx="2" fill="${MUTED}" opacity="0.6"/>
      <text x="244" y="40" font-size="8" fill="${MUTED}">경쟁사</text>
    </svg>`;
  };
  const blueOceanFull = () => {
    const factors = ['가격','서비스\n복잡도','브랜드\n화려함','고객\n경험','기술\n혁신','접근성','스토리'];
    const competitor = [80,60,90,45,30,50,25];
    const us = [35,20,40,90,85,80,95];
    const n = factors.length;
    const ox=80, chartW=580, chartH=200, oy=60;
    const stepX = chartW/(n-1);
    const scaleY = v => oy + chartH - (v/100)*chartH;
    const compPts = competitor.map((v,i)=>`${ox+i*stepX},${scaleY(v)}`).join(' ');
    const usPts = us.map((v,i)=>`${ox+i*stepX},${scaleY(v)}`).join(' ');
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        <line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy+chartH}" stroke="${INK}" stroke-width="1"/>
        <line x1="${ox}" y1="${oy+chartH}" x2="${ox+chartW}" y2="${oy+chartH}" stroke="${INK}" stroke-width="1"/>
        ${[0,25,50,75,100].map(v=>`
          <line x1="${ox-6}" y1="${scaleY(v)}" x2="${ox+chartW}" y2="${scaleY(v)}" stroke="${HAIRLINE}" stroke-width="1"/>
          <text x="${ox-10}" y="${scaleY(v)+4}" text-anchor="end" font-size="10" fill="${MUTED}">${v}</text>
        `).join('')}
        ${factors.map((f,i)=>`
          <text x="${ox+i*stepX}" y="${oy+chartH+20}" text-anchor="middle" font-size="11" fill="${INK}">${f.replace('\n',' ')}</text>
          <line x1="${ox+i*stepX}" y1="${oy+chartH}" x2="${ox+i*stepX}" y2="${oy+chartH+8}" stroke="${INK}" stroke-width="1"/>
        `).join('')}
        <polyline points="${compPts}" fill="none" stroke="${MUTED}" stroke-width="2" stroke-dasharray="6,4"/>
        <polyline points="${usPts}" fill="none" stroke="${PRIMARY}" stroke-width="3"/>
        ${competitor.map((v,i)=>`<circle cx="${ox+i*stepX}" cy="${scaleY(v)}" r="5" fill="${MUTED}"/>`).join('')}
        ${us.map((v,i)=>`
          <g data-tip-title="${a(factors[i].replace('\n',' '))}" data-tip="${a('자사 제공 수준: '+v+'/100  ·  경쟁사: '+competitor[i]+'/100. 전략 캔버스는 어느 요소를 제거·감소·증가·창조할지 결정하는 근거가 됩니다.')}">
            <circle cx="${ox+i*stepX}" cy="${scaleY(v)}" r="7" fill="${PRIMARY}"/>
          </g>`).join('')}
        <rect x="560" y="28" width="140" height="34" rx="4" fill="${PAPER}" stroke="${HAIRLINE}" stroke-width="1"/>
        <line x1="572" y1="40" x2="596" y2="40" stroke="${PRIMARY}" stroke-width="3"/>
        <text x="602" y="44" font-size="11" fill="${INK}">자사 (블루오션)</text>
        <line x1="572" y1="54" x2="596" y2="54" stroke="${MUTED}" stroke-width="2" stroke-dasharray="4,3"/>
        <text x="602" y="58" font-size="11" fill="${MUTED}">경쟁사 평균</text>
        <text x="${ox-10}" y="${oy-8}" font-size="11" font-weight="600" fill="${INK}">제공 수준</text>
      </svg>
      <div class="viz-caption">전략 캔버스 · 선이 다르게 그려지는 곳이 차별화 지점 · ERRC 그리드로 각 요소를 제거·감소·증가·창조합니다</div>
    </div>`;
  };

  /* ============================================================
     17. BCG 성장-점유율 매트릭스
     ============================================================ */
  const bcgThumb = () => {
    const mid = { x: 140, y: 90 };
    const quads = [
      { x: 20,  y: 20,  fill: PRIMARY_SOFT, label: '★' },
      { x: 140, y: 20,  fill: CARD,         label: '?' },
      { x: 20,  y: 90,  fill: AMBER_SOFT,   label: '🐄' },
      { x: 140, y: 90,  fill: PAPER,        label: '🐕' }
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${quads.map(q => `<rect x="${q.x}" y="${q.y}" width="118" height="68" fill="${q.fill}" stroke="${INK}" stroke-width="1"/>`).join('')}
      ${quads.map(q => `<text x="${q.x + 59}" y="${q.y + 40}" text-anchor="middle" font-size="22" fill="${INK}">${q.label}</text>`).join('')}
      <text x="14" y="96" text-anchor="middle" font-size="8" fill="${MUTED}" transform="rotate(-90,14,96)">시장성장률</text>
      <text x="140" y="172" text-anchor="middle" font-size="8" fill="${MUTED}">상대적 시장점유율 →</text>
    </svg>`;
  };
  const bcgFull = () => {
    const quads = [
      { x: 40, y: 40, w: 320, h: 260, fill: PRIMARY_SOFT, label: 'Star', ko: '스타', icon: '★', tip: '고성장·고점유. 현재 시장을 선도하고 있습니다. 투자를 유지해 성장과 점유율을 지켜야 합니다. 언젠가 현금소(Cash Cow)가 됩니다.' },
      { x: 360, y: 40, w: 360, h: 260, fill: CARD, label: 'Question Mark', ko: '물음표', icon: '?', tip: '고성장·저점유. 가능성은 있지만 아직 시장에서 이기지 못하고 있습니다. 집중 투자해 스타로 올리거나, 가능성이 낮으면 철수합니다.' },
      { x: 40, y: 300, w: 320, h: 100, fill: AMBER_SOFT, label: 'Cash Cow', ko: '현금소', icon: '💰', tip: '저성장·고점유. 안정적으로 현금을 창출합니다. 추가 투자보다 현금 수확에 집중하고, 창출된 현금을 스타·물음표에 투자합니다.' },
      { x: 360, y: 300, w: 360, h: 100, fill: PAPER, label: 'Dog', ko: '개', icon: '🐕', tip: '저성장·저점유. 성장도 점유율도 낮습니다. 원가 절감으로 현금 창출을 최소화하거나 철수를 검토합니다.' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        ${quads.map(q => `
          <g data-tip-title="${a(q.label)} (${a(q.ko)})" data-tip="${a(q.tip)}">
            <rect x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}" fill="${q.fill}" stroke="${INK}" stroke-width="1.2"/>
            <text x="${q.x + q.w/2}" y="${q.y + 50}" text-anchor="middle" font-size="28" fill="${INK}">${q.icon}</text>
            <text x="${q.x + q.w/2}" y="${q.y + 80}" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}">${q.label}</text>
            <text x="${q.x + q.w/2}" y="${q.y + 100}" text-anchor="middle" font-size="13" fill="${MUTED}">${q.ko}</text>
          </g>`).join('')}
        <text x="22" y="220" text-anchor="middle" font-size="12" fill="${MUTED}" transform="rotate(-90,22,220)">시장 성장률 (高 ← → 低)</text>
        <text x="400" y="415" text-anchor="middle" font-size="12" fill="${MUTED}">상대적 시장 점유율 (高 ← → 低)</text>
        <line x1="40" y1="300" x2="720" y2="300" stroke="${INK}" stroke-width="1" stroke-dasharray="4,3"/>
        <line x1="360" y1="40" x2="360" y2="400" stroke="${INK}" stroke-width="1" stroke-dasharray="4,3"/>
      </svg>
      <div class="viz-caption">버블 크기 = 사업 매출 규모 · 투자→유지→수확→철수 순서로 자원을 배분합니다</div>
    </div>`;
  };

  /* ============================================================
     18. Ansoff 성장 매트릭스
     ============================================================ */
  const ansoffThumb = () => {
    const quads = [
      { x: 20,  y: 20,  fill: PRIMARY_SOFT, label: '시장\n침투' },
      { x: 150, y: 20,  fill: AMBER_SOFT,   label: '제품\n개발' },
      { x: 20,  y: 100, fill: AMBER_SOFT,   label: '시장\n개발' },
      { x: 150, y: 100, fill: CARD,         label: '다각화' }
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${quads.map(q => `<rect x="${q.x}" y="${q.y}" width="108" height="68" fill="${q.fill}" stroke="${INK}" stroke-width="1"/>`).join('')}
      <text x="74"  y="61"  text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">시장침투</text>
      <text x="204" y="61"  text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">제품개발</text>
      <text x="74"  y="141" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">시장개발</text>
      <text x="204" y="141" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">다각화</text>
      <text x="74"  y="14"  text-anchor="middle" font-size="8" fill="${MUTED}">기존 제품</text>
      <text x="204" y="14"  text-anchor="middle" font-size="8" fill="${MUTED}">신규 제품</text>
      <text x="10"  y="57"  text-anchor="middle" font-size="8" fill="${MUTED}" transform="rotate(-90,10,57)">기존시장</text>
      <text x="10"  y="137" text-anchor="middle" font-size="8" fill="${MUTED}" transform="rotate(-90,10,137)">신규시장</text>
    </svg>`;
  };
  const ansoffFull = () => {
    const quads = [
      { x: 60, y: 40, w: 310, h: 180, fill: PRIMARY_SOFT, en: 'Market Penetration', ko: '시장 침투', risk: '위험 최저', tip: '기존 제품으로 기존 시장에서 점유율을 높입니다. 가격·마케팅 강화, 유통 확대, 경쟁사 고객 유입. 가장 안전한 성장 경로입니다.' },
      { x: 390, y: 40, w: 330, h: 180, fill: AMBER_SOFT, en: 'Product Development', ko: '제품 개발', risk: '위험 중간', tip: '기존 고객에게 새로운 제품·서비스를 판매합니다. 이미 고객 신뢰가 있어 시장 개발보다 성공 확률이 높습니다. R&D 역량이 관건입니다.' },
      { x: 60, y: 240, w: 310, h: 140, fill: AMBER_SOFT, en: 'Market Development', ko: '시장 개발', risk: '위험 중간', tip: '기존 제품을 새로운 시장(신규 지역, 새로운 고객층)에 판매합니다. 제품 리스크는 낮지만 시장 이해와 현지화 역량이 필요합니다.' },
      { x: 390, y: 240, w: 330, h: 140, fill: CARD, en: 'Diversification', ko: '다각화', risk: '위험 최고', tip: '신제품으로 새로운 시장에 진출합니다. 연관 다각화(기존 역량 활용)와 비연관 다각화로 구분되며, 성공 시 보상도 크지만 실패 위험도 가장 큽니다.' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        <text x="215" y="28" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}">기존 제품</text>
        <text x="555" y="28" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}">신규 제품</text>
        <text x="32" y="140" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}" transform="rotate(-90,32,140)">기존 시장</text>
        <text x="32" y="320" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}" transform="rotate(-90,32,320)">신규 시장</text>
        ${quads.map(q => `
          <g data-tip-title="${a(q.en)} (${a(q.ko)})" data-tip="${a(q.tip)}">
            <rect x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}" fill="${q.fill}" stroke="${INK}" stroke-width="1.2"/>
            <text x="${q.x + q.w/2}" y="${q.y + 44}" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}">${q.en}</text>
            <text x="${q.x + q.w/2}" y="${q.y + 64}" text-anchor="middle" font-size="13" fill="${MUTED}">${q.ko}</text>
            <rect x="${q.x + q.w/2 - 36}" y="${q.y + 76}" width="72" height="22" rx="11" fill="${INK}" opacity="0.12"/>
            <text x="${q.x + q.w/2}" y="${q.y + 91}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${q.risk}</text>
          </g>`).join('')}
        <line x1="60" y1="240" x2="720" y2="240" stroke="${INK}" stroke-width="1" stroke-dasharray="5,3"/>
        <line x1="370" y1="40" x2="370" y2="380" stroke="${INK}" stroke-width="1" stroke-dasharray="5,3"/>
      </svg>
      <div class="viz-caption">위험이 낮은 왼쪽 상단부터 시작해 오른쪽 하단으로 갈수록 도전적 성장입니다</div>
    </div>`;
  };

  /* ============================================================
     19. 이슈 트리 / MECE
     ============================================================ */
  const issueTreeThumb = () => {
    const nodes = [
      { x: 100, y: 30,  w: 80, h: 28, fill: PRIMARY_SOFT, label: '핵심 질문' },
      { x: 55,  y: 90,  w: 70, h: 24, fill: CARD, label: '이슈 A' },
      { x: 155, y: 90,  w: 70, h: 24, fill: CARD, label: '이슈 B' },
      { x: 27,  y: 142, w: 54, h: 22, fill: PAPER, label: 'A-1' },
      { x: 89,  y: 142, w: 54, h: 22, fill: PAPER, label: 'A-2' },
      { x: 133, y: 142, w: 54, h: 22, fill: PAPER, label: 'B-1' },
      { x: 195, y: 142, w: 54, h: 22, fill: PAPER, label: 'B-2' }
    ];
    const paths = [
      `M 140 58 L 140 74 L 90 74 L 90 90`,
      `M 140 58 L 140 74 L 190 74 L 190 90`,
      `M 90 114 L 90 128 L 54 128 L 54 142`,
      `M 90 114 L 90 128 L 116 128 L 116 142`,
      `M 190 114 L 190 128 L 160 128 L 160 142`,
      `M 190 114 L 190 128 L 222 128 L 222 142`
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${paths.map(d => `<path d="${d}" stroke="${INK}" stroke-width="1" fill="none"/>`).join('')}
      ${nodes.map(n => `
        <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="3" fill="${n.fill}" stroke="${INK}" stroke-width="0.8"/>
        <text x="${n.x + n.w/2}" y="${n.y + n.h/2 + 4}" text-anchor="middle" font-size="9" font-weight="600" fill="${INK}">${n.label}</text>
      `).join('')}
    </svg>`;
  };
  const issueTreeFull = () => {
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        <g data-tip-title="핵심 질문 (Key Question)" data-tip="트리의 뿌리입니다. 해결해야 할 단 하나의 문제를 명확히 정의합니다. 이 정의가 잘못되면 트리 전체가 틀립니다.">
          <rect x="260" y="20" width="240" height="52" rx="8" fill="${PRIMARY_SOFT}" stroke="${INK}" stroke-width="1.5"/>
          <text x="380" y="43" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}">핵심 질문 (Key Question)</text>
          <text x="380" y="61" text-anchor="middle" font-size="11" fill="${MUTED}">왜 이익이 감소했는가?</text>
        </g>
        <path d="M 380 72 L 380 91 L 190 91 L 190 110" stroke="${INK}" stroke-width="1.2" fill="none"/>
        <path d="M 380 72 L 380 91 L 570 91 L 570 110" stroke="${INK}" stroke-width="1.2" fill="none"/>
        <g data-tip-title="이슈 A · 수익 감소" data-tip="MECE 분해의 첫 번째 축. 수익 측면에서 이익 감소의 원인을 파고듭니다. 가격과 수량으로 다시 분해됩니다.">
          <rect x="100" y="110" width="180" height="44" rx="6" fill="${CARD}" stroke="${INK}" stroke-width="1.2"/>
          <text x="190" y="130" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}">수익 감소</text>
          <text x="190" y="147" text-anchor="middle" font-size="10" fill="${MUTED}">Revenue Decline</text>
        </g>
        <g data-tip-title="이슈 B · 비용 증가" data-tip="MECE 분해의 두 번째 축. 비용 측면에서 이익 감소의 원인을 파고듭니다. 변동비와 고정비로 분해됩니다.">
          <rect x="480" y="110" width="180" height="44" rx="6" fill="${CARD}" stroke="${INK}" stroke-width="1.2"/>
          <text x="570" y="130" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}">비용 증가</text>
          <text x="570" y="147" text-anchor="middle" font-size="10" fill="${MUTED}">Cost Increase</text>
        </g>
        <path d="M 190 154 L 190 175 L 110 175 L 110 195" stroke="${INK}" stroke-width="1" fill="none"/>
        <path d="M 190 154 L 190 175 L 270 175 L 270 195" stroke="${INK}" stroke-width="1" fill="none"/>
        <path d="M 570 154 L 570 175 L 490 175 L 490 195" stroke="${INK}" stroke-width="1" fill="none"/>
        <path d="M 570 154 L 570 175 L 650 175 L 650 195" stroke="${INK}" stroke-width="1" fill="none"/>
        ${[
          { x:50,  tip:'단위당 판매 가격이 내려갔는가? 경쟁 심화·할인 증가·믹스 변화가 원인일 수 있습니다.', label:'가격 하락', sub:'Price Decline' },
          { x:210, tip:'판매 수량이 줄었는가? 수요 감소·고객 이탈·영업력 약화를 점검합니다.', label:'수량 감소', sub:'Volume Decline' },
          { x:430, tip:'원자재·외주·물류 등 변동비가 올랐는가? 인플레이션·공급망 이슈가 주원인.', label:'변동비 상승', sub:'Variable Cost Up' },
          { x:590, tip:'인건비·시설·감가상각 등 고정비가 늘었는가? 규모 확장·투자 집행이 원인.', label:'고정비 증가', sub:'Fixed Cost Up' }
        ].map(n => `
          <g data-tip-title="${a(n.label)}" data-tip="${a(n.tip)}">
            <rect x="${n.x}" y="195" width="120" height="44" rx="5" fill="${PAPER}" stroke="${INK}" stroke-width="1"/>
            <text x="${n.x + 60}" y="215" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">${n.label}</text>
            <text x="${n.x + 60}" y="231" text-anchor="middle" font-size="9" fill="${MUTED}">${n.sub}</text>
          </g>`).join('')}
        <rect x="20" y="270" width="720" height="110" rx="6" fill="${CARD}" stroke="${HAIRLINE}" stroke-width="1"/>
        <text x="380" y="295" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">MECE 원칙</text>
        <circle cx="60" cy="322" r="5" fill="${PRIMARY}"/>
        <text x="76" y="327" font-size="12" fill="${BODY}">Mutually Exclusive · 이슈 간 중복 없음. A와 B가 겹치지 않아야 합니다.</text>
        <circle cx="60" cy="350" r="5" fill="${PRIMARY}"/>
        <text x="76" y="355" font-size="12" fill="${BODY}">Collectively Exhaustive · 누락 없음. A + B + ··· = 핵심 질문 전체를 커버해야 합니다.</text>
      </svg>
      <div class="viz-caption">핵심 질문 → MECE 분해 → 가설 수립 → 검증 순서로 문제를 해결합니다</div>
    </div>`;
  };

  /* ============================================================
     20. Balanced Scorecard (BSC)
     ============================================================ */
  const bscThumb = () => {
    const quads = [
      { x: 20,  y: 20,  fill: PRIMARY_SOFT, label: '재무', sub: 'Financial' },
      { x: 150, y: 20,  fill: AMBER_SOFT,   label: '고객', sub: 'Customer' },
      { x: 20,  y: 100, fill: CARD,         label: '프로세스', sub: 'Process' },
      { x: 150, y: 100, fill: PAPER,        label: '학습·성장', sub: 'Learning' }
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${quads.map(q => `
        <rect x="${q.x}" y="${q.y}" width="118" height="68" rx="4" fill="${q.fill}" stroke="${INK}" stroke-width="1"/>
        <text x="${q.x + 59}" y="${q.y + 32}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${q.label}</text>
        <text x="${q.x + 59}" y="${q.y + 50}" text-anchor="middle" font-size="9" fill="${MUTED}">${q.sub}</text>
      `).join('')}
      <circle cx="140" cy="90" r="18" fill="${INK}"/>
      <text x="140" y="86"  text-anchor="middle" font-size="7" font-weight="600" fill="${ON_DARK}">전략</text>
      <text x="140" y="96"  text-anchor="middle" font-size="7" font-weight="600" fill="${ON_DARK}">Strategy</text>
    </svg>`;
  };
  const bscFull = () => {
    const quads = [
      { x: 40, y: 40, w: 300, h: 160, fill: PRIMARY_SOFT, ko: '재무 관점', en: 'Financial', kpi: '매출성장률 · 영업이익률 · ROI · EBITDA', tip: '주주와 이해관계자에게 어떻게 보일 것인가. 재무 지표는 전략 실행의 최종 결과입니다. 다른 3개 관점이 개선되면 재무 성과가 따라옵니다.' },
      { x: 420, y: 40, w: 300, h: 160, fill: AMBER_SOFT, ko: '고객 관점', en: 'Customer', kpi: 'NPS · 고객만족도 · 시장점유율 · 유지율', tip: '표적 고객에게 어떻게 보일 것인가. 고객이 우리를 선택하고 머무는 이유를 KPI로 측정합니다.' },
      { x: 40, y: 240, w: 300, h: 140, fill: CARD, ko: '내부 프로세스 관점', en: 'Internal Process', kpi: '처리 속도 · 품질 불량률 · 자동화율', tip: '어떤 프로세스에서 탁월해야 하는가. 고객 가치를 전달하고 비용을 통제하는 핵심 내부 활동을 측정합니다.' },
      { x: 420, y: 240, w: 300, h: 140, fill: PAPER, ko: '학습·성장 관점', en: 'Learning & Growth', kpi: '직원 역량 지수 · 디지털 역량 · 이직률', tip: '혁신과 성장 능력을 어떻게 유지할 것인가. 사람·기술·문화의 역량을 측정하며 나머지 3개 관점의 기반입니다.' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        ${quads.map(q => `
          <g data-tip-title="${a(q.ko)} (${a(q.en)})" data-tip="${a(q.tip)}">
            <rect x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}" rx="8" fill="${q.fill}" stroke="${INK}" stroke-width="1.2"/>
            <text x="${q.x + 20}" y="${q.y + 32}" font-size="16" font-weight="700" fill="${INK}">${q.ko}</text>
            <text x="${q.x + 20}" y="${q.y + 50}" font-size="10" letter-spacing="0.06em" fill="${MUTED}">${q.en.toUpperCase()}</text>
            <line x1="${q.x + 20}" y1="${q.y + 62}" x2="${q.x + q.w - 20}" y2="${q.y + 62}" stroke="${HAIRLINE}" stroke-width="1"/>
            <text x="${q.x + 20}" y="${q.y + 80}" font-size="11" fill="${BODY}">KPI 예시</text>
            <text x="${q.x + 20}" y="${q.y + 98}" font-size="11" fill="${MUTED}">${q.kpi}</text>
          </g>`).join('')}
        <circle cx="380" cy="200" r="46" fill="${INK}"/>
        <text x="380" y="192" text-anchor="middle" font-size="13" font-weight="700" fill="${ON_DARK}">Vision &</text>
        <text x="380" y="210" text-anchor="middle" font-size="13" font-weight="700" fill="${ON_DARK}">Strategy</text>
        <text x="380" y="226" text-anchor="middle" font-size="10" fill="${ON_DARK}" opacity="0.7">비전과 전략</text>
        ${[[340,154,314,130],[420,154,446,130],[340,246,314,270],[420,246,446,270]].map(([x1,y1,x2,y2]) =>
          `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr)"/>`).join('')}
      </svg>
      <div class="viz-caption">4개 관점이 전략을 중심으로 인과관계로 연결됩니다 · 아래에서 위로 역량→프로세스→고객→재무</div>
    </div>`;
  };

  /* ============================================================
     28. 피라미드 원칙 (Pyramid Principle)
     ============================================================ */
  const pyramidThumb = () => {
    const layers = [
      { y: 20,  w: 120, label: '핵심 메시지', fill: PRIMARY },
      { y: 66,  w: 196, label: '논거 1  ·  논거 2  ·  논거 3', fill: PRIMARY_SOFT },
      { y: 112, w: 260, label: '데이터  ·  사실  ·  사례  ·  분석', fill: CARD }
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
      ${layers.map(l => {
        const x = (280 - l.w) / 2;
        const h = 34;
        return `
          <rect x="${x}" y="${l.y}" width="${l.w}" height="${h}" rx="3" fill="${l.fill}" stroke="${INK}" stroke-width="0.8"/>
          <text x="140" y="${l.y + h/2 + 4}" text-anchor="middle" font-size="9" font-weight="600" fill="${l.fill === PRIMARY ? ON_DARK : INK}">${l.label}</text>
        `;
      }).join('')}
      <text x="140" y="155" text-anchor="middle" font-size="8" fill="${MUTED}">결론 먼저 · 근거 나중</text>
    </svg>`;
  };
  const pyramidFull = () => {
    const a = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const layers = [
      { y: 30,  w: 260, h: 52, fill: PRIMARY,      textFill: ON_DARK, label: '핵심 메시지 (So What?)', sub: '구독 모델 도입으로 18개월 내 점유율 2위 달성', tipTitle:'피라미드 정점', tip:'단 하나의 결론. 독자가 이 보고서를 다 읽지 않아도 알아야 할 핵심 메시지입니다.' },
      { y: 110, w: 740, h: 52, fill: PRIMARY_SOFT,  textFill: INK,    label: '키 라인 (Why So? · 논거 3개)', sub: '논거 A: LTV 3.2배  ·  논거 B: 경쟁사 공백  ·  논거 C: 파일럿 NPS 72', tipTitle:'키 라인', tip:'핵심 메시지를 직접 지지하는 2~4개 논거. 각 논거는 MECE해야 합니다.' },
      { y: 190, w: 740, h: 52, fill: CARD,          textFill: INK,    label: '서포팅 데이터 (How So?)', sub: '시장 분석  ·  고객 인터뷰  ·  파일럿 결과  ·  경쟁사 벤치마크', tipTitle:'서포팅 레이어', tip:'각 논거를 뒷받침하는 구체적 사실·분석·사례입니다.' }
    ];
    const scqa = [
      { label: 'S', title: 'Situation', desc: '국내 커피 시장 3위, 점유율 정체 2년째' },
      { label: 'C', title: 'Complication', desc: '1위·2위 격차 확대, 가격 경쟁 심화' },
      { label: 'Q', title: 'Question', desc: '어떻게 2위권으로 진입할 수 있는가?' },
      { label: 'A', title: 'Answer', desc: '구독 모델 도입으로 LTV를 높여 18개월 내 달성' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="22" text-anchor="middle" font-size="11" font-weight="600" fill="${MUTED}" letter-spacing="1">SCQA 도입부</text>
        ${scqa.map((s, i) => {
          const x = 20 + i * 180;
          return `
            <g data-tip-title="${a(s.title)}" data-tip="${a(s.desc)}">
              <rect x="${x}" y="28" width="168" height="44" rx="5" fill="${i === 3 ? PRIMARY_SOFT : PAPER}" stroke="${INK}" stroke-width="1"/>
              <text x="${x+16}" y="46" font-size="13" font-weight="700" fill="${PRIMARY}">${s.label}</text>
              <text x="${x+32}" y="46" font-size="12" font-weight="600" fill="${INK}">${s.title}</text>
              <text x="${x+16}" y="63" font-size="10" fill="${MUTED}">${s.desc}</text>
            </g>
            ${i < 3 ? `<text x="${x+174}" y="53" font-size="13" fill="${MUTED}">→</text>` : ''}
          `;
        }).join('')}
        ${layers.map(l => {
          const x = (760 - l.w) / 2;
          return `
            <g data-tip-title="${a(l.tipTitle)}" data-tip="${a(l.tip)}">
              <rect x="${x}" y="${l.y}" width="${l.w}" height="${l.h}" rx="5" fill="${l.fill}" stroke="${INK}" stroke-width="1.2"/>
              <text x="380" y="${l.y + l.h/2 - 6}" text-anchor="middle" font-size="13" font-weight="700" fill="${l.textFill}">${l.label}</text>
              <text x="380" y="${l.y + l.h/2 + 12}" text-anchor="middle" font-size="10" fill="${l.fill === PRIMARY ? ON_DARK : MUTED}">${l.sub}</text>
            </g>`;
        }).join('')}
        <rect x="20" y="272" width="720" height="90" rx="6" fill="${CARD}" stroke="${HAIRLINE}" stroke-width="1"/>
        <text x="380" y="295" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">MECE 원칙 적용</text>
        <circle cx="50" cy="320" r="5" fill="${PRIMARY}"/>
        <text x="66" y="325" font-size="12" fill="${BODY}">Mutually Exclusive · 논거 간 중복 없음 — A, B, C가 각각 독립적인 이유를 다룹니다.</text>
        <circle cx="50" cy="347" r="5" fill="${PRIMARY}"/>
        <text x="66" y="352" font-size="12" fill="${BODY}">Collectively Exhaustive · 누락 없음 — A + B + C를 합치면 핵심 메시지를 완전히 지지합니다.</text>
      </svg>
      <div class="viz-caption">SCQA로 맥락을 열고 → 핵심 메시지를 먼저 → 논거와 데이터로 뒷받침합니다</div>
    </div>`;
  };

  /* ============================================================
     29. 포지셔닝 맵 (Positioning Map)
     ============================================================ */
  const posMapThumb = () => {
    const brands = [
      { x: 210, y: 35,  r: 8,  fill: PRIMARY,     label: 'A' },
      { x: 155, y: 55,  r: 6,  fill: CARD,        label: 'B' },
      { x: 60,  y: 130, r: 7,  fill: CARD,        label: 'C' },
      { x: 100, y: 75,  r: 5,  fill: PAPER,       label: 'D' },
      { x: 195, y: 110, r: 6,  fill: PAPER,       label: 'E' }
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <line x1="140" y1="10" x2="140" y2="170" stroke="${HAIRLINE}" stroke-width="1"/>
      <line x1="10"  y1="90" x2="270" y2="90"  stroke="${HAIRLINE}" stroke-width="1"/>
      <text x="270" y="86" text-anchor="end" font-size="8" fill="${MUTED}">고가</text>
      <text x="12"  y="86" font-size="8" fill="${MUTED}">저가</text>
      <text x="140" y="8"  text-anchor="middle" font-size="8" fill="${MUTED}">프리미엄</text>
      <text x="140" y="178" text-anchor="middle" font-size="8" fill="${MUTED}">간편</text>
      <rect x="148" y="16" width="118" height="68" rx="3" fill="${PRIMARY}" opacity="0.06"/>
      <text x="207" y="40" text-anchor="middle" font-size="7.5" fill="${PRIMARY}" font-weight="600">기회 영역</text>
      ${brands.map(b => `
        <circle cx="${b.x}" cy="${b.y}" r="${b.r}" fill="${b.fill}" stroke="${INK}" stroke-width="0.8"/>
        <text x="${b.x + b.r + 3}" y="${b.y + 4}" font-size="7.5" fill="${INK}">${b.label}</text>
      `).join('')}
    </svg>`;
  };
  const posMapFull = () => {
    const a = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const brands = [
      { x: 560, y: 80,  r: 18, fill: PRIMARY,      label: '스타벅스',   tip: '고가·프리미엄 포지션. 브랜드·경험 중심 전략으로 높은 LTV와 충성도를 구축했습니다.' },
      { x: 430, y: 110, r: 13, fill: AMBER_SOFT,   label: '투썸',       tip: '중고가·프리미엄 영역. 디저트 결합 전략으로 차별화합니다.' },
      { x: 130, y: 290, r: 16, fill: CARD,          label: '메가커피',   tip: '저가·간편 포지션. 가격 경쟁력으로 급성장했습니다.' },
      { x: 200, y: 240, r: 11, fill: PAPER,         label: '컴포즈',     tip: '저가 영역의 신흥 경쟁자. 메가커피와 포지션이 인접합니다.' },
      { x: 320, y: 190, r: 10, fill: PAPER,         label: '이디야',     tip: '중간 가격대. 명확한 포지셔닝 정의가 필요한 위치입니다.' },
      { x: 490, y: 170, r: 12, fill: CARD,          label: '블루보틀',   tip: '고가·스페셜티 포지션. 희소성과 경험을 강점으로 합니다.' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        <line x1="380" y1="20"  x2="380" y2="360" stroke="${HAIRLINE}" stroke-width="1.5"/>
        <line x1="20"  y1="190" x2="740" y2="190" stroke="${HAIRLINE}" stroke-width="1.5"/>
        <text x="735" y="183" text-anchor="end" font-size="12" font-weight="600" fill="${MUTED}">고가 →</text>
        <text x="25"  y="183" font-size="12" font-weight="600" fill="${MUTED}">← 저가</text>
        <text x="380" y="16"  text-anchor="middle" font-size="12" font-weight="600" fill="${MUTED}">↑ 프리미엄</text>
        <text x="380" y="374" text-anchor="middle" font-size="12" font-weight="600" fill="${MUTED}">↓ 간편·기능적</text>
        <rect x="388" y="24" width="344" height="160" rx="6" fill="${PRIMARY}" opacity="0.07"/>
        <text x="560" y="110" text-anchor="middle" font-size="13" font-weight="700" fill="${PRIMARY}" opacity="0.6">기회 영역</text>
        <text x="560" y="128" text-anchor="middle" font-size="11" fill="${PRIMARY}" opacity="0.5">중고가 프리미엄 공백</text>
        ${brands.map(b => `
          <g data-tip-title="${a(b.label)}" data-tip="${a(b.tip)}">
            <circle cx="${b.x}" cy="${b.y}" r="${b.r}" fill="${b.fill}" stroke="${INK}" stroke-width="1.2"/>
            <text x="${b.x}" y="${b.y + b.r + 14}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${b.label}</text>
          </g>`).join('')}
      </svg>
      <div class="viz-caption">X축: 가격 수준 · Y축: 브랜드 경험 · 원 크기: 시장 점유율 (예시)</div>
    </div>`;
  };

  /* ============================================================
     30. 디자인 씽킹 (Design Thinking)
     ============================================================ */
  const dtThumb = () => {
    const steps = [
      { label: '공감', num: '01', fill: PRIMARY_SOFT },
      { label: '정의', num: '02', fill: AMBER_SOFT },
      { label: '발상', num: '03', fill: CARD },
      { label: '시제품', num: '04', fill: '#e8f4f0' },
      { label: '테스트', num: '05', fill: PRIMARY_SOFT }
    ];
    const bw = 42, bh = 52, gap = 6;
    const total = steps.length * bw + (steps.length - 1) * gap;
    const sx = (280 - total) / 2;
    const by = 52;
    const rows = steps.map((s, i) => {
      const x = sx + i * (bw + gap);
      const cx = x + bw / 2;
      return `
        <rect x="${x}" y="${by}" width="${bw}" height="${bh}" rx="5" fill="${s.fill}" stroke="${INK}" stroke-width="0.8"/>
        <text x="${cx}" y="${by + 18}" text-anchor="middle" font-size="7" font-weight="700" fill="${MUTED}">${s.num}</text>
        <text x="${cx}" y="${by + 34}" text-anchor="middle" font-size="9.5" font-weight="600" fill="${INK}">${s.label}</text>
        ${i < steps.length - 1 ? `<path d="M ${x + bw + 1} ${by + bh/2} L ${x + bw + gap - 1} ${by + bh/2}" stroke="${MUTED}" stroke-width="1" marker-end="none"/>
        <polygon points="${x + bw + gap - 1},${by + bh/2 - 2.5} ${x + bw + gap + 3},${by + bh/2} ${x + bw + gap - 1},${by + bh/2 + 2.5}" fill="${MUTED}"/>` : ''}
      `;
    }).join('');
    const arcY = by + bh + 6;
    const arcMid = by + bh + 24;
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${rows}
      <path d="M ${sx + total} ${arcY} Q ${sx + total / 2} ${arcMid} ${sx} ${arcY}" stroke="${PRIMARY}" stroke-width="1.2" fill="none" stroke-dasharray="3 3"/>
      <polygon points="${sx},${arcY - 3} ${sx - 3},${arcY + 2} ${sx + 3},${arcY + 2}" fill="${PRIMARY}"/>
      <text x="140" y="${arcMid + 18}" text-anchor="middle" font-size="7.5" fill="${PRIMARY}">반복 Iteration</text>
    </svg>`;
  };

  const dtFull = () => {
    const steps = [
      { en: 'Empathize', ko: '공감', fill: PRIMARY_SOFT, num: '01',
        lines: ['사용자 관찰·인터뷰로', '진짜 니즈를 발견합니다.', '가정이 아닌 현장'],
        tip: '사용자 관찰과 인터뷰로 진짜 니즈를 발견합니다. 가정이 아닌 현장 데이터가 출발점입니다.' },
      { en: 'Define',    ko: '정의', fill: AMBER_SOFT,   num: '02',
        lines: ['HMW 문장으로', '문제를 재정의합니다.', '좋은 정의가 해법을'],
        tip: 'HMW(어떻게 하면…?) 문장으로 문제를 재정의합니다. 좋은 정의가 좋은 해법을 낳습니다.' },
      { en: 'Ideate',    ko: '발상', fill: CARD,         num: '03',
        lines: ['판단 없이 최대한', '많은 아이디어를 냅니다.', '양이 질을 이깁니다'],
        tip: '판단 없이 최대한 많은 아이디어를 냅니다. 양이 질을 이깁니다.' },
      { en: 'Prototype', ko: '시제품', fill: '#e8f4f0',  num: '04',
        lines: ['빠르고 저렴하게', '아이디어를 실물화합니다.', '실패 비용을 낮춥니다'],
        tip: '빠르고 저렴하게 아이디어를 실물화합니다. 실패 비용을 낮추는 것이 목표입니다.' },
      { en: 'Test',      ko: '테스트', fill: PRIMARY_SOFT, num: '05',
        lines: ['실제 사용자에게', '프로토타입을 경험하게', '하고 피드백 수집'],
        tip: '실제 사용자에게 프로토타입을 경험하게 하고 피드백을 수집합니다.' }
    ];
    const cw = 132, ch = 200, gap = 8;
    const total = steps.length * cw + (steps.length - 1) * gap;
    const sx = (760 - total) / 2;
    const cy = 30;
    const cols = steps.map((s, i) => {
      const x = sx + i * (cw + gap);
      const mx = x + cw / 2;
      return `
        <g data-tip-title="${a(s.en)} · ${a(s.ko)}" data-tip="${a(s.tip)}">
          <rect x="${x}" y="${cy}" width="${cw}" height="${ch}" rx="8" fill="${s.fill}" stroke="${INK}" stroke-width="1.2"/>
          <rect x="${x}" y="${cy}" width="${cw}" height="36" rx="8" fill="${s.fill}" stroke="none"/>
          <rect x="${x}" y="${cy + 28}" width="${cw}" height="8" fill="${s.fill}" stroke="none"/>
          <text x="${mx}" y="${cy + 20}" text-anchor="middle" font-size="11" font-weight="700" fill="${MUTED}">${s.num}</text>
          <line x1="${x + 16}" y1="${cy + 36}" x2="${x + cw - 16}" y2="${cy + 36}" stroke="${INK}" stroke-width="0.6" opacity="0.3"/>
          <text x="${mx}" y="${cy + 60}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${s.en}</text>
          <text x="${mx}" y="${cy + 80}" text-anchor="middle" font-size="12" fill="${MUTED}">${s.ko}</text>
          <line x1="${x + 16}" y1="${cy + 92}" x2="${x + cw - 16}" y2="${cy + 92}" stroke="${INK}" stroke-width="0.6" opacity="0.2"/>
          ${s.lines.map((l, li) => `<text x="${mx}" y="${cy + 114 + li * 17}" text-anchor="middle" font-size="10" fill="${BODY}">${a(l)}</text>`).join('')}
        </g>
        ${i < steps.length - 1 ? `
          <polygon points="${x + cw + 3},${cy + ch/2 - 5} ${x + cw + gap - 1},${cy + ch/2} ${x + cw + 3},${cy + ch/2 + 5}" fill="${MUTED}" opacity="0.7"/>
        ` : ''}
      `;
    }).join('');
    const arcTop = cy + ch + 10;
    const arcBot = cy + ch + 42;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 345" xmlns="http://www.w3.org/2000/svg">
        ${cols}
        <path d="M ${sx + total} ${arcTop} Q ${sx + total / 2} ${arcBot} ${sx} ${arcTop}" stroke="${PRIMARY}" stroke-width="1.8" fill="none" stroke-dasharray="6 4"/>
        <polygon points="${sx},${arcTop - 4} ${sx - 5},${arcTop + 3} ${sx + 5},${arcTop + 3}" fill="${PRIMARY}"/>
        <text x="380" y="${arcBot + 20}" text-anchor="middle" font-size="12" font-weight="600" fill="${PRIMARY}">반복 (Iteration) — 테스트 결과로 Define 또는 Ideate 단계로 되돌아갑니다</text>
        <rect x="${sx}" y="${arcBot + 36}" width="${total}" height="28" rx="5" fill="${CARD}" stroke="${HAIRLINE}" stroke-width="1"/>
        <text x="380" y="${arcBot + 54}" text-anchor="middle" font-size="10.5" fill="${BODY}">인간 중심(Desirable) × 기술 가능성(Feasible) × 비즈니스 타당성(Viable)의 교차점에서 혁신이 탄생합니다</text>
      </svg>
      <div class="viz-caption">Empathize → Define → Ideate → Prototype → Test · 빠른 실패로 더 빠른 학습</div>
    </div>`;
  };

  const REG = {
    'bmc':              { thumb: bmcThumb,    full: bmcFull },
    'profit-equation':  { thumb: profitThumb, full: profitFull },
    'revenue-model':    { thumb: revThumb,    full: revFull },
    '3c':               { thumb: tcThumb,     full: tcFull },
    'swot':             { thumb: swotThumb,   full: swotFull },
    '5forces':          { thumb: fivefThumb,  full: fivefFull },
    'pestel':           { thumb: pestelThumb, full: pestelFull },
    '4p':               { thumb: fourpThumb,  full: fourpFull },
    'stp':              { thumb: stpThumb,    full: stpFull },
    'cjm':              { thumb: cjmThumb,    full: cjmFull },
    'value-chain':      { thumb: vcThumb,     full: vcFull },
    '7s':               { thumb: sevensThumb, full: sevensFull },
    'maturity':         { thumb: matThumb,    full: matFull },
    'process':          { thumb: procThumb,   full: procFull },
    'sipoc':            { thumb: sipocThumb,   full: sipocFull },
    'raci':             { thumb: raciThumb,    full: raciFull },
    'bcg':              { thumb: bcgThumb,     full: bcgFull },
    'ansoff':           { thumb: ansoffThumb,  full: ansoffFull },
    'issue-tree':       { thumb: issueTreeThumb, full: issueTreeFull },
    'bsc':              { thumb: bscThumb,     full: bscFull },
    'ge9box':           { thumb: ge9Thumb,     full: ge9Full },
    'scenario':         { thumb: scenarioThumb, full: scenarioFull },
    'okr':              { thumb: okrThumb,     full: okrFull },
    'blue-ocean':       { thumb: blueOceanThumb, full: blueOceanFull },
    'jtbd':             { thumb: jtbdThumb,    full: jtbdFull },
    'lean-canvas':      { thumb: leanCanvasThumb, full: leanCanvasFull },
    'kano':             { thumb: kanoThumb,    full: kanoFull },
    'pyramid-principle':{ thumb: pyramidThumb, full: pyramidFull },
    'positioning-map':  { thumb: posMapThumb,  full: posMapFull },
    'design-thinking':  { thumb: dtThumb,      full: dtFull }
  };

  return {
    thumb: f => REG[f.vizType] ? REG[f.vizType].thumb(f) : '',
    full:  f => REG[f.vizType] ? REG[f.vizType].full(f)  : ''
  };
})();
