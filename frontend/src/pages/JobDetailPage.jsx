// src/pages/JobDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJobById } from "../data/jobs";
import "./JobDetailPage.css";

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobById(id)
      .then(setJob)
      .catch(() => setError("Nie znaleziono oferty."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="detail-page"><p>⏳ Ładowanie...</p></div>;
  if (error) return (
    <div className="not-found">
      <h2>{error}</h2>
      <Link to="/">← Wróć do listy ofert</Link>
    </div>
  );

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">← Wróć do ofert</Link>

      <div className="detail-card">
        <div className="detail-header">
          <h1>{job.jobTitle}</h1>
          <span className="job-type-badge">💰 {job.salary?.toLocaleString()} zł</span>
        </div>

        <section className="detail-section">
          <h2>O stanowisku</h2>
          <p>{job.description}</p>
        </section>

        <Link to={`/apply/${job.id}`} className="btn-apply">
          Aplikuj teraz — prześlij CV
        </Link>
      </div>
    </div>
  );
}
