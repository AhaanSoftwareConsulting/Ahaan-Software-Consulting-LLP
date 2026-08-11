/**
 * seedAdmin.js
 * ----------------------------------------------------------------
 * One-time CLI script to create Manager / CEO accounts directly.
 *
 * WHY A SCRIPT AND NOT AN API ENDPOINT:
 * Self-registration is deliberately locked to 'employee'/'hr' roles
 * (see auth.controller.js). Manager/CEO accounts should never be
 * mintable through a public HTTP endpoint — only someone with direct
 * database/server access should be able to create them. This script
 * runs on the server itself, hashes the password the same way the app
 * does, and pre-approves the account (no one above a CEO to approve them).
 *
 * USAGE:
 *   node src/scripts/seedAdmin.js --email ceo@company.com --password "Str0ngPass!" --role ceo --name "Jane Doe"
 *   node src/scripts/seedAdmin.js --email manager@company.com --password "Str0ngPass!" --role manager --name "John Smith"
 *
 * Flags:
 *   --email     (required)
 *   --password  (required, must meet password policy)
 *   --role      manager | ceo   (required)
 *   --name      optional full name
 * ----------------------------------------------------------------
 */
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { pool, query } = require('../config/database');
const { hashPassword } = require('../utils/security');
const { passwordStrengthErrors, isValidEmailFormat } = require('../utils/validators');

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach((arg) => {
    const match = arg.match(/^--([^=]+)=?(.*)$/);
    if (match) {
      const key = match[1];
      // Support both --key=value and --key value
      const idx = process.argv.indexOf(arg);
      const value = match[2] || process.argv[idx + 1] || '';
      args[key] = value;
    }
  });
  return args;
}

async function seedAdmin() {
  const { email, password, role, name } = parseArgs();

  // ---- Validate input ----
  if (!email || !password || !role) {
    console.error('Usage: node src/scripts/seedAdmin.js --email <email> --password <password> --role <manager|ceo> [--name "Full Name"]');
    process.exit(1);
  }

  if (!['manager', 'ceo'].includes(role)) {
    console.error(`Invalid role "${role}". Must be "manager" or "ceo".`);
    process.exit(1);
  }

  if (!isValidEmailFormat(email)) {
    console.error(`Invalid email format: ${email}`);
    process.exit(1);
  }

  const pwErrors = passwordStrengthErrors(password);
  if (pwErrors.length) {
    console.error('Password does not meet requirements:');
    pwErrors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  try {
    // ---- Check for existing account ----
    const existing = await query('SELECT id, role FROM users WHERE email = ?', [email.toLowerCase()]);
    if (existing.length) {
      console.error(`A user with email ${email} already exists (role: ${existing[0].role}). Aborting.`);
      process.exit(1);
    }

    // ---- Create the user, pre-verified and pre-approved ----
    const id = uuidv4();
    const hashedPassword = await hashPassword(password);

    await query(
      `INSERT INTO users
         (id, email, hashed_password, full_name, role, is_active, is_verified, is_approved, approved_at)
       VALUES (?, ?, ?, ?, ?, TRUE, TRUE, TRUE, NOW())`,
      [id, email.toLowerCase(), hashedPassword, name || null, role]
    );

    console.log('✅ Admin account created successfully:');
    console.log(`   ID:    ${id}`);
    console.log(`   Email: ${email}`);
    console.log(`   Role:  ${role}`);
    console.log(`   Status: verified + approved (can log in immediately)`);
  } catch (err) {
    console.error('Failed to create admin account:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedAdmin();
