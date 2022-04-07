import express from 'express'
import User from '../controllers/users.js'

const router = express.Router()
const users = new User
router.get("/search",users.search)


export default {
    router
}