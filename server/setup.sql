DROP TABLE IF EXISTS articles;

CREATE TABLE articles (
    id              SERIAL PRIMARY KEY,
    user_id         INT,
    topic           VARCHAR(255),
    content         TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);