-- ============================================================
-- APPROVAL MODULE - run this after your base schema.sql
-- ============================================================

-- 1. Add approval fields to existing users table
ALTER TABLE users
  ADD COLUMN role            VARCHAR(50)  NOT NULL DEFAULT 'employee'
    COMMENT 'employee | hr | manager | ceo',
  ADD COLUMN is_approved     BOOLEAN      NOT NULL DEFAULT FALSE
    COMMENT 'Set TRUE only by manager or CEO',
  ADD COLUMN approved_by     CHAR(36)     NULL
    COMMENT 'user.id of the manager/ceo who approved',
  ADD COLUMN approved_at     DATETIME     NULL,
  ADD COLUMN rejected_reason VARCHAR(500) NULL
    COMMENT 'Optional reason if the account was rejected';

-- 2. Approval requests table (one row per approval request)
CREATE TABLE IF NOT EXISTS approval_requests (
  id            CHAR(36)      NOT NULL PRIMARY KEY,
  user_id       CHAR(36)      NOT NULL COMMENT 'Employee/HR who is requesting access',
  status        VARCHAR(20)   NOT NULL DEFAULT 'pending'
    COMMENT 'pending | approved | rejected',
  requested_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_by   CHAR(36)      NULL     COMMENT 'Manager/CEO user.id who acted on it',
  reviewed_at   DATETIME      NULL,
  reject_reason VARCHAR(500)  NULL,

  INDEX idx_approval_user   (user_id),
  INDEX idx_approval_status (status),
  CONSTRAINT fk_approval_user     FOREIGN KEY (user_id)     REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_approval_reviewer FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
);
