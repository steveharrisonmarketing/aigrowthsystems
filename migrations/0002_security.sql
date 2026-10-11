-- Security fixes (fix/audit-security): retry cap per audit and simple rate-limit counters.
-- Apply with: npx wrangler d1 migrations apply aigrowthsystems --remote  (and --local for your own computer)
ALTER TABLE audits ADD COLUMN attempts INTEGER NOT NULL DEFAULT 0;

-- One row per (hashed key, time window). Keys are SHA-256 hashes, so no raw IPs or emails are stored here.
CREATE TABLE rate_limits (
  key TEXT NOT NULL,
  window TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (key, window)
);
