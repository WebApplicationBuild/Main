import { useEffect } from "react";
import NoticeCarousel from "../components/MainPage/NoticeCarousel";
import Profile from "../components/MainPage/Profile";
import RecentProjects from "../components/MainPage/RecentProjects";
import MyProjects from "../components/MainPage/MyProjects";
import PageHeader from "../components/PageHeader";
import "../styles/main/MainPage.css";

export default function MainPage() {
    useEffect(() => {
        document.title = "TeaMo";
    }, []);

    return (
        <div className="main-page">
            <PageHeader title="메인 페이지" />

            <main className="main-page__grid">
                <section className="main-page__cell main-page__cell--notice">
                    <NoticeCarousel />
                </section>

                <section className="main-page__cell main-page__cell--profile">
                    <Profile />
                </section>

                <section className="main-page__cell main-page__cell--recent">
                    <RecentProjects />
                </section>

                <section className="main-page__cell main-page__cell--my">
                    <MyProjects />
                </section>
            </main>
        </div>
    );
}
