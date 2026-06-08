// Adres backendu (port 6060 zgodny z konfiguracją kolegi)
export const API_BASE = "https://localhost:8081";

// Pobierz wszystkie oferty z API
export async function fetchJobs() {
  const res = await fetch(`${API_BASE}/api/JobOffer`, { credentials: "include" });
  if (!res.ok) throw new Error("Błąd pobierania ofert");
  return res.json();
}

// Pobierz jedną ofertę po id
export async function fetchJobById(id) {
  const res = await fetch(`${API_BASE}/api/JobOffer/${id}`, { credentials: "include" });
  if (!res.ok) throw new Error("Nie znaleziono oferty");
  return res.json();
}

// Pobierz aplikacje zalogowanego usera
export async function fetchMyApplications() {
  const res = await fetch(`${API_BASE}/api/Application/GetUsersApplications`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Błąd pobierania aplikacji");
  }

  return res.json();
}