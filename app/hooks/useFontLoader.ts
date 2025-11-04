import { useState, useEffect } from "react";

interface UseFontLoaderResult {
  fontFamily: string | null;
  fontLoaded: boolean;
  fontError: boolean;
}

/**
 * TTF 폰트를 동적으로 로드하는 커스텀 훅
 * @param ttfUrl 폰트 파일 URL
 * @param fontName 폰트 패밀리 이름
 */
export function useFontLoader(
  ttfUrl: string | undefined,
  fontName: string
): UseFontLoaderResult {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontError, setFontError] = useState(false);
  const [fontFamily, setFontFamily] = useState<string | null>(null);

  useEffect(() => {
    if (!ttfUrl) {
      setFontError(true);
      return;
    }

    // 프록시를 통해 폰트 로드 (CORS 우회)
    const proxiedFontUrl = `/api/proxy-image?url=${encodeURIComponent(ttfUrl)}`;
    const fontFace = new FontFace(fontName, `url(${proxiedFontUrl})`);

    fontFace
      .load()
      .then((loadedFace) => {
        document.fonts.add(loadedFace);
        setFontFamily(fontName);
        setFontLoaded(true);
        setFontError(false);
      })
      .catch((error) => {
        console.error("Font loading failed:", error);
        setFontLoaded(false);
        setFontError(true);
      });

    return () => {
      // 컴포넌트 언마운트 시 폰트 제거
      document.fonts.forEach((font) => {
        if (font.family === fontName) {
          document.fonts.delete(font);
        }
      });
    };
  }, [ttfUrl, fontName]);

  return { fontFamily, fontLoaded, fontError };
}
