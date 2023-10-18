import snowflake from 'snowflake-sdk'
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


export const conn =  connection.connect()