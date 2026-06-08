// src/pages/UnauthorizedPage.jsx
// Strona pokazywana gdy ktoś próbuje wejść na /admin bez uprawnień
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚫</div>
      <h1 style={{ color: "#1a1a2e", marginBottom: "0.5rem" }}>Brak dostępu</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Nie masz uprawnień do tej strony. Ta sekcja jest dostępna tylko dla administratorów.
      </p>
      <Link
        to="/"
        style={{
          padding: "0.75rem 1.5rem",
          background: "#e94560",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "700"
        }}
      >
        ← Wróć na stronę główną
      </Link>
    </div>
  );
}
