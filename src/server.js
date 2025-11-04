import express from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import { inngest, functions } from "./lib/inngest.js";

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT;

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();