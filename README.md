<div align="center">

# MonoGlyph - FE

<img src="https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
<img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind"/>

### AI 기반 한글 폰트 자동 생성 서비스

**한이음 드림업 참가작**

[AI 모델 Repository](https://github.com/sheepright/MonoGlyph) | [Frontend Repository](https://github.com/JEONJOOHYUN/MonoGlyph_FrontEnd)

</div>

---

## 📌 프로젝트 소개

**MonoGlyph**는 LLM과 GAN 기반의 딥러닝 기술을 활용하여 **손글씨 없이도** 원하는 스타일의 한글 폰트를 자동으로 생성하는 웹 서비스입니다.

### 🎯 해결하고자 하는 문제

- **시간과 비용 부담**: 한글 11,172자를 모두 제작하는 막대한 작업량
- **저작권 문제**: 무단 사용으로 인한 법적 리스크
- **전문 기술 필요**: 폰트 제작 도구 사용의 높은 진입장벽

### 💡 솔루션

AI 기술을 활용해 이러한 문제를 해결하고, **신속하고 저렴하며 창의적인** 폰트 제작 환경을 제공합니다.

---

## ✨ 주요 기능

- 🤖 **AI 기반 폰트 생성** - 텍스트 설명만으로 폰트 자동 생성
- ⚡ **실시간 진행 상황** - SSE를 통한 실시간 진행률 확인
- 📥 **간편한 다운로드** - TTF 형식으로 즉시 다운로드
- 🎨 **직관적인 UI** - 모던하고 사용하기 쉬운 인터페이스
- 📱 **반응형 디자인** - PC와 모바일 모두 지원

---

## 🚀 시작하기

### 필수 요구사항

- Node.js 20.x 이상
- npm, yarn, pnpm 또는 bun

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/JEONJOOHYUN/MonoGlyph_FrontEnd.git
cd MonoGlyph_FrontEnd

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

---

## 🎯 사용 방법

### 1. 폰트 스타일 입력

원하는 폰트 스타일을 자유롭게 텍스트로 입력합니다.

**예시:**

- "MMORPG에서 사용할 중세시대 느낌의 글씨체 폰트"
- "귀여운 손글씨 느낌의 둥근 폰트"
- "모던하고 깔끔한 고딕 계열 폰트"

💡 **팁:** 구체적으로 작성할수록 더 정확한 결과를 얻을 수 있습니다!

### 2. 생성 과정 확인

실시간으로 진행률과 현재 상태를 확인할 수 있습니다.

- 평균 소요 시간: **8~10분**

### 3. 폰트 다운로드

생성이 완료되면 TTF 파일을 다운로드할 수 있습니다.

⚠️ **주의:** 현재 Microsoft Word에서는 사용이 제한됩니다. 포토샵, 일러스트레이터 등 다른 디자인 프로그램에서 사용 가능합니다.

---

## 🏗️ 프로젝트 구조

```
MonoGlyph_FrontEnd/
├── app/
│   ├── api/
│   │   └── MonoGlyphAPI.ts      # API 통신 로직
│   ├── components/
│   │   ├── HomeView.tsx          # 메인 화면
│   │   ├── LoadingView.tsx       # 로딩 화면
│   │   ├── Sidebar.tsx           # 사이드바
│   │   └── InquiryModal.tsx      # 문의 모달
│   ├── guide/
│   │   └── page.tsx              # 가이드 페이지
│   ├── introduction/
│   │   └── page.tsx              # 프로젝트 소개 페이지
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # 레이아웃
│   └── page.tsx                  # 메인 페이지
├── public/                       # 정적 파일
├── tailwind.config.ts            # Tailwind 설정
├── tsconfig.json                 # TypeScript 설정
└── package.json                  # 프로젝트 설정
```

---

## 🛠️ 기술 스택

### Frontend

- **Framework:** Next.js 15.4.6 (App Router)
- **Language:** TypeScript 5.x
- **UI Library:** React 19.1.0
- **Styling:** Tailwind CSS 4.0
- **HTTP Client:** Axios 1.13.0
- **Icons:** React Icons 5.5.0

### 주요 기능

- **SSE (Server-Sent Events)** - 실시간 진행 상황 업데이트
- **Responsive Design** - 모바일/태블릿/데스크톱 지원
- **Modern UI/UX** - 애니메이션과 인터랙티브 요소

---

## 🔗 프로젝트 구성

MonoGlyph는 Frontend와 AI 모델로 구성되어 있습니다.

| Repository                                                    | 설명                         | 기술 스택                                |
| ------------------------------------------------------------- | ---------------------------- | ---------------------------------------- |
| [Frontend](https://github.com/JEONJOOHYUN/MonoGlyph_FrontEnd) | 웹 인터페이스 및 사용자 경험 | Next.js, React, TypeScript, Tailwind CSS |
| [AI Model](https://github.com/sheepright/MonoGlyph)           | 폰트 생성 AI 모델            | Python, PyTorch, LLM, GAN                |

### 🔄 시스템 아키텍처

```
사용자 입력 (텍스트 설명)
    ↓
Frontend (Next.js)
    ↓
API 통신 (SSE)
    ↓
AI 모델 (LLM + GAN)
    ↓
폰트 생성 및 다운로드
```

---

## 🔧 개발 환경 설정

### Frontend 설정

```bash
# 환경 변수 설정 (필요시)
# .env.local 파일 생성
NEXT_PUBLIC_API_URL=your_api_url
```

### AI 모델 연동

AI 모델 서버가 실행 중이어야 합니다. 자세한 내용은 [AI Repository](https://github.com/sheepright/MonoGlyph)를 참고하세요.

---

## 👥 팀 소개

**한이음 드림업 참가팀**

이 프로젝트는 한이음 ICT 멘토링 프로그램의 일환으로 진행되었습니다.

## 📧 문의

프로젝트에 대한 문의사항이나 버그 리포트는 각 Repository의 Issues 탭을 이용해주세요.

- Frontend 관련: [Frontend Issues](https://github.com/JEONJOOHYUN/MonoGlyph_FrontEnd/issues)
- AI 모델 관련: [AI Model Issues](https://github.com/sheepright/MonoGlyph/issues)

</div>
