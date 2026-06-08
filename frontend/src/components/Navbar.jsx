import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, isAdmin, isExaminer, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🧠 RecruitAI
      </Link>
      <div className="navbar-links">
        <Link to="/">Oferty pracy</Link>

        {/* Panel admina/HR widoczny dla adminów i examinerów */}
        {(isAdmin || isExaminer) && (
          <Link to="/admin" className="navbar-admin-link">
            ⚙️ Panel HR
          </Link>
        )}

        {user && (
          <span className="navbar-user">
            <Link to="/my-applications" className="navbar-admin-link">
            Moje aplikacje
            </Link>
            👤 {user.name}
            <button className="navbar-logout" onClick={logout}>Wyloguj</button>
          </span>
        )}
      </div>
    </nav>
  );
}
