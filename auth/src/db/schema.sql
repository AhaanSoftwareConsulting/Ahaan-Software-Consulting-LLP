-- Run this once against your MySQL database to create all tables:
--   mysql -u root -p auth_db < src/db/schema.sql

CREATE TABLE IF NOT EXISTS users (
    id                      CHAR(36)      NOT NULL PRIMARY KEY,
    email                   VARCHAR(255)  NOT NULL,
    hashed_password         VARCHAR(255)  NOT NULL,
    full_name               VARCHAR(255)  NULL,

    is_active               BOOLEAN       NOT NULL DEFAULT TRUE,
    is_verified             BOOLEAN       NOT NULL DEFAULT FALSE,
    is_superuser            BOOLEAN       NOT NULL DEFAULT FALSE,

    failed_login_attempts   INT           NOT NULL DEFAULT 0,
    locked_until            DATETIME      NULL,
    last_login_at           DATETIME      NULL,

    created_at              DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY uq_users_email (email)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id            CHAR(36)      NOT NULL PRIMARY KEY,
    user_id       CHAR(36)      NOT NULL,
    token_hash    VARCHAR(255)  NOT NULL,
    revoked       BOOLEAN       NOT NULL DEFAULT FALSE,
    replaced_by   CHAR(36)      NULL,
    user_agent    VARCHAR(255)  NULL,
    ip_address    VARCHAR(64)   NULL,
    expires_at    DATETIME      NOT NULL,
    created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uq_refresh_tokens_hash (token_hash),
    INDEX idx_refresh_tokens_user (user_id),
    CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id            CHAR(36)      NOT NULL PRIMARY KEY,
    user_id       CHAR(36)      NOT NULL,
    token_hash    VARCHAR(255)  NOT NULL,
    used          BOOLEAN       NOT NULL DEFAULT FALSE,
    expires_at    DATETIME      NOT NULL,
    created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uq_password_reset_hash (token_hash),
    INDEX idx_password_reset_user (user_id),
    CONSTRAINT fk_password_reset_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS email_verification_tokens (
    id            CHAR(36)      NOT NULL PRIMARY KEY,
    user_id       CHAR(36)      NOT NULL,
    token_hash    VARCHAR(255)  NOT NULL,
    used          BOOLEAN       NOT NULL DEFAULT FALSE,
    expires_at    DATETIME      NOT NULL,
    created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uq_email_verification_hash (token_hash),
    INDEX idx_email_verification_user (user_id),
    CONSTRAINT fk_email_verification_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
