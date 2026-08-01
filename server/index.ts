import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createApp } from "./app";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = createApp();

  // Serve static files from dist/public in production
  const staticPath = path.resolve(__dirname, "public");
  if (fs.existsSync(staticPath)) {
    app.use(express.static(staticPath));

    // Handle client-side routing - serve index.html for all non-API routes
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        next();
        return;
      }
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  const port = process.env.PORT || 3000;

  const server = createServer(app);
  server.listen(port, () => {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "vyron2026";
    console.log("----------------------------------------------------");
    console.log(`  VYRON X server running on http://localhost:${port}/`);
    console.log(`  Admin panel:  http://localhost:${port}/admin`);
    console.log(`  Admin login:  ${username} / ${password}`);
    console.log("  Set ADMIN_USERNAME / ADMIN_PASSWORD env vars to change.");
    console.log("----------------------------------------------------");
  });
}

startServer().catch(console.error);
