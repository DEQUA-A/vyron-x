import express, { type Request, type Response } from "express";
import {
  createReservation,
  deleteReservation,
  getReservation,
  listReservations,
  updateReservationStatus,
} from "./db";
import {
  buildSessionCookie,
  clearSessionCookie,
  login,
  requireAdmin,
  verifySessionToken,
} from "./auth";

const VALID_STATUSES = ["pending", "confirmed", "cancelled"];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function readSession(req: Request): string | null {
  const cookie = req.headers.cookie || "";
  const match = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("vyron_admin_session="));
  if (!match) return null;
  const token = match.slice("vyron_admin_session=".length);
  return verifySessionToken(token);
}

export function createApp() {
  const app = express();
  app.use(express.json());

  // Health check (public)
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Admin auth
  app.post("/api/admin/login", (req: Request, res: Response) => {
    const { username, password } = (req.body ?? {}) as Record<string, unknown>;
    if (typeof username !== "string" || typeof password !== "string") {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }
    const token = login(username, password);
    if (!token) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    res.setHeader("Set-Cookie", buildSessionCookie(token));
    res.json({ success: true, username: verifySessionToken(token) });
  });

  app.post("/api/admin/logout", (_req: Request, res: Response) => {
    res.setHeader("Set-Cookie", clearSessionCookie());
    res.json({ success: true });
  });

  app.get("/api/admin/session", (req: Request, res: Response) => {
    const username = readSession(req);
    if (!username) {
      res.status(401).json({ authenticated: false });
      return;
    }
    res.json({ authenticated: true, username });
  });

  // Public: create reservation
  app.post("/api/reservations", (req: Request, res: Response) => {
    const { name, email, country } = (req.body ?? {}) as Record<string, unknown>;
    if (typeof name !== "string" || !name.trim()) {
      res.status(400).json({ error: "Name is required" });
      return;
    }
    if (typeof email !== "string" || !isValidEmail(email.trim())) {
      res.status(400).json({ error: "A valid email is required" });
      return;
    }
    if (typeof country !== "string" || !country.trim()) {
      res.status(400).json({ error: "Country is required" });
      return;
    }
    const reservation = createReservation({
      name: name.trim(),
      email: email.trim(),
      country: country.trim(),
    });
    res.status(201).json(reservation);
  });

  // ── Admin-only routes ──────────────────────────────────────────
  app.use("/api/reservations", requireAdmin);

  // List reservations
  app.get("/api/reservations", (_req: Request, res: Response) => {
    res.json(listReservations());
  });

  // Get single reservation
  app.get("/api/reservations/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid reservation id" });
      return;
    }
    const reservation = getReservation(id);
    if (!reservation) {
      res.status(404).json({ error: "Reservation not found" });
      return;
    }
    res.json(reservation);
  });

  // Update reservation status
  app.patch("/api/reservations/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid reservation id" });
      return;
    }
    const { status } = (req.body ?? {}) as Record<string, unknown>;
    if (typeof status !== "string" || !VALID_STATUSES.includes(status)) {
      res
        .status(400)
        .json({ error: `Status must be one of: ${VALID_STATUSES.join(", ")}` });
      return;
    }
    const reservation = updateReservationStatus(id, status);
    if (!reservation) {
      res.status(404).json({ error: "Reservation not found" });
      return;
    }
    res.json(reservation);
  });

  // Delete reservation
  app.delete("/api/reservations/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid reservation id" });
      return;
    }
    const ok = deleteReservation(id);
    if (!ok) {
      res.status(404).json({ error: "Reservation not found" });
      return;
    }
    res.status(204).end();
  });

  // 404 for unknown API routes
  app.use("/api", (_req: Request, res: Response) => {
    res.status(404).json({ error: "API route not found" });
  });

  return app;
}
