import NoticeCarousel from "../components/MainPage/NoticeCarousel";
import Profile from "../components/MainPage/Profile";
import RecentProjects from "../components/MainPage/RecentProjects";
import MyProjects from "../components/MainPage/MyProjects";
import "../styles/MainPage.css";

export default function MainPage() {
    return (
        <div className="main-page">
            <header className="main-page__header">
                <div className="main-page__logo">로고</div>
                <h1 className="main-page__title">메인 페이지</h1>
                <div className="main-page__header-spacer" />
            </header>

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
