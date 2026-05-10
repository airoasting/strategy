# 30개 전략 프레임워크

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Frameworks](https://img.shields.io/badge/frameworks-30-coral.svg)](https://github.com/airoasting/strategy)
[![Static](https://img.shields.io/badge/build-static-brightgreen.svg)](index.html)

맥킨지·베인·BCG 현장 도구 30개를 한 자리에 모았습니다.
카드로 탐색하고, AI가 상황에 맞는 도구를 골라줍니다.

**[airoasting.github.io/strategy](https://airoasting.github.io/strategy/)**

---

## 배경

전략 프레임워크는 많은데, 지금 내 상황에 뭘 써야 할지 모르겠는 경우가 더 많습니다.

갤러리에서 30개를 직접 훑어보거나, AI 스킬에 상황을 말하면 맞는 도구를 골라줍니다.

---

## 시작하기

### 갤러리 로컬 실행

```bash
git clone https://github.com/airoasting/strategy.git
cd strategy
npx http-server . -p 8000
```

[http://localhost:8000](http://localhost:8000)

### AI 추천 스킬 설치

```bash
git clone https://github.com/airoasting/strategy.git
ln -s "$(pwd)/strategy/skill" ~/.claude/skills/strategy
```

설치하고 나면 상황을 말하는 것만으로 도구 추천이 됩니다.

```
신사업 초기 시장 분석을 해야 하는데 어떤 프레임워크부터 써야 할지 모르겠어.
```

---

## 기능

| 기능 | 설명 |
|---|---|
| 30개 프레임워크 | 6개 카테고리, SVG 시각화 포함 |
| 카테고리 필터 + 검색 | 실시간 필터링, 스크롤 스파이 연동 |
| 모달 상세 | 개요·구성·절차·예시·한계·관련 도구 |
| 라이트 / 다크 모드 | 시스템 설정 감지, 수동 전환 가능 |
| AI 추천 스킬 | 상황 설명하면 1순위 도구 추천 |
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

## 스킬 예시

```
사용자  신사업 검토 중인데 어떤 프레임워크부터 써야 할지 모르겠어

AI      추천: 3C 분석 (#4)
        이유: 세부 분석으로 내려가기 전에 시장·고객·경쟁 전체 구도를 먼저
              잡아야 합니다. 3C로 큰 그림부터 정리하세요.

        첫 단계
        1. 자사(Company): 보유 자원과 핵심 강점 정리
        2. 고객(Customer): 타깃 세그먼트와 핵심 니즈 정의
        3. 경쟁(Competitor): 주요 플레이어와 포지셔닝 비교

        보조 도구: BMC(#1)로 사업 모델 초안, PESTEL(#7)로 거시환경 점검
```

---

## 구조

```
.
├── index.html
├── css/style.css
├── js/
│   ├── app.js
│   └── visualizations.js
├── data/frameworks.js
├── assets/
├── skill/
│   ├── SKILL.md
│   └── references/
│       ├── frameworks.md
│       └── decision-tree.md
└── LICENSE
```

---

## 배포

정적 파일이라 루트 폴더 그대로 올리면 됩니다.

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod --dir .
```

GitHub Pages는 Settings → Pages에서 root 브랜치를 소스로 지정하면 됩니다.

---

## 기여

프레임워크 추가, 번역, 시각화 개선 모두 PR로 올려주세요.

1. Fork 후 브랜치 생성
2. `data/frameworks.js`에 프레임워크 추가
3. `js/visualizations.js`에 시각화 추가
4. PR 제출

---

## 라이선스

[MIT](LICENSE) © 2026 AI Roasting
