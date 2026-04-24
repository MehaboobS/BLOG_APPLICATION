const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const normalizeOrigin = (value) => {
  if (!value || typeof value !== "string") return null;
  return value.trim().replace(/\/$/, "");
};

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://blog-application-woad-five.vercel.app",
  process.env.FRONTEND_URL
]
  .map(normalizeOrigin)
  .filter(Boolean);

const allowedOriginSet = new Set(allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser clients and same-origin requests with no Origin header.
    if (!origin) return callback(null, true);

    if (allowedOriginSet.has(normalizeOrigin(origin))) {
      return callback(null, true);
    }

    return callback(new Error("CORS: origin not allowed"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Middlewares
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Routes (we'll add later)

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/posts", require("./routes/post.routes"));
app.use("/api/users", require("./routes/user.routes"));
// Global error handler
app.use(errorHandler);

module.exports = app;