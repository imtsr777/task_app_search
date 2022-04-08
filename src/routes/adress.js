import express from 'express'
import Adress from '../controllers/adress.js'

const router = express.Router()
const adresses = new Adress

router.post("/add",adresses.add)


export default {
    router
}