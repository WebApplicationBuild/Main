import { useState } from "react";
import { noticeBanners } from "../../api/mockData";
import "../../styles/main/NoticeCarousel.css";

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

    const cur = noticeBanners[index];

    return (
        <div className="notice-carousel">
            <div className="notice-carousel__leaf" aria-hidden="true">🌿</div>

            <div className="notice-carousel__sub">📢 공지 · {index + 1} / {total}</div>
            <div className="notice-carousel__title">{cur.title}</div>
            <div className="notice-carousel__desc">{cur.desc}</div>

            <div className="notice-carousel__controls">
                <button
                    type="button"
                    className="notice-carousel__button"
                    onClick={handlePrev}
                    aria-label="이전 공지"
                >◀ 이전</button>

                <button
                    type="button"
                    className="notice-carousel__button"
                    onClick={handleNext}
                    aria-label="다음 공지"
                >다음 ▶</button>

                <div className="notice-carousel__dots">
                    {noticeBanners.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            className={`notice-carousel__dot${i === index ? ' notice-carousel__dot--active' : ''}`}
                            onClick={() => setIndex(i)}
                            aria-label={`${i + 1}번 공지`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
