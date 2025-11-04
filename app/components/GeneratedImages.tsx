"use client";

import { useState } from "react";
import Image from "next/image";

interface GeneratedImagesProps {
  images: Array<{ id: string; filePath: string }>;
}

export default function GeneratedImages({ images }: GeneratedImagesProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (imageId: string) => {
    setImageErrors((prev) => new Set(prev).add(imageId));
  };

  if (images.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-text">AI가 생성한 이미지</span>
        <span className="text-xs text-gray-500">총 {images.length}장</span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {images.map((img) => {
          if (imageErrors.has(img.id)) {
            return (
              <div
                key={img.id}
                className="relative rounded-md overflow-hidden border border-gray-200 bg-gray-100 aspect-square flex items-center justify-center"
                title="이미지 로드 실패"
              >
                <span className="text-xs text-gray-400">로드 실패</span>
              </div>
            );
          }

          return (
            <div
              key={img.id}
              className="relative group rounded-md overflow-hidden border border-gray-200 bg-white"
              title={img.id}
            >
              <Image
                src={img.filePath}
                alt={img.id}
                width={100}
                height={100}
                className="w-full aspect-square object-contain transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
                onError={() => handleImageError(img.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
