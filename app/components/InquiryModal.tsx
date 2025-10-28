"use client";

import { useState } from "react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("문의가 접수되었습니다. 감사합니다!");
    setFormData({ name: "", email: "", message: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-sub rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-paper text-text">
            문의하기
          </h2>
          <button
            onClick={onClose}
            className="text-text/70 hover:text-text transition-colors"
            aria-label="닫기"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-text/70 font-paper mb-6">
          버그 신고 및 개선 사항을 자유롭게 남겨주세요
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-text font-paper mb-2 text-sm md:text-base"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-4 py-2 md:py-3 rounded-xl bg-bg text-text font-paper border-2 border-text/20 focus:border-accent outline-none transition-colors"
              placeholder="이름을 입력하세요"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-text font-paper mb-2 text-sm md:text-base"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-2 md:py-3 rounded-xl bg-bg text-text font-paper border-2 border-text/20 focus:border-accent outline-none transition-colors"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-text font-paper mb-2 text-sm md:text-base"
            >
              문의 내용
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              rows={5}
              className="w-full px-4 py-2 md:py-3 rounded-xl bg-bg text-text font-paper border-2 border-text/20 focus:border-accent outline-none transition-colors resize-none"
              placeholder="문의 내용을 입력하세요"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 md:py-3 rounded-xl bg-bg text-text font-paper border-2 border-text/20 hover:border-text/40 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-2 md:py-3 rounded-xl bg-accent text-bg font-paper hover:bg-accent/90 transition-colors"
            >
              제출하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
