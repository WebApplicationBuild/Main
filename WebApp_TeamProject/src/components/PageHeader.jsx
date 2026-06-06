import { useNavigate } from 'react-router-dom';
import NavDropdown from './NavDropdown';
import '../styles/common/PageHeader.css';

export default function PageHeader({ title }) {
    const navigate = useNavigate();
    return (
        <header className="page-header">
            <div className="page-header__inner">
                <button
                    type="button"
                    className="page-header__logo"
                    onClick={() => navigate('/')}
                    aria-label="TEAMO 홈으로"
                >
                    <img src="/teamo-logo-cream.png" alt="TEAMO" className="header-logo-img" />
                </button>
                <h1 className="page-header__title">{title}</h1>
                <div className="page-header__nav"><NavDropdown /></div>
            </div>
        </header>
    );
}
