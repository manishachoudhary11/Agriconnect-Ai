from config import DATABASE_URL
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base

db_url = DATABASE_URL
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

connect_args = {"check_same_thread": False} if db_url.startswith("sqlite") else {}

engine = create_engine(db_url, connect_args=connect_args)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


def run_migrations():
    """Ensure database tables and all required columns exist."""
    try:
        Base.metadata.create_all(bind=engine)

        migrations = [
            # users table
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url VARCHAR;",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR;",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS location VARCHAR;",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_complete BOOLEAN DEFAULT FALSE;",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR DEFAULT 'farmer';",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;",
            
            # crops table
            "ALTER TABLE crops ADD COLUMN IF NOT EXISTS image_url VARCHAR;",
            "ALTER TABLE crops ADD COLUMN IF NOT EXISTS category VARCHAR;",
            "ALTER TABLE crops ADD COLUMN IF NOT EXISTS status VARCHAR DEFAULT 'growing';",
            "ALTER TABLE crops ADD COLUMN IF NOT EXISTS planted_at TIMESTAMP;",
            "ALTER TABLE crops ADD COLUMN IF NOT EXISTS description TEXT;",
            "ALTER TABLE crops ADD COLUMN IF NOT EXISTS quantity INTEGER;",
            "ALTER TABLE crops ADD COLUMN IF NOT EXISTS location VARCHAR;",
            "ALTER TABLE crops ADD COLUMN IF NOT EXISTS market_price INTEGER;",
            
            # listings table
            "ALTER TABLE listings ADD COLUMN IF NOT EXISTS unit VARCHAR DEFAULT 'kg';",
            "ALTER TABLE listings ADD COLUMN IF NOT EXISTS status VARCHAR DEFAULT 'active';",
            "ALTER TABLE listings ADD COLUMN IF NOT EXISTS category_id INTEGER;",
            "ALTER TABLE listings ADD COLUMN IF NOT EXISTS image_url VARCHAR;",
            "ALTER TABLE listings ADD COLUMN IF NOT EXISTS description TEXT;",
            "ALTER TABLE listings ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;",
            
            # disease_scans table
            "ALTER TABLE disease_scans ADD COLUMN IF NOT EXISTS organic_solution TEXT;",
            "ALTER TABLE disease_scans ADD COLUMN IF NOT EXISTS chemical_solution TEXT;",
            "ALTER TABLE disease_scans ADD COLUMN IF NOT EXISTS preventive_measures TEXT;",
            "ALTER TABLE disease_scans ADD COLUMN IF NOT EXISTS treatment TEXT;",
        ]

        with engine.begin() as conn:
            for stmt in migrations:
                try:
                    conn.execute(text(stmt))
                except Exception:
                    pass
    except Exception as err:
        print(f"Migration error: {err}")

