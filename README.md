<div align="center">

# 🎀 Mo Mon

### Live2D Rigging Commission

**모몬의 Live2D 리깅 커미션 페이지입니다.**
쇼케이스 영상, 리깅 디테일, 가격표, 협업 작가, 공지사항을 한 페이지에서 확인할 수 있어요.

<br>

[![Website](https://img.shields.io/badge/🌐_사이트_바로가기-777f9f?style=for-the-badge)](https://h4y4m.github.io/momon-commission/)
[![Status](https://img.shields.io/badge/12월_재오픈_예정-a5abc8?style=for-the-badge)](https://h4y4m.github.io/momon-commission/#notice)

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)

</div>

---

## ✨ 페이지 구성

| 섹션 | 내용 |
| :--- | :--- |
| 🏠 **메인** | 커미션 상태 표시, 올해 작업 수, 누적 작업 수(자동 증가) |
| 🎬 **리깅 쇼케이스** | Premium · Standard · Basic · SD 탭별 YouTube 영상 슬라이드 |
| 🔍 **리깅 디테일** | 얼굴/몸 X·Y·대각선, 헤드셋, 뿔, 마스크 움직임 영상 (클릭하면 확대) |
| 💰 **리깅 타입 및 가격** | 타입별 기본가 + 추가 헤어/의상, 추가 옵션표 |
| 🤝 **협업 일러스트 작가** | 할인 혜택이 있는 협업 작가 목록 (아트머그 링크) |
| 📢 **공지사항** | 작업 순서, 마감, 결제, 거절 기준 등 안내 |

## 🎨 주요 기능

- **🧭 플로팅 네비게이션**: PC(폭 1240px 이상)에서는 오른쪽에 떠 있는 메뉴가 따라오고, 지금 보고 있는 섹션이 자동으로 강조돼요.
- **📱 반응형 디자인**: 휴대폰에서는 메뉴가 상단 헤더로, 가격표는 2칸으로, 추가 옵션은 1줄에 1개로 바뀌어요.
- **🎞️ 영상 슬라이드**: 좌우 화살표, 점, 썸네일, 휴대폰 스와이프, 키보드 ← → 로 넘길 수 있어요.
- **⚡ 가벼운 로딩**: 리깅 디테일 영상은 화면에 보일 때만 불러오고 재생해요.
- **🔢 자동 카운터**: 작업 수가 10일마다 1씩 자동으로 올라가요.
- **📄 파일 하나로 끝**: 외부 라이브러리 없이 `index.html` 하나로 동작해요.

---

## 📁 폴더 구조

```
momon-commission/
├── index.html              # 페이지 전체 (디자인 + 내용 + 동작)
├── README.md
└── assets/
    ├── face-x.mp4          # 리깅 디테일 영상 9개
    ├── face-y.mp4
    ├── face-diagonal.mp4
    ├── body-x.mp4
    ├── body-y.mp4
    ├── body-diagonal.mp4
    ├── headset.mp4
    ├── horns.mp4
    ├── mask.mp4
    └── partner-{아트머그번호}.jpg   # 협업 작가 대표 이미지
```

---

## 🛠️ 내용 수정하는 방법

화면에 나오는 대부분의 내용은 `index.html` 아래쪽 `<script>` 안의 **목록**을 보고 자동으로 그려져요.
GitHub에서 `index.html` → ✏️ 연필 아이콘을 누르고 **Ctrl+F**로 아래 이름을 검색하면 바로 찾을 수 있어요.

> 💡 가격은 **숫자만** 적어 주세요. 쉼표(`,`)와 `원`은 자동으로 붙어요. (`1100000` → `1,100,000원`)

### 💰 가격 · 쇼케이스 영상 — `const plans`

```js
{en:"Premium", kr:"프리미엄", base:1100000, hair:200000, cloth:300000, videos:["fuQw1P9aAQ4", ...]}
```

| 항목 | 의미 |
| :--- | :--- |
| `base` | 기본 가격 |
| `hair` / `cloth` | 추가 헤어 / 추가 의상 가격 (`0`이면 표시 안 함) |
| `videos` | YouTube 영상 ID 목록 (주소 `youtube.com/watch?v=` 뒤의 글자) |

### ➕ 추가 옵션 — `const extras`

```js
["추가 표정 파츠", 10000],
```

새 옵션을 넣으려면 `["옵션 이름", 가격],` 한 줄을 추가하면 돼요.

### 🤝 협업 작가 — `const partners`

```js
["하리", 40270, "일러스트 5만원 + 리깅 5만원 할인"],
```

| 순서 | 의미 |
| :--- | :--- |
| 1 | 작가 이름 |
| 2 | 아트머그 작가 번호 (링크 주소의 `uid=` 뒤 숫자) |
| 3 | 할인 혜택 문구 |

대표 이미지는 `assets/partner-{작가번호}.jpg` 이름으로 올리면 자동으로 표시돼요. 이미지가 없으면 이름 글자가 대신 보여요.

### 🔍 리깅 디테일 영상 — `const samples`

```js
["face-x.mp4", "얼굴 X"],
```

`assets` 폴더에 영상을 올리고 `["파일 이름", "제목"],`을 추가하면 돼요.

### 🔢 작업 수 카운터

맨 아래 두 번째 `<script>`에 있어요.

| 값 | 의미 |
| :--- | :--- |
| `Date.UTC(2026,10,27)` | 기준 날짜 (월은 0부터 시작해서 `10` = 11월) |
| `210+n` | 누적 작업 수 시작값 |
| `80+n` | 올해 작업 수 시작값 |
| `10*day` | 10일마다 1씩 증가 |

### 📝 그 외

| 바꾸고 싶은 것 | 찾을 곳 |
| :--- | :--- |
| 커미션 상태 (`12월 재오픈 예정`) | `class="status"` |
| 공지사항 문구 | `class="notice-box"` |
| 전체 색상 | 맨 위 `:root{--bg:... --dark:...}` |

---

## 🚀 배포

`main` 브랜치에 커밋하면 **GitHub Pages**가 자동으로 반영해요. 보통 1~2분 걸려요.

👉 **https://h4y4m.github.io/momon-commission/**

## 🧩 다른 사이트에 넣기 (iframe)

```html
<iframe
  src="https://h4y4m.github.io/momon-commission/"
  width="100%"
  height="3650"
  style="display:block;width:100%;border:0;margin:0;padding:0;"
  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
  allowfullscreen>
</iframe>
```

> ⚠️ iframe 안에서는 페이지 전체가 하나의 큰 화면으로 들어가요. 그래서 **플로팅 메뉴와 상단 헤더가 스크롤을 따라오지 않아요.**
> 내용을 바꿔서 페이지 길이가 달라지면 `height` 값도 맞춰 주세요. (아래에 빈 공간이 생기면 줄이고, 잘리면 늘리기)

---

<div align="center">

**Mo Mon · Live2D Rigging Commission**

<sub>결제 전 반드시 먼저 문의해 주세요 💌</sub>

</div>
