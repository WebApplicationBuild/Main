import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoticeCarousel from "../components/MainPage/NoticeCarousel";
import Profile from "../components/MainPage/Profile";
import RecentProjects from "../components/MainPage/RecentProjects";
import MyProjects from "../components/MainPage/MyProjects";
import NavDropdown from "../components/NavDropdown";
import "../styles/main/MainPage.css";

export default function MainPage() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "TeaMo";
    }, []);

    return (
        <div className="main-page">
            <header className="main-page__header">
                <button
                    type="button"
                    className="main-page__logo"
                    onClick={() => navigate('/')}
                    aria-label="TEAMO 홈으로"
                >
                    <img src="/teamo-logo.png" alt="TEAMO" className="header-logo-img" />
                </button>
                <h1 className="main-page__title">메인 페이지</h1>
                <div className="main-page__header-spacer"><NavDropdown /></div>
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
