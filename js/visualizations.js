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
      { r:150, fill:PAPER, stroke:INK, label:'사회적 Job', sub:'Social', tip:'타인에게 어떻게 보이고 싶은가. "성공한 사람처럼 보이고 싶다", "환경을 생각하는 사람으로 인정받고 싶다" 등.' },
      { r:103, fill:AMBER_SOFT, stroke:INK, label:'감성적 Job', sub:'Emotional', tip:'그 과정에서 느끼고 싶은 감정. "안전하다는 느낌", "자신감", "편안함" 등. 기능적 Job보다 강력한 구매 동기가 되는 경우가 많습니다.' },
      { r:58, fill:PRIMARY_SOFT, stroke:INK, label:'기능적 Job', sub:'Functional', tip:'실용적으로 해결해야 할 과제. "A에서 B로 이동한다", "보고서를 빠르게 만든다" 등. 가장 표면적인 니즈입니다.' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        ${jobs.map(j=>`
          <g data-tip-title="${a(j.label)} (${a(j.sub)})" data-tip="${a(j.tip)}">
            <circle cx="380" cy="170" r="${j.r}" fill="${j.fill}" stroke="${j.stroke}" stroke-width="1.2"/>
          </g>`).join('')}
        <text x="380" y="168" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}">기능적 Job</text>
        <text x="380" y="186" text-anchor="middle" font-size="11" fill="${MUTED}">Functional</text>
        <text x="380" y="94" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}">감성적 Job</text>
        <text x="380" y="110" text-anchor="middle" font-size="10" fill="${MUTED}">Emotional</text>
        <text x="380" y="44" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}">사회적 Job</text>
        <text x="380" y="60" text-anchor="middle" font-size="10" fill="${MUTED}">Social</text>
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

  /* ============================================================
     AARRR — 해적 지표 (5단계 깔때기)
     ============================================================ */
  const aarrrThumb = () => {
    const rows = [200, 168, 136, 104, 72];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${rows.map((w, i) => {
        const x = 140 - w / 2, y = 18 + i * 30;
        return `<rect x="${x}" y="${y}" width="${w}" height="24" rx="3" fill="${i === 3 ? PRIMARY_SOFT : CARD}" stroke="${i === 3 ? PRIMARY : INK}" stroke-width="1.1"/>`;
      }).join('')}
    </svg>`;
  };
  const aarrrFull = () => {
    const S = [
      { ko: '획득', en: 'Acquisition', tip: '사용자가 어떤 경로로 우리를 처음 만나는가. 광고·검색·추천 등 유입 채널과 획득 비용을 본다.', m: '지표: 방문자 수 · CAC · 채널별 유입' },
      { ko: '활성화', en: 'Activation', tip: '첫 방문에서 핵심 가치를 경험했는가. 가입 완료·첫 액션 등 "아하 모먼트" 도달률을 본다.', m: '지표: 가입 전환율 · 온보딩 완료율' },
      { ko: '유지', en: 'Retention', tip: '사용자가 다시 돌아오는가. 재방문 주기와 이탈 시점을 추적해 리텐션 커브를 그린다.', m: '지표: 리텐션 커브 · DAU/MAU · 이탈률' },
      { ko: '수익', en: 'Revenue', tip: '사용자가 실제로 돈을 내는가. 결제 전환과 객단가, 고객 생애가치(LTV)를 본다.', m: '지표: 결제 전환율 · ARPU · LTV' },
      { ko: '추천', en: 'Referral', tip: '사용자가 다른 사용자를 데려오는가. 입소문·초대로 성장 루프가 도는지 본다.', m: '지표: 추천율 · 바이럴 계수(K)' }
    ];
    const top = 56, rowH = 56, gap = 8, maxW = 580, minW = 230, cx = 380;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        ${S.map((s, i) => {
          const w = maxW - (maxW - minW) * (i / (S.length - 1));
          const y = top + i * (rowH + gap);
          const x = cx - w / 2;
          const hi = i === 3;
          return `
          <g data-tip-title="${a(s.ko)} (${a(s.en)})" data-tip="${a(s.tip)}">
            <rect x="${x}" y="${y}" width="${w}" height="${rowH}" rx="6" fill="${hi ? PRIMARY_SOFT : PAPER}" stroke="${hi ? PRIMARY : INK}" stroke-width="${hi ? 1.6 : 1.2}"/>
            <text x="${cx}" y="${y + 26}" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}">${a(s.ko)} · ${a(s.en)}</text>
            <text x="${cx}" y="${y + 45}" text-anchor="middle" font-size="11" fill="${MUTED}">${a(s.m)}</text>
          </g>`;
        }).join('')}
        <text x="380" y="38" text-anchor="middle" font-size="13" letter-spacing="0.08em" fill="${MUTED}" pointer-events="none">AARRR · 단계마다 좁아지는 사용자 깔때기</text>
      </svg>
      <div class="viz-caption">획득 → 활성화 → 유지 → 수익 → 추천 · 단계별 전환율로 가장 큰 누수 지점을 찾습니다</div>
    </div>`;
  };

  /* ============================================================
     AIDA — 4단계 역삼각 깔때기
     ============================================================ */
  const aidaThumb = () => {
    const rows = [220, 168, 116, 64];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${rows.map((w, i) => {
        const x = 140 - w / 2, y = 22 + i * 36;
        return `<rect x="${x}" y="${y}" width="${w}" height="28" rx="3" fill="${i === 3 ? PRIMARY_SOFT : CARD}" stroke="${i === 3 ? PRIMARY : INK}" stroke-width="1.1"/>`;
      }).join('')}
    </svg>`;
  };
  const aidaFull = () => {
    const S = [
      { ko: '주목', en: 'Attention', tip: '고객의 시선을 멈추게 하는 단계. 강한 헤드라인·비주얼로 무관심을 깨고 존재를 알린다.' },
      { ko: '흥미', en: 'Interest', tip: '관심을 붙드는 단계. 고객의 문제와 연결된 메시지로 "내 얘기다"라고 느끼게 만든다.' },
      { ko: '욕구', en: 'Desire', tip: '갖고 싶게 만드는 단계. 혜택·증거·차별점을 제시해 감정적 동기를 끌어올린다.' },
      { ko: '행동', en: 'Action', tip: '실제 전환을 유도하는 단계. 명확한 CTA와 낮은 마찰로 구매·가입을 완성시킨다.' }
    ];
    const top = 60, rowH = 64, gap = 10, maxW = 600, minW = 200, cx = 380;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        ${S.map((s, i) => {
          const w = maxW - (maxW - minW) * (i / (S.length - 1));
          const y = top + i * (rowH + gap);
          const x = cx - w / 2;
          const hi = i === S.length - 1;
          return `
          <g data-tip-title="${a(s.ko)} (${a(s.en)})" data-tip="${a(s.tip)}">
            <rect x="${x}" y="${y}" width="${w}" height="${rowH}" rx="6" fill="${hi ? PRIMARY_SOFT : PAPER}" stroke="${hi ? PRIMARY : INK}" stroke-width="${hi ? 1.6 : 1.2}"/>
            <text x="${cx}" y="${y + 30}" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}">${a(s.ko)}</text>
            <text x="${cx}" y="${y + 50}" text-anchor="middle" font-size="12" letter-spacing="0.08em" fill="${hi ? PRIMARY : MUTED}">${a(s.en.toUpperCase())}</text>
          </g>`;
        }).join('')}
        <text x="380" y="40" text-anchor="middle" font-size="13" letter-spacing="0.08em" fill="${MUTED}" pointer-events="none">AIDA · 위가 넓고 행동으로 갈수록 좁아지는 설득 깔때기</text>
      </svg>
      <div class="viz-caption">주목 → 흥미 → 욕구 → 행동 · 마지막 행동 단계의 전환을 끝까지 설계합니다</div>
    </div>`;
  };

  /* ============================================================
     Tuckman — 팀 발달 5단계 + 성과 곡선
     ============================================================ */
  const tuckmanThumb = () => {
    const labels = ['F', 'S', 'N', 'P', 'A'];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <path d="M 28 80 Q 72 130 116 96 T 200 44 L 252 36" fill="none" stroke="${PRIMARY}" stroke-width="2" pointer-events="none"/>
      ${labels.map((l, i) => {
        const x = 20 + i * 50, y = 120;
        return `<rect x="${x}" y="${y}" width="40" height="40" rx="4" fill="${i === 3 ? PRIMARY_SOFT : CARD}" stroke="${i === 3 ? PRIMARY : INK}" stroke-width="1.1"/><text x="${x + 20}" y="${y + 26}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${l}</text>`;
      }).join('')}
    </svg>`;
  };
  const tuckmanFull = () => {
    const S = [
      { ko: '형성', en: 'Forming', tip: '팀이 막 모인 단계. 서로 탐색하며 예의를 갖추지만 방향과 역할이 불명확하다. 리더의 명확한 안내가 필요하다.' },
      { ko: '격동', en: 'Storming', tip: '갈등이 표면화되는 단계. 역할·권한·방식에서 충돌이 생기며 성과와 사기가 일시적으로 떨어진다. 가장 위험한 구간.' },
      { ko: '규범', en: 'Norming', tip: '규칙과 신뢰가 자리잡는 단계. 협업 방식이 합의되고 갈등이 건설적으로 풀리기 시작한다.' },
      { ko: '성과', en: 'Performing', tip: '자율적으로 고성과를 내는 단계. 신뢰 위에서 팀이 스스로 굴러가며 리더는 지원자로 물러난다.' },
      { ko: '해산', en: 'Adjourning', tip: '목표 달성 후 해체되는 단계. 성과를 회고하고 학습을 남기며 구성원을 다음으로 전환시킨다.' }
    ];
    const n = S.length, x0 = 40, slot = 136, boxW = 116, boxY = 250, boxH = 90;
    const cxOf = i => x0 + i * slot + boxW / 2;
    const cy = [150, 215, 170, 90, 110];
    const pts = cy.map((y, i) => `${cxOf(i)},${y}`).join(' ');
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        <text x="40" y="40" font-size="12" letter-spacing="0.08em" fill="${MUTED}" pointer-events="none">성과 · 사기</text>
        <line x1="40" y1="60" x2="40" y2="225" stroke="${HAIRLINE}" stroke-width="1" pointer-events="none"/>
        <polyline points="${pts}" fill="none" stroke="${PRIMARY}" stroke-width="2.5" pointer-events="none"/>
        ${cy.map((y, i) => `<circle cx="${cxOf(i)}" cy="${y}" r="4" fill="${i === 3 ? PRIMARY : PAPER}" stroke="${PRIMARY}" stroke-width="2" pointer-events="none"/>`).join('')}
        ${S.map((s, i) => {
          const x = x0 + i * slot, hi = i === 3;
          return `
          <g data-tip-title="${a(s.ko)} (${a(s.en)})" data-tip="${a(s.tip)}">
            <rect x="${x}" y="${boxY}" width="${boxW}" height="${boxH}" rx="6" fill="${hi ? PRIMARY_SOFT : PAPER}" stroke="${hi ? PRIMARY : INK}" stroke-width="${hi ? 1.6 : 1.2}"/>
            <text x="${x + boxW / 2}" y="${boxY + 38}" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}">${a(s.ko)}</text>
            <text x="${x + boxW / 2}" y="${boxY + 60}" text-anchor="middle" font-size="11" letter-spacing="0.06em" fill="${hi ? PRIMARY : MUTED}">${a(s.en)}</text>
          </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">형성 → 격동 → 규범 → 성과 → 해산 · 격동기 골을 빨리 통과시켜 성과기를 앞당깁니다</div>
    </div>`;
  };

  /* ============================================================
     EJM — 직원 여정 지도 + 감정 곡선
     ============================================================ */
  const ejmThumb = () => {
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30 70 Q 75 40 120 64 T 210 100 L 250 70" fill="none" stroke="${PRIMARY}" stroke-width="2" pointer-events="none"/>
      ${[0,1,2,3,4].map(i => {
        const x = 18 + i * 50, y = 116;
        return `<rect x="${x}" y="${y}" width="42" height="44" rx="4" fill="${i === 1 ? PRIMARY_SOFT : CARD}" stroke="${i === 1 ? PRIMARY : INK}" stroke-width="1.1"/>`;
      }).join('')}
    </svg>`;
  };
  const ejmFull = () => {
    const S = [
      { ko: '채용', en: 'Hiring', tip: '접점: 채용 공고·면접·오퍼. 페인포인트: 느린 회신, 불투명한 처우 안내로 후보 경험이 나빠질 수 있다.' },
      { ko: '온보딩', en: 'Onboarding', tip: '접점: 입사 첫 주·장비·멘토. 핵심 순간 — 첫인상이 잔류 의사를 좌우한다. 페인포인트: 준비 안 된 환경, 방치된 신규 입사자.' },
      { ko: '성장', en: 'Growth', tip: '접점: 교육·평가·승진. 페인포인트: 불공정한 평가, 막힌 성장 경로가 동기를 꺾는다.' },
      { ko: '유지', en: 'Retention', tip: '접점: 보상·1on1·복지. 페인포인트: 번아웃과 인정 부족이 조용한 이탈로 이어진다.' },
      { ko: '이탈', en: 'Exit', tip: '접점: 퇴사 면담·오프보딩. 페인포인트: 형식적 절차로 끝나면 회고와 알럼나이 관계를 잃는다.' }
    ];
    const n = S.length, x0 = 40, slot = 136, boxW = 116, boxY = 250, boxH = 90;
    const cxOf = i => x0 + i * slot + boxW / 2;
    const cy = [170, 95, 130, 160, 200];
    const pts = cy.map((y, i) => `${cxOf(i)},${y}`).join(' ');
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        <text x="40" y="40" font-size="12" letter-spacing="0.08em" fill="${MUTED}" pointer-events="none">감정 곡선 (Emotion)</text>
        <line x1="40" y1="60" x2="40" y2="220" stroke="${HAIRLINE}" stroke-width="1" pointer-events="none"/>
        <polyline points="${pts}" fill="none" stroke="${MUTED_SOFT}" stroke-width="2.5" pointer-events="none"/>
        ${cy.map((y, i) => `<circle cx="${cxOf(i)}" cy="${y}" r="4" fill="${i === 1 ? PRIMARY : PAPER}" stroke="${i === 1 ? PRIMARY : MUTED_SOFT}" stroke-width="2" pointer-events="none"/>`).join('')}
        ${S.map((s, i) => {
          const x = x0 + i * slot, hi = i === 1;
          return `
          <g data-tip-title="${a(s.ko)} (${a(s.en)})" data-tip="${a(s.tip)}">
            <rect x="${x}" y="${boxY}" width="${boxW}" height="${boxH}" rx="6" fill="${hi ? PRIMARY_SOFT : PAPER}" stroke="${hi ? PRIMARY : INK}" stroke-width="${hi ? 1.6 : 1.2}"/>
            <text x="${x + boxW / 2}" y="${boxY + 38}" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}">${a(s.ko)}</text>
            <text x="${x + boxW / 2}" y="${boxY + 60}" text-anchor="middle" font-size="11" letter-spacing="0.06em" fill="${hi ? PRIMARY : MUTED}">${a(s.en)}</text>
          </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">채용 → 온보딩 → 성장 → 유지 → 이탈 · 감정이 꺾이는 핵심 순간을 찾아 경험을 설계합니다</div>
    </div>`;
  };

  /* ============================================================
     VSM — 가치 흐름 지도
     ============================================================ */
  const vsmThumb = () => {
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <line x1="24" y1="44" x2="256" y2="44" stroke="${INK}" stroke-width="1" pointer-events="none"/>
      ${[0,1,2,3].map(i => {
        const x = 28 + i * 58, y = 64;
        return `<rect x="${x}" y="${y}" width="44" height="40" rx="3" fill="${i === 2 ? PRIMARY_SOFT : CARD}" stroke="${i === 2 ? PRIMARY : INK}" stroke-width="1.1"/>`;
      }).join('')}
      <path d="M 28 150 h 22 v -14 h 36 v 14 h 22 v -14 h 36 v 14 h 22 v -14 h 36 v 14 h 22" fill="none" stroke="${MUTED}" stroke-width="1.4" pointer-events="none"/>
    </svg>`;
  };
  const vsmFull = () => {
    const S = [
      { ko: '공급', en: 'Supplier', tip: '원자재·부품을 공급하는 외부 주체. 사이클타임: 입고 0.5일, 이후 대기 2일이 쌓인다.', ct: 'CT 0.5d', wt: '대기 2d' },
      { ko: '가공', en: 'Process A', tip: '1차 가공 공정. 사이클타임은 짧지만 다음 공정 앞에서 재고가 대기한다.', ct: 'CT 0.3d', wt: '대기 1.5d' },
      { ko: '조립', en: 'Process B', tip: '병목 공정. 처리 능력이 부족해 앞단 재고가 가장 길게 쌓이는 대기 지점이다.', ct: 'CT 0.4d', wt: '대기 4d' },
      { ko: '검사', en: 'Process C', tip: '품질 검사·재작업. 불량 재투입으로 변동이 크고 출하 전 대기가 발생한다.', ct: 'CT 0.3d', wt: '대기 1d' },
      { ko: '고객', en: 'Customer', tip: '최종 고객 출하. 정보 흐름(주문)이 여기서 시작해 공급 측으로 거슬러 올라간다.', ct: '출하', wt: '' }
    ];
    const n = S.length, x0 = 30, slot = 144, boxW = 120, boxY = 130, boxH = 76;
    const cxOf = i => x0 + i * slot + boxW / 2;
    // 타임라인 톱니: 가치(위, 짧음) + 대기(아래, 김)
    const tlY = 300, valY = 286, waitY = 314;
    let cursor = x0;
    const segs = [];
    S.forEach((s, i) => {
      const valW = 26;
      const waitW = i === 2 ? 96 : (i === n - 1 ? 0 : 56);
      segs.push(`<line x1="${cursor}" y1="${valY}" x2="${cursor + valW}" y2="${valY}" stroke="${INK}" stroke-width="2" pointer-events="none"/>`);
      segs.push(`<line x1="${cursor + valW}" y1="${valY}" x2="${cursor + valW}" y2="${waitY}" stroke="${i === 2 ? PRIMARY : MUTED}" stroke-width="1.2" pointer-events="none"/>`);
      if (waitW > 0) segs.push(`<line x1="${cursor + valW}" y1="${waitY}" x2="${cursor + valW + waitW}" y2="${waitY}" stroke="${i === 2 ? PRIMARY : MUTED}" stroke-width="${i === 2 ? 2.5 : 1.6}" stroke-dasharray="${i === 2 ? '' : '4 3'}" pointer-events="none"/>`);
      if (waitW > 0) segs.push(`<line x1="${cursor + valW + waitW}" y1="${waitY}" x2="${cursor + valW + waitW}" y2="${valY}" stroke="${i === 2 ? PRIMARY : MUTED}" stroke-width="1.2" pointer-events="none"/>`);
      cursor += valW + waitW;
    });
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="vsm-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <polygon points="0,0 10,5 0,10" fill="${MUTED}"/>
          </marker>
        </defs>
        <text x="30" y="44" font-size="12" letter-spacing="0.06em" fill="${MUTED}" pointer-events="none">정보 흐름 (Information)</text>
        <line x1="${cxOf(n - 1)}" y1="64" x2="${cxOf(0)}" y2="64" stroke="${MUTED}" stroke-width="1.4" stroke-dasharray="5 4" marker-end="url(#vsm-arr)" pointer-events="none"/>
        ${[0,1,2,3].map(i => `<line x1="${cxOf(i)}" y1="${boxY}" x2="${cxOf(i)}" y2="64" stroke="${HAIRLINE}" stroke-width="1" pointer-events="none"/>`).join('')}
        ${S.map((s, i) => {
          const x = x0 + i * slot, hi = i === 2;
          return `
          <g data-tip-title="${a(s.ko)} (${a(s.en)})" data-tip="${a(s.tip)}">
            <rect x="${x}" y="${boxY}" width="${boxW}" height="${boxH}" rx="6" fill="${hi ? PRIMARY_SOFT : PAPER}" stroke="${hi ? PRIMARY : INK}" stroke-width="${hi ? 1.6 : 1.2}"/>
            <text x="${x + boxW / 2}" y="${boxY + 30}" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}">${a(s.ko)}</text>
            <text x="${x + boxW / 2}" y="${boxY + 48}" text-anchor="middle" font-size="10" letter-spacing="0.05em" fill="${MUTED}">${a(s.en)}</text>
            <text x="${x + boxW / 2}" y="${boxY + 66}" text-anchor="middle" font-size="10" font-weight="600" fill="${hi ? PRIMARY : BODY}">${a(s.ct)}${s.wt ? ' · ' + a(s.wt) : ''}</text>
          </g>`;
        }).join('')}
        ${segs.join('')}
        <text x="30" y="276" font-size="11" fill="${MUTED}" pointer-events="none">타임라인 (위=가치 시간 · 아래=대기 시간)</text>
        <text x="${cxOf(2)}" y="345" text-anchor="middle" font-size="11" font-weight="600" fill="${PRIMARY}" pointer-events="none">병목 · 최대 대기</text>
      </svg>
      <div class="viz-caption">공급 → 고객까지 가치·대기 시간을 펼쳐, 대기가 긴 병목을 줄여 리드타임을 단축합니다</div>
    </div>`;
  };

  const mudaThumb = () => {
    const cells = [
      { k:'T', n:'운송' }, { k:'I', n:'재고' }, { k:'M', n:'동작' }, { k:'W', n:'대기' },
      { k:'O', n:'과잉생산' }, { k:'O', n:'과잉가공' }, { k:'D', n:'불량' }
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <text x="140" y="24" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">Muda 7</text>
      ${cells.map((c,i) => {
        const row = i < 4 ? 0 : 1;
        const cols = row === 0 ? 4 : 3;
        const idx = row === 0 ? i : i - 4;
        const w = 58, h = 48, gap = 6;
        const rowW = cols * w + (cols - 1) * gap;
        const x = (280 - rowW) / 2 + idx * (w + gap);
        const y = 38 + row * (h + gap);
        const hot = (i === 6);
        return `
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${hot ? PRIMARY_SOFT : CARD}" stroke="${INK}" stroke-width="${hot ? 1.4 : 0.8}"/>
        <text x="${x + w/2}" y="${y + 22}" text-anchor="middle" font-size="15" font-weight="700" fill="${hot ? PRIMARY : INK}">${c.k}</text>
        <text x="${x + w/2}" y="${y + 38}" text-anchor="middle" font-size="9" fill="${MUTED}">${c.n}</text>`;
      }).join('')}
    </svg>`;
  };
  const mudaFull = () => {
    const cells = [
      { k:'T', n:'운송 (Transport)', tip:'필요 이상의 물품 이동입니다. 라인 배치가 멀거나 동선이 꼬이면 발생합니다. 옮기는 행위 자체는 가치를 만들지 않습니다.' },
      { k:'I', n:'재고 (Inventory)', tip:'팔리지 않은 원자재·재공품·완제품이 쌓인 상태. 자금이 묶이고 보관 비용과 진부화 위험을 키웁니다.' },
      { k:'M', n:'동작 (Motion)', tip:'작업자의 불필요한 움직임입니다. 멀리 손을 뻗거나 자세를 자주 바꾸는 등 작업 설계가 나쁠 때 생깁니다.' },
      { k:'W', n:'대기 (Waiting)', tip:'사람·설비·자재가 다음 공정을 기다리며 멈춘 시간. 흐름이 끊기면 가치가 흐르지 않습니다.' },
      { k:'O', n:'과잉생산 (Overproduction)', tip:'수요보다 많이, 빨리 만드는 낭비. 7대 낭비의 근원으로 불립니다. 재고·대기 등 다른 낭비를 함께 유발합니다.' },
      { k:'O', n:'과잉가공 (Over-processing)', tip:'고객이 요구하지 않은 수준까지 가공하는 낭비. 불필요한 검사·과한 사양·중복 승인 등이 해당합니다.' },
      { k:'D', n:'불량 (Defects)', tip:'재작업·폐기·반품을 부르는 결함입니다. 검출이 늦을수록 비용이 기하급수로 커집니다.' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="40" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}" pointer-events="none">Muda 7 · 린 7대 낭비 (TIMWOOD)</text>
        ${cells.map((c,i) => {
          const row = i < 4 ? 0 : 1;
          const cols = row === 0 ? 4 : 3;
          const idx = row === 0 ? i : i - 4;
          const w = 160, h = 95, gap = 18;
          const rowW = cols * w + (cols - 1) * gap;
          const x = (760 - rowW) / 2 + idx * (w + gap);
          const y = 70 + row * (h + 24);
          const hot = (i === 6);
          const parts = c.n.split(' (');
          return `
          <g data-tip-title="${a(c.n)}" data-tip="${a(c.tip)}">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${hot ? PRIMARY_SOFT : CARD}" stroke="${INK}" stroke-width="${hot ? 1.8 : 1.2}"/>
            <text x="${x + w/2}" y="${y + 44}" text-anchor="middle" font-size="30" font-weight="700" fill="${hot ? PRIMARY : INK}">${c.k}</text>
            <text x="${x + w/2}" y="${y + 70}" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}">${a(parts[0])}</text>
            <text x="${x + w/2}" y="${y + 86}" text-anchor="middle" font-size="10" fill="${MUTED}">${a('(' + parts[1])}</text>
          </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">제조·서비스 현장에서 가치를 만들지 않는 7가지 활동을 분류하는 린(Lean) 진단 도구. 셀에 마우스를 올려 정의를 확인하세요.</div>
    </div>`;
  };

  const fivesThumb = () => {
    const items = [
      { s:'1S', n:'정리' }, { s:'2S', n:'정돈' }, { s:'3S', n:'청소' }, { s:'4S', n:'청결' }, { s:'5S', n:'습관화' }
    ];
    const cx = 140, cy = 95, r = 58;
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${cx}" cy="${cy}" r="${r + 16}" fill="none" stroke="${HAIRLINE}" stroke-width="1"/>
      <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">5S</text>
      ${items.map((it,i) => {
        const ang = -Math.PI/2 + i * Math.PI*2/5;
        const x = cx + r * Math.cos(ang);
        const y = cy + r * Math.sin(ang);
        const hot = (i === 4);
        return `
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="20" fill="${hot ? PRIMARY_SOFT : CARD}" stroke="${INK}" stroke-width="${hot ? 1.4 : 0.8}"/>
        <text x="${x.toFixed(1)}" y="${(y - 1).toFixed(1)}" text-anchor="middle" font-size="9" font-weight="700" fill="${hot ? PRIMARY : INK}">${it.s}</text>
        <text x="${x.toFixed(1)}" y="${(y + 10).toFixed(1)}" text-anchor="middle" font-size="7" fill="${MUTED}">${it.n}</text>`;
      }).join('')}
    </svg>`;
  };
  const fivesFull = () => {
    const items = [
      { s:'정리', en:'Seiri', tip:'필요한 것과 불필요한 것을 구분해, 필요 없는 것을 버립니다. 공간과 판단의 군더더기를 먼저 제거하는 단계입니다.' },
      { s:'정돈', en:'Seiton', tip:'필요한 것을 누구나 바로 찾도록 제자리에 둡니다. "한 번에, 30초 안에" 꺼낼 수 있는 상태가 목표입니다.' },
      { s:'청소', en:'Seiso', tip:'작업장과 설비를 깨끗이 합니다. 청소는 곧 점검입니다. 닦으면서 이상·마모·누유를 함께 발견합니다.' },
      { s:'청결', en:'Seiketsu', tip:'앞의 3S 상태를 표준화해 유지합니다. 색 표시·라벨·체크리스트로 누가 해도 같은 수준이 되게 만듭니다.' },
      { s:'습관화', en:'Shitsuke', tip:'정해진 표준을 몸에 배게 합니다. 5S가 일회성 캠페인이 아니라 문화로 지속되는지를 가르는 마지막 단계입니다.' }
    ];
    const cx = 380, cy = 200, r = 120;
    const pts = items.map((it,i) => {
      const ang = -Math.PI/2 + i * Math.PI*2/5;
      return { x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang), ang };
    });
    const arcs = pts.map((p,i) => {
      const n = pts[(i+1) % pts.length];
      const a1 = p.ang + 0.42, a2 = n.ang - 0.42;
      const x1 = cx + r*Math.cos(a1), y1 = cy + r*Math.sin(a1);
      const x2 = cx + r*Math.cos(a2), y2 = cy + r*Math.sin(a2);
      return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${MUTED_SOFT}" stroke-width="1.4" marker-end="url(#fivesArrow)" pointer-events="none"/>`;
    }).join('');
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 410" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="fivesArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${MUTED_SOFT}"/>
          </marker>
        </defs>
        <text x="380" y="36" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}" pointer-events="none">5S · 작업장 정돈의 순환</text>
        <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="20" font-weight="700" fill="${INK}" pointer-events="none">5S</text>
        <text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11" fill="${MUTED}" pointer-events="none">지속 개선의 토대</text>
        ${arcs}
        ${items.map((it,i) => {
          const p = pts[i];
          const hot = (i === 4);
          return `
          <g data-tip-title="${a(it.s + ' (' + it.en + ')')}" data-tip="${a(it.tip)}">
            <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="38" fill="${hot ? PRIMARY_SOFT : CARD}" stroke="${INK}" stroke-width="${hot ? 1.8 : 1.2}"/>
            <text x="${p.x.toFixed(1)}" y="${(p.y - 2).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="700" fill="${hot ? PRIMARY : INK}">${a(it.s)}</text>
            <text x="${p.x.toFixed(1)}" y="${(p.y + 14).toFixed(1)}" text-anchor="middle" font-size="10" fill="${MUTED}">${a(it.en)}</text>
          </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">정리·정돈·청소·청결·습관화로 이어지는 작업장 관리의 5단계 순환. 마지막 습관화(Shitsuke)가 5S를 지속 가능한 문화로 만듭니다.</div>
    </div>`;
  };

  const kanbanThumb = () => {
    const cols = [
      { t:'To Do', cards:2, hot:false },
      { t:'Doing', cards:2, hot:true },
      { t:'Done', cards:3, hot:false }
    ];
    const colW = 76, gap = 14, startX = (280 - (colW*3 + gap*2)) / 2;
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${cols.map((c,i) => {
        const x = startX + i * (colW + gap);
        return `
        <rect x="${x}" y="26" width="${colW}" height="138" rx="5" fill="${c.hot ? PRIMARY_SOFT : PAPER}" stroke="${INK}" stroke-width="${c.hot ? 1.3 : 0.8}"/>
        <text x="${x + colW/2}" y="42" text-anchor="middle" font-size="9" font-weight="700" fill="${c.hot ? PRIMARY : INK}">${c.t}</text>
        ${c.hot ? `<rect x="${x + colW/2 - 13}" y="46" width="26" height="11" rx="5.5" fill="${PRIMARY}"/><text x="${x + colW/2}" y="54" text-anchor="middle" font-size="7" font-weight="700" fill="${PAPER}">WIP2</text>` : ''}
        ${Array.from({length:c.cards}).map((_,k) => `<rect x="${x + 8}" y="${(c.hot ? 64 : 50) + k*26}" width="${colW - 16}" height="20" rx="3" fill="${CARD}" stroke="${INK}" stroke-width="0.6"/>`).join('')}`;
      }).join('')}
    </svg>`;
  };
  const kanbanFull = () => {
    const cols = [
      { t:'To Do (대기)', cards:['요건 정의','UI 시안','API 설계'], hot:false, tip:'아직 시작하지 않은 일감의 대기열입니다. 우선순위 순으로 쌓여 있으며, 당기기(pull) 신호가 오면 다음 단계로 넘어갑니다.' },
      { t:'Doing (진행)', cards:['결제 모듈','로그인 리팩터'], hot:true, tip:'지금 실제로 작업 중인 카드입니다. WIP 제한으로 동시 진행 수를 묶어, 병목과 멀티태스킹 낭비를 드러냅니다.' },
      { t:'Done (완료)', cards:['스키마 마이그','헬스체크','로깅 정비'], hot:false, tip:'완료 기준(Definition of Done)을 만족해 끝난 카드입니다. 흐름의 산출물이자, 리드타임 측정의 종점입니다.' }
    ];
    const colW = 200, gap = 30, startX = (760 - (colW*3 + gap*2)) / 2, top = 80;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="40" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}" pointer-events="none">Kanban Board · 흐름의 시각화</text>
        ${cols.map((c,i) => {
          const x = startX + i * (colW + gap);
          return `
          <g data-tip-title="${a(c.t)}" data-tip="${a(c.tip)}">
            <rect x="${x}" y="${top}" width="${colW}" height="250" rx="10" fill="${c.hot ? PRIMARY_SOFT : PAPER}" stroke="${INK}" stroke-width="${c.hot ? 1.8 : 1.2}"/>
            <text x="${x + colW/2}" y="${top + 26}" text-anchor="middle" font-size="15" font-weight="700" fill="${c.hot ? PRIMARY : INK}">${a(c.t)}</text>
            ${c.hot ? `<rect x="${x + colW/2 - 28}" y="${top + 36}" width="56" height="20" rx="10" fill="${PRIMARY}"/><text x="${x + colW/2}" y="${top + 50}" text-anchor="middle" font-size="11" font-weight="700" fill="${PAPER}">WIP 2</text>` : ''}
            ${c.cards.map((card,k) => `
              <rect x="${x + 14}" y="${top + 66 + k*52}" width="${colW - 28}" height="40" rx="6" fill="${CARD}" stroke="${INK}" stroke-width="1"/>
              <text x="${x + 26}" y="${top + 91 + k*52}" font-size="12" font-weight="600" fill="${INK}">${a(card)}</text>`).join('')}
          </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">일의 흐름을 대기·진행·완료로 시각화하는 보드. 진행 열의 WIP(작업 중) 제한이 병목을 드러내고 끝맺음을 강제합니다.</div>
    </div>`;
  };

  const fivewhysThumb = () => {
    const steps = [
      { label:'기계 정지', hot:false },
      { label:'과부하', hot:false },
      { label:'윤활 부족', hot:false },
      { label:'펌프 고장', hot:false },
      { label:'축 마모', hot:false },
      { label:'필터 미설치', hot:true }
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${steps.map((s,i) => {
        const x = 16 + i * 8;
        const y = 14 + i * 26;
        const w = 110;
        return `
        ${i > 0 ? `<path d="M ${x - 4} ${y - 6} L ${x + 6} ${y}" stroke="${MUTED_SOFT}" stroke-width="1" fill="none"/>` : ''}
        <rect x="${x}" y="${y}" width="${w}" height="20" rx="3" fill="${s.hot ? PRIMARY_SOFT : (i===0 ? CREAM_STR : PAPER)}" stroke="${INK}" stroke-width="${s.hot ? 1.3 : 0.7}"/>
        <text x="${x + 8}" y="${y + 14}" font-size="9" font-weight="${s.hot ? 700 : 600}" fill="${s.hot ? PRIMARY : INK}">${s.label}</text>`;
      }).join('')}
    </svg>`;
  };
  const fivewhysFull = () => {
    const steps = [
      { label:'기계가 멈췄다', kind:'문제', tip:'분석의 출발점인 현상입니다. 눈에 보이는 증상일 뿐, 아직 원인이 아닙니다. 여기서 멈추면 대증요법에 그칩니다.' },
      { label:'왜? 과부하로 퓨즈가 끊겼다', kind:'원인 1', tip:'첫 번째 왜. 표면 원인입니다. 퓨즈만 갈면 같은 고장이 반복되므로 한 단계 더 파고듭니다.' },
      { label:'왜? 베어링 윤활이 부족했다', kind:'원인 2', tip:'두 번째 왜. 과부하의 직접 원인을 윤활 부족으로 좁힙니다.' },
      { label:'왜? 윤활 펌프가 제대로 돌지 않았다', kind:'원인 3', tip:'세 번째 왜. 윤활 부족의 기계적 원인을 펌프 작동 불량으로 특정합니다.' },
      { label:'왜? 펌프 축이 마모됐다', kind:'원인 4', tip:'네 번째 왜. 펌프 불량의 물리적 원인을 축 마모로 밝힙니다. 거의 근본에 다가섰습니다.' },
      { label:'왜? 흡입구 필터가 없어 쇳가루가 유입됐다', kind:'근본 원인', tip:'다섯 번째 왜. 진짜 원인입니다. 필터를 설치하면 위의 모든 고장 사슬이 끊깁니다. 대책은 여기에 세웁니다.' }
    ];
    const x0 = 40, indent = 42, top = 70, gap = 64, w = 430, h = 46;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="fwArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="${MUTED_SOFT}"/>
          </marker>
        </defs>
        <text x="380" y="38" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}" pointer-events="none">5 Whys · 근본 원인 캐스케이드</text>
        ${steps.map((s,i) => {
          const x = x0 + i * indent;
          const y = top + i * gap;
          const hot = (i === steps.length - 1);
          const arrow = i > 0 ? `<path d="M ${x0 + (i-1)*indent + 20} ${top + (i-1)*gap + h} L ${x + 18} ${y}" stroke="${MUTED_SOFT}" stroke-width="1.4" fill="none" marker-end="url(#fwArrow)" pointer-events="none"/>` : '';
          return `
          ${arrow}
          <g data-tip-title="${a(s.kind)}" data-tip="${a(s.tip)}">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${hot ? PRIMARY_SOFT : (i===0 ? CREAM_STR : PAPER)}" stroke="${INK}" stroke-width="${hot ? 1.8 : 1.2}"/>
            <text x="${x + 14}" y="${y + 20}" font-size="10" font-weight="700" fill="${hot ? PRIMARY : MUTED}">${a(s.kind)}</text>
            <text x="${x + 14}" y="${y + 37}" font-size="14" font-weight="600" fill="${INK}">${a(s.label)}</text>
          </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">"왜?"를 다섯 번 반복해 증상에서 근본 원인까지 파고드는 도요타식 도구. 맨 아래 근본 원인에 대책을 세워야 재발을 막습니다.</div>
    </div>`;
  };

  const sixhatsThumb = () => {
    const hats = [
      { c:'#ffffff', t:'사실' }, { c:'#c0392b', t:'감정' }, { c:'#2b2b2b', t:'위험' },
      { c:'#e8a55a', t:'이익' }, { c:'#5db8a6', t:'대안' }, { c:'#4a7fb5', t:'통제' }
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${hats.map((hh,i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const w = 76, h = 56, gap = 10;
        const x = (280 - (3*w + 2*gap))/2 + col*(w+gap);
        const y = 24 + row*(h+gap);
        return `
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${PAPER}" stroke="${INK}" stroke-width="0.8"/>
        <path d="M ${x+w/2-14} ${y+24} a 14 9 0 0 1 28 0 z" fill="${hh.c}" stroke="${INK}" stroke-width="0.6"/>
        <ellipse cx="${x+w/2}" cy="${y+24}" rx="22" ry="4" fill="${hh.c}" stroke="${INK}" stroke-width="0.6"/>
        <text x="${x+w/2}" y="${y+46}" text-anchor="middle" font-size="10" font-weight="600" fill="${INK}">${hh.t}</text>`;
      }).join('')}
    </svg>`;
  };
  const sixhatsFull = () => {
    const hats = [
      { c:'#ffffff', name:'흰 모자', role:'사실', tip:'데이터와 객관적 정보에만 집중합니다. "우리가 아는 사실은 무엇이고, 더 필요한 정보는 무엇인가?" 의견과 해석은 배제합니다.' },
      { c:'#c0392b', name:'빨강 모자', role:'감정', tip:'직관·느낌·예감을 근거 없이 그대로 말합니다. 설명할 필요 없이 솔직한 감정을 드러내, 숨은 거부감과 끌림을 표면화합니다.' },
      { c:'#2b2b2b', name:'검정 모자', role:'비판·위험', tip:'위험·약점·실패 가능성을 따집니다. 가장 많이 쓰이는 모자로, 신중함을 담당합니다. 단, 과하면 아이디어를 죽입니다.' },
      { c:'#e8a55a', name:'노랑 모자', role:'긍정·이익', tip:'장점·가치·실현 가능성을 찾습니다. 검정 모자의 균형추로, "이게 통한다면 어떤 이득이 있는가?"를 묻습니다.' },
      { c:'#5db8a6', name:'초록 모자', role:'창의·대안', tip:'새로운 아이디어와 대안을 만들어냅니다. 판단을 미루고 발산합니다. 도발·연상·새 선택지를 환영합니다.' },
      { c:'#4a7fb5', name:'파랑 모자', role:'진행·통제', tip:'사고 자체를 관리합니다. 어떤 모자를 언제 쓸지 정하고, 논의를 정리하며 결론을 요약합니다. 진행자의 모자입니다.' }
    ];
    const w = 210, h = 130, gx = 24, gy = 24;
    const startX = (760 - (3*w + 2*gx))/2, top = 70;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 410" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="40" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}" pointer-events="none">Six Thinking Hats · 6색 사고모자</text>
        ${hats.map((hh,i) => {
          const col = i % 3, row = Math.floor(i / 3);
          const x = startX + col*(w+gx);
          const y = top + row*(h+gy);
          const cx = x + 54, cy = y + h/2;
          return `
          <g data-tip-title="${a(hh.name + ' · ' + hh.role)}" data-tip="${a(hh.tip)}">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${PAPER}" stroke="${INK}" stroke-width="1.2"/>
            <path d="M ${cx-22} ${cy+4} a 22 14 0 0 1 44 0 z" fill="${hh.c}" stroke="${INK}" stroke-width="1"/>
            <ellipse cx="${cx}" cy="${cy+4}" rx="34" ry="6" fill="${hh.c}" stroke="${INK}" stroke-width="1"/>
            <text x="${x + 104}" y="${y + 52}" font-size="15" font-weight="700" fill="${INK}">${a(hh.name)}</text>
            <text x="${x + 104}" y="${y + 74}" font-size="13" fill="${MUTED}">${a(hh.role)}</text>
          </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">하나의 관점에 매몰되지 않도록, 사고를 6가지 색의 모자로 나눠 번갈아 쓰는 회의 기법. 팀 전체가 같은 모자를 동시에 씁니다.</div>
    </div>`;
  };

  const hr9boxThumb = () => {
    const cells = [
      { c: 0, r: 0 }, { c: 1, r: 0 }, { c: 2, r: 0 },
      { c: 0, r: 1 }, { c: 1, r: 1 }, { c: 2, r: 1 },
      { c: 0, r: 2 }, { c: 1, r: 2 }, { c: 2, r: 2 }
    ];
    const x0 = 70, y0 = 18, cw = 60, ch = 44, gap = 4;
    return `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <line x1="${x0 - 10}" y1="${y0}" x2="${x0 - 10}" y2="${y0 + 3 * ch + 2 * gap}" stroke="${MUTED}" stroke-width="1.2" pointer-events="none"/>
      <line x1="${x0 - 10}" y1="${y0 + 3 * ch + 2 * gap}" x2="${x0 + 3 * cw + 2 * gap}" y2="${y0 + 3 * ch + 2 * gap}" stroke="${MUTED}" stroke-width="1.2" pointer-events="none"/>
      <text x="${x0 - 24}" y="${y0 + 60}" font-size="9" fill="${MUTED}" transform="rotate(-90 ${x0 - 24} ${y0 + 60})" text-anchor="middle" pointer-events="none">잠재력</text>
      <text x="${x0 + 90}" y="${y0 + 3 * ch + 2 * gap + 14}" font-size="9" fill="${MUTED}" text-anchor="middle" pointer-events="none">성과</text>
      ${cells.map(({ c, r }) => {
        const x = x0 + c * (cw + gap);
        const y = y0 + r * (ch + gap);
        const isStar = c === 2 && r === 0;
        const isLow = c === 0 && r === 2;
        const fill = isStar ? PRIMARY : (isLow ? CREAM_STR : PAPER);
        const stroke = isStar ? PRIMARY : HAIRLINE;
        return `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>${isStar ? `<text x="${x + cw / 2}" y="${y + ch / 2 + 4}" font-size="11" font-weight="700" fill="${ON_DARK}" text-anchor="middle">★</text>` : ''}`;
      }).join('')}
    </svg>`;
  };

  const hr9boxFull = () => {
    const grid = [
      { c: 0, r: 0, n: '미래리더', tip: '잠재력은 높으나 현재 성과가 낮다. 코칭과 새 과제로 성과를 끌어올린다.' },
      { c: 1, r: 0, n: '핵심전력', tip: '높은 잠재력과 중간 성과. 더 큰 역할로 검증하며 성장시킨다.' },
      { c: 2, r: 0, n: '핵심인재', tip: 'Star. 성과와 잠재력 모두 최고. 유지·승계 1순위로 최우선 투자한다.', star: true },
      { c: 0, r: 1, n: '성장가능', tip: '잠재력 중간, 성과 낮음. 적합도와 동기를 점검하고 재배치를 고려한다.' },
      { c: 1, r: 1, n: '안정전력', tip: '성과·잠재력 모두 중간. 조직의 허리. 꾸준한 개발로 상향 이동을 노린다.' },
      { c: 2, r: 1, n: '효과적', tip: '성과 높음, 잠재력 중간. 현 역할의 핵심 기여자로 전문성을 강화한다.' },
      { c: 0, r: 2, n: '부진', tip: '관리·재배치 대상. 성과·잠재력 모두 낮다. 개선 계획 또는 이동을 결정한다.' },
      { c: 1, r: 2, n: '딜레마', tip: '잠재력은 낮으나 성과는 보통. 기대치를 명확히 하고 역할을 재설정한다.' },
      { c: 2, r: 2, n: '안정전력', tip: '성과 높고 잠재력 낮음. 현 직무의 든든한 베테랑. 동기 유지가 관건이다.' }
    ];
    const x0 = 200, y0 = 40, cw = 160, ch = 86, gap = 8;
    const gw = 3 * cw + 2 * gap;
    const gh = 3 * ch + 2 * gap;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="26" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}" pointer-events="none">9-Box 인재 그리드</text>
        <line x1="${x0 - 14}" y1="${y0}" x2="${x0 - 14}" y2="${y0 + gh}" stroke="${MUTED}" stroke-width="1.4" pointer-events="none"/>
        <line x1="${x0 - 14}" y1="${y0 + gh}" x2="${x0 + gw}" y2="${y0 + gh}" stroke="${MUTED}" stroke-width="1.4" pointer-events="none"/>
        <text x="${x0 - 30}" y="${y0 + gh / 2}" font-size="13" font-weight="700" fill="${MUTED}" transform="rotate(-90 ${x0 - 30} ${y0 + gh / 2})" text-anchor="middle" pointer-events="none">잠재력 (저 → 고)</text>
        <text x="${x0 + gw / 2}" y="${y0 + gh + 28}" font-size="13" font-weight="700" fill="${MUTED}" text-anchor="middle" pointer-events="none">성과 (저 → 고)</text>
        ${grid.map((g) => {
          const x = x0 + g.c * (cw + gap);
          const y = y0 + g.r * (ch + gap);
          const fill = g.star ? PRIMARY : (g.c === 0 && g.r === 2 ? CREAM_STR : PAPER);
          const stroke = g.star ? PRIMARY : HAIRLINE;
          const txt = g.star ? ON_DARK : INK;
          const sub = g.star ? AMBER_SOFT : MUTED;
          return `<g data-tip-title="${a(g.n)}" data-tip="${a(g.tip)}">
            <rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
            <text x="${x + cw / 2}" y="${y + ch / 2 + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="${txt}">${a(g.n)}</text>
            ${g.star ? `<text x="${x + cw / 2}" y="${y + 22}" text-anchor="middle" font-size="11" fill="${sub}">★ Star</text>` : ''}
          </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">성과와 잠재력 두 축으로 인력을 9개 그룹으로 나눠 육성·유지·재배치를 결정한다.</div>
    </div>`;
  };

  const ulrichThumb = () => {
    const x0 = 64, y0 = 24, cw = 96, ch = 60, gap = 4;
    const quads = [
      { c: 0, r: 0, hi: true }, { c: 1, r: 0 },
      { c: 0, r: 1 }, { c: 1, r: 1 }
    ];
    return `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${quads.map(({ c, r, hi }) => {
        const x = x0 + c * (cw + gap);
        const y = y0 + r * (ch + gap);
        return `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="4" fill="${hi ? PRIMARY : PAPER}" stroke="${hi ? PRIMARY : HAIRLINE}" stroke-width="1.2"/>`;
      }).join('')}
      <line x1="${x0 - 10}" y1="${y0 + ch + gap / 2}" x2="${x0 + 2 * cw + gap + 10}" y2="${y0 + ch + gap / 2}" stroke="${MUTED}" stroke-width="1" stroke-dasharray="3 3" pointer-events="none"/>
      <line x1="${x0 + cw + gap / 2}" y1="${y0 - 10}" x2="${x0 + cw + gap / 2}" y2="${y0 + 2 * ch + gap + 10}" stroke="${MUTED}" stroke-width="1" stroke-dasharray="3 3" pointer-events="none"/>
      <text x="${x0 + cw / 2}" y="${y0 + ch / 2 + 4}" font-size="10" font-weight="700" fill="${ON_DARK}" text-anchor="middle">전략</text>
    </svg>`;
  };

  const ulrichFull = () => {
    const x0 = 220, y0 = 56, cw = 230, ch = 120, gap = 10;
    const quads = [
      { c: 0, r: 0, n: '전략적 파트너', tip: '미래·프로세스 초점. 사업 전략과 HR 전략을 정렬해 조직 목표 달성을 이끈다.', hi: true },
      { c: 1, r: 0, n: '변화 관리자', tip: '미래·사람 초점. 변화와 혁신을 설계하고 조직의 전환 역량을 키운다.' },
      { c: 0, r: 1, n: '행정 전문가', tip: '일상·프로세스 초점. HR 인프라를 효율적으로 운영해 비용과 품질을 관리한다.' },
      { c: 1, r: 1, n: '직원 옹호자', tip: '일상·사람 초점. 구성원의 몰입과 역량을 높이고 목소리를 대변한다.' }
    ];
    const gw = 2 * cw + gap, gh = 2 * ch + gap;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="28" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}" pointer-events="none">Ulrich HR 역할 모델</text>
        <text x="${x0 + gw / 2}" y="${y0 - 14}" text-anchor="middle" font-size="12" font-weight="700" fill="${MUTED}" pointer-events="none">미래 · 전략 ↑</text>
        <text x="${x0 + gw / 2}" y="${y0 + gh + 24}" text-anchor="middle" font-size="12" font-weight="700" fill="${MUTED}" pointer-events="none">↓ 일상 · 운영</text>
        <text x="${x0 - 16}" y="${y0 + gh / 2}" text-anchor="middle" font-size="12" font-weight="700" fill="${MUTED}" transform="rotate(-90 ${x0 - 16} ${y0 + gh / 2})" pointer-events="none">프로세스 초점</text>
        <text x="${x0 + gw + 16}" y="${y0 + gh / 2}" text-anchor="middle" font-size="12" font-weight="700" fill="${MUTED}" transform="rotate(90 ${x0 + gw + 16} ${y0 + gh / 2})" pointer-events="none">사람 초점</text>
        ${quads.map((q) => {
          const x = x0 + q.c * (cw + gap);
          const y = y0 + q.r * (ch + gap);
          const fill = q.hi ? PRIMARY : PAPER;
          const stroke = q.hi ? PRIMARY : HAIRLINE;
          const txt = q.hi ? ON_DARK : INK;
          return `<g data-tip-title="${a(q.n)}" data-tip="${a(q.tip)}">
            <rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
            <text x="${x + cw / 2}" y="${y + ch / 2 + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="${txt}">${a(q.n)}</text>
          </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">초점(프로세스↔사람)과 시계(운영↔전략) 두 축으로 HR이 맡는 네 가지 역할을 정의한다.</div>
    </div>`;
  };

  const herzbergThumb = () => {
    const cx = 140, top = 26, rowH = 24, gap = 6, n = 4;
    return `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <line x1="${cx}" y1="18" x2="${cx}" y2="158" stroke="${MUTED}" stroke-width="1.4" pointer-events="none"/>
      ${Array.from({ length: n }).map((_, i) => {
        const y = top + i * (rowH + gap);
        const wH = 36 + i * 14;
        const wM = 40 + i * 16;
        return `<rect x="${cx - wH}" y="${y}" width="${wH}" height="${rowH}" rx="3" fill="${CARD}" stroke="${HAIRLINE}" stroke-width="1"/>
          <rect x="${cx}" y="${y}" width="${wM}" height="${rowH}" rx="3" fill="${PRIMARY_SOFT}" stroke="${PRIMARY}" stroke-width="1"/>`;
      }).join('')}
      <text x="${cx - 70}" y="14" font-size="8" fill="${MUTED}" text-anchor="middle" pointer-events="none">위생</text>
      <text x="${cx + 60}" y="14" font-size="8" fill="${PRIMARY}" text-anchor="middle" pointer-events="none">동기</text>
    </svg>`;
  };

  const herzbergFull = () => {
    const hygiene = [
      { n: '급여·복리', tip: '부족하면 불만이 크지만, 충분해도 만족을 만들지는 못한다.' },
      { n: '근무 환경', tip: '물리적·제도적 여건. 열악하면 불만, 좋아도 중립까지만 끌어올린다.' },
      { n: '관리·감독', tip: '상사의 관리 방식. 부적절하면 불만, 적절해도 동기 부여는 아니다.' },
      { n: '회사 정책', tip: '규정과 관행. 불합리하면 불만의 원천이 되지만 동기와는 무관하다.' }
    ];
    const motivator = [
      { n: '성취', tip: '의미 있는 일을 해냈다는 경험. 진정한 만족과 동기를 만든다.', hi: true },
      { n: '인정', tip: '기여에 대한 공정한 인정. 자발적 몰입을 끌어올린다.' },
      { n: '책임', tip: '권한과 자율의 확대. 일에 대한 주인의식을 높인다.' },
      { n: '성장', tip: '발전과 승진의 기회. 장기적인 동기의 핵심이다.' }
    ];
    const cx = 380, top = 70, rowH = 50, gap = 10;
    const maxW = 230;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="28" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}" pointer-events="none">Herzberg 2요인 이론</text>
        <text x="${cx - maxW / 2}" y="52" text-anchor="middle" font-size="13" font-weight="700" fill="${MUTED}" pointer-events="none">위생요인 · 불만족 방지</text>
        <text x="${cx + maxW / 2}" y="52" text-anchor="middle" font-size="13" font-weight="700" fill="${PRIMARY}" pointer-events="none">동기요인 · 만족 유발</text>
        <line x1="${cx}" y1="60" x2="${cx}" y2="${top + 4 * (rowH + gap) - gap + 6}" stroke="${MUTED}" stroke-width="1.6" pointer-events="none"/>
        <text x="${cx}" y="${top + 4 * (rowH + gap) + 14}" text-anchor="middle" font-size="11" fill="${MUTED_SOFT}" pointer-events="none">← 불만족   0 (중립)   만족 →</text>
        ${hygiene.map((h, i) => {
          const y = top + i * (rowH + gap);
          const w = 110 + i * 28;
          return `<g data-tip-title="${a(h.n)}" data-tip="${a(h.tip)}">
            <rect x="${cx - w}" y="${y}" width="${w}" height="${rowH}" rx="5" fill="${CARD}" stroke="${HAIRLINE}" stroke-width="1.4"/>
            <text x="${cx - w + 14}" y="${y + rowH / 2 + 5}" font-size="14" font-weight="600" fill="${BODY}">${a(h.n)}</text>
          </g>`;
        }).join('')}
        ${motivator.map((m, i) => {
          const y = top + i * (rowH + gap);
          const w = 120 + i * 26;
          const fill = m.hi ? PRIMARY : PRIMARY_SOFT;
          const stroke = m.hi ? PRIMARY : PRIMARY;
          const txt = m.hi ? ON_DARK : INK;
          return `<g data-tip-title="${a(m.n)}" data-tip="${a(m.tip)}">
            <rect x="${cx}" y="${y}" width="${w}" height="${rowH}" rx="5" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>
            <text x="${cx + w - 14}" y="${y + rowH / 2 + 5}" text-anchor="end" font-size="14" font-weight="700" fill="${txt}">${a(m.n)}</text>
          </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">위생요인은 불만족만 막고, 진짜 만족과 동기는 성취·인정·책임·성장에서 나온다.</div>
    </div>`;
  };

  const vrioThumb = () => {
    const steps = ['V', 'R', 'I', 'O'];
    const x0 = 16, y = 76, bw = 36, bh = 36, gap = 10;
    const advX = x0 + 4 * (bw + gap) - gap + 6, advW = 42;
    return `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${steps.map((s, i) => {
        const x = x0 + i * (bw + gap);
        return `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="6" fill="${PAPER}" stroke="${INK}" stroke-width="1.4"/>
          <text x="${x + bw / 2}" y="${y + bh / 2 + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${s}</text>
          ${i < 3 ? `<line x1="${x + bw}" y1="${y + bh / 2}" x2="${x + bw + gap}" y2="${y + bh / 2}" stroke="${INK}" stroke-width="1.2" pointer-events="none"/>` : ''}
          <line x1="${x + bw / 2}" y1="${y + bh}" x2="${x + bw / 2}" y2="${y + bh + 16}" stroke="${MUTED}" stroke-width="1" stroke-dasharray="2 2" pointer-events="none"/>`;
      }).join('')}
      <line x1="${x0 + 4 * (bw + gap) - gap}" y1="${y + bh / 2}" x2="${advX}" y2="${y + bh / 2}" stroke="${INK}" stroke-width="1.2" pointer-events="none"/>
      <rect x="${advX}" y="${y}" width="${advW}" height="${bh}" rx="6" fill="${PRIMARY}" stroke="${PRIMARY}" stroke-width="1.4"/>
      <text x="${advX + advW / 2}" y="${y + bh / 2 + 4}" text-anchor="middle" font-size="9" font-weight="700" fill="${ON_DARK}">우위</text>
    </svg>`;
  };

  const vrioFull = () => {
    const steps = [
      { k: 'V', q: '가치 있는가?', no: '경쟁 열위', tip: '자원이 기회를 살리거나 위협에 대응하는가? 아니면 경쟁 열위에 놓인다.' },
      { k: 'R', q: '희소한가?', no: '경쟁 등위', tip: '소수만 보유하는가? 흔하면 동등한 경쟁(경쟁 등위)에 그친다.' },
      { k: 'I', q: '모방 어려운가?', no: '일시적 우위', tip: '모방·대체가 비싸거나 어려운가? 쉽게 따라잡히면 일시적 우위뿐이다.' },
      { k: 'O', q: '조직이 활용하는가?', no: '미활용 우위', tip: '조직 구조와 프로세스가 자원을 활용하는가? 아니면 잠재력이 사장된다.' }
    ];
    const x0 = 22, ytop = 74, bw = 116, bh = 84, gap = 18;
    const arrowY = ytop + bh / 2;
    const outX = x0 + 4 * (bw + gap) - gap + 14, outW = 184;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="vrioAr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><polygon points="0,0 10,5 0,10" fill="${INK}"/></marker></defs>
        <text x="380" y="34" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}" pointer-events="none">VRIO 분석</text>
        ${steps.map((s, i) => {
          const x = x0 + i * (bw + gap);
          return `<g data-tip-title="${a(s.k + ' · ' + s.q)}" data-tip="${a(s.tip)}">
            <rect x="${x}" y="${ytop}" width="${bw}" height="${bh}" rx="8" fill="${PAPER}" stroke="${INK}" stroke-width="1.5"/>
            <text x="${x + bw / 2}" y="${ytop + 32}" text-anchor="middle" font-size="20" font-weight="800" fill="${INK}">${a(s.k)}</text>
            <text x="${x + bw / 2}" y="${ytop + 56}" text-anchor="middle" font-size="12" fill="${BODY}">${a(s.q)}</text>
          </g>
          ${i < steps.length - 1 ? `<text x="${x + bw + gap / 2}" y="${arrowY - 8}" text-anchor="middle" font-size="10" font-weight="700" fill="${TEAL}" pointer-events="none">Yes</text><line x1="${x + bw}" y1="${arrowY}" x2="${x + bw + gap}" y2="${arrowY}" stroke="${INK}" stroke-width="1.4" marker-end="url(#vrioAr)" pointer-events="none"/>` : ''}
          <line x1="${x + bw / 2}" y1="${ytop + bh}" x2="${x + bw / 2}" y2="${ytop + bh + 34}" stroke="${MUTED}" stroke-width="1.2" stroke-dasharray="3 3" marker-end="url(#vrioAr)" pointer-events="none"/>
          <text x="${x + bw / 2}" y="${ytop + bh + 14}" text-anchor="middle" font-size="10" font-weight="700" fill="${MUTED}" pointer-events="none">No</text>
          <text x="${x + bw / 2}" y="${ytop + bh + 50}" text-anchor="middle" font-size="11" fill="${MUTED}" pointer-events="none">${a(s.no)}</text>`;
        }).join('')}
        <text x="${outX - gap / 2}" y="${arrowY - 8}" text-anchor="middle" font-size="10" font-weight="700" fill="${TEAL}" pointer-events="none">Yes</text>
        <line x1="${outX - gap}" y1="${arrowY}" x2="${outX}" y2="${arrowY}" stroke="${INK}" stroke-width="1.4" marker-end="url(#vrioAr)" pointer-events="none"/>
        <g data-tip-title="지속적 경쟁우위" data-tip="네 질문에 모두 Yes일 때 도달한다. 모방·대체가 어렵고 조직이 충분히 활용하는 자원이다.">
          <rect x="${outX}" y="${ytop}" width="${outW}" height="${bh}" rx="8" fill="${PRIMARY}" stroke="${PRIMARY}" stroke-width="1.5"/>
          <text x="${outX + outW / 2}" y="${ytop + 36}" text-anchor="middle" font-size="15" font-weight="700" fill="${ON_DARK}">지속적</text>
          <text x="${outX + outW / 2}" y="${ytop + 58}" text-anchor="middle" font-size="15" font-weight="700" fill="${ON_DARK}">경쟁우위</text>
        </g>
      </svg>
      <div class="viz-caption">자원이 가치·희소성·모방곤란성·조직 활용을 모두 충족할 때 지속적 경쟁우위가 된다.</div>
    </div>`;
  };

  const rfmThumb = () => {
    const bars = ['R', 'F', 'M'];
    const x0 = 18, bx = 38, y0 = 30, rh = 18, gap = 16, bw = 110;
    const fills = [4, 5, 3];
    const chips = [
      { y: 24, hi: true }, { y: 52 }, { y: 80 }, { y: 108 }
    ];
    return `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${bars.map((b, i) => {
        const y = y0 + i * (rh + gap);
        return `<text x="${x0}" y="${y + rh / 2 + 4}" font-size="11" font-weight="700" fill="${INK}">${b}</text>
          <rect x="${bx}" y="${y}" width="${bw}" height="${rh}" rx="3" fill="${CARD}" stroke="${HAIRLINE}" stroke-width="1"/>
          <rect x="${bx}" y="${y}" width="${bw * fills[i] / 5}" height="${rh}" rx="3" fill="${MUTED_SOFT}"/>`;
      }).join('')}
      ${chips.map((c) => `<rect x="178" y="${c.y}" width="88" height="22" rx="11" fill="${c.hi ? PRIMARY : PAPER}" stroke="${c.hi ? PRIMARY : HAIRLINE}" stroke-width="1.2"/>`).join('')}
    </svg>`;
  };

  const rfmFull = () => {
    const bars = [
      { k: 'R', n: '최근성 (Recency)', v: 4, tip: '마지막 구매가 얼마나 최근인가. 점수가 높을수록 최근에 구매한 활성 고객이다.' },
      { k: 'F', n: '빈도 (Frequency)', v: 5, tip: '일정 기간 동안 얼마나 자주 구매했는가. 높을수록 충성도가 강하다.' },
      { k: 'M', n: '금액 (Monetary)', v: 3, tip: '누적 구매 금액이 얼마인가. 높을수록 매출 기여가 큰 고객이다.' }
    ];
    const segs = [
      { n: '우량 고객', tip: 'R·F·M 모두 높다. 최근에, 자주, 많이 산 핵심 고객. VIP 관리와 리텐션에 집중한다.', hi: true },
      { n: '충성 고객', tip: '빈도가 높고 꾸준히 구매한다. 업셀·크로스셀로 객단가를 높일 여지가 크다.' },
      { n: '신규 고객', tip: '최근 첫 구매. 빈도·금액은 낮다. 온보딩과 두 번째 구매 유도가 관건이다.' },
      { n: '이탈 위험', tip: '과거엔 우량했으나 최근성이 떨어졌다. 재활성화 캠페인이 필요하다.' },
      { n: '휴면 고객', tip: 'R·F·M 모두 낮다. 오래 비활성. 저비용 윈백 또는 정리 대상으로 본다.' }
    ];
    const bx = 56, barW = 280, y0 = 78, rh = 30, vgap = 34;
    const chipX = 440, chipY0 = 64, chipW = 270, chipH = 44, chipGap = 12;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        <text x="40" y="30" font-size="17" font-weight="700" fill="${INK}" pointer-events="none">RFM 분석</text>
        <text x="40" y="56" font-size="12" font-weight="700" fill="${MUTED}" pointer-events="none">점수 (1 → 5)</text>
        ${[1, 2, 3, 4, 5].map((s) => {
          const x = bx + barW * (s - 0.5) / 5;
          return `<text x="${x}" y="56" text-anchor="middle" font-size="10" fill="${MUTED_SOFT}" pointer-events="none">${s}</text>`;
        }).join('')}
        ${bars.map((b, i) => {
          const y = y0 + i * (rh + vgap);
          return `<g data-tip-title="${a(b.n)}" data-tip="${a(b.tip)}">
            <text x="40" y="${y + rh / 2 + 5}" font-size="15" font-weight="700" fill="${INK}">${a(b.k)}</text>
            <rect x="${bx}" y="${y}" width="${barW}" height="${rh}" rx="5" fill="${CARD}" stroke="${HAIRLINE}" stroke-width="1.2"/>
            <rect x="${bx}" y="${y}" width="${barW * b.v / 5}" height="${rh}" rx="5" fill="${MUTED_SOFT}"/>
            <text x="${bx + barW * b.v / 5 - 10}" y="${y + rh / 2 + 5}" text-anchor="end" font-size="13" font-weight="700" fill="${ON_DARK}">${b.v}</text>
            <text x="${bx + 8}" y="${y - 6}" font-size="11" fill="${MUTED}">${a(b.n)}</text>
          </g>`;
        }).join('')}
        <text x="${chipX}" y="56" font-size="12" font-weight="700" fill="${MUTED}" pointer-events="none">대표 세그먼트</text>
        ${segs.map((s, i) => {
          const y = chipY0 + i * (chipH + chipGap);
          const fill = s.hi ? PRIMARY : PAPER;
          const stroke = s.hi ? PRIMARY : HAIRLINE;
          const txt = s.hi ? ON_DARK : INK;
          return `<g data-tip-title="${a(s.n)}" data-tip="${a(s.tip)}">
            <rect x="${chipX}" y="${y}" width="${chipW}" height="${chipH}" rx="${chipH / 2}" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>
            <text x="${chipX + 22}" y="${y + chipH / 2 + 5}" font-size="14" font-weight="700" fill="${txt}">${a(s.n)}</text>
          </g>`;
        }).join('')}
      </svg>
      <div class="viz-caption">최근성·빈도·금액 점수로 고객을 세분화해 세그먼트별 맞춤 전략을 세운다.</div>
    </div>`;
  };

  const dmaicThumb = () => {
    const S = [
      { l: '정의' }, { l: '측정' }, { l: '분석' }, { l: '개선' }, { l: '관리' }
    ];
    const cx = 140, cy = 90, r = 60;
    const nodes = S.map((s, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI / S.length);
      return { x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang), l: s.l, hi: i === 3 };
    });
    const dots = nodes.map(n =>
      `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="18" fill="${n.hi ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1.2"/><text x="${n.x.toFixed(1)}" y="${(n.y + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${n.hi ? ON_DARK : INK}">${a(n.l)}</text>`
    ).join('');
    const arcs = nodes.map((n, i) => {
      const m = nodes[(i + 1) % nodes.length];
      return `<path d="M ${n.x.toFixed(1)} ${n.y.toFixed(1)} L ${m.x.toFixed(1)} ${m.y.toFixed(1)}" stroke="${MUTED}" stroke-width="1" fill="none" pointer-events="none" marker-end="url(#dmThumbArr)"/>`;
    }).join('');
    return `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg"><defs><marker id="dmThumbArr" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="${MUTED}"/></marker></defs>${arcs}${dots}</svg>`;
  };

  const dmaicFull = () => {
    const S = [
      { n: 'Define / 정의', k: 'D', e: 'Define', l: '정의', tip: '해결할 문제와 목표, 프로젝트 범위를 명확히 정의한다.' },
      { n: 'Measure / 측정', k: 'M', e: 'Measure', l: '측정', tip: '현재 프로세스 성과를 데이터로 측정해 기준선을 잡는다.' },
      { n: 'Analyze / 분석', k: 'A', e: 'Analyze', l: '분석', tip: '데이터로 근본 원인을 분석하고 핵심 변수를 찾는다.' },
      { n: 'Improve / 개선', k: 'I', e: 'Improve', l: '개선', tip: '근본 원인을 제거할 개선안을 설계하고 실행한다.' },
      { n: 'Control / 관리', k: 'C', e: 'Control', l: '관리', tip: '개선 성과를 표준화하고 지속 관리해 재발을 막는다.' }
    ];
    const cx = 380, cy = 215, r = 130;
    const nodes = S.map((s, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI / S.length);
      return Object.assign({}, s, { x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang), hi: i === 3 });
    });
    const arcs = nodes.map((n, i) => {
      const m = nodes[(i + 1) % nodes.length];
      const dx = m.x - n.x, dy = m.y - n.y, len = Math.sqrt(dx * dx + dy * dy);
      const ux = dx / len, uy = dy / len, pad = 40;
      const x1 = n.x + ux * pad, y1 = n.y + uy * pad, x2 = m.x - ux * pad, y2 = m.y - uy * pad;
      const loop = i === nodes.length - 1;
      return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${loop ? PRIMARY : MUTED}" stroke-width="${loop ? 1.8 : 1.4}" stroke-dasharray="${loop ? '5 4' : 'none'}" fill="none" pointer-events="none" marker-end="url(#dmFullArr${loop ? 'P' : ''})"/>`;
    }).join('');
    const dots = nodes.map(n =>
      `<g data-tip-title="${a(n.n)}" data-tip="${a(n.tip)}"><circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="40" fill="${n.hi ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1.4"/><text x="${n.x.toFixed(1)}" y="${(n.y - 4).toFixed(1)}" text-anchor="middle" font-size="22" font-weight="700" fill="${n.hi ? ON_DARK : INK}">${a(n.k)}</text><text x="${n.x.toFixed(1)}" y="${(n.y + 16).toFixed(1)}" text-anchor="middle" font-size="12" fill="${n.hi ? ON_DARK : BODY}">${a(n.l)}</text></g>`
    ).join('');
    return `<div class="viz"><svg class="viz-svg" viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg"><defs><marker id="dmFullArr" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="${MUTED}"/></marker><marker id="dmFullArrP" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="${PRIMARY}"/></marker></defs><text x="380" y="40" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}" pointer-events="none">DMAIC 개선 순환</text><text x="${cx}" y="${cy - 6}" text-anchor="middle" font-size="13" fill="${MUTED}" pointer-events="none">지속</text><text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="13" fill="${MUTED}" pointer-events="none">개선</text>${arcs}${dots}</svg><div class="viz-caption">정의·측정·분석·개선·관리 다섯 단계를 순환하며, 관리 단계의 성과를 다시 정의 단계로 환류해 프로세스를 지속 개선한다.</div></div>`;
  };

  const pdcaThumb = () => {
    const Q = [
      { l: '계획', a0: -90, hi: false },
      { l: '실행', a0: 0, hi: false },
      { l: '점검', a0: 90, hi: false },
      { l: '개선', a0: 180, hi: true }
    ];
    const cx = 140, cy = 92, r = 58;
    const sectors = Q.map(q => {
      const s = (q.a0) * Math.PI / 180, e = (q.a0 + 90) * Math.PI / 180;
      const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s);
      const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
      const lx = cx + r * 0.6 * Math.cos((s + e) / 2), ly = cy + r * 0.6 * Math.sin((s + e) / 2);
      return `<path d="M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${q.hi ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1.2"/><text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${q.hi ? ON_DARK : INK}">${a(q.l)}</text>`;
    }).join('');
    return `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg"><defs><marker id="pdThumbArr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="${MUTED}"/></marker></defs>${sectors}<path d="M ${cx + r + 8} ${cy} A ${r + 8} ${r + 8} 0 0 1 ${cx} ${cy + r + 8}" stroke="${MUTED}" stroke-width="1.2" fill="none" pointer-events="none" marker-end="url(#pdThumbArr)"/></svg>`;
  };

  const pdcaFull = () => {
    const Q = [
      { n: 'Plan / 계획', k: 'P', l: '계획', a0: -90, hi: false, tip: '목표를 세우고 달성 방법과 측정 기준을 계획한다.' },
      { n: 'Do / 실행', k: 'D', l: '실행', a0: 0, hi: false, tip: '계획을 작은 범위에서 실행하고 데이터를 수집한다.' },
      { n: 'Check / 점검', k: 'C', l: '점검', a0: 90, hi: false, tip: '결과를 목표와 비교해 차이와 원인을 점검한다.' },
      { n: 'Act / 개선', k: 'A', l: '개선', a0: 180, hi: true, tip: '효과가 있으면 표준화하고, 없으면 다음 주기에 반영한다.' }
    ];
    const cx = 300, cy = 220, r = 140;
    const sectors = Q.map(q => {
      const s = q.a0 * Math.PI / 180, e = (q.a0 + 90) * Math.PI / 180;
      const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s);
      const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
      const mid = (s + e) / 2;
      const lx = cx + r * 0.62 * Math.cos(mid), ly = cy + r * 0.62 * Math.sin(mid);
      return `<g data-tip-title="${a(q.n)}" data-tip="${a(q.tip)}"><path d="M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${q.hi ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1.4"/><text x="${lx.toFixed(1)}" y="${(ly - 2).toFixed(1)}" text-anchor="middle" font-size="24" font-weight="700" fill="${q.hi ? ON_DARK : INK}">${a(q.k)}</text><text x="${lx.toFixed(1)}" y="${(ly + 18).toFixed(1)}" text-anchor="middle" font-size="13" fill="${q.hi ? ON_DARK : BODY}">${a(q.l)}</text></g>`;
    }).join('');
    const ro = r + 22;
    const arc = `<path d="M ${cx + ro} ${cy} A ${ro} ${ro} 0 0 1 ${cx} ${cy + ro} A ${ro} ${ro} 0 0 1 ${cx - ro} ${cy}" stroke="${MUTED}" stroke-width="1.6" fill="none" pointer-events="none" marker-end="url(#pdFullArr)"/>`;
    const spiral = [0, 1, 2, 3].map(i => `<rect x="${600 + 0}" y="${380 - i * 22}" width="${40 + i * 28}" height="14" fill="${i === 3 ? PRIMARY : CARD}" stroke="${INK}" stroke-width="1" rx="2"/>`).join('');
    return `<div class="viz"><svg class="viz-svg" viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg"><defs><marker id="pdFullArr" markerWidth="9" markerHeight="9" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="${MUTED}"/></marker></defs><text x="300" y="40" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}" pointer-events="none">PDCA 순환</text>${arc}${sectors}<g data-tip-title="점진적 개선" data-tip="순환을 반복할 때마다 표준이 한 단계씩 올라가 품질이 누적 향상된다."><text x="660" y="60" text-anchor="middle" font-size="13" fill="${MUTED}" pointer-events="none">반복할수록</text><text x="660" y="78" text-anchor="middle" font-size="13" fill="${MUTED}" pointer-events="none">상승</text>${spiral}</g></svg><div class="viz-caption">계획·실행·점검·개선을 시계 방향으로 돌리는 순환이다. 한 바퀴마다 표준이 한 단계씩 올라가 품질이 점진적으로 누적된다.</div></div>`;
  };

  const growThumb = () => {
    const S = [
      { l: 'G', hi: false }, { l: 'R', hi: false }, { l: 'O', hi: false }, { l: 'W', hi: true }
    ];
    const bw = 48, gap = 12, x0 = 24, y = 64, h = 52;
    const steps = S.map((s, i) => {
      const x = x0 + i * (bw + gap);
      return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="3" fill="${s.hi ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1.2"/><text x="${x + bw / 2}" y="${y + h / 2 + 7}" text-anchor="middle" font-size="20" font-weight="700" fill="${s.hi ? ON_DARK : INK}">${a(s.l)}</text>${i < S.length - 1 ? `<line x1="${x + bw + 1}" y1="${y + h / 2}" x2="${x + bw + gap - 1}" y2="${y + h / 2}" stroke="${MUTED}" stroke-width="1.4" marker-end="url(#grThumbArr)" pointer-events="none"/>` : ''}`;
    }).join('');
    return `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg"><defs><marker id="grThumbArr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="${MUTED}"/></marker></defs>${steps}</svg>`;
  };

  const growFull = () => {
    const S = [
      { n: 'Goal / 목표', k: 'G', e: 'Goal', l: '목표', q: '"무엇을 이루고 싶은가?"', hi: false, tip: '코칭 대화에서 달성하고 싶은 구체적 목표를 먼저 정한다.' },
      { n: 'Reality / 현실', k: 'R', e: 'Reality', l: '현실', q: '"지금 어디에 있는가?"', hi: false, tip: '현재 상황과 사실, 이미 시도한 것을 객관적으로 점검한다.' },
      { n: 'Options / 대안', k: 'O', e: 'Options', l: '대안', q: '"무엇을 할 수 있는가?"', hi: false, tip: '가능한 선택지를 폭넓게 펼쳐 보고 장단점을 따져 본다.' },
      { n: 'Will / 실행의지', k: 'W', e: 'Will', l: '실행의지', q: '"무엇을 언제 할 것인가?"', hi: true, tip: '구체적 실행 계획과 책임, 첫 행동을 약속으로 확정한다.' }
    ];
    const bw = 150, gap = 30, x0 = 60, y = 150, h = 130;
    const steps = S.map((s, i) => {
      const x = x0 + i * (bw + gap);
      const arr = i < S.length - 1
        ? `<line x1="${x + bw + 3}" y1="${y + h / 2}" x2="${x + bw + gap - 3}" y2="${y + h / 2}" stroke="${MUTED}" stroke-width="1.6" marker-end="url(#grFullArr)" pointer-events="none"/>`
        : '';
      return `<g data-tip-title="${a(s.n)}" data-tip="${a(s.tip)}"><rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="4" fill="${s.hi ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1.4"/><text x="${x + bw / 2}" y="${y + 50}" text-anchor="middle" font-size="40" font-weight="700" fill="${s.hi ? ON_DARK : PRIMARY}">${a(s.k)}</text><text x="${x + bw / 2}" y="${y + 78}" text-anchor="middle" font-size="15" font-weight="700" fill="${s.hi ? ON_DARK : INK}">${a(s.l)}</text><text x="${x + bw / 2}" y="${y + 102}" text-anchor="middle" font-size="11" fill="${s.hi ? ON_DARK : MUTED}">${a(s.q)}</text></g>${arr}`;
    }).join('');
    return `<div class="viz"><svg class="viz-svg" viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg"><defs><marker id="grFullArr" markerWidth="9" markerHeight="9" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="${MUTED}"/></marker></defs><text x="380" y="48" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}" pointer-events="none">GROW 코칭 모델</text><text x="380" y="78" text-anchor="middle" font-size="13" fill="${MUTED}" pointer-events="none">목표 → 현실 → 대안 → 실행의지 순으로 질문을 던진다</text><line x1="60" y1="${y + h + 26}" x2="700" y2="${y + h + 26}" stroke="${HAIRLINE}" stroke-width="1" pointer-events="none"/>${steps}</svg><div class="viz-caption">목표·현실·대안·실행의지 네 단계 질문으로 코칭 대화를 구조화한다. 마지막 실행의지에서 구체적 첫 행동을 약속으로 확정하는 것이 핵심이다.</div></div>`;
  };

  const kirkpatrickThumb = () => {
    const L = [
      { l: '반응', hi: false }, { l: '학습', hi: false }, { l: '행동', hi: false }, { l: '결과', hi: true }
    ];
    const baseW = 200, x0 = 40, yBase = 150, sh = 30;
    const steps = L.map((s, i) => {
      const w = baseW - i * 40;
      const x = x0 + (i * 40) / 2;
      const y = yBase - (i + 1) * sh;
      return `<rect x="${x}" y="${y}" width="${w}" height="${sh - 4}" fill="${s.hi ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1.2"/><text x="${x + w / 2}" y="${y + 18}" text-anchor="middle" font-size="12" font-weight="700" fill="${s.hi ? ON_DARK : INK}">${a(s.l)}</text>`;
    }).join('');
    return `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">${steps}</svg>`;
  };

  const kirkpatrickFull = () => {
    const L = [
      { n: 'Level 1 · Reaction / 반응', k: '1', e: 'Reaction', l: '반응', d: '교육 만족도', hi: false, tip: '학습자가 교육을 어떻게 느꼈는지 만족도와 반응을 측정한다.' },
      { n: 'Level 2 · Learning / 학습', k: '2', e: 'Learning', l: '학습', d: '지식·기술 습득', hi: false, tip: '교육을 통해 지식·기술·태도가 실제로 늘었는지 평가한다.' },
      { n: 'Level 3 · Behavior / 행동', k: '3', e: 'Behavior', l: '행동', d: '현업 적용·행동 변화', hi: false, tip: '배운 것을 현업에서 행동으로 옮기고 있는지 관찰한다.' },
      { n: 'Level 4 · Results / 결과', k: '4', e: 'Results', l: '결과', d: '성과·비즈니스 임팩트', hi: true, tip: '교육이 매출·품질 등 비즈니스 성과로 이어졌는지 측정한다.' }
    ];
    const cx = 300, baseW = 360, top = 70, sh = 70, gap = 6;
    const steps = L.map((s, i) => {
      const w = baseW - i * 80;
      const y = top + (L.length - 1 - i) * (sh + gap);
      const x = cx - w / 2;
      return `<g data-tip-title="${a(s.n)}" data-tip="${a(s.tip)}"><rect x="${x}" y="${y}" width="${w}" height="${sh}" rx="3" fill="${s.hi ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1.4"/><text x="${cx}" y="${y + 30}" text-anchor="middle" font-size="16" font-weight="700" fill="${s.hi ? ON_DARK : INK}">${a('Lv' + s.k + ' ' + s.l)} <tspan font-size="13" font-weight="400" fill="${s.hi ? ON_DARK : MUTED}">${a(s.e)}</tspan></text><text x="${cx}" y="${y + 52}" text-anchor="middle" font-size="12" fill="${s.hi ? ON_DARK : BODY}">${a(s.d)}</text></g>`;
    }).join('');
    const axTop = top, axBot = top + 4 * (sh + gap) - gap;
    return `<div class="viz"><svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg"><defs><marker id="kpAxis" markerWidth="9" markerHeight="9" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="${MUTED}"/></marker></defs><text x="300" y="38" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}" pointer-events="none">커크패트릭 4단계 평가</text><g pointer-events="none"><line x1="600" y1="${axBot}" x2="600" y2="${axTop - 6}" stroke="${MUTED}" stroke-width="1.4" marker-end="url(#kpAxis)"/><text x="618" y="${axTop + 6}" font-size="12" fill="${MUTED}">측정 난도</text><text x="618" y="${axTop + 22}" font-size="12" fill="${MUTED}">가치 ↑</text><text x="618" y="${axBot}" font-size="11" fill="${MUTED_SOFT}">낮음</text></g>${steps}</svg><div class="viz-caption">반응·학습·행동·결과 네 단계로 교육 효과를 평가한다. 위로 갈수록 측정은 어렵지만 비즈니스 가치가 커지며, 최종 결과 단계가 가장 중요하다.</div></div>`;
  };

  const competencyThumb = () => {
    const L = [
      { l: '핵심', hi: false }, { l: '직무', hi: false }, { l: '리더십', hi: true }
    ];
    const cx = 110, baseW = 150, top = 50, sh = 32, gap = 6;
    const steps = L.map((s, i) => {
      const idx = L.length - 1 - i;
      const w = baseW - i * 45;
      const y = top + idx * (sh + gap);
      const x = cx - w / 2;
      return `<rect x="${x}" y="${y}" width="${w}" height="${sh}" fill="${s.hi ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1.2"/><text x="${cx}" y="${y + 21}" text-anchor="middle" font-size="11" font-weight="700" fill="${s.hi ? ON_DARK : INK}">${a(s.l)}</text>`;
    }).join('');
    return `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">${steps}<text x="225" y="80" text-anchor="middle" font-size="10" fill="${MUTED}">KSA</text></svg>`;
  };

  const competencyFull = () => {
    const L = [
      { n: '핵심역량 / Core', l: '핵심역량', e: 'Core Competency', d: '전 구성원 공통 가치·태도', hi: false, tip: '조직 구성원 모두가 공유해야 하는 공통 가치와 기본 태도다.' },
      { n: '직무역량 / Functional', l: '직무역량', e: 'Functional Competency', d: '직무 수행에 필요한 지식·기술', hi: false, tip: '맡은 직무를 잘 수행하기 위해 필요한 전문 지식과 기술이다.' },
      { n: '리더십역량 / Leadership', l: '리더십역량', e: 'Leadership Competency', d: '조직을 이끄는 역량', hi: true, tip: '사람과 조직을 이끌고 성과를 만들어 내는 상위 리더십 역량이다.' }
    ];
    const cx = 290, top = 86, bh = 92;
    const widths = [380, 280, 175, 78]; // 바닥→꼭대기 경계 폭(이어지는 삼각형)
    const steps = L.map((s, i) => {
      const yB = top + (3 - i) * bh;
      const yT = top + (2 - i) * bh;
      const wB = widths[i], wT = widths[i + 1];
      const cy = (yB + yT) / 2;
      return `<g data-tip-title="${a(s.n)}" data-tip="${a(s.tip)}"><polygon points="${cx - wB / 2},${yB} ${cx + wB / 2},${yB} ${cx + wT / 2},${yT} ${cx - wT / 2},${yT}" fill="${s.hi ? PRIMARY : PAPER}" stroke="${INK}" stroke-width="1.4"/><text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="16" font-weight="700" fill="${s.hi ? ON_DARK : INK}">${a(s.l)}</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="12" fill="${s.hi ? ON_DARK : BODY}">${a(s.d)}</text></g>`;
    }).join('');
    const ksa = [
      { k: 'K', t: 'Knowledge / 지식', tip: '직무에 필요한 이론·정보·전문 지식.' },
      { k: 'S', t: 'Skill / 기술', tip: '실제로 일을 수행하는 숙련된 기술과 능력.' },
      { k: 'A', t: 'Attitude / 태도', tip: '일과 사람을 대하는 가치관과 행동 성향.' }
    ].map((m, i) => {
      const y = 110 + i * 70;
      return `<g data-tip-title="${a(m.t)}" data-tip="${a(m.tip)}"><circle cx="600" cy="${y}" r="22" fill="${PAPER}" stroke="${INK}" stroke-width="1.4"/><text x="600" y="${y + 6}" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}">${a(m.k)}</text><text x="632" y="${y + 5}" font-size="13" fill="${BODY}">${a(m.t)}</text></g>`;
    }).join('');
    return `<div class="viz"><svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg"><text x="290" y="44" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}" pointer-events="none">역량 피라미드</text><text x="600" y="64" text-anchor="middle" font-size="14" font-weight="700" fill="${MUTED}" pointer-events="none">KSA 구성요소</text>${steps}${ksa}</svg><div class="viz-caption">핵심역량 위에 직무역량, 그 위에 리더십역량이 쌓이는 3층 구조다. 각 역량은 지식(K)·기술(S)·태도(A)의 조합으로 정의된다.</div></div>`;
  };

  const fishboneThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <line x1="24" y1="90" x2="214" y2="90" stroke="${MUTED_SOFT}" stroke-width="2" pointer-events="none"/>
      <line x1="70"  y1="48" x2="92"  y2="90" stroke="${HAIRLINE}" stroke-width="2" pointer-events="none"/>
      <line x1="124" y1="48" x2="146" y2="90" stroke="${HAIRLINE}" stroke-width="2" pointer-events="none"/>
      <line x1="178" y1="48" x2="200" y2="90" stroke="${HAIRLINE}" stroke-width="2" pointer-events="none"/>
      <line x1="70"  y1="132" x2="92"  y2="90" stroke="${HAIRLINE}" stroke-width="2" pointer-events="none"/>
      <line x1="124" y1="132" x2="146" y2="90" stroke="${HAIRLINE}" stroke-width="2" pointer-events="none"/>
      <line x1="178" y1="132" x2="200" y2="90" stroke="${HAIRLINE}" stroke-width="2" pointer-events="none"/>
      <rect x="214" y="70" width="50" height="40" rx="6" fill="${PRIMARY}"/>
      <text x="239" y="94" text-anchor="middle" font-size="11" font-weight="700" fill="${ON_DARK}">문제</text>
    </svg>`;

  const fishboneFull = () => {
    const spine = { x1: 70, x2: 600, y: 230 };
    const top = [
      { x: 150, label: 'Man', ko: '사람', tip: '담당자의 숙련도, 교육 수준, 동기, 업무 배분. 사람 요인이 결과 편차를 만드는지 점검합니다.' },
      { x: 300, label: 'Machine', ko: '설비', tip: '장비·시스템의 노후, 정비 주기, 사양 한계. 설비 상태가 불량의 뿌리인지 확인합니다.' },
      { x: 450, label: 'Method', ko: '방법', tip: '작업 절차, 표준, 매뉴얼의 적정성. 방법 자체가 잘못 설계되었는지 따집니다.' }
    ];
    const bottom = [
      { x: 150, label: 'Material', ko: '자재', tip: '원자재·부품의 품질, 공급처 편차, 보관 상태. 투입물이 결과를 흔드는지 살핍니다.' },
      { x: 300, label: 'Measurement', ko: '측정', tip: '측정 기준, 계측기 정확도, 데이터 신뢰성. 측정 오류가 가짜 문제를 만드는지 봅니다.' },
      { x: 450, label: 'Environment', ko: '환경', tip: '온습도, 작업 공간, 외부 규제 등 환경 조건. 통제 밖 변수가 영향을 주는지 확인합니다.' }
    ];
    const boneTop = (b) => {
      const ex = b.x, ey = 110, sx = b.x + 60, sy = spine.y;
      return `
      <g data-tip-title="${a(b.label)} · ${a(b.ko)}" data-tip="${a(b.tip)}">
        <line x1="${ex}" y1="${ey}" x2="${sx}" y2="${sy}" stroke="${MUTED}" stroke-width="2.5"/>
        <line x1="${ex + 20}" y1="${ey + 30}" x2="${ex + 36}" y2="${ey + 18}" stroke="${HAIRLINE}" stroke-width="2" pointer-events="none"/>
        <line x1="${ex + 36}" y1="${ey + 54}" x2="${ex + 52}" y2="${ey + 42}" stroke="${HAIRLINE}" stroke-width="2" pointer-events="none"/>
        <text x="${ex - 6}" y="${ey - 8}" font-size="15" font-weight="700" fill="${INK}">${b.label}</text>
        <text x="${ex - 6}" y="${ey + 9}" font-size="11" fill="${MUTED}">${b.ko}</text>
      </g>`;
    };
    const boneBottom = (b) => {
      const ex = b.x, ey = 350, sx = b.x + 60, sy = spine.y;
      return `
      <g data-tip-title="${a(b.label)} · ${a(b.ko)}" data-tip="${a(b.tip)}">
        <line x1="${ex}" y1="${ey}" x2="${sx}" y2="${sy}" stroke="${MUTED}" stroke-width="2.5"/>
        <line x1="${ex + 20}" y1="${ey - 30}" x2="${ex + 36}" y2="${ey - 18}" stroke="${HAIRLINE}" stroke-width="2" pointer-events="none"/>
        <line x1="${ex + 36}" y1="${ey - 54}" x2="${ex + 52}" y2="${ey - 42}" stroke="${HAIRLINE}" stroke-width="2" pointer-events="none"/>
        <text x="${ex - 6}" y="${ey + 18}" font-size="15" font-weight="700" fill="${INK}">${b.label}</text>
        <text x="${ex - 6}" y="${ey + 35}" font-size="11" fill="${MUTED}">${b.ko}</text>
      </g>`;
    };
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        <text x="40" y="40" font-size="17" font-weight="700" fill="${INK}">특성요인도 · 6M 원인 분석</text>
        <text x="40" y="62" font-size="12" fill="${MUTED}">결과(문제)를 머리에 두고 6개 범주로 원인을 거슬러 올라갑니다</text>
        <g data-tip-title="척추 · 인과 흐름" data-tip="중앙 수평선은 문제로 이어지는 큰 인과 흐름입니다. 위아래 뼈대가 이 줄기로 모여 최종 문제를 만듭니다.">
          <line x1="${spine.x1}" y1="${spine.y}" x2="${spine.x2}" y2="${spine.y}" stroke="${INK}" stroke-width="3"/>
        </g>
        ${top.map(boneTop).join('')}
        ${bottom.map(boneBottom).join('')}
        <g data-tip-title="문제 · 결과(Effect)" data-tip="분석 대상이 되는 핵심 문제입니다. 구체적이고 측정 가능한 한 문장으로 머리에 정의해야 원인 추적이 정확해집니다.">
          <polygon points="600,${spine.y} 640,${spine.y - 38} 720,${spine.y - 38} 720,${spine.y + 38} 640,${spine.y + 38}" fill="${PRIMARY}"/>
          <text x="678" y="${spine.y - 6}" text-anchor="middle" font-size="16" font-weight="700" fill="${ON_DARK}">핵심</text>
          <text x="678" y="${spine.y + 16}" text-anchor="middle" font-size="16" font-weight="700" fill="${ON_DARK}">문제</text>
        </g>
      </svg>
      <div class="viz-caption">6M(사람·설비·방법·자재·측정·환경)으로 근본 원인을 구조적으로 추적합니다</div>
    </div>`;
  };

  const paretoThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <line x1="34" y1="150" x2="252" y2="150" stroke="${HAIRLINE}" stroke-width="1.5" pointer-events="none"/>
      <rect x="44"  y="48"  width="26" height="102" fill="${PRIMARY}"/>
      <rect x="78"  y="78"  width="26" height="72"  fill="${PRIMARY}"/>
      <rect x="112" y="104" width="26" height="46"  fill="${CARD}"/>
      <rect x="146" y="120" width="26" height="30"  fill="${CARD}"/>
      <rect x="180" y="132" width="26" height="18"  fill="${CARD}"/>
      <rect x="214" y="140" width="26" height="10"  fill="${CARD}"/>
      <polyline points="57,72 91,46 125,36 159,30 193,26 227,24" fill="none" stroke="${MUTED}" stroke-width="2" pointer-events="none"/>
      <line x1="34" y1="58" x2="252" y2="58" stroke="${MUTED_SOFT}" stroke-width="1" stroke-dasharray="4 3" pointer-events="none"/>
    </svg>`;

  const paretoFull = () => {
    const bars = [
      { ko: '결제 오류', f: 42, cum: 42 },
      { ko: '배송 지연', f: 28, cum: 70 },
      { ko: '로그인 실패', f: 12, cum: 82 },
      { ko: 'UI 혼란', f: 8, cum: 90 },
      { ko: '재고 부족', f: 6, cum: 96 },
      { ko: '기타', f: 4, cum: 100 }
    ];
    const x0 = 90, y0 = 330, plotW = 560, plotH = 240, maxF = 50, bw = 64, gap = (plotW - bars.length * bw) / (bars.length + 1);
    const bx = (i) => x0 + gap + i * (bw + gap);
    const barH = (f) => f / maxF * plotH;
    const cumY = (c) => y0 - (c / 100) * plotH;
    const line = bars.map((b, i) => `${(bx(i) + bw / 2).toFixed(1)},${cumY(b.cum).toFixed(1)}`).join(' ');
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        <text x="40" y="36" font-size="17" font-weight="700" fill="${INK}">파레토 차트 · 80/20 법칙</text>
        <text x="40" y="56" font-size="12" fill="${MUTED}">소수의 원인이 다수의 결과를 만듭니다 — 상위 2개가 누적 70%</text>
        <line x1="${x0}" y1="${y0 - plotH}" x2="${x0}" y2="${y0}" stroke="${HAIRLINE}" stroke-width="1.5" pointer-events="none"/>
        <line x1="${x0}" y1="${y0}" x2="${x0 + plotW}" y2="${y0}" stroke="${HAIRLINE}" stroke-width="1.5" pointer-events="none"/>
        <line x1="${x0 + plotW}" y1="${y0 - plotH}" x2="${x0 + plotW}" y2="${y0}" stroke="${HAIRLINE}" stroke-width="1.5" pointer-events="none"/>
        <text x="${x0 - 14}" y="${y0 - plotH + 4}" text-anchor="end" font-size="10" fill="${MUTED}">빈도</text>
        <text x="${x0 + plotW + 14}" y="${y0 - plotH + 4}" font-size="10" fill="${MUTED}">누적%</text>
        <g data-tip-title="80% 기준선" data-tip="누적 비율 80% 지점입니다. 이 선을 넘기 직전까지의 원인이 전체의 대부분을 설명하는 '핵심 소수'입니다.">
          <line x1="${x0}" y1="${cumY(80)}" x2="${x0 + plotW}" y2="${cumY(80)}" stroke="${MUTED_SOFT}" stroke-width="1.5" stroke-dasharray="6 4"/>
          <text x="${x0 + plotW - 4}" y="${cumY(80) - 8}" text-anchor="end" font-size="11" font-weight="600" fill="${MUTED}">80%</text>
        </g>
        ${bars.map((b, i) => {
          const vital = b.cum - b.f < 80;
          const x = bx(i), h = barH(b.f), y = y0 - h;
          const fill = vital ? PRIMARY : CARD;
          const txtFill = vital ? PRIMARY : MUTED;
          return `
        <g data-tip-title="${a(b.ko)} · 빈도 ${b.f}건" data-tip="${vital ? '핵심 소수에 해당합니다. 이 원인을 먼저 해결할 때 투입 대비 개선 효과가 가장 큽니다.' : '꼬리(trivial many)에 해당합니다. 자원이 한정되면 후순위로 두고 핵심 소수부터 처리합니다.'} 누적 ${b.cum}%.">
          <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="3" fill="${fill}" stroke="${HAIRLINE}" stroke-width="${vital ? 0 : 1}"/>
          <text x="${(x + bw / 2).toFixed(1)}" y="${y0 + 20}" text-anchor="middle" font-size="12" font-weight="${vital ? 700 : 500}" fill="${txtFill}">${b.ko}</text>
          <text x="${(x + bw / 2).toFixed(1)}" y="${(y - 8).toFixed(1)}" text-anchor="middle" font-size="11" fill="${MUTED}">${b.f}</text>
        </g>`;
        }).join('')}
        <g data-tip-title="누적 곡선" data-tip="원인을 빈도 내림차순으로 더해간 누적 비율입니다. 곡선이 가파르게 오를수록 소수 원인의 집중도가 높다는 뜻입니다.">
          <polyline points="${line}" fill="none" stroke="${INK}" stroke-width="2.5"/>
          ${bars.map((b, i) => `<circle cx="${(bx(i) + bw / 2).toFixed(1)}" cy="${cumY(b.cum).toFixed(1)}" r="4" fill="${PAPER}" stroke="${INK}" stroke-width="2"/>`).join('')}
        </g>
      </svg>
      <div class="viz-caption">상위 핵심 소수(누적 80%)에 자원을 집중해 개선 효과를 극대화합니다</div>
    </div>`;
  };

  const horizonsThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <line x1="24" y1="150" x2="256" y2="150" stroke="${HAIRLINE}" stroke-width="1.5" pointer-events="none"/>
      <line x1="24" y1="22"  x2="24"  y2="150" stroke="${HAIRLINE}" stroke-width="1.5" pointer-events="none"/>
      <path d="M24 60 C70 52 120 70 256 138" fill="none" stroke="${CARD}" stroke-width="3"/>
      <path d="M24 140 C90 138 150 70 230 60" fill="none" stroke="${MUTED_SOFT}" stroke-width="3"/>
      <path d="M120 148 C190 146 220 110 256 56" fill="none" stroke="${PRIMARY}" stroke-width="3"/>
    </svg>`;

  const horizonsFull = () => {
    const x0 = 80, y0 = 330, w = 600, h = 250;
    const xr = x0 + w, yt = y0 - h;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        <text x="40" y="36" font-size="17" font-weight="700" fill="${INK}">3대 성장 지평 · Three Horizons</text>
        <text x="40" y="56" font-size="12" fill="${MUTED}">현재 사업을 지키며 동시에 미래 성장 엔진을 병행 육성합니다</text>
        <line x1="${x0}" y1="${yt}" x2="${x0}" y2="${y0}" stroke="${HAIRLINE}" stroke-width="1.5" pointer-events="none"/>
        <line x1="${x0}" y1="${y0}" x2="${xr}" y2="${y0}" stroke="${HAIRLINE}" stroke-width="1.5" pointer-events="none"/>
        <text x="${x0 - 12}" y="${yt + 4}" text-anchor="end" font-size="11" fill="${MUTED}">가치</text>
        <text x="${xr}" y="${y0 + 22}" text-anchor="end" font-size="11" fill="${MUTED}">시간 →</text>
        <g data-tip-title="H1 · 현재 핵심 사업" data-tip="지금 매출과 이익의 대부분을 책임지는 사업입니다. 방어와 효율화로 수익을 유지하되, 장기적으로는 성숙·하강합니다.">
          <path d="M${x0} ${y0 - h * 0.78} C${x0 + 120} ${y0 - h * 0.82} ${x0 + 240} ${y0 - h * 0.55} ${xr} ${y0 - h * 0.12}" fill="none" stroke="${MUTED}" stroke-width="3"/>
          <text x="${x0 + 30}" y="${y0 - h * 0.78 - 12}" font-size="14" font-weight="700" fill="${INK}">H1 현재 핵심</text>
          <text x="${x0 + 30}" y="${y0 - h * 0.78 + 6}" font-size="11" fill="${MUTED}">방어 · 수익 극대화</text>
        </g>
        <g data-tip-title="H2 · 신흥 성장 사업" data-tip="이미 검증되기 시작한 차세대 성장 동력입니다. 중기에 빠르게 매출을 키워 H1의 둔화를 메우는 역할을 합니다.">
          <path d="M${x0} ${y0 - h * 0.08} C${x0 + 200} ${y0 - h * 0.12} ${x0 + 360} ${y0 - h * 0.75} ${xr} ${y0 - h * 0.82}" fill="none" stroke="${AMBER}" stroke-width="3"/>
          <text x="${x0 + 300}" y="${y0 - h * 0.5}" font-size="14" font-weight="700" fill="${INK}">H2 신흥 성장</text>
          <text x="${x0 + 300}" y="${y0 - h * 0.5 + 18}" font-size="11" fill="${MUTED}">투자 · 규모화</text>
        </g>
        <g data-tip-title="H3 · 미래 옵션" data-tip="아직 불확실하지만 판을 바꿀 수 있는 미래 베팅입니다. 작은 실험과 옵션 투자로 후기에 폭발적 성장 가능성을 확보합니다.">
          <path d="M${x0 + 200} ${y0 - h * 0.02} C${x0 + 400} ${y0 - h * 0.04} ${x0 + 500} ${y0 - h * 0.45} ${xr} ${y0 - h * 0.95}" fill="none" stroke="${PRIMARY}" stroke-width="3.5"/>
          <text x="${xr - 10}" y="${y0 - h * 0.95 - 8}" text-anchor="end" font-size="14" font-weight="700" fill="${PRIMARY}">H3 미래 옵션</text>
          <text x="${xr - 10}" y="${y0 - h * 0.95 + 10}" text-anchor="end" font-size="11" fill="${PRIMARY}">실험 · 옵션 베팅</text>
        </g>
      </svg>
      <div class="viz-caption">세 지평을 동시에 운영해야 단기 수익과 장기 성장이 끊기지 않습니다</div>
    </div>`;
  };

  const corecompThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <circle cx="115" cy="75"  r="58" fill="${CARD}" opacity="0.55"/>
      <circle cx="165" cy="75"  r="58" fill="${AMBER_SOFT}" opacity="0.55"/>
      <circle cx="140" cy="118" r="58" fill="${CREAM_STR}" opacity="0.55"/>
      <circle cx="140" cy="92"  r="16" fill="${PRIMARY}"/>
    </svg>`;

  const corecompFull = () => {
    const r = 118, cx = 380, cyT = 195, cyB = 270, dx = 92;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg">
        <text x="40" y="36" font-size="17" font-weight="700" fill="${INK}">핵심역량 · Core Competence</text>
        <text x="40" y="56" font-size="12" fill="${MUTED}">세 조건을 모두 만족하는 교집합이 진짜 핵심역량입니다</text>
        <g data-tip-title="고객 가치 (Customer Value)" data-tip="고객이 실제로 인지하고 대가를 지불할 만한 가치를 만드는 능력인가? 내부 자부심이 아니라 고객 관점의 효용이 기준입니다.">
          <circle cx="${cx - dx}" cy="${cyT}" r="${r}" fill="${TEAL}" opacity="0.16" stroke="${TEAL}" stroke-width="1.5"/>
          <text x="${cx - dx - 30}" y="${cyT - 60}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">고객 가치</text>
        </g>
        <g data-tip-title="경쟁 차별성 (Differentiation)" data-tip="경쟁사가 쉽게 모방할 수 없어 차별적 우위를 주는가? 흔하거나 금방 베껴지는 역량은 핵심역량이 아닙니다.">
          <circle cx="${cx + dx}" cy="${cyT}" r="${r}" fill="${AMBER}" opacity="0.16" stroke="${AMBER}" stroke-width="1.5"/>
          <text x="${cx + dx + 30}" y="${cyT - 60}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">경쟁 차별성</text>
        </g>
        <g data-tip-title="확장 가능성 (Extendability)" data-tip="여러 시장·제품으로 응용해 새 사업의 문을 여는가? 한 영역에만 갇힌 역량보다 전이 가능한 역량이 더 강력합니다.">
          <circle cx="${cx}" cy="${cyB}" r="${r}" fill="${MUTED}" opacity="0.13" stroke="${MUTED}" stroke-width="1.5"/>
          <text x="${cx}" y="${cyB + r + 26}" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">확장 가능성</text>
        </g>
        <g data-tip-title="핵심역량 (Core Competence)" data-tip="세 조건의 교집합. 고객이 가치를 느끼고, 경쟁사가 못 따라오며, 다른 사업으로 확장되는 역량입니다. 여기에 자원을 집중해야 합니다.">
          <circle cx="${cx}" cy="${cyT + 38}" r="34" fill="${PRIMARY}"/>
          <text x="${cx}" y="${cyT + 34}" text-anchor="middle" font-size="13" font-weight="700" fill="${ON_DARK}">핵심</text>
          <text x="${cx}" y="${cyT + 50}" text-anchor="middle" font-size="13" font-weight="700" fill="${ON_DARK}">역량</text>
        </g>
      </svg>
      <div class="viz-caption">세 원이 겹치는 중심에 전략 자원을 집중 투입합니다</div>
    </div>`;
  };

  const tocThumb = () => `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="48"  cy="80" rx="22" ry="30" fill="none" stroke="${MUTED}" stroke-width="6"/>
      <ellipse cx="92"  cy="80" rx="22" ry="30" fill="none" stroke="${MUTED}" stroke-width="6"/>
      <ellipse cx="136" cy="80" rx="22" ry="30" fill="none" stroke="${PRIMARY}" stroke-width="2.5"/>
      <ellipse cx="180" cy="80" rx="22" ry="30" fill="none" stroke="${MUTED}" stroke-width="6"/>
      <ellipse cx="224" cy="80" rx="22" ry="30" fill="none" stroke="${MUTED}" stroke-width="6"/>
      <text x="136" y="138" text-anchor="middle" font-size="11" font-weight="700" fill="${PRIMARY}">제약</text>
    </svg>`;

  const tocFull = () => {
    const links = [
      { ko: '영업', weak: false },
      { ko: '설계', weak: false },
      { ko: '가공', weak: true },
      { ko: '조립', weak: false },
      { ko: '출하', weak: false }
    ];
    const y = 150, rx = 32, ry = 50, x0 = 110, step = 128;
    const steps = [
      { ko: '식별', tip: '전체 흐름을 가장 제약하는 단 하나의 병목을 찾습니다. 제약은 보통 한 곳이며, 그곳이 시스템 전체 산출을 결정합니다.' },
      { ko: '활용', tip: '제약을 새로 투자하지 않고도 최대한 가동합니다. 병목이 놀거나 불량을 만들지 않도록 우선순위와 보호 버퍼를 둡니다.' },
      { ko: '종속', tip: '나머지 모든 공정을 제약의 속도에 맞춥니다. 비병목이 과잉 생산하면 재고만 쌓이므로 제약 리듬에 종속시킵니다.' },
      { ko: '격상', tip: '그래도 부족하면 제약 능력 자체를 키웁니다. 설비 증설·인력 투입 등 본격 투자는 이 단계에서 검토합니다.' },
      { ko: '반복', tip: '제약이 풀리면 다음 병목이 나타납니다. 관성에 안주하지 말고 1단계로 돌아가 새 제약을 찾는 순환을 이어갑니다.' }
    ];
    const sx0 = 110, sStep = 130, sy = 350;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg">
        <text x="40" y="36" font-size="17" font-weight="700" fill="${INK}">제약 이론 · Theory of Constraints</text>
        <text x="40" y="56" font-size="12" fill="${MUTED}">사슬의 강도는 가장 약한 고리가 결정합니다 — 병목에 집중하세요</text>
        <g data-tip-title="사슬 · 전체 시스템" data-tip="각 고리는 하나의 공정·부서입니다. 전체 처리량은 가장 약한 고리(제약)를 넘을 수 없으므로, 비병목을 강화해도 산출은 늘지 않습니다.">
          ${links.slice(0, -1).map((_, i) => `<line x1="${x0 + i * step + rx - 6}" y1="${y}" x2="${x0 + (i + 1) * step - rx + 6}" y2="${y}" stroke="${HAIRLINE}" stroke-width="2" pointer-events="none"/>`).join('')}
        </g>
        ${links.map((l, i) => {
          const cx = x0 + i * step;
          if (l.weak) {
            return `
        <g data-tip-title="${a(l.ko)} · 제약(병목)" data-tip="가장 약한 고리입니다. 이 공정의 처리 능력이 시스템 전체 산출을 결정합니다. 개선 자원을 여기에 우선 투입해야 전체 성과가 올라갑니다.">
          <ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="${PRIMARY}" stroke-width="3"/>
          <text x="${cx}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="${PRIMARY}">${l.ko}</text>
          <text x="${cx}" y="${y + ry + 20}" text-anchor="middle" font-size="11" font-weight="600" fill="${PRIMARY}">← 제약</text>
        </g>`;
          }
          return `
        <g data-tip-title="${a(l.ko)} · 비병목" data-tip="제약이 아닌 공정입니다. 여기에 능력이 남아도 전체 산출은 늘지 않습니다. 제약의 속도에 종속시켜 과잉 생산을 막는 것이 원칙입니다.">
          <ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="${MUTED}" stroke-width="9"/>
          <text x="${cx}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="600" fill="${INK}">${l.ko}</text>
        </g>`;
        }).join('')}
        <text x="40" y="312" font-size="13" font-weight="700" fill="${INK}">집중 개선 5단계</text>
        ${steps.map((s, i) => {
          const cx = sx0 + i * sStep;
          return `
        <g data-tip-title="${i + 1}. ${a(s.ko)}" data-tip="${a(s.tip)}">
          <rect x="${cx - 52}" y="${sy - 18}" width="104" height="40" rx="20" fill="${CARD}"/>
          <text x="${cx}" y="${sy + 7}" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}">${i + 1}. ${s.ko}</text>
          ${i < steps.length - 1 ? `<path d="M${cx + 54} ${sy + 2} l16 0 m-6 -5 l6 5 -6 5" fill="none" stroke="${MUTED_SOFT}" stroke-width="2" pointer-events="none"/>` : ''}
        </g>`;
        }).join('')}
        <path d="M${sx0 + (steps.length - 1) * sStep} ${sy + 24} q0 28 -${(steps.length - 1) * sStep / 2} 28 q-${(steps.length - 1) * sStep / 2} 0 ${(steps.length - 1) * sStep / 2 - 6} -22" fill="none" stroke="${MUTED_SOFT}" stroke-width="1.5" stroke-dasharray="5 4" pointer-events="none"/>
        <text x="${sx0}" y="${sy + 58}" font-size="10" fill="${MUTED}" pointer-events="none">반복</text>
      </svg>
      <div class="viz-caption">약한 고리(제약)를 찾아 5단계 집중 개선을 순환합니다</div>
    </div>`;
  };

  const kotterThumb = () => `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
  ${[0,1,2,3,4,5,6,7].map(i=>{const w=26,h=14,x=18+i*30,y=150-i*16;const last=i===7;return `<rect x="${x}" y="${y}" width="${w}" height="${h+ (150-y)}" rx="2" fill="${last?PRIMARY:CARD}" stroke="${last?PRIMARY:HAIRLINE}"/><text x="${x+w/2}" y="${y-4}" font-size="9" fill="${last?PRIMARY:MUTED}" text-anchor="middle">${i+1}</text>`;}).join('')}
  <line x1="14" y1="166" x2="266" y2="166" stroke="${HAIRLINE}" pointer-events="none"/>
</svg>`;

  const kotterFull = () => {
    const steps=[["1","위기감 조성"],["2","연합팀 구성"],["3","비전 수립"],["4","비전 전파"],["5","권한 위임"],["6","단기 성과"],["7","변화 가속화"],["8","문화 정착"]];
    const tips=["변화의 시급성을 공유한다","변화를 이끌 핵심 그룹을 만든다","명확한 방향과 전략을 세운다","비전을 조직 전체에 알린다","장애물을 없애고 행동을 위임한다","빠른 성공으로 동력을 얻는다","성과를 발판으로 변화를 확장한다","새 방식을 조직 문화로 굳힌다"];
    const baseY=420, stepH=44, stepW=80, gap=4;
    return `<div class="viz"><svg class="viz-svg" viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg">
  <text x="380" y="44" font-size="18" fill="${INK}" text-anchor="middle" font-weight="600">코터의 8단계 변화관리</text>
  ${steps.map((s,i)=>{const x=40+i*(stepW+gap);const h=stepH*(i+1);const y=baseY-h;const last=i===7;return `<g data-tip-title="${a(s[0]+'. '+s[1])}" data-tip="${a(tips[i])}"><rect x="${x}" y="${y}" width="${stepW}" height="${h}" rx="4" fill="${last?PRIMARY:CARD}" stroke="${last?PRIMARY:HAIRLINE}"/><text x="${x+stepW/2}" y="${y+20}" font-size="15" fill="${last?ON_DARK:INK}" text-anchor="middle" font-weight="600">${s[0]}</text><text x="${x+stepW/2}" y="${y+38}" font-size="11" fill="${last?ON_DARK:BODY}" text-anchor="middle">${a(s[1])}</text></g>`;}).join('')}
  <line x1="32" y1="${baseY}" x2="728" y2="${baseY}" stroke="${HAIRLINE}" pointer-events="none"/>
  <text x="40" y="${baseY+18}" font-size="11" fill="${MUTED}" pointer-events="none">시작</text>
  <text x="700" y="${baseY+18}" font-size="11" fill="${PRIMARY}" text-anchor="end" pointer-events="none">정착</text>
  </svg><div class="viz-caption">위기감 조성부터 문화 정착까지, 변화를 단계적으로 쌓아 올린다.</div></div>`;
  };

  const adkarThumb = () => `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
  ${["A","D","K","A","R"].map((c,i)=>{const w=42,x=12+i*52,y=72,last=i===4;return `<rect x="${x}" y="${y}" width="${w}" height="36" rx="4" fill="${last?PRIMARY:CARD}" stroke="${last?PRIMARY:HAIRLINE}"/><text x="${x+w/2}" y="${y+24}" font-size="16" fill="${last?ON_DARK:INK}" text-anchor="middle" font-weight="600">${c}</text>${i<4?`<path d="M${x+w+2} ${y+18} l8 0 m-4 -4 l4 4 -4 4" stroke="${MUTED}" fill="none" pointer-events="none"/>`:''}`;}).join('')}
</svg>`;

  const adkarFull = () => {
    const items=[["A","인식","Awareness","변화의 필요성을 안다"],["D","욕구","Desire","변화에 참여하려 한다"],["K","지식","Knowledge","변화 방법을 익힌다"],["A","능력","Ability","실제로 실행할 수 있다"],["R","강화","Reinforcement","변화를 지속·정착시킨다"]];
    const bw=120,bh=120,gap=18,y=140;
    return `<div class="viz"><svg class="viz-svg" viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg">
  <text x="380" y="44" font-size="18" fill="${INK}" text-anchor="middle" font-weight="600">ADKAR 변화 모델</text>
  ${items.map((it,i)=>{const x=24+i*(bw+gap);const last=i===4;return `<g data-tip-title="${a(it[0]+' · '+it[1]+' ('+it[2]+')')}" data-tip="${a(it[3])}"><rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="6" fill="${last?PRIMARY:CARD}" stroke="${last?PRIMARY:HAIRLINE}"/><text x="${x+bw/2}" y="${y+44}" font-size="30" fill="${last?ON_DARK:PRIMARY}" text-anchor="middle" font-weight="700">${it[0]}</text><text x="${x+bw/2}" y="${y+72}" font-size="15" fill="${last?ON_DARK:INK}" text-anchor="middle" font-weight="600">${a(it[1])}</text><text x="${x+bw/2}" y="${y+92}" font-size="11" fill="${last?ON_DARK:MUTED}" text-anchor="middle">${a(it[2])}</text></g>${i<4?`<path d="M${x+bw+2} ${y+bh/2} l${gap-4} 0 m-6 -5 l6 5 -6 5" stroke="${MUTED_SOFT}" stroke-width="1.5" fill="none" pointer-events="none"/>`:''}`;}).join('')}
  </svg><div class="viz-caption">개인의 변화는 인식·욕구·지식·능력·강화의 순서로 완성된다.</div></div>`;
  };

  const lewinThumb = () => `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
  ${[["해빙",TEAL,18],["변화",AMBER,102],["재동결",MUTED_SOFT,186]].map((b,i)=>`<rect x="${b[2]}" y="68" width="68" height="44" rx="4" fill="${i===1?AMBER_SOFT:(i===0?'#d8efe9':CARD)}" stroke="${b[1]}"/><text x="${b[2]+34}" y="95" font-size="11" fill="${INK}" text-anchor="middle">${b[0]}</text>${i<2?`<path d="M${b[2]+70} 90 l10 0 m-5 -4 l5 4 -5 4" stroke="${MUTED}" fill="none" pointer-events="none"/>`:''}`).join('')}
</svg>`;

  const lewinFull = () => {
    const blocks=[["해빙","Unfreeze","기존 방식을 녹여 변화의 여지를 만든다",TEAL,"#dcefe9"],["변화","Change","새로운 방식으로 이동한다",AMBER,AMBER_SOFT],["재동결","Refreeze","새 방식을 안정된 상태로 굳힌다",MUTED,CARD]];
    const bw=200,bh=130,gap=30,y=130;
    return `<div class="viz"><svg class="viz-svg" viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg">
  <text x="380" y="44" font-size="18" fill="${INK}" text-anchor="middle" font-weight="600">르윈의 3단계 변화 모델</text>
  ${blocks.map((b,i)=>{const x=20+i*(bw+gap);return `<g data-tip-title="${a(b[0]+' ('+b[1]+')')}" data-tip="${a(b[2])}"><rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="8" fill="${b[4]}" stroke="${b[3]}" stroke-width="1.5"/><text x="${x+bw/2}" y="${y+56}" font-size="20" fill="${INK}" text-anchor="middle" font-weight="600">${a(b[0])}</text><text x="${x+bw/2}" y="${y+82}" font-size="13" fill="${b[3]}" text-anchor="middle" font-weight="600">${a(b[1])}</text></g>${i<2?`<path d="M${x+bw+4} ${y+bh/2} l${gap-8} 0 m-7 -6 l7 6 -7 6" stroke="${MUTED_SOFT}" stroke-width="2" fill="none" pointer-events="none"/>`:''}`;}).join('')}
  <text x="380" y="${y+bh+34}" font-size="11" fill="${MUTED}" text-anchor="middle" pointer-events="none">얼음 → 물 → 얼음: 굳은 상태를 녹이고, 옮기고, 다시 굳힌다</text>
  </svg><div class="viz-caption">변화는 기존 상태를 녹이고 옮긴 뒤 다시 안정화하는 세 단계로 이뤄진다.</div></div>`;
  };

  const scrumThumb = () => `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
  <rect x="14" y="72" width="40" height="40" rx="4" fill="${CARD}" stroke="${HAIRLINE}"/><text x="34" y="96" font-size="9" fill="${MUTED}" text-anchor="middle">백로그</text>
  <circle cx="140" cy="90" r="42" fill="none" stroke="${PRIMARY}" stroke-width="2.5" stroke-dasharray="200" stroke-dashoffset="40"/>
  <path d="M178 78 l6 -6 -2 9 -9 -2 z" fill="${PRIMARY}" pointer-events="none"/>
  <text x="140" y="94" font-size="10" fill="${PRIMARY}" text-anchor="middle">스프린트</text>
  <rect x="226" y="72" width="40" height="40" rx="4" fill="${CARD}" stroke="${HAIRLINE}"/><text x="246" y="96" font-size="9" fill="${MUTED}" text-anchor="middle">증분</text>
  <path d="M56 92 l24 0 m-5 -4 l5 4 -5 4" stroke="${MUTED}" fill="none" pointer-events="none"/>
  <path d="M186 92 l38 0 m-5 -4 l5 4 -5 4" stroke="${MUTED}" fill="none" pointer-events="none"/>
</svg>`;

  const scrumFull = () => {
    const cx=380,cy=210,r=98;
    const loop=[["계획","Sprint Planning",-90],["데일리","Daily Scrum",0],["리뷰","Review",90],["회고","Retrospective",180]];
    const pt=(ang,rad)=>{const t=(ang-90)*Math.PI/180;return [cx+rad*Math.cos(t),cy+rad*Math.sin(t)];};
    return `<div class="viz"><svg class="viz-svg" viewBox="0 0 760 410" xmlns="http://www.w3.org/2000/svg">
  <text x="380" y="44" font-size="18" fill="${INK}" text-anchor="middle" font-weight="600">스크럼 프레임워크</text>
  <g data-tip-title="제품 백로그" data-tip="우선순위로 정렬된 요구사항 목록"><rect x="24" y="160" width="100" height="100" rx="8" fill="${CARD}" stroke="${HAIRLINE}"/><text x="74" y="205" font-size="14" fill="${INK}" text-anchor="middle" font-weight="600">제품</text><text x="74" y="225" font-size="14" fill="${INK}" text-anchor="middle" font-weight="600">백로그</text></g>
  <path d="M128 210 l120 0 m-10 -7 l10 7 -10 7" stroke="${MUTED_SOFT}" stroke-width="2" fill="none" pointer-events="none"/>
  <g data-tip-title="스프린트 순환" data-tip="계획·데일리·리뷰·회고를 반복하는 핵심 주기">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${PRIMARY}" stroke-width="3"/>
    <path d="M${cx+r-6} ${cy-14} l6 14 -16 -2 z" fill="${PRIMARY}"/>
    <text x="${cx}" y="${cy-4}" font-size="15" fill="${PRIMARY}" text-anchor="middle" font-weight="600">스프린트</text>
    <text x="${cx}" y="${cy+16}" font-size="11" fill="${MUTED}" text-anchor="middle">2~4주 반복</text>
  </g>
  ${loop.map((l,i)=>{const[px,py]=pt(l[2],r);return `<g data-tip-title="${a(l[0]+' ('+l[1]+')')}" data-tip="${a('스프린트 주기의 한 단계')}"><circle cx="${px}" cy="${py}" r="22" fill="${PAPER}" stroke="${PRIMARY}" stroke-width="1.5"/><text x="${px}" y="${py+4}" font-size="11" fill="${INK}" text-anchor="middle" font-weight="600">${a(l[0])}</text></g>`;}).join('')}
  <path d="M${cx+r+8} 210 l108 0 m-10 -7 l10 7 -10 7" stroke="${MUTED_SOFT}" stroke-width="2" fill="none" pointer-events="none"/>
  <g data-tip-title="증분 (Increment)" data-tip="스프린트마다 완성되는 출시 가능한 결과물"><rect x="636" y="160" width="100" height="100" rx="8" fill="${CARD}" stroke="${HAIRLINE}"/><text x="686" y="215" font-size="14" fill="${INK}" text-anchor="middle" font-weight="600">증분</text></g>
  </svg><div class="viz-caption">백로그에서 출발해 짧은 스프린트를 반복하며 매번 완성된 증분을 내놓는다.</div></div>`;
  };

  const smartThumb = () => `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
  ${["S","M","A","R","T"].map((c,i)=>{const y=18+i*30,last=i===4;return `<rect x="40" y="${y}" width="200" height="24" rx="3" fill="${last?PRIMARY:CARD}" stroke="${last?PRIMARY:HAIRLINE}"/><text x="52" y="${y+17}" font-size="13" fill="${last?ON_DARK:INK}" text-anchor="middle" font-weight="600">${c}</text>`;}).join('')}
</svg>`;

  const smartFull = () => {
    const items=[["S","Specific","구체성","목표가 명확하고 구체적인가"],["M","Measurable","측정가능","진척과 달성을 측정할 수 있는가"],["A","Achievable","달성가능","현실적으로 이룰 수 있는가"],["R","Relevant","관련성","상위 목표와 연결되는가"],["T","Time-bound","기한","명확한 마감 시점이 있는가"]];
    const rowH=58,gap=10,y0=78;
    return `<div class="viz"><svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
  <text x="380" y="44" font-size="18" fill="${INK}" text-anchor="middle" font-weight="600">SMART 목표 설정</text>
  ${items.map((it,i)=>{const y=y0+i*(rowH+gap);const last=i===4;return `<g data-tip-title="${a(it[0]+' · '+it[2]+' ('+it[1]+')')}" data-tip="${a(it[3])}"><rect x="120" y="${y}" width="520" height="${rowH}" rx="6" fill="${last?PRIMARY_SOFT:CARD}" stroke="${last?PRIMARY:HAIRLINE}"/><rect x="120" y="${y}" width="58" height="${rowH}" rx="6" fill="${last?PRIMARY:CREAM_STR}"/><text x="149" y="${y+38}" font-size="26" fill="${last?ON_DARK:PRIMARY}" text-anchor="middle" font-weight="700">${it[0]}</text><text x="198" y="${y+26}" font-size="16" fill="${INK}" font-weight="600">${a(it[2])}</text><text x="198" y="${y+46}" font-size="12" fill="${MUTED}">${a(it[1])} — ${a(it[3])}</text></g>`;}).join('')}
  </svg><div class="viz-caption">좋은 목표는 구체적이고 측정 가능하며 달성 가능하고 관련 있고 기한이 있다.</div></div>`;
  };

  const maslowThumb = () => {
    const w=[150,122,94,66,38];const yb=[160,131,102,73,44];const cx=140;
    return `<svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
  ${[0,1,2,3,4].map(i=>{const bw=w[i],tw=w[i+1]||(w[i]-28);const yBot=yb[i],yTop=yb[i]-29;const blW=cx-bw/2,brW=cx+bw/2,tlW=cx-tw/2,trW=cx+tw/2;const last=i===4;return `<polygon points="${blW},${yBot} ${brW},${yBot} ${trW},${yTop} ${tlW},${yTop}" fill="${last?PRIMARY:CARD}" stroke="${last?PRIMARY:HAIRLINE}"/>`;}).join('')}
</svg>`;
  };

  const maslowFull = () => {
    const layers=[
      ["생리적 욕구","Physiological","음식·물·수면 등 생존의 기본"],
      ["안전 욕구","Safety","안정·건강·재정적 보호"],
      ["사회적 욕구","Love/Belonging","관계·소속감·애정"],
      ["존중 욕구","Esteem","인정·성취·지위"],
      ["자아실현","Self-Actualization","잠재력의 실현과 성장"]
    ];
    const widths=[380,310,235,160,82,0];
    const cx=380, yBottom0=410, layerH=64.4;
    return `<div class="viz"><svg class="viz-svg" viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg">
  <text x="380" y="44" font-size="18" fill="${INK}" text-anchor="middle" font-weight="600">매슬로의 욕구 5단계</text>
  ${layers.map((L,i)=>{
    const bw=widths[i], tw=widths[i+1];
    const yBot=yBottom0-i*layerH;
    const yTop=yBot-layerH;
    const bl=cx-bw/2, br=cx+bw/2, tl=cx-tw/2, tr=cx+tw/2;
    const cy=(yBot+yTop)/2;
    const last=i===4;
    return `<g data-tip-title="${a(L[0]+' ('+L[1]+')')}" data-tip="${a(L[2])}"><polygon points="${bl},${yBot} ${br},${yBot} ${tr},${yTop} ${tl},${yTop}" fill="${last?PRIMARY:CARD}" stroke="${last?PRIMARY:HAIRLINE}" stroke-width="1.5"/><text x="${cx}" y="${cy+5}" font-size="${last?14:15}" fill="${last?ON_DARK:INK}" text-anchor="middle" font-weight="600">${a(L[0])}</text></g>`;
  }).join('')}
  <text x="40" y="${yBottom0+5}" font-size="11" fill="${MUTED}" pointer-events="none">하위 (기본 욕구)</text>
  <text x="40" y="${yBottom0-5*layerH+5}" font-size="11" fill="${PRIMARY}" pointer-events="none">상위 (성장 욕구)</text>
  </svg><div class="viz-caption">하위의 기본 욕구가 충족될수록 상위의 성장 욕구로 동기가 이동한다.</div></div>`;
  };

  const GANTT = [
    { n: '기획',     start: 0, dur: 2, prog: 1.0, tip: '프로젝트 범위와 목표를 정의합니다. 0~2주차, 완료된 단계입니다.' },
    { n: '디자인',   start: 1, dur: 3, prog: 1.0, tip: 'UX·UI 설계와 프로토타입. 기획과 1주 겹쳐 시작합니다.' },
    { n: '개발',     start: 3, dur: 5, prog: 0.55, tip: '핵심 기능 구현. 현재 진행 중이며 약 55% 완료된 강조 막대입니다.' },
    { n: '테스트',   start: 7, dur: 2, prog: 0, tip: '품질 검증과 버그 수정. 개발 막바지와 1주 겹쳐 시작합니다.' },
    { n: '런칭',     start: 9, dur: 1, prog: 0, tip: '배포와 출시. 마일스톤(◆)으로 표시한 종료 시점입니다.' }
  ];
  const ganttThumb = () => {
    const W = 20, X0 = 58, Y0 = 28, RH = 26;
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${[...Array(6)].map((_, i) => `<line x1="${X0 + i * W}" y1="${Y0 - 6}" x2="${X0 + i * W}" y2="${Y0 + 5 * RH - 8}" stroke="${HAIRLINE}" stroke-width="1"/>`).join('')}
      ${GANTT.map((g, i) => {
        const x = X0 + g.start * W, y = Y0 + i * RH, w = g.dur * W - 4;
        const hi = i === 2;
        return `
          <text x="${X0 - 8}" y="${y + 11}" text-anchor="end" font-size="9" fill="${MUTED}">${g.n}</text>
          <rect x="${x}" y="${y}" width="${w}" height="13" rx="3" fill="${hi ? PRIMARY : CREAM_STR}" stroke="${hi ? PRIMARY : MUTED_SOFT}" stroke-width="1"/>`;
      }).join('')}
      <path d="M${X0 + 9 * W} ${Y0 + 4 * RH + 6} l5 -5 l5 5 l-5 5 z" fill="${INK}"/>
    </svg>`;
  };
  const ganttFull = () => {
    const W = 56, X0 = 150, Y0 = 90, RH = 50, BH = 26;
    const weeks = 10;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="42" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}">간트 차트 — 일정·진척 관리</text>
        <text x="380" y="64" text-anchor="middle" font-size="12" fill="${MUTED}">작업별 시작~종료를 계단식으로 배치하고 진척을 추적합니다</text>
        ${[...Array(weeks + 1)].map((_, i) => `
          <line x1="${X0 + i * W}" y1="${Y0 - 10}" x2="${X0 + i * W}" y2="${Y0 + 5 * RH - 4}" stroke="${HAIRLINE}" stroke-width="1" pointer-events="none"/>
          ${i < weeks ? `<text x="${X0 + i * W + W / 2}" y="${Y0 - 16}" text-anchor="middle" font-size="11" fill="${MUTED_SOFT}" pointer-events="none">${i + 1}주</text>` : ''}`).join('')}
        ${GANTT.map((g, i) => {
          const x = X0 + g.start * W, y = Y0 + i * RH, w = g.dur * W - 6;
          const hi = i === 2;
          const pw = Math.round(w * g.prog);
          return `
            <g data-tip-title="${a(g.n)} · ${g.start + 1}~${g.start + g.dur}주" data-tip="${a(g.tip)}">
              <text x="${X0 - 16}" y="${y + BH / 2 + 5}" text-anchor="end" font-size="14" font-weight="600" fill="${INK}">${g.n}</text>
              <rect x="${x}" y="${y}" width="${w}" height="${BH}" rx="5" fill="${hi ? PRIMARY_SOFT : CREAM_STR}" stroke="${hi ? PRIMARY : MUTED_SOFT}" stroke-width="1.3"/>
              ${g.prog > 0 ? `<rect x="${x}" y="${y}" width="${pw}" height="${BH}" rx="5" fill="${hi ? PRIMARY : MUTED}"/>` : ''}
              ${g.prog > 0 ? `<text x="${x + 10}" y="${y + BH / 2 + 4}" font-size="11" font-weight="700" fill="${ON_DARK}">${Math.round(g.prog * 100)}%</text>` : ''}
            </g>`;
        }).join('')}
        <path d="M${X0 + 10 * W} ${Y0 + 4 * RH + BH / 2} l11 -11 l11 11 l-11 11 z" fill="${INK}" data-tip-title="런칭 마일스톤" data-tip="10주차 종료 시점의 출시 마일스톤입니다."/>
        <g pointer-events="none" font-size="11" fill="${MUTED}">
          <rect x="${X0}" y="${Y0 + 5 * RH + 8}" width="14" height="12" rx="2" fill="${PRIMARY}"/>
          <text x="${X0 + 20}" y="${Y0 + 5 * RH + 18}">진척(완료분)</text>
          <path d="M${X0 + 130} ${Y0 + 5 * RH + 14} l8 -8 l8 8 l-8 8 z" fill="${INK}"/>
          <text x="${X0 + 150}" y="${Y0 + 5 * RH + 18}">마일스톤</text>
        </g>
      </svg>
      <div class="viz-caption">작업의 시작·종료·의존을 시간축에 그려 일정과 진척을 한눈에 봅니다</div>
    </div>`;
  };

  const cpmThumb = () => {
    const N = [
      { x: 30, y: 90 }, { x: 95, y: 50 }, { x: 95, y: 130 },
      { x: 175, y: 90 }, { x: 245, y: 90 }
    ];
    const crit = [[0, 1], [1, 3], [3, 4]];
    const sub = [[0, 2], [2, 3]];
    const line = (e, hi) => `<line x1="${N[e[0]].x}" y1="${N[e[0]].y}" x2="${N[e[1]].x}" y2="${N[e[1]].y}" stroke="${hi ? PRIMARY : MUTED_SOFT}" stroke-width="${hi ? 3 : 1.5}"/>`;
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${sub.map(e => line(e, false)).join('')}
      ${crit.map(e => line(e, true)).join('')}
      ${N.map((p, i) => `<circle cx="${p.x}" cy="${p.y}" r="14" fill="${(i === 0 || i === 1 || i === 3 || i === 4) ? PRIMARY_SOFT : PAPER}" stroke="${(i === 0 || i === 1 || i === 3 || i === 4) ? PRIMARY : MUTED_SOFT}" stroke-width="1.5"/><text x="${p.x}" y="${p.y + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${i + 1}</text>`).join('')}
    </svg>`;
  };
  const cpmFull = () => {
    const N = [
      { id: 'A', n: '요구분석', x: 110, y: 200, d: 2, tip: '시작 작업. 2일 소요. 핵심 경로의 출발점입니다.' },
      { id: 'B', n: '설계', x: 290, y: 120, d: 4, tip: '요구분석 후 설계. 4일 소요. 핵심 경로상의 작업입니다.' },
      { id: 'C', n: '자료준비', x: 290, y: 290, d: 2, tip: '병행 가능한 보조 작업. 2일 소요로 여유(slack)가 있습니다.' },
      { id: 'D', n: '구현', x: 480, y: 200, d: 5, tip: '설계와 자료준비가 끝나야 시작. 5일로 가장 긴 작업이며 핵심 경로입니다.' },
      { id: 'E', n: '검증', x: 650, y: 200, d: 2, tip: '마지막 작업. 2일 소요. 핵심 경로의 종착점입니다.' }
    ];
    const idx = id => N.findIndex(n => n.id === id);
    const critEdges = [['A', 'B'], ['B', 'D'], ['D', 'E']];
    const subEdges = [['A', 'C'], ['C', 'D']];
    const edge = (e, hi) => {
      const s = N[idx(e[0])], t = N[idx(e[1])];
      const dx = t.x - s.x, dy = t.y - s.y, len = Math.hypot(dx, dy);
      const ux = dx / len, uy = dy / len;
      const x1 = s.x + ux * 30, y1 = s.y + uy * 30, x2 = t.x - ux * 34, y2 = t.y - uy * 34;
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${hi ? PRIMARY : MUTED_SOFT}" stroke-width="${hi ? 3.5 : 1.6}" marker-end="url(#cpm-arr-${hi ? 'p' : 'm'})" pointer-events="none"/>`;
    };
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="cpm-arr-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><polygon points="0,0 10,5 0,10" fill="${PRIMARY}"/></marker>
          <marker id="cpm-arr-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><polygon points="0,0 10,5 0,10" fill="${MUTED_SOFT}"/></marker>
        </defs>
        <text x="380" y="44" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}">크리티컬 패스 (CPM)</text>
        <text x="380" y="66" text-anchor="middle" font-size="12" fill="${MUTED}">가장 긴 의존 경로가 전체 기간을 결정합니다</text>
        ${subEdges.map(e => edge(e, false)).join('')}
        ${critEdges.map(e => edge(e, true)).join('')}
        ${N.map(p => {
          const onCrit = ['A', 'B', 'D', 'E'].includes(p.id);
          return `
            <g data-tip-title="${a(p.id)} · ${a(p.n)} (${p.d}일)" data-tip="${a(p.tip)}">
              <circle cx="${p.x}" cy="${p.y}" r="30" fill="${onCrit ? PRIMARY_SOFT : PAPER}" stroke="${onCrit ? PRIMARY : MUTED_SOFT}" stroke-width="${onCrit ? 2.2 : 1.4}"/>
              <text x="${p.x}" y="${p.y - 2}" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}">${p.id}</text>
              <text x="${p.x}" y="${p.y + 15}" text-anchor="middle" font-size="10" fill="${MUTED}">${p.d}일</text>
              <text x="${p.x}" y="${p.y + 48}" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">${p.n}</text>
            </g>`;
        }).join('')}
        <g pointer-events="none" font-size="12" fill="${MUTED}">
          <line x1="110" y1="350" x2="150" y2="350" stroke="${PRIMARY}" stroke-width="3.5"/>
          <text x="158" y="354" font-weight="600" fill="${INK}">핵심 경로 (A→B→D→E, 13일)</text>
          <line x1="430" y1="350" x2="470" y2="350" stroke="${MUTED_SOFT}" stroke-width="1.6"/>
          <text x="478" y="354">여유 경로</text>
        </g>
      </svg>
      <div class="viz-caption">지연되면 전체 일정이 밀리는 핵심 경로를 찾아 자원을 집중합니다</div>
    </div>`;
  };

  const eisenhowerThumb = () => {
    const cells = [
      { x: 145, y: 22, fill: PAPER, t: '즉시' },
      { x: 22, y: 22, fill: PRIMARY_SOFT, t: '계획', hi: true },
      { x: 145, y: 100, fill: PAPER, t: '위임' },
      { x: 22, y: 100, fill: CREAM_STR, t: '제거' }
    ];
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${cells.map(c => `
        <rect x="${c.x}" y="${c.y}" width="113" height="68" rx="4" fill="${c.fill}" stroke="${c.hi ? PRIMARY : MUTED_SOFT}" stroke-width="${c.hi ? 1.8 : 1}"/>
        <text x="${c.x + 56}" y="${c.y + 40}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${c.t}</text>`).join('')}
    </svg>`;
  };
  const eisenhowerFull = () => {
    const X0 = 180, Y0 = 95, CW = 230, CH = 110;
    const quad = (col, row) => ({ x: X0 + col * CW, y: Y0 + row * CH });
    const cells = [
      { col: 1, row: 0, fill: PAPER, stroke: INK, title: '즉시 실행 (Do)', tip: '긴급하고 중요. 위기·마감·핵심 문제. 지금 직접 처리합니다.', sub: '긴급 + 중요' },
      { col: 0, row: 0, fill: PRIMARY_SOFT, stroke: PRIMARY, hi: true, title: '계획 (Schedule)', tip: '중요하지만 비긴급. 전략·관계·역량개발. 시간을 정해 투자하는, 성과를 가르는 가장 중요한 사분면입니다.', sub: '중요 + 비긴급' },
      { col: 1, row: 1, fill: AMBER_SOFT, stroke: AMBER, title: '위임 (Delegate)', tip: '긴급하지만 비중요. 일부 회의·요청. 다른 사람에게 맡깁니다.', sub: '긴급 + 비중요' },
      { col: 0, row: 1, fill: CREAM_STR, stroke: MUTED_SOFT, title: '제거 (Delete)', tip: '비긴급·비중요. 시간낭비·과한 잡무. 줄이거나 없앱니다.', sub: '비긴급 + 비중요' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="44" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}">아이젠하워 매트릭스</text>
        ${cells.map(c => {
          const p = quad(c.col, c.row);
          return `
            <g data-tip-title="${a(c.title)}" data-tip="${a(c.tip)}">
              <rect x="${p.x}" y="${p.y}" width="${CW - 6}" height="${CH - 6}" rx="6" fill="${c.fill}" stroke="${c.stroke}" stroke-width="${c.hi ? 2.2 : 1.3}"/>
              <text x="${p.x + (CW - 6) / 2}" y="${p.y + 44}" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}">${c.title}</text>
              <text x="${p.x + (CW - 6) / 2}" y="${p.y + 68}" text-anchor="middle" font-size="12" fill="${MUTED}">${c.sub}</text>
            </g>`;
        }).join('')}
        <g pointer-events="none">
          <text x="${X0 + CW - 3}" y="80" text-anchor="middle" font-size="13" font-weight="600" fill="${MUTED}">중요도 ↑</text>
          <text x="${X0 + CW / 2}" y="${Y0 + 2 * CH + 14}" text-anchor="middle" font-size="12" fill="${MUTED_SOFT}">낮음</text>
          <text x="${X0 + CW + CW / 2}" y="${Y0 + 2 * CH + 14}" text-anchor="middle" font-size="12" fill="${MUTED_SOFT}">높음</text>
          <text x="${X0 + CW - 3}" y="${Y0 + 2 * CH + 32}" text-anchor="middle" font-size="13" font-weight="600" fill="${MUTED}">긴급도 →</text>
        </g>
      </svg>
      <div class="viz-caption">긴급도와 중요도로 일을 4분면에 나눠, 무엇을 먼저·맡기고·버릴지 정합니다</div>
    </div>`;
  };

  const riskColor = (sum) => {
    if (sum <= 2) return '#cfe8e1';
    if (sum <= 3) return '#e9ecd6';
    if (sum <= 4) return AMBER_SOFT;
    if (sum <= 5) return PRIMARY_SOFT;
    return '#e9b8a6';
  };
  const riskmatrixThumb = () => {
    const X0 = 60, Y0 = 18, C = 28;
    let cells = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      cells += `<rect x="${X0 + c * C}" y="${Y0 + r * C}" width="${C - 2}" height="${C - 2}" fill="${riskColor(c + (3 - r))}" stroke="${PAPER}" stroke-width="1"/>`;
    }
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      ${cells}
      <circle cx="${X0 + 3 * C + (C - 2) / 2}" cy="${Y0 + (C - 2) / 2}" r="7" fill="${PRIMARY}" stroke="${PAPER}" stroke-width="1.5"/>
    </svg>`;
  };
  const riskmatrixFull = () => {
    const X0 = 200, Y0 = 90, C = 56, GRID = 5;
    const probLab = ['희박', '낮음', '보통', '높음', '매우높음'];
    const impLab = ['경미', '낮음', '보통', '심각', '치명적'];
    let cells = '';
    for (let r = 0; r < GRID; r++) for (let c = 0; c < GRID; c++) {
      const imp = GRID - 1 - r;
      const norm = Math.round(((c + imp) / (2 * (GRID - 1))) * 6);
      cells += `<rect x="${X0 + c * C}" y="${Y0 + r * C}" width="${C - 3}" height="${C - 3}" rx="3" fill="${riskColor(norm)}" stroke="${PAPER}" stroke-width="2" pointer-events="none"/>`;
    }
    const risks = [
      { c: 4, r: 0, label: '핵심 인력 이탈', tip: '발생확률 매우 높음 × 영향도 치명적 = 최고위험. 즉시 대응책(승계·리텐션)을 마련합니다.' },
      { c: 1, r: 1, label: '환율 변동', tip: '발생확률 낮음 × 영향도 심각. 모니터링하며 헤지 전략을 준비합니다.' },
      { c: 0, r: 4, label: '문서 오탈자', tip: '발생확률 희박 × 영향도 경미 = 저위험. 수용하거나 단순 점검으로 충분합니다.' }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="44" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}">리스크 매트릭스</text>
        ${cells}
        ${risks.map(rk => {
          const cx = X0 + rk.c * C + (C - 3) / 2, cy = Y0 + rk.r * C + (C - 3) / 2;
          return `
            <g data-tip-title="${a(rk.label)}" data-tip="${a(rk.tip)}">
              <circle cx="${cx}" cy="${cy}" r="11" fill="${INK}" stroke="${PAPER}" stroke-width="2"/>
              <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="${ON_DARK}">!</text>
              <text x="${cx + 16}" y="${cy + 4}" font-size="11" font-weight="600" fill="${INK}">${rk.label}</text>
            </g>`;
        }).join('')}
        <g pointer-events="none" font-size="11" fill="${MUTED}">
          ${impLab.map((l, i) => `<text x="${X0 - 10}" y="${Y0 + (GRID - 1 - i) * C + (C - 3) / 2 + 4}" text-anchor="end">${l}</text>`).join('')}
          ${probLab.map((l, i) => `<text x="${X0 + i * C + (C - 3) / 2}" y="${Y0 + GRID * C + 16}" text-anchor="middle">${l}</text>`).join('')}
          <text x="${X0 - 70}" y="${Y0 + GRID * C / 2}" text-anchor="middle" font-size="13" font-weight="600" fill="${MUTED}" transform="rotate(-90 ${X0 - 70} ${Y0 + GRID * C / 2})">영향도 ↑</text>
          <text x="${X0 + GRID * C / 2}" y="${Y0 + GRID * C + 38}" text-anchor="middle" font-size="13" font-weight="600" fill="${MUTED}">발생확률 →</text>
        </g>
      </svg>
      <div class="viz-caption">발생확률과 영향도로 위험을 격자에 올려, 우선 대응할 리스크를 가립니다</div>
    </div>`;
  };

  const genericStrategyThumb = () => {
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="22" width="113" height="60" rx="4" fill="${PAPER}" stroke="${MUTED_SOFT}" stroke-width="1"/>
      <text x="78" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">원가우위</text>
      <rect x="145" y="22" width="113" height="60" rx="4" fill="${PRIMARY_SOFT}" stroke="${PRIMARY}" stroke-width="1.8"/>
      <text x="201" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">차별화</text>
      <rect x="22" y="92" width="236" height="60" rx="4" fill="${CREAM_STR}" stroke="${MUTED_SOFT}" stroke-width="1"/>
      <text x="140" y="126" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">집중화</text>
    </svg>`;
  };
  const genericStrategyFull = () => {
    const X0 = 200, Y0 = 95, CW = 230, RH = 105;
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="44" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}">포터의 본원적 경쟁전략</text>
        <g data-tip-title="원가우위 (Cost Leadership)" data-tip="광범위한 시장에서 최저 원가로 경쟁합니다. 규모의 경제·효율화로 가격 경쟁력을 확보합니다.">
          <rect x="${X0}" y="${Y0}" width="${CW - 6}" height="${RH - 6}" rx="6" fill="${PAPER}" stroke="${INK}" stroke-width="1.3"/>
          <text x="${X0 + (CW - 6) / 2}" y="${Y0 + 48}" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}">원가우위</text>
          <text x="${X0 + (CW - 6) / 2}" y="${Y0 + 72}" text-anchor="middle" font-size="12" fill="${MUTED}">Cost Leadership</text>
        </g>
        <g data-tip-title="차별화 (Differentiation)" data-tip="광범위한 시장에서 독특한 가치로 경쟁합니다. 브랜드·품질·기술로 프리미엄을 받는 핵심 전략입니다.">
          <rect x="${X0 + CW}" y="${Y0}" width="${CW - 6}" height="${RH - 6}" rx="6" fill="${PRIMARY_SOFT}" stroke="${PRIMARY}" stroke-width="2.2"/>
          <text x="${X0 + CW + (CW - 6) / 2}" y="${Y0 + 48}" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}">차별화</text>
          <text x="${X0 + CW + (CW - 6) / 2}" y="${Y0 + 72}" text-anchor="middle" font-size="12" fill="${MUTED}">Differentiation</text>
        </g>
        <g data-tip-title="집중화 (Focus)" data-tip="협소한 틈새 시장에 집중합니다. 원가집중·차별화집중으로 특정 세그먼트를 깊이 공략합니다.">
          <rect x="${X0}" y="${Y0 + RH}" width="${2 * CW - 6}" height="${RH - 6}" rx="6" fill="${CREAM_STR}" stroke="${INK}" stroke-width="1.3"/>
          <text x="${X0 + CW - 3}" y="${Y0 + RH + 44}" text-anchor="middle" font-size="17" font-weight="700" fill="${INK}">집중화 (Focus)</text>
          <text x="${X0 + CW - 3}" y="${Y0 + RH + 68}" text-anchor="middle" font-size="12" fill="${MUTED}">원가집중 · 차별화집중</text>
        </g>
        <g pointer-events="none">
          <text x="${X0 + (CW - 6) / 2}" y="${Y0 - 12}" text-anchor="middle" font-size="12" font-weight="600" fill="${MUTED}">저원가</text>
          <text x="${X0 + CW + (CW - 6) / 2}" y="${Y0 - 12}" text-anchor="middle" font-size="12" font-weight="600" fill="${MUTED}">차별화</text>
          <text x="${X0 + CW - 3}" y="${Y0 - 32}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">경쟁우위 →</text>
          <text x="${X0 - 42}" y="${Y0 + RH}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}" transform="rotate(-90 ${X0 - 42} ${Y0 + RH})">경쟁범위</text>
        </g>
      </svg>
      <div class="viz-caption">경쟁우위(원가/차별화)와 범위(광범위/협소)로 네 가지 본원 전략을 가립니다</div>
    </div>`;
  };

  const vpcThumb = () => {
    return `
    <svg class="thumb-svg" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="45" width="90" height="90" rx="6" fill="${PAPER}" stroke="${MUTED_SOFT}" stroke-width="1.3"/>
      <line x1="24" y1="75" x2="114" y2="75" stroke="${HAIRLINE}"/>
      <line x1="24" y1="105" x2="114" y2="105" stroke="${HAIRLINE}"/>
      <circle cx="212" cy="90" r="48" fill="${PRIMARY_SOFT}" stroke="${PRIMARY}" stroke-width="1.5"/>
      <line x1="164" y1="90" x2="260" y2="90" stroke="${PRIMARY}" stroke-width="0.8" opacity="0.5"/>
      <line x1="195" y1="48" x2="195" y2="132" stroke="${PRIMARY}" stroke-width="0.8" opacity="0.5"/>
      <text x="138" y="96" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}">=</text>
    </svg>`;
  };
  const vpcFull = () => {
    const SX = 90, SY = 110, SS = 200;
    const CX = 560, CY = 210, CR = 130;
    const sqRows = [
      { y: SY, h: SS / 3, title: '제품·서비스', tip: '가치 지도 — 제공하는 제품과 서비스의 목록입니다. 고객의 할 일을 돕는 핵심입니다.' },
      { y: SY + SS / 3, h: SS / 3, title: '고통 해소제', tip: '가치 지도 — 고객의 고통(Pain)을 어떻게 없애거나 줄이는지를 정의합니다.' },
      { y: SY + 2 * SS / 3, h: SS / 3, title: '이득 창출제', tip: '가치 지도 — 고객이 기대하는 이득(Gain)을 어떻게 만들어내는지를 정의합니다.' }
    ];
    const circSecs = [
      { title: '할 일 (Jobs)', tip: '고객 프로파일 — 고객이 해결하려는 과업·문제·욕구입니다.', angle: -90 },
      { title: '고통 (Pains)', tip: '고객 프로파일 — 과업 수행 중 겪는 불편·위험·부정적 결과입니다.', angle: 30 },
      { title: '이득 (Gains)', tip: '고객 프로파일 — 고객이 바라는 긍정적 결과와 혜택입니다.', angle: 150 }
    ];
    return `
    <div class="viz">
      <svg class="viz-svg" viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
        <text x="380" y="44" text-anchor="middle" font-size="18" font-weight="700" fill="${INK}">가치 제안 캔버스 (VPC)</text>
        <text x="${SX + SS / 2}" y="${SY - 16}" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}">가치 지도</text>
        ${sqRows.map((r, i) => `
          <g data-tip-title="${a(r.title)}" data-tip="${a(r.tip)}">
            <rect x="${SX}" y="${r.y}" width="${SS}" height="${r.h}" fill="${i === 0 ? CREAM_STR : PAPER}" stroke="${INK}" stroke-width="1.3"/>
            <text x="${SX + SS / 2}" y="${r.y + r.h / 2 + 5}" text-anchor="middle" font-size="14" font-weight="600" fill="${INK}">${r.title}</text>
          </g>`).join('')}
        <text x="${CX}" y="${CY - CR - 16}" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}">고객 프로파일</text>
        <circle cx="${CX}" cy="${CY}" r="${CR}" fill="${PRIMARY_SOFT}" stroke="${PRIMARY}" stroke-width="1.8" pointer-events="none"/>
        <line x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY - CR}" stroke="${PRIMARY}" stroke-width="1.2" pointer-events="none"/>
        <line x1="${CX}" y1="${CY}" x2="${CX + CR * Math.cos(Math.PI / 6)}" y2="${CY + CR * Math.sin(Math.PI / 6)}" stroke="${PRIMARY}" stroke-width="1.2" pointer-events="none"/>
        <line x1="${CX}" y1="${CY}" x2="${CX - CR * Math.cos(Math.PI / 6)}" y2="${CY + CR * Math.sin(Math.PI / 6)}" stroke="${PRIMARY}" stroke-width="1.2" pointer-events="none"/>
        ${circSecs.map(s => {
          const rad = s.angle * Math.PI / 180;
          const lx = CX + (CR * 0.55) * Math.cos(rad);
          const ly = CY + (CR * 0.55) * Math.sin(rad);
          return `
            <g data-tip-title="${a(s.title)}" data-tip="${a(s.tip)}">
              <circle cx="${lx}" cy="${ly}" r="34" fill="transparent"/>
              <text x="${lx}" y="${ly + 4}" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}">${s.title}</text>
            </g>`;
        }).join('')}
        <text x="${(SX + SS + CX - CR) / 2}" y="${CY + 6}" text-anchor="middle" font-size="26" font-weight="700" fill="${PRIMARY}">≈</text>
        <text x="${(SX + SS + CX - CR) / 2}" y="${CY + 30}" text-anchor="middle" font-size="11" fill="${MUTED}">적합성(Fit)</text>
        <text x="${SX + SS / 2}" y="${SY + SS + 26}" text-anchor="middle" font-size="11" fill="${MUTED}">우리가 만드는 것</text>
        <text x="${CX}" y="${CY + CR + 26}" text-anchor="middle" font-size="11" fill="${MUTED}">고객이 원하는 것</text>
      </svg>
      <div class="viz-caption">가치 지도(사각형)와 고객 프로파일(원)을 맞춰 제품-시장 적합성을 점검합니다</div>
    </div>`;
  };

  const REG = {
    'kotter':           { thumb: kotterThumb,       full: kotterFull },
    'adkar':            { thumb: adkarThumb,        full: adkarFull },
    'lewin':            { thumb: lewinThumb,        full: lewinFull },
    'gantt':            { thumb: ganttThumb,        full: ganttFull },
    'cpm':              { thumb: cpmThumb,          full: cpmFull },
    'scrum':            { thumb: scrumThumb,        full: scrumFull },
    'eisenhower':       { thumb: eisenhowerThumb,   full: eisenhowerFull },
    'riskmatrix':       { thumb: riskmatrixThumb,   full: riskmatrixFull },
    'maslow':           { thumb: maslowThumb,       full: maslowFull },
    'smart':            { thumb: smartThumb,        full: smartFull },
    'generic-strategy': { thumb: genericStrategyThumb, full: genericStrategyFull },
    'vpc':              { thumb: vpcThumb,          full: vpcFull },
    'fishbone':         { thumb: fishboneThumb,    full: fishboneFull },
    'pareto':           { thumb: paretoThumb,      full: paretoFull },
    'horizons':         { thumb: horizonsThumb,    full: horizonsFull },
    'corecomp':         { thumb: corecompThumb,    full: corecompFull },
    'toc':              { thumb: tocThumb,         full: tocFull },
    'dmaic':            { thumb: dmaicThumb,       full: dmaicFull },
    'pdca':             { thumb: pdcaThumb,        full: pdcaFull },
    'grow':             { thumb: growThumb,        full: growFull },
    'kirkpatrick':      { thumb: kirkpatrickThumb, full: kirkpatrickFull },
    'competency':       { thumb: competencyThumb,  full: competencyFull },
    'hr-9box':          { thumb: hr9boxThumb,      full: hr9boxFull },
    'ulrich':           { thumb: ulrichThumb,      full: ulrichFull },
    'herzberg':         { thumb: herzbergThumb,    full: herzbergFull },
    'vrio':             { thumb: vrioThumb,        full: vrioFull },
    'rfm':              { thumb: rfmThumb,         full: rfmFull },
    'muda':             { thumb: mudaThumb,     full: mudaFull },
    'fives':            { thumb: fivesThumb,    full: fivesFull },
    'kanban':           { thumb: kanbanThumb,   full: kanbanFull },
    'fivewhys':         { thumb: fivewhysThumb, full: fivewhysFull },
    'sixhats':          { thumb: sixhatsThumb,  full: sixhatsFull },
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
    'design-thinking':  { thumb: dtThumb,      full: dtFull },
    'aarrr':            { thumb: aarrrThumb,   full: aarrrFull },
    'aida':             { thumb: aidaThumb,    full: aidaFull },
    'tuckman':          { thumb: tuckmanThumb, full: tuckmanFull },
    'ejm':              { thumb: ejmThumb,     full: ejmFull },
    'vsm':              { thumb: vsmThumb,     full: vsmFull }
  };

  return {
    thumb: f => REG[f.vizType] ? REG[f.vizType].thumb(f) : '',
    full:  f => REG[f.vizType] ? REG[f.vizType].full(f)  : ''
  };
})();
