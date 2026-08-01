import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createApp } from "./app";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function buildApp() {
  const app = createApp();

  const staticPath = path.resolve(__dirname, "public");
  if (fs.existsSync(staticPath)) {
    app.use(express.static(staticPath));

    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        next();
        return;
      }
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  return app;
}

const app = buildApp();

export default app;

if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  const server = createServer(app);
  server.listen(port, () => {
    console.log("----------------------------------------------------");
    console.log(`  VYRON X server running on http://localhost:${port}/`);
    console.log(`  Admin panel:  http://localhost:${port}/admin`);
    if (process.env.NODE_ENV === "production") {
      console.log("  Set ADMIN_USERNAME / ADMIN_PASSWORD / ADMIN_SECRET env vars.");
    }
    console.log("----------------------------------------------------");
  });
}