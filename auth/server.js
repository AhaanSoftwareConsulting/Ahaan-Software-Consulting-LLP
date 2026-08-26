const app = require('./src/app');
const config = require('./src/config/config');
const { pool } = require('./src/config/database');

async function start() {
  try {
    // Fail fast if MySQL isn't reachable, instead of accepting requests that
    // would just error out on first DB query.
    const conn = await pool.getConnection();
    conn.release();
    console.log('Connected to MySQL');

    app.listen(config.app.port, () => {
      console.log(`${config.app.name} listening on port ${config.app.port} (${config.app.env})`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
