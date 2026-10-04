#!/usr/bin/env node
// /strategy 스킬의 references/frameworks.md를 SSOT(docs/data/frameworks.js)에서 생성하고,
// SKILL.md·decision-tree.md의 #N 표기가 SSOT와 맞는지 검사한다.
//
//   node scripts/build-skill-refs.js          # frameworks.md 재생성 + 검사
//   node scripts/build-skill-refs.js --check  # 검사만 (파일을 쓰지 않음, 실패 시 exit 1)
//
// 프레임워크를 추가·수정하면 data를 고친 뒤 이 스크립트를 돌린다. frameworks.md는 손으로 고치지 않는다.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://strategy.airoasting.com';
const OUT = path.join(ROOT, 'references/frameworks.md');
const CHECK_ONLY = process.argv.includes('--check');

global.window = {};
require(path.join(ROOT, 'docs/data/frameworks.js'));
const { categories, frameworks } = window.FRAMEWORKS_DATA;
const byId = new Map(frameworks.map(f => [f.id, f]));

const stripNum = s => s.replace(/^\s*\d+\.\s*/, '').trim();
const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

// ---------- 생성 ----------
const build = () => {
  const counts = categories.map(c => `${c.name.replace(/ 도구$| 분석$| 전략$/, '')}(${frameworks.filter(f => f.category === c.id).length})`);
  const lines = [
    `# ${frameworks.length}개 전략 프레임워크 인벤토리`,
    '',
    '> 자동 생성 파일이다. 직접 고치지 말고 `docs/data/frameworks.js`를 고친 뒤 `node scripts/build-skill-refs.js`를 실행한다.',
    '',
    '추천 응답의 근거(뼈대·단계·한계)는 이 파일에서만 가져온다. 기억으로 채우지 않는다.',
    '전체를 읽지 말고 필요한 항목만 찾는다. 예: `grep -n -A 9 "^### #11\\." references/frameworks.md`',
    '',
    `${categories.length}개 카테고리: ${counts.join(' / ')}. 번호(#N)는 갤러리 카드 번호와 같고, 카드는 \`${SITE}/#N\`으로 바로 열린다.`,
    '',
    '빈도·효과는 갤러리의 5점 척도다. 효과가 ★★ 이하인 도구는 1순위로 추천할 때 한계를 반드시 함께 말한다.',
  ];

  for (const c of categories) {
    const list = frameworks.filter(f => f.category === c.id);
    lines.push('', '---', '', `## ${c.name} (${list.length}개)`);
    for (const f of list) {
      const related = (f.related || []).map(r => `#${r} ${byId.get(r) ? byId.get(r).name : '?'}`).join(', ');
      lines.push(
        '',
        `### #${f.id}. ${f.name} (${f.altName})`,
        `- 한 줄: ${f.summary}`,
        `- 쓸 때: ${f.whenToUse.join('; ')}`,
        `- 뼈대: ${f.components.join(' / ')}`,
        `- 단계: ${f.steps.map(stripNum).join(' → ')}`,
        `- 한계: ${f.limitations.join(' ')}`,
        `- 빈도 ${stars(f.frequency)} · 효과 ${stars(f.effectiveness)}`,
        `- 갤러리 관련: ${related}`,
        `- 카드: ${SITE}/#${f.id}`,
      );
    }
  }
  return lines.join('\n') + '\n';
};

