// src/pages/ApplyPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJobById, API_BASE } from "../data/jobs";
import { useAuth } from "../context/AuthContext";
import "./ApplyPage.css";

export default function ApplyPage() {
  const { id } = useParams();
  const { user, login } = useAuth();
  const [job, setJob] = useState(null);

  // Stan formularza logowania/rejestracji
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", surname: "", email: "", password: "", repeatPassword: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Stan wysyłania CV
  const [cvFile, setCvFile] = useState(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetchJobById(id).then(setJob).catch(() => {});
  }, [id]);

  const handleAuth = async () => {
    setAuthError("");
    setAuthLoading(true);
    // Backend kolegi używa małych liter: /api/account/login i /api/account/register
    const endpoint = authMode === "login" ? "login" : "register";
    const body = authMode === "login"
      ? { email: authForm.email, password: authForm.password }
      : { name: authForm.name, surname: authForm.surname, email: authForm.email, password: authForm.password, repeatPassword: authForm.repeatPassword };

    try {
      const res = await fetch(`${API_BASE}/api/account/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setAuthError(err?.detail || err?.title || err?.message || "Błąd. Sprawdź dane.");
        return;
      }
      const data = await res.json();
      login(data);
    } catch {
      setAuthError("Nie można połączyć z serwerem.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!cvFile) return setSendError("Wybierz plik CV (PDF).");
    setSendError("");
    setSending(true);

    const formData = new FormData();
    formData.append("JobOfferId", id);
    formData.append("CV", cvFile);

    try {
      const res = await fetch(`${API_BASE}/api/application`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setSendError(err?.detail || err?.title || err?.message || "Błąd wysyłania.");
        return;
      }
      setSent(true);
    } catch {
      setSendError("Nie można połączyć z serwerem.");
    } finally {
      setSending(false);
    }
  };

  if (!job) return <div className="apply-page"><p>⏳ Ładowanie...</p></div>;

  return (
    <div className="apply-page">
      <Link to={`/job/${id}`} className="back-link">← Wróć do oferty</Link>

      <div className="apply-layout">
        <div className="apply-form-card">
          <h1>Aplikuj na stanowisko</h1>
          <p className="apply-subtitle"><strong>{job.jobTitle}</strong> · {job.salary?.toLocaleString()} zł</p>

          {!user ? (
            <div className="auth-section">
              <p className="auth-info">ℹ️ Musisz się zalogować żeby wysłać aplikację.</p>
              <div className="auth-tabs">
                <button className={authMode === "login" ? "tab active" : "tab"} onClick={() => setAuthMode("login")}>Logowanie</button>
                <button className={authMode === "register" ? "tab active" : "tab"} onClick={() => setAuthMode("register")}>Rejestracja</button>
              </div>

              {authMode === "register" && (
                <>
                  <div className="form-group">
                    <label>Imię</label>
                    <input placeholder="Jan" value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Nazwisko</label>
                    <input placeholder="Kowalski" value={authForm.surname} onChange={e => setAuthForm({...authForm, surname: e.target.value})} />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="jan@example.com" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Hasło</label>
                <input type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} />
              </div>

              {authMode === "register" && (
                <div className="form-group">
                  <label>Powtórz hasło</label>
                  <input type="password" placeholder="••••••••" value={authForm.repeatPassword} onChange={e => setAuthForm({...authForm, repeatPassword: e.target.value})} />
                </div>
              )}

              {authError && <p className="form-error">{authError}</p>}
              <button className="btn-analyze" onClick={handleAuth} disabled={authLoading}>
                {authLoading ? "⏳ Czekaj..." : authMode === "login" ? "Zaloguj się" : "Zarejestruj się"}
              </button>
            </div>
          ) : (
            <div>
              <div className="user-banner">
                ✅ Zalogowany jako <strong>{user.name} {user.surname}</strong>
              </div>

              {!sent ? (
                <>
                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label>Prześlij CV (plik PDF)</label>
                    <div className="file-upload">
                      <label htmlFor="cv-file" className="file-label">
                        📎 {cvFile ? cvFile.name : "Wybierz plik PDF"}
                      </label>
                      <input id="cv-file" type="file" accept=".pdf"
                        onChange={e => setCvFile(e.target.files[0])}
                        style={{ display: "none" }} />
                    </div>
                  </div>
                  {sendError && <p className="form-error">{sendError}</p>}
                  <button className="btn-analyze" onClick={handleSubmit} disabled={sending}>
                    {sending ? "⏳ Wysyłanie..." : "📤 Wyślij aplikację"}
                  </button>
                </>
              ) : (
                <div className="success-banner" style={{ marginTop: "1rem" }}>
                  ✅ Aplikacja wysłana! AI oceni Twoje CV wkrótce.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="result-column">
          <div className="result-placeholder">
            <div className="placeholder-icon">🤖</div>
            <h3>Jak działa ocena AI?</h3>
            <p>
              Po wysłaniu CV backend:<br/><br/>
              1️⃣ Odczytuje tekst z PDF (OCR)<br/><br/>
              2️⃣ Wysyła go do modelu <strong>Ollama</strong><br/><br/>
              3️⃣ AI ocenia dopasowanie do oferty<br/><br/>
              4️⃣ Wynik pojawia się w panelu HR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
