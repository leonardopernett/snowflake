
import express from 'express'
import { conn } from './db.js'

const port = process.env.PORT || 3000;

const app = express()

app.use(express.json())

app.post('/api/snowflake', (req, res) => {
 const { sql:sqlText } = req.body
 conn.execute({
    sqlText,
    complete: (err, stmt, rows) => {
      if(err){
        res.json({ error:err.message })
      }else{
        res.json({ sql:rows })
      }

    }
  })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})