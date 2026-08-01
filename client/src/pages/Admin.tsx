/**
 * Admin — VYRON X reservation management
 * Login-protected dashboard for viewing, confirming, and managing reservations.
 */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

type Reservation = {
  id: number;
  name: string;
  email: string;
  country: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
};

const STATUS_COLORS: Record<Reservation["status"], string> = {
  pending: "#8B8FA8",
  confirmed: "#0066FF",
  cancelled: "#ff5555",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.6rem",
  letterSpacing: "0.2em",
  color: "#8B8FA8",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "0.35rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #2A2A32",
  padding: "0.75rem 0",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "1rem",
  color: "#ffffff",
  outline: "none",
};

export default function Admin() {
  const [, setLocation] = useLocation();
  const [auth, setAuth] = useState<null | boolean>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | Reservation["status"]>("all");

  useEffect(() => {
    fetch("/api/admin/session", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setAuth(data.authenticated === true))
      .catch(() => setAuth(false));
  }, []);

  useEffect(() => {
    if (!auth) return;
    loadReservations();
  }, [auth]);

  async function loadReservations() {
    setLoading(true);
    try {
      const res = await fetch("/api/reservations", { credentials: "include" });
      if (res.status === 401) {
        setAuth(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to load reservations");
      setReservations((await res.json()) as Reservation[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");
      setAuth(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    setAuth(false);
    setReservations([]);
  }

  async function updateStatus(id: number, status: Reservation["status"]) {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (res.status === 401) {
        setAuth(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to update");
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  }

  async function removeReservation(id: number) {
    if (!window.confirm(`Delete reservation #${id}?`)) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.status === 401) {
        setAuth(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to delete");
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  // ── Login screen ───────────────────────────────────────────────
  if (auth === false) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0A0A0C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <img
              src="/vyron-logo_b3e76512.png"
              alt="VYRON X"
              style={{ width: 36, height: 36, objectFit: "contain" }}
            />
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em", fontSize: "1.5rem", color: "#ffffff" }}>
              VYRON <span style={{ color: "#0066FF" }}>X</span> ADMIN
            </div>
          </div>

          <div
            style={{
              background: "#111116",
              border: "1px solid #2A2A32",
              padding: "2rem",
            }}
          >
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#ffffff", marginBottom: "1.5rem" }}>
              Admin Access
            </div>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>Username</label>
                <input
                  style={inputStyle}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  style={inputStyle}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && (
                <div style={{ color: "#ff5555", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem" }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loggingIn}
                style={{
                  background: "transparent",
                  border: "1px solid #0066FF",
                  color: "#ffffff",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "0.9rem 1.5rem",
                  cursor: loggingIn ? "wait" : "pointer",
                  opacity: loggingIn ? 0.6 : 1,
                  transition: "all 0.3s ease",
                }}
              >
                {loggingIn ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          <a
            href="/"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "1.5rem",
              color: "#8B8FA8",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            ← Back to site
          </a>
        </div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────
  const filtered =
    filter === "all"
      ? reservations
      : reservations.filter((r) => r.status === filter);
  const counts = {
    all: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    cancelled: reservations.filter((r) => r.status === "cancelled").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0C", color: "#ffffff" }}>
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#0A0A0C/95",
          borderBottom: "1px solid #2A2A32",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img
              src="/vyron-logo_b3e76512.png"
              alt="VYRON X"
              style={{ width: 32, height: 32, objectFit: "contain" }}
            />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em", fontSize: "1.25rem" }}>
              VYRON <span style={{ color: "#0066FF" }}>X</span>
            </span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#0066FF", textTransform: "uppercase", marginLeft: "0.5rem" }}>
              Admin
            </span>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a
              href="/"
              style={{ color: "#8B8FA8", fontFamily: "'Rajdhani', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", alignSelf: "center" }}
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid #2A2A32",
                color: "#8B8FA8",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>
        {/* Title */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
            <div style={{ height: 1, width: 40, background: "#0066FF" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#0066FF", textTransform: "uppercase" }}>
              Reservation Management
            </span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.04em", lineHeight: 1 }}>
            RESERVATION QUEUE
          </h1>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {([
            ["TOTAL", counts.all],
            ["PENDING", counts.pending],
            ["CONFIRMED", counts.confirmed],
            ["CANCELLED", counts.cancelled],
          ] as const).map(([label, value]) => (
            <div key={label} style={{ background: "#111116", border: "1px solid #2A2A32", padding: "1.25rem" }}>
              <div style={labelStyle}>{label}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.75rem", color: label === "CONFIRMED" ? "#0066FF" : "#ffffff" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "1px solid #2A2A32" }}>
          {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: filter === f ? "2px solid #0066FF" : "2px solid transparent",
                color: filter === f ? "#ffffff" : "#8B8FA8",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "0.75rem 1rem",
                cursor: "pointer",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {error && (
          <div
            style={{
              color: "#ff5555",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              padding: "0.75rem 1rem",
              border: "1px solid rgba(255,85,85,0.3)",
              background: "rgba(255,85,85,0.08)",
              marginBottom: "1.5rem",
            }}
          >
            {error}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div style={{ color: "#8B8FA8", fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", padding: "2rem 0" }}>
            LOADING...
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              color: "#8B8FA8",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem",
              padding: "3rem 0",
              textAlign: "center",
              border: "1px dashed #2A2A32",
            }}
          >
            NO RESERVATIONS {filter === "all" ? "" : `(${filter})`}
          </div>
        ) : (
          <div style={{ border: "1px solid #2A2A32", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #2A2A32" }}>
                  {["ID", "Name", "Email", "Country", "Status", "Date", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={labelStyle}
                    >
                      <span style={{ padding: "0.75rem 1rem", display: "block" }}>{h}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #1A1A1F" }}>
                    <td style={{ padding: "0.9rem 1rem", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#0066FF" }}>
                      #{String(r.id).padStart(3, "0")}
                    </td>
                    <td style={{ padding: "0.9rem 1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
                      {r.name}
                    </td>
                    <td style={{ padding: "0.9rem 1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#C8CDD8" }}>
                      {r.email}
                    </td>
                    <td style={{ padding: "0.9rem 1rem", fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", letterSpacing: "0.05em", color: "#8B8FA8" }}>
                      {r.country}
                    </td>
                    <td style={{ padding: "0.9rem 1rem" }}>
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value as Reservation["status"])}
                        style={{
                          background: "#0A0A0C",
                          border: `1px solid ${STATUS_COLORS[r.status]}`,
                          color: STATUS_COLORS[r.status],
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.65rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "0.35rem 0.5rem",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td style={{ padding: "0.9rem 1rem", fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#8B8FA8" }}>
                      {r.created_at}
                    </td>
                    <td style={{ padding: "0.9rem 1rem" }}>
                      <button
                        onClick={() => removeReservation(r.id)}
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(255,85,85,0.4)",
                          color: "#ff5555",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: "0.65rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "0.35rem 0.75rem",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
