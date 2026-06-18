# 67개 전략 프레임워크

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Frameworks](https://img.shields.io/badge/frameworks-67-coral.svg)](https://github.com/airoasting/strategy)
[![Static](https://img.shields.io/badge/build-static-brightgreen.svg)](index.html)

맥킨지·베인·BCG 현장 도구 67개를 한 자리에 모았습니다.
카드로 탐색하고, AI가 상황에 맞는 도구를 골라줍니다.

**[airoasting.github.io/strategy](https://airoasting.github.io/strategy/)**

---

## 배경

전략 프레임워크는 많은데, 지금 내 상황에 뭘 써야 할지 모르겠는 경우가 더 많습니다.

갤러리에서 67개를 직접 훑어보거나, AI 스킬에 상황을 말하면 맞는 도구를 골라줍니다.

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
| 67개 프레임워크 | 9개 카테고리, SVG 시각화 포함 |
| 카테고리 필터 + 검색 | 실시간 필터링, 스크롤 스파이 연동 |
| 모달 상세 | 개요·구성·절차·예시·한계·관련 도구 |
| 라이트 / 다크 모드 | 시스템 설정 감지, 수동 전환 가능 |
| AI 추천 스킬 | 상황 설명하면 1순위 도구 추천 |
| 제로 의존성 | 바닐라 JS, 빌드 없음 |

---

## 스크린샷

### 문제 해결·사고 도구
![문제 해결·사고 도구](assets/screenshots/problem-solving.png)

### 시장·경쟁 분석
![시장·경쟁 분석](assets/screenshots/market.png)

### 마케팅 전략
![마케팅 전략](assets/screenshots/marketing.png)

### 비즈니스 모델·수익 구조
![비즈니스 모델·수익 구조](assets/screenshots/business-model.png)

### 조직·내부역량 분석
![조직·내부역량 분석](assets/screenshots/organization.png)

### 프로세스 분석
![프로세스 분석](assets/screenshots/process.png)

---

## 67개 프레임워크

<details>
<summary>전체 목록 보기</summary>

### 문제 해결·사고 도구 (10)
`#1` 이슈 트리 / MECE &nbsp; `#2` 시나리오 플래닝 &nbsp; `#28` 피라미드 원칙 &nbsp; `#30` 디자인 씽킹 &nbsp; `#46` 5 Whys &nbsp; `#47` 특성요인도 &nbsp; `#48` 파레토 분석 &nbsp; `#49` 6색 사고모자 &nbsp; `#62` 아이젠하워 매트릭스 &nbsp; `#63` 리스크 매트릭스

### 시장·경쟁 분석 (10)
`#3` 3C 분석 &nbsp; `#4` SWOT &nbsp; `#5` 5 Forces &nbsp; `#8` PESTEL &nbsp; `#6` BCG 매트릭스 &nbsp; `#7` Ansoff &nbsp; `#9` GE-McKinsey 9Box &nbsp; `#10` 블루오션 전략 &nbsp; `#52` 3대 성장 지평 &nbsp; `#66` 포터 본원적 경쟁전략

### 마케팅 전략 (9)
`#15` STP &nbsp; `#16` 4P &nbsp; `#17` Customer Journey Map &nbsp; `#18` JTBD &nbsp; `#19` Kano 모델 &nbsp; `#29` 포지셔닝 맵 &nbsp; `#53` AARRR &nbsp; `#54` RFM &nbsp; `#55` AIDA

### 비즈니스 모델·수익 구조 (5)
`#11` BMC &nbsp; `#12` 이익 방정식 &nbsp; `#13` 수익 모델 &nbsp; `#14` Lean Canvas &nbsp; `#67` 가치 제안 캔버스

### 조직·내부역량 분석 (8)
`#20` 가치 사슬 &nbsp; `#22` 맥킨지 7S &nbsp; `#23` 역량 성숙도 &nbsp; `#21` BSC &nbsp; `#26` OKR &nbsp; `#50` VRIO &nbsp; `#51` 핵심역량 &nbsp; `#65` SMART 목표

### HR·인재·조직문화 (9)
`#31` 9박스 인재 매트릭스 &nbsp; `#32` Ulrich HR 모델 &nbsp; `#33` 역량 모델 &nbsp; `#34` Tuckman 팀 발달 &nbsp; `#35` 허즈버그 2요인 &nbsp; `#36` 커크패트릭 4단계 &nbsp; `#37` 직원 여정 지도 &nbsp; `#38` GROW 코칭 &nbsp; `#64` 매슬로 욕구단계

### 변화관리 (3)
`#56` 코터 8단계 &nbsp; `#57` ADKAR &nbsp; `#58` 르윈 3단계

### 프로젝트 관리 (3)
`#59` 간트 차트 &nbsp; `#60` 크리티컬 패스 &nbsp; `#61` 스크럼

### 프로세스 분석 (10)
`#24` 프로세스 분해 &nbsp; `#27` SIPOC &nbsp; `#25` RACI &nbsp; `#39` DMAIC &nbsp; `#40` 린 7대 낭비 &nbsp; `#41` VSM &nbsp; `#42` PDCA &nbsp; `#43` 5S &nbsp; `#44` 칸반 &nbsp; `#45` 제약 이론(TOC)

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
