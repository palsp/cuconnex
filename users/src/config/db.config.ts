
export default {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  db: process.env.DB_SCHEMA,
}

export const test_config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  db: 'testdb',
}
