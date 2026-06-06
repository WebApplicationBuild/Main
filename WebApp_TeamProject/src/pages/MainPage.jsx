import { useEffect } from "react";
import NoticeCarousel from "../components/MainPage/NoticeCarousel";
import Profile from "../components/MainPage/Profile";
import RecentProjects from "../components/MainPage/RecentProjects";
import MyProjects from "../components/MainPage/MyProjects";
import "../styles/main/MainPage.css";

export default function MainPage() {
    useEffect(() => {
        document.title = "TeaMo";
    }, []);

    return (
        <div className="main-page">
            <main className="main-page__layout">
                <div className="main-page__notice">
                    <NoticeCarousel />
                </div>
                <div className="main-page__profile">
                    <Profile />
                </div>
                <div className="main-page__recent">
                    <RecentProjects />
                </div>
                <div className="main-page__my">
                    <MyProjects />
                </div>
            </main>
        </div>
    );
}
