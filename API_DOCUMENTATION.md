# Font Generation API Documentation

## 개요

이 프로젝트는 axios를 사용하여 폰트 생성 API와 통신하는 구조로 분리되어 있습니다.

## 파일 구조

```
app/
├── services/
│   └── fontApi.ts          # API 통신 로직
├── hooks/
│   └── useFontGeneration.ts # 폰트 생성 상태 관리 훅
├── api/
│   └── font/
│       ├── generate/route.ts    # 폰트 생성 시작 API
│       ├── status/[id]/route.ts # 폰트 생성 상태 확인 API
│       └── download/[id]/route.ts # 폰트 다운로드 API
└── (desktop)/
    └── page.tsx            # 메인 컴포넌트
```

## API 서비스 (`app/services/fontApi.ts`)

### 주요 함수들

- `startFontGeneration(request)`: 폰트 생성 시작
- `checkFontGenerationStatus(id)`: 생성 상태 확인
- `downloadFont(id)`: 폰트 파일 다운로드
- `getFontPreview(id, text)`: 폰트 미리보기 이미지

### 사용 예시

```typescript
import { startFontGeneration } from "../services/fontApi";

const response = await startFontGeneration({
  prompt: "손글씨 같은 산세리프, 굵게",
  options: {
    format: "ttf",
    size: "medium",
  },
});
```

## 커스텀 훅 (`app/hooks/useFontGeneration.ts`)

폰트 생성 과정을 관리하는 React 훅입니다.

### 반환값

- `isLoading`: 생성 중 여부
- `progress`: 진행률 (0-100)
- `message`: 현재 상태 메시지
- `error`: 에러 메시지
- `downloadUrl`: 다운로드 URL
- `generateFont(request)`: 폰트 생성 시작 함수
- `downloadGeneratedFont()`: 폰트 다운로드 함수
- `reset()`: 상태 초기화 함수

### 사용 예시

```typescript
import { useFontGeneration } from "../hooks/useFontGeneration";

function MyComponent() {
  const { isLoading, progress, message, generateFont, downloadGeneratedFont } =
    useFontGeneration();

  const handleGenerate = async () => {
    await generateFont({
      prompt: "사용자 입력 프롬프트",
      options: { format: "ttf" },
    });
  };

  return (
    <div>
      {isLoading && (
        <p>
          {message} ({progress}%)
        </p>
      )}
      <button onClick={handleGenerate}>폰트 생성</button>
      <button onClick={downloadGeneratedFont}>다운로드</button>
    </div>
  );
}
```

## API 엔드포인트

### POST `/api/font/generate`

폰트 생성을 시작합니다.

**요청 본문:**

```json
{
  "prompt": "손글씨 같은 산세리프, 굵게",
  "style": "sans-serif",
  "weight": "bold",
  "options": {
    "format": "ttf",
    "size": "medium"
  }
}
```

**응답:**

```json
{
  "id": "font_1234567890_abc123",
  "status": "pending",
  "progress": 0,
  "message": "폰트 생성 작업이 시작되었습니다."
}
```

### GET `/api/font/status/{id}`

폰트 생성 상태를 확인합니다.

**응답:**

```json
{
  "id": "font_1234567890_abc123",
  "status": "processing",
  "progress": 45,
  "message": "글리프 생성 중",
  "downloadUrl": "/api/font/download/font_1234567890_abc123"
}
```

### GET `/api/font/download/{id}`

생성된 폰트 파일을 다운로드합니다.

**응답:** TTF 파일 바이너리 데이터

## 환경 변수

`.env.local` 파일에 다음 변수를 설정할 수 있습니다:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## 주요 특징

1. **타입 안전성**: TypeScript로 모든 API 인터페이스 정의
2. **에러 처리**: axios 에러를 적절히 처리하여 사용자 친화적 메시지 제공
3. **실시간 상태 업데이트**: 폴링을 통한 실시간 진행률 업데이트
4. **자동 다운로드**: 생성 완료 시 자동 다운로드 기능
5. **호환성**: 기존 커스텀 이벤트 시스템과 호환

## 개발 시 주의사항

1. 실제 폰트 생성 서비스와 연동할 때는 API 엔드포인트를 수정해야 합니다.
2. 현재 API 라우트는 데모용이므로, 실제 폰트 생성 로직을 구현해야 합니다.
3. 프로덕션 환경에서는 적절한 인증 및 권한 검사를 추가해야 합니다.
4. 대용량 폰트 파일 처리를 위한 스트리밍 다운로드를 고려해야 합니다.
