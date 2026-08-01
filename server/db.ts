import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, "..", "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new DatabaseSync(path.join(DATA_DIR, "vyron.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export interface Reservation {
  id: number;
  name: string;
  email: string;
  country: string;
  status: string;
  created_at: string;
}

export interface CreateReservationInput {
  name: string;
  email: string;
  country: string;
}

export function listReservations(): Reservation[] {
  return db
    .prepare("SELECT * FROM reservations ORDER BY id DESC")
    .all() as unknown as Reservation[];
}

export function getReservation(id: number): Reservation | undefined {
  return db
    .prepare("SELECT * FROM reservations WHERE id = ?")
    .get(id) as unknown as Reservation | undefined;
}

export function createReservation(input: CreateReservationInput): Reservation {
  const result = db
    .prepare("INSERT INTO reservations (name, email, country) VALUES (?, ?, ?)")
    .run(input.name, input.email, input.country);
  const row = getReservation(Number(result.lastInsertRowid));
  if (!row) {
    throw new Error("Failed to create reservation");
  }
  return row;
}

export function updateReservationStatus(id: number, status: string): Reservation | undefined {
  db.prepare("UPDATE reservations SET status = ? WHERE id = ?").run(status, id);
  return getReservation(id);
}

export function deleteReservation(id: number): boolean {
  const result = db.prepare("DELETE FROM reservations WHERE id = ?").run(id);
  return Number(result.changes) > 0;
}
