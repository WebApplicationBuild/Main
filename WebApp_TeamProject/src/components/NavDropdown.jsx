import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/common/NavDropdown.css";

const NAV_ITEMS = [
    { label: '홈',          path: '/' },
    { label: '매칭',        path: '/matching' },
    { label: '프로젝트 관리', path: '/projectManage' },
];

function PageDropdown() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="page-nav">
            {NAV_ITEMS.map(({ label, path }) => {
                const isActive = location.pathname === path ||
                    (path !== '/' && location.pathname.startsWith(path));
                return (
                    <button
                        key={path}
                        className={`page-nav__btn${isActive ? ' page-nav__btn--active' : ''}`}
                        onClick={() => navigate(path)}
                    >
                        {label}
                    </button>
                );
            })}
        </nav>
    );
}

export default PageDropdown;
