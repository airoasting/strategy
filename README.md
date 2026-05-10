# 전략 프레임워크 — 갤러리 웹사이트 + 추천 스킬

컨설팅에서 가장 많이 쓰이는 16개 전략 사고 도구를 5개 카테고리로 정리한 프로젝트.

- **`web/`** — 카드 갤러리 + 모달 상세 (정적 HTML/CSS/JS)
- **`skill/strategy-framework/`** — 자연어 입력으로 최적 프레임워크를 추천하는 Claude Code 스킬
- **공통 데이터** — `web/data/frameworks.json` (웹) / `skill/strategy-framework/references/frameworks.md` (스킬)

---

## 1. 갤러리 웹사이트

### 실행 방법

`fetch()`로 JSON을 읽으므로 로컬 파일 직접 열기로는 동작이 막힐 수 있습니다. 간이 서버로 띄우세요.

```bash
cd web
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 열기
```

또는 Node가 있으면:

```bash
cd web
npx serve .
```

### 기능

- 카드 갤러리 (반응형, 데스크톱 3~4열 / 모바일 1열)
- 카테고리 필터 칩 + 검색바
- 카드 클릭 → 모달에서 상세 (개요·언제·구성·절차·예시·한계·관련 도구)
- 관련 도구 칩 클릭 시 즉시 다른 모달로 전환

### 배포

`web/` 폴더 그대로 정적 호스팅에 올리면 됩니다 (GitHub Pages, Vercel, Netlify, S3 등).

---

## 2. 추천 스킬

### 설치

Claude Code 사용자라면 `skill/strategy-framework/`를 개인 스킬 폴더로 복사 또는 심볼릭 링크.

```bash
# 심볼릭 링크 (권장 — 원본을 수정해도 자동 반영)
ln -s "$(pwd)/skill/strategy-framework" ~/.claude/skills/strategy-framework

# 또는 복사
cp -r skill/strategy-framework ~/.claude/skills/
```

### 사용

자연어로 상황을 설명하면 16개 중 1순위를 골라 적용 단계까지 안내합니다.

```
사용자: 신사업 검토 중인데 어떤 프레임워크부터 쓸지 모르겠어
스킬: 추천: 3C 분석 (#4) — 이유 + 적용 단계 + 한계 + 대안
```

```
사용자: 우리 팀 책임이 자꾸 모호해서 일이 막혀
스킬: 추천: RACI 차트 (#16) — ...
```

명확하지 않을 땐 핵심 질문 1개를 먼저 던집니다.

### 트리거 표현

- "프레임워크 추천 / 골라줘"
- "전략 도구 / 분석 도구 어떤 거"
- "사업 진단 어떻게"
- "신사업 검토", "마케팅·조직·프로세스 분석"
- `/strategy-framework`

---

## 3. 16개 프레임워크

### 비즈니스 모델·수익 구조 분석
1. 임팩트 비즈니스 모델 캔버스
2. 이익 방정식
3. 비즈니스 모델 (수익 모델)

### 시장·경쟁 분석
4. 3C 분석
5. SWOT 분석
6. 5 Forces 분석
7. PEST(EL) 분석

### 마케팅 전략
8. 4P (마케팅 믹스)
9. STP 분석
10. Customer Journey Map

### 조직·내부역량 분석
11. 가치 사슬 분석
12. 맥킨지 7S 분석
13. 역량 성숙도 평가

### 프로세스 분석
14. 프로세스 분해
15. SIPOC 분석
16. RACI 차트

---

## 4. 폴더 구조

```
.
├── README.md
├── web/
│   ├── index.html
│   ├── css/style.css
│   ├── js/app.js
│   └── data/frameworks.json
└── skill/
    └── strategy-framework/
        ├── SKILL.md
        └── references/
            ├── frameworks.md
            └── decision-tree.md
```
