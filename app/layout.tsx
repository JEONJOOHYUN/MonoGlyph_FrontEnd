import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MonoGlyph",
  description: "폰트 생성 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
