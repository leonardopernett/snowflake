import snowflake from 'snowflake-sdk'
import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const connection = snowflake.createConnection({
  account: 'cj19165.eu-west-1',
  username: 'LEONARDOPERNETT',
  password:'Konecta.2023',
  application: 'didactik',
  authenticator: 'SNOWFLAKE',
  warehouse:'DIDACTIK_BI_CO',
  role:'DIDACTIK_BI_CO',
  schema:'MOODLE_BI',
  database:'DIDACTIK'
})

export const pool = createPool({
  host:'172.102.100.45',
  user:'app_prod',
  password:'Leonardo14+',
  database:'experience',
  connectionLimit:10
})


export const conn =  connection.connect()