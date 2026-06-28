# CLAUDE.md — 전략 프레임워크 갤러리

이 폴더(`20260613_전략 프레임워크`, AI ROASTING 전략 도구 갤러리)에서 작업할 때 따르는 규칙이다. 상위 `../CLAUDE.md`의 작업 원칙과 문체를 기본으로 따르고, 아래는 이 프로젝트 고유 규칙이다. 규칙이 어긋나면 이 문서를 우선한다.

## 콘텐츠·카피 (한국어)

- **em dash(—) 절대 금지.** 문장 연결은 마침표·쉼표로, 라벨 구분은 가운뎃점(·)이나 괄호로 처리한다.
- 자연스러운 한국어로 쓴다. 번역투·기계적 병렬을 피한다.
- 주술 구조를 맞춘다. 예: "시장을 자리잡았습니다"(X) → "시장을 구축했습니다"(O).
- 프로페셔널한 톤. 사실·숫자·고유명사는 정본(`data/frameworks.js`)을 따르고 지어내지 않는다.

## 비주얼·UI — Pastel Card 디자인 시스템

이 갤러리는 **Pastel Card** 디자인이다(2026-06-28 리스킨). 시그니처: 본(bone) 배경 + 검정 2px 윤곽 캡슐 + 파스텔 채움 + Bodoni 디스플레이 + 그레인 질감.

### 토큰 (불변)
- 색: 배경 `--canvas #F5F5F0`(본 톤), 잉크/윤곽 `--ink/--outline #1A1A1A·#1E1E1E`, 액센트 `--primary #E85D4E`(coral). 8 파스텔 캡슐 색 `--coral/--lime/--lavender/--sky/--violet/--yellow/--peach/--mint`. 새 hex 도입 금지, 이 팔레트 안에서만.
- 폰트: `--display`와 `--sans` **둘 다 `'Bodoni Moda', 'Pretendard', …` 순서**다. 즉 **모든 라틴(영어·숫자)은 Bodoni Moda, 한글은 Pretendard로 폴백**된다. 영어가 헤딩이든 본문이든 viz 라벨이든 전부 Bodoni로 통일(2026-06-28). 영어를 Pretendard 산세리프로 따로 빼지 않는다.
- 숫자도 위 규칙으로 자동 Bodoni다(카드 번호·칩 카운트·섹션/푸터 카운트·모달 번호 pill). 모노·산세리프 숫자 혼용 금지.

### 데코 어휘
- 캡슐: `border-radius: 9999px` + `border: 2px solid var(--outline)`(검정 2px가 시그니처). 칩·버튼·검색창·번호 배지에 적용.
- 카드: 흰 fill + 검정 2px + `border-radius: 22px` + 하드 오프셋 그림자(`0 4px 0 rgba(26,26,26,0.10)`, hover 더 깊게).
- 그레인 오버레이: `.grain-overlay` fractal noise SVG, opacity 0.045, multiply. 유지한다.
- 미세 회전: 데코 캡슐에 살짝(예: 히어로 eyebrow `rotate(-3deg)`).
- **색은 캡슐 전체 fill로 쓴다.** 카테고리 색은 `--cat-*`(파스텔 매핑)로 칩·카드 번호 배지·모달 카테고리 pill을 채운다. 단, **얇은 좌측 스트라이프·점(left color band)은 쓰지 않는다.** (예시 박스 좌측 보더도 없음.) 색은 면(fill)으로, 줄(stripe)로는 안 쓴다.

