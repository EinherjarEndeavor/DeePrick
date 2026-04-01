CREATE TABLE IF NOT EXISTS opportunities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  canonical_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  url TEXT,
  source_name TEXT,
  category TEXT,
  summary TEXT,
  eligibility_json TEXT,
  location_text TEXT,
  novelty_score REAL DEFAULT 0,
  relevance_score REAL DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS supersources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  canonical_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT,
  topic_tags_json TEXT,
  yield_score REAL DEFAULT 0,
  trust_score REAL DEFAULT 0,
  freshness_score REAL DEFAULT 0,
  cost_efficiency REAL DEFAULT 0,
  notes TEXT,
  last_validated TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS artifacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  artifact_key TEXT NOT NULL UNIQUE,
  session_id TEXT,
  artifact_type TEXT NOT NULL,
  title TEXT NOT NULL,
  path TEXT NOT NULL,
  summary TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS glossary_terms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  term TEXT NOT NULL UNIQUE,
  category TEXT,
  definition TEXT NOT NULL,
  related_artifacts_json TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile_matches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_key TEXT NOT NULL,
  opportunity_id INTEGER NOT NULL,
  fit_score REAL DEFAULT 0,
  novelty_reason TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(opportunity_id) REFERENCES opportunities(id)
);

CREATE TABLE IF NOT EXISTS provider_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT,
  provider_name TEXT NOT NULL,
  run_type TEXT,
  intensity INTEGER DEFAULT 0,
  success INTEGER DEFAULT 1,
  cost_note TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evidence_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_key TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  canonical_url TEXT,
  source_type TEXT,
  independence_group TEXT,
  freshness_text TEXT,
  extraction_method TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evidence_claims (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  claim_key TEXT NOT NULL UNIQUE,
  claim_text TEXT NOT NULL,
  status TEXT DEFAULT 'unresolved',
  confidence REAL DEFAULT 0,
  source_keys_json TEXT,
  contested_by_json TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
