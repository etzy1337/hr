// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { fetchJobs } from "../data/jobs";
import JobCard from "../components/JobCard";
import "./HomePage.css";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // useEffect - pobiera oferty z API gdy strona się załaduje
  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch(() => setError("Nie można pobrać ofert. Sprawdź czy backend kolegi działa."))
      .finally(() => setLoading(false));
  }, []); // [] = zrób to tylko raz przy załadowaniu

  // Filtrowanie po tytule lub opisie
  const filtered = jobs.filter((job) => {
    const q = search.toLowerCase();
    return (
      job.jobTitle?.toLowerCase().includes(q) ||
      job.description?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Znajdź pracę swoich marzeń</h1>
        <p>Prześlij CV i sprawdź jak dopasujesz się do oferty — z pomocą AI!</p>
        <input
          type="text"
          className="search-input"
          placeholder="Szukaj stanowiska..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="jobs-section">
        {loading && <p className="loading-text">⏳ Pobieranie ofert...</p>}
        {error && <p className="error-text">⚠️ {error}</p>}

        {!loading && !error && (
          <>
            <h2 className="section-title">
              {filtered.length === jobs.length
                ? `Wszystkie oferty (${jobs.length})`
                : `Wyniki: ${filtered.length}`}
            </h2>
            {filtered.length === 0 ? (
              <p className="no-results">Brak ofert pasujących do wyszukiwania.</p>
            ) : (
              <div className="jobs-grid">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
