import { useState } from "react";
import { noticeBanners } from "../../api/mockData";
import "../../styles/NoticeCarousel.css";

/*
   캐러셀(슬라이드 쇼).

   - 현재 인덱스만 state로 관리.
   - 다음:  (index + 1) % length          → 마지막에서 0으로 순환
   - 이전:  (index - 1 + length) % length → 음수 방지
 */
export default function NoticeCarousel() {
    const [index, setIndex] = useState(0);
    const total = noticeBanners.length;

    const handleNext = () => setIndex((prev) => (prev + 1) % total);
    const handlePrev = () => setIndex((prev) => (prev - 1 + total) % total);

    const current = noticeBanners[index];

    return (
        <div className="notice-carousel">
            <h2 className="notice-carousel__heading">공지 / 홍보</h2>

            <div
                className="notice-carousel__slide"
                style={{ backgroundColor: current.bgColor }}
            >
                {/* 실제로는 <img src={current.imageUrl} />로 대체해야함.
                    지금은 색상 배경 + 텍스트로 UI를 먼저 만듦. */}
                <span className="notice-carousel__slide-text">
                    {current.title}
                </span>
            </div>

            <div className="notice-carousel__controls">
                <button
                    type="button"
                    className="notice-carousel__button"
                    onClick={handlePrev}
                    aria-label="이전 공지"
                >
                    ◀ 이전
                </button>

                <span className="notice-carousel__indicator">
                    {index + 1} / {total}
                </span>

                <button
                    type="button"
                    className="notice-carousel__button"
                    onClick={handleNext}
                    aria-label="다음 공지"
                >
                    다음 ▶
                </button>
            </div>
        </div>
    );
}
