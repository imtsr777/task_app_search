import express from 'express'
import pg from './utils/pg.js'
import users from './routes/users.js'
import adress from './routes/adress.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/users",users.router)
app.use("/adress",adress.router)

app.listen(PORT,()=>{console.log("http://localhost:"+PORT)})


