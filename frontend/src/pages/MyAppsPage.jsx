// src/pages/MyApplications.jsx
import { useEffect, useState } from "react";
import "./MyAppsPage.css";
import { fetchMyApplications } from "../data/jobs";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  fetchMyApplications()
    .then(setApplications)
    .catch(() => setError("Nie można pobrać aplikacji"))
    .finally(() => setLoading(false));
}, []);

 return (
  <div className="my-applications">
    <div className="hero">
      <h1>Moje aplikacje</h1>
      <p>Lista wysłanych zgłoszeń</p>
    </div>

    <div className="applications-section">
      {loading && <p>⏳ Ładowanie...</p>}
      {error && <p className="error-text">⚠️ {error}</p>}

      {!loading && !error && (
        <>
          {applications.length === 0 ? (
            <p className="no-results">Brak aplikacji.</p>
          ) : (
            <div className="applications-grid">
              {applications.map((app) => (
                <div key={app.id} className="application-card">
                  <h3>{app.jobOfferTitle}</h3>

                  <p>
                    👤 {app.name} {app.surname}
                  </p>

                  <p>
                    📅{" "}
                    {app.date
                      ? new Date(app.date).toLocaleDateString()
                      : "-"}
                  </p>

                  <p>📌 Status: {app.status}</p>

                  {app.score != null && (
                    <p>⭐ Score: {app.score}</p>
                  )}

                  {app.evaluation && (
                    <p>🧠 {app.evaluation}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  </div>
);
}