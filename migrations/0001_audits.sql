-- One row per Free AI Growth Audit.
CREATE TABLE audits (
  id TEXT PRIMARY KEY,                -- long random id used in the result page address
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  website TEXT,
  team_size TEXT NOT NULL,
  tasks TEXT NOT NULL,
  ai_use TEXT NOT NULL,
  challenge TEXT NOT NULL,
  more TEXT,
  marketing_consent INTEGER NOT NULL DEFAULT 0,
  source_page TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending | running | done | failed
  started_at TEXT,
  result_json TEXT,
  is_sample INTEGER NOT NULL DEFAULT 0,    -- 1 when no AI key was set and a sample result was used
  input_tokens INTEGER,
  output_tokens INTEGER,
  email_status TEXT
);
CREATE INDEX audits_email_created ON audits (email, created_at);