// ---------- 검사 ----------
// 스킬 문서에서 쓰는 약칭. SSOT 이름·영문명에 없는 표기만 등록한다.
const ALIASES = {
  1: ['이슈 트리', 'MECE'], 4: ['디자인 씽킹'], 6: ['특성요인도', '피시본'], 7: ['파레토'], 8: ['6색'],
  9: ['아이젠하워'], 10: ['리스크'], 12: ['SWOT'], 13: ['5 Forces'], 14: ['BCG'], 15: ['Ansoff'],
  16: ['PEST'], 17: ['GE'], 18: ['블루오션'], 19: ['3대 성장', '성장 지평'], 20: ['포터', '본원적'],
  21: ['STP'], 22: ['4P'], 23: ['CJM', '고객 여정'], 24: ['JTBD'], 25: ['Kano'], 26: ['포지셔닝 맵'],
  27: ['AARRR'], 28: ['RFM'], 29: ['AIDA'], 30: ['BMC'], 31: ['이익 방정식'], 32: ['수익 모델'],
  33: ['Lean Canvas', '린 캔버스'], 34: ['가치 제안', 'VPC'], 35: ['가치 사슬'], 36: ['BSC'], 37: ['7S'],
  38: ['성숙도'], 39: ['OKR'], 40: ['VRIO'], 41: ['핵심역량'], 42: ['SMART'], 43: ['9박스'],
  44: ['Ulrich', 'HR 모델'], 45: ['역량 모델'], 46: ['Tuckman', '터크먼'], 47: ['허즈버그'], 48: ['커크패트릭'],
  49: ['직원 여정'], 50: ['GROW'], 51: ['매슬로'], 52: ['프로세스 분해'], 53: ['RACI'], 54: ['SIPOC'],
  55: ['DMAIC'], 56: ['린 7대 낭비', '7대 낭비'], 57: ['VSM', '가치 흐름'], 58: ['PDCA'], 59: ['5S'],
  60: ['칸반'], 61: ['TOC', '제약 이론'], 62: ['코터'], 63: ['ADKAR'], 64: ['르윈'], 65: ['간트'],
  66: ['CPM', '크리티컬 패스'], 67: ['스크럼'], 68: ['유닛 이코노믹스', 'LTV'], 69: ['밸류 스틱'], 70: ['OODA'],
};
const norm = s => s.toLowerCase().replace(/[\s·()/\-]/g, '');
const known = id => {
  const f = byId.get(id);
  return [f.name, f.altName, ...(ALIASES[id] || [])].map(norm).filter(Boolean);
};

