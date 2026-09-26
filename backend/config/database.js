import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const host = process.env.DB_HOST || 'localhost'
const configuredPort = Number(process.env.DB_PORT)
const serverPort = Number(process.env.PORT)
const isTiDbCloud = host.endsWith('.tidbcloud.com')

// TiDB Cloud's MySQL-compatible gateway uses port 4000. This also prevents a
// duplicated DB_PORT that matches the Express port from targeting the API port.
const port = isTiDbCloud && configuredPort === serverPort
  ? 4000
  : configuredPort || 3306

const pool = mysql.createPool({
  host,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'expense_tracker',
  port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
})

export default pool
