// src/pages/AdminPage.jsx
// Panel HR - widoczny dla użytkowników z rolą "Admin" lub "Examiner"

import { useState, useEffect } from "react";
import { API_BASE } from "../data/jobs";
import { useAuth } from "../context/AuthContext";
import "./AdminPage.css";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMsg, setActionMsg] = useState("");

  const fetchGroups = () => {
    return fetch(`${API_BASE}/api/Application/GetGroupedApplications`, {
      credentials: "include"
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(setGroups)
      .catch(() => setError("Nie można pobrać aplikacji."));
  };

  useEffect(() => {
    fetchGroups().finally(() => setLoading(false));
  }, []);

  const handleAccept = async (appId) => {
    await fetch(`${API_BASE}/api/Application/AcceptApp?id=${appId}`, {
      method: "PUT",
      credentials: "include"
    });
    setActionMsg("✅ Aplikacja zaakceptowana!");
    fetchGroups();
  };

  const handleReject = async (appId) => {
    await fetch(`${API_BASE}/api/Application/RejectApp?id=${appId}`, {
      method: "PUT",
      credentials: "include"
    });
    setActionMsg("❌ Aplikacja odrzucona.");
    fetchGroups();
  };

  const getStatusBadge = (status) => {
    const map = {
      pending:    { label: "Oczekuje",      color: "#f59e0b" },
      accepted:   { label: "Zaakceptowana", color: "#22c55e" },
      rejected:   { label: "Odrzucona",     color: "#ef4444" },
      evaluated:  { label: "Oceniona",      color: "#4f46e5" },
    };
    const key = status?.toLowerCase();
    const s = map[key] || { label: status || "?", color: "#aaa" };
    return (
      <span className="status-badge" style={{ background: s.color }}>
        {s.label}
      </span>
    );
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Panel HR / Admin</h1>
          <p>Zalogowany jako: <strong>{user?.name} {user?.surname}</strong> · {user?.email}</p>
        </div>
        <button className="btn-logout" onClick={logout}>Wyloguj</button>
      </div>

      {actionMsg && (
        <div className="action-msg" onClick={() => setActionMsg("")}>
          {actionMsg} <span style={{ fontSize: "0.8rem", color: "#999" }}>(kliknij aby ukryć)</span>
        </div>
      )}

      {loading && <p className="loading-text">⏳ Ładowanie aplikacji...</p>}
      {error && <p className="error-text">⚠️ {error}</p>}

      {!loading && !error && groups.length === 0 && (
        <p className="empty-text">Brak aplikacji do przejrzenia.</p>
      )}

      {/* Backend kolegi grupuje po jobOfferTitle (string), nie jobOfferId */}
      {groups.map((group) => (
        <div key={group.jobOfferTitle} className="job-group">
          <div className="job-group-header">
            <h2>{group.jobOfferTitle}</h2>
            <span className="app-count">{group.applications?.length || 0} aplikacji</span>
          </div>

          <div className="applications-list">
            {group.applications?.map((app) => (
              <div key={app.id} className="application-card">
                <div className="app-top">
                  <div>
                    {/* Backend kolegi zwraca name i surname (nie userName/userSurname) */}
                    <p className="app-name">{app.name} {app.surname}</p>
                    <p className="app-email">{app.cvFileName}</p>
                    <p className="app-date">{new Date(app.date).toLocaleString("pl-PL")}</p>
                  </div>
                  {getStatusBadge(app.status)}
                </div>

                {/* Ocena AI - backend zwraca score i evaluation */}
                {app.score !== null && app.score !== undefined && (
                  <div className="ai-evaluation">
                    <p className="ai-label">🤖 Ocena AI: {app.score}/10</p>
                    {app.evaluation && (
                      <p className="ai-text">{app.evaluation}</p>
                    )}
                  </div>
                )}

                <div className="app-actions">
                  <button
                    className="btn-accept"
                    onClick={() => handleAccept(app.id)}
                    disabled={app.status?.toLowerCase() === "accepted"}
                  >
                    ✅ Akceptuj
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleReject(app.id)}
                    disabled={app.status?.toLowerCase() === "rejected"}
                  >
                    ❌ Odrzuć
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