// "#13 5 Forces", "5 Forces (#13)", "**#13 5 Forces**" 형태에서 번호와 이름을 짝지어 검사한다.
// 이름 없이 번호만 쓴 #N("…이면 #6을 먼저")은 같은 줄에서 이름과 함께 나온 번호여야 한다.
const check = (file) => {
  const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const errors = [];
  text.split('\n').forEach((line, i) => {
    const pairs = [];
    const head = line.startsWith('###') ? /#(\d{1,3})\.?\s+([^|,;:()*\n→#/]+)/g : /#(\d{1,3})\s+([^|,;:()*\n→#/]+)/g;
    for (const m of line.matchAll(head)) pairs.push([+m[1], m[2]]);
    for (const m of line.matchAll(/([^|,;:(*\n→#/]+?)\s*\(#(\d{1,3})\)/g)) pairs.push([+m[2], m[1]]);
    const named = new Set();
    for (const [id, rawLabel] of pairs) {
      if (!byId.has(id)) { errors.push(`${file}:${i + 1} #${id}는 SSOT에 없음`); continue; }
      const label = norm(rawLabel.replace(/^[^\w가-힣]+/, '').split(/\s(?:vs|또는|이면|으로|로|에서|를|은|는|이|가)\s/)[0]);
      if (!label || /^\d/.test(label) && !/^(5|6|3|4|7|9)/.test(label)) continue;
      if (!known(id).some(k => label.includes(k) || k.includes(label.slice(0, Math.max(2, Math.min(label.length, 4)))))) {
        errors.push(`${file}:${i + 1} #${id} 표기 "${rawLabel.trim()}" ≠ SSOT "${byId.get(id).name}"`);
      } else named.add(id);
    }
    for (const m of line.matchAll(/(\/?)#(\d{1,3})/g)) {
      const id = +m[2];
      if (!byId.has(id)) errors.push(`${file}:${i + 1} #${id}는 SSOT에 없음`);
      else if (!m[1] && !named.has(id)) errors.push(`${file}:${i + 1} 이름 없는 #${id}가 같은 줄에서 이름과 함께 나오지 않음`); // 카드 URL의 /#N은 번호 존재만 본다
    }
  });
  return errors;
};

// decision-tree.md의 각 절이 70개를 모두 다루는지 검사한다.
const section = (text, n) => {
  const m = text.match(new RegExp(`\\n## ${n}\\.[\\s\\S]*?(?=\\n## \\d+\\.|$)`));
  return m ? m[0] : '';
};
const idsIn = (text, re) => new Set([...text.matchAll(re)].map(m => +m[1]));
const coverage = () => {
  const tree = fs.readFileSync(path.join(ROOT, 'references/decision-tree.md'), 'utf8');
  const errors = [];
  const rules = [
    [1, /\*\*#(\d+) /g, '§1 분기'],
    [2, /^\| #(\d+) /gm, '§2 순서표'],
    [3, /\| #(\d+) [^|]*\|\s*$/gm, '§3 키워드 사전'],
    [4, /#(\d+)/g, '§4 경계'],
    [5, /#(\d+)/g, '§5 준비물'],
  ];
  for (const [n, re, name] of rules) {
    const found = idsIn(section(tree, n), re);
    const missing = frameworks.map(f => f.id).filter(id => !found.has(id));
    if (missing.length) errors.push(`decision-tree.md ${name}에 없는 도구: ${missing.map(id => '#' + id).join(', ')}`);
  }
  // §5는 도구마다 정확히 한 유형
  const prep = [...section(tree, 5).matchAll(/#(\d+)/g)].map(m => +m[1]);
  const dup = prep.filter((id, k) => prep.indexOf(id) !== k);
  if (dup.length) errors.push(`decision-tree.md §5 준비물에 중복된 도구: ${[...new Set(dup)].map(id => '#' + id).join(', ')}`);

  // SKILL.md 자주 나오는 상황 표: 차점이 §2 순서표의 앞·뒤 도구와 겹치면 안 된다
  const seq = new Map();
  for (const m of section(tree, 2).matchAll(/^\| #(\d+) [^|]*\|([^|]*)\|([^|]*)\|/gm)) {
    seq.set(+m[1], idsIn(m[2] + m[3], /#(\d+)/g));
  }
  const skill = fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf8');
  for (const m of skill.matchAll(/^\|[^|]+\|[^|]*\(#(\d+)\)[^|]*\|[^|]*\(#(\d+)\)[^|]*\|\s*$/gm)) {
    const [first, second] = [+m[1], +m[2]];
    if (first === second) errors.push(`SKILL.md 상황 표: #${first}의 1순위와 차점이 같음`);
    if (seq.get(first) && seq.get(first).has(second)) {
      errors.push(`SKILL.md 상황 표: #${first}의 차점 #${second}가 §2 순서표의 앞·뒤 도구와 겹침`);
    }
  }
  return errors;
};

// 하드코딩된 전체 개수(70)와 카테고리별 개수를 검사한다.
const counts = () => {
  const errors = [];
  const total = frameworks.length;
  const files = ['SKILL.md', 'references/decision-tree.md', 'README.md', 'docs/index.html'];
  for (const f of files) {
    const text = fs.readFileSync(path.join(ROOT, f), 'utf8');
    const patterns = [
      /\b1~(\d{2})\b/g,
      /(\d{2})\s*(?:개|가지)\s*(?:컨설팅|전략|프레임워크|도구|를|중|밖)/g,
      /(?:프레임워크|도구)\s*(\d{2})\s*개/g,
      /\b(\d{2}) Strategy Frameworks/g,
      /frameworks-(\d{2})-/g,
    ];
    for (const re of patterns) {
      for (const m of text.matchAll(re)) {
        if (+m[1] !== total) errors.push(`${f}: "${m[0]}" (현재 ${total}개)`);
      }
    }
  }
  const html = fs.readFileSync(path.join(ROOT, 'docs/index.html'), 'utf8');
  for (const m of html.matchAll(/data-scroll-cat="([\w-]+)"[^>]*>[^<]*<span class="footer-count">(\d+)</g)) {
    const n = frameworks.filter(f => f.category === m[1]).length;
    if (+m[2] !== n) errors.push(`docs/index.html 푸터 ${m[1]}: ${m[2]} (현재 ${n}개)`);
  }
  return errors;
};

let stale = false;
if (!CHECK_ONLY) {
  fs.writeFileSync(OUT, build());
  console.log(`생성: references/frameworks.md (${frameworks.length}개)`);
} else if (fs.readFileSync(OUT, 'utf8') !== build()) {
  stale = true;
}

const errors = [
  ...(stale ? ['references/frameworks.md가 SSOT와 다릅니다. node scripts/build-skill-refs.js 로 재생성하세요.'] : []),
  ...['SKILL.md', 'references/decision-tree.md'].flatMap(check),
  ...coverage(),
  ...counts(),
];

if (errors.length) {
  console.error(`정합성 오류 ${errors.length}건\n` + errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('정합성 검사 통과: #N 표기·절별 70개 커버리지·차점 분리·개수 표기가 SSOT와 일치');
}
