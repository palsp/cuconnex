
export default {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'liulaks123',
  db: process.env.DB_SCHEMA || 'user_db',
}

export const test_config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  db: 'testdb',
}
