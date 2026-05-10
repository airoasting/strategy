# Strategy Frameworks · 전략 프레임워크 갤러리

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Frameworks](https://img.shields.io/badge/frameworks-30-coral.svg)](https://github.com/airoasting/strategy_frameworks)
[![Static](https://img.shields.io/badge/build-static-brightgreen.svg)](index.html)

> 맥킨지·베인·BCG 현장 도구 30개를 한 자리에.  
> 카드로 탐색하고, AI가 상황에 맞는 도구를 골라줍니다.

---

## 왜 이 프로젝트인가

전략 프레임워크는 많습니다. 문제는 **지금 내 상황에 뭘 써야 하는지** 모른다는 것.

이 프로젝트는 두 가지를 함께 제공합니다.

- **갤러리** — 30개 프레임워크를 카드로 탐색, 모달에서 구성·절차·예시까지 확인
- **AI 추천 스킬** — 상황을 말하면 1순위 도구 + 보조 도구 + 첫 적용 단계를 제안

---

## 빠른 시작

### 갤러리 로컬 실행

```bash
git clone https://github.com/airoasting/strategy_frameworks.git
cd strategy_frameworks
npx http-server . -p 8000
```

브라우저에서 [http://localhost:8000](http://localhost:8000) 열기.

### AI 추천 스킬 설치

```bash
git clone https://github.com/airoasting/strategy_frameworks.git
ln -s "$(pwd)/strategy_frameworks/skill" ~/.claude/skills/strategy-framework
```

설치 후 Claude Code에서:

```
어떤 프레임워크 써야 할지 모르겠어. 신사업 초기 시장 분석을 해야 해.
```

→ 1순위 추천 + 이유 + 적용 단계 + 보조 도구까지 바로 제안.

---

## 기능

| | |
|---|---|
| 30개 프레임워크 | 6개 카테고리, SVG 시각화 |
| 카테고리 필터 + 검색 | 실시간, 스크롤 스파이 연동 |
| 모달 상세 | 개요·구성·절차·예시·한계·관련 도구 |
| 라이트 / 다크 모드 | 시스템 설정 감지 + 수동 전환 |
| AI 추천 스킬 | 자연어 → 1순위 도구 추천 |
| 제로 의존성 | 바닐라 JS, 빌드 없음 |

---

## 30개 프레임워크

<details>
<summary>전체 목록 보기</summary>

### 문제 해결·사고 도구
`#19` 이슈 트리 / MECE &nbsp; `#22` 시나리오 플래닝 &nbsp; `#28` 피라미드 원칙 &nbsp; `#30` 디자인 씽킹

### 시장·경쟁 분석
`#4` 3C 분석 &nbsp; `#5` SWOT &nbsp; `#6` 5 Forces &nbsp; `#7` PESTEL &nbsp; `#17` BCG 매트릭스 &nbsp; `#18` Ansoff &nbsp; `#21` GE-McKinsey 9Box &nbsp; `#24` 블루오션 전략

### 마케팅 전략
`#8` STP &nbsp; `#9` 4P &nbsp; `#10` Customer Journey Map &nbsp; `#25` JTBD &nbsp; `#27` Kano 모델 &nbsp; `#29` 포지셔닝 맵

### 비즈니스 모델·수익 구조
`#1` BMC &nbsp; `#2` 이익 방정식 &nbsp; `#3` 수익 모델 &nbsp; `#26` Lean Canvas

### 조직·내부역량 분석
`#11` 가치 사슬 &nbsp; `#12` 맥킨지 7S &nbsp; `#13` 역량 성숙도 &nbsp; `#20` BSC &nbsp; `#23` OKR

### 프로세스 분석
`#14` 프로세스 분해 &nbsp; `#15` SIPOC &nbsp; `#16` RACI

</details>

---

## AI 추천 스킬 예시

```
사용자  신사업 검토 중인데 어떤 프레임워크부터 써야 할지 모르겠어

AI      추천: 3C 분석 (#4)
        이유: 시장·고객·경쟁의 전체 구도를 잡기 전에 세부 분석으로 내려가면
              방향이 흔들립니다. 3C로 큰 그림부터 잡는 게 맞습니다.

        첫 단계
        1. 자사(Company) — 현재 보유 자원과 핵심 강점 정리
        2. 고객(Customer) — 타깃 세그먼트와 핵심 니즈 정의
        3. 경쟁(Competitor) — 주요 플레이어와 포지셔닝 비교

        보조 도구: BMC(#1) — 사업 모델 초안 설계, PESTEL(#7) — 거시환경 점검
```

```
사용자  팀 간 책임이 계속 모호해서 협업이 막혀

AI      추천: RACI 차트 (#16)
        ...
```

---

## 구조

```
.
├── index.html              # 갤러리 진입점
├── css/style.css
├── js/
│   ├── app.js
│   └── visualizations.js   # 30개 SVG 시각화
├── data/frameworks.js      # 전체 데이터
├── assets/
├── skill/
│   ├── SKILL.md            # AI 추천 스킬 정의
│   └── references/
│       ├── frameworks.md
│       └── decision-tree.md
└── LICENSE
```

---

## 배포

정적 파일이므로 루트 그대로 올리면 됩니다.

```bash
# GitHub Pages
# Settings → Pages → Deploy from branch (root)

# Vercel
vercel --prod

# Netlify
netlify deploy --prod --dir .
```

---

## 기여

PR 환영합니다. 프레임워크 추가, 번역, 시각화 개선 모두 좋습니다.

1. Fork → 브랜치 생성
2. `data/frameworks.js`에 프레임워크 추가
3. `js/visualizations.js`에 시각화 추가
4. PR 제출

---

## 라이선스

[MIT](LICENSE) © 2026 AI Roasting