### 레이아웃·컴포넌트
- **단어 중간 잘림 금지.** `body { word-break: keep-all }`.
- 콘텐츠 폭 `.container { max-width: 1340px }`.
- 필터 칩: `.filter-chips { display: grid; grid-template-columns: repeat(7, 1fr) }`로 7개 칩을 균등 폭으로 콘텐츠 가로에 꽉 채운다. 맨 앞 '전체' 칩(총 개수), 카테고리별 파스텔 fill. 선택 칩은 하드 오프셋 그림자로 떠오르고 **글자는 검정 유지**(흰 글자 금지, 파스텔 위에서 안 보임).
- 서브메뉴 클릭 스크롤 오프셋은 스티키 바 높이를 실측해 동적 계산(섹션 경계선이 바 밑으로 숨도록 살짝 더 스크롤).
- 모달: `.modal-dialog { width: min(1520px, 96vw) }`, `.m-layout { grid-template-columns: 1.5fr 1fr }`(왼쪽 시각화 60%). viz가 거의 1:1로 렌더돼 글자가 읽힌다(`.m-stage .viz svg { max-height: 640px }`). 상단은 카테고리 파스텔 pill + 번호 코랄 pill(`.m-cat-tag`·`.m-cat-num`).
- **viz 팔레트도 Pastel Card로 remap**됨: `js/visualizations.js` 상단 색 상수(INK·PAPER·PRIMARY=coral·AMBER=yellow·TEAL=mint·PRIMARY_SOFT=peach 등). viz 추가 시 이 상수를 그대로 쓰면 톤이 맞는다. viz 라벨이 곡선·도형과 겹치지 않게 빈 공간에 배치한다.
- **다크 모드 없음.** 테마 토글·`[data-theme="dark"]` 모두 제거됨. 다시 넣지 않는다.

### 브랜드·푸터
- 로고 텍스트: `STRATEGY FRAMEWORKS | AI ROASTING`. **모바일에서는 `.brand-secondary`(| AI ROASTING)를 숨겨 `STRATEGY FRAMEWORKS`만 한 줄로** 보인다.
- 나브 우상단은 GitHub 아이콘(옥토캣, 화살표 없음, 36px 원형) 링크.
- 푸터 맨 하단: 좌측 저작권(`© 2026 AI ROASTING. ALL RIGHTS RESERVED.`), 우측 이름·소셜 아이콘, 글자 흰색. 소셜: LinkedIn `linkedin.com/in/jayden-kang`, Facebook `facebook.com/jayden.kang`.
- 페이지 제목 `전략 도구 | AI ROASTING`, 파비콘 `assets/logo.png`.

### 모바일
- 데스크톱 필터 바는 숨고(`.filters { display:none }`) 햄버거 메뉴 사용. 카드는 480px 이하 1열. 모달은 세로 스택(viz 위, 텍스트 아래 스크롤). 760px 폭 다이어그램은 모바일에서 화면 폭에 맞춰 작아진다(한계).

## 데이터 구조 (SSOT)

- 프레임워크의 SSOT는 `data/frameworks.js`다. 기본 갤러리는 카테고리 그룹으로 렌더하므로 id가 표시 순서와 무관하다. 프레임워크를 추가할 때는 **끝번호(append-only)**로 id를 부여하고 객체를 해당 카테고리 블록 끝에 넣는다. 기존 1~N의 id·related 재배열은 하지 않는다.
- 카테고리 표시명은 `categories[].name` 한 곳이 UI 전체(칩·헤딩·카드·모달)의 SSOT다. 스킬 문서·README 헤더는 별도로 동기화한다.
- 프레임워크·카테고리를 추가하거나 바꾸면 다음을 함께 손본다: `data/frameworks.js`, `js/visualizations.js`(vizType별 thumb/full 쌍 + REG 등록), `strategy/`(SKILL.md·references 2종, `/strategy` 추천 스킬), 카운트 하드코딩(`index.html` 푸터 `.footer-count`, `README.md`, `strategy/references/frameworks.md` 인트로).

## 검증

- `node --check`로 JS 문법을 확인하고, window 스텁으로 전 프레임워크의 `VIZ.thumb`/`VIZ.full`을 호출해 undefined·NaN이 없는지 확인한다.
- 로컬 미리보기는 `.claude/launch.json`의 `frameworks-web`(http-server, 포트 8902).
