import express from 'express'
import {login, register, user } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

//Rutas de autenticacion y registro de usuarios
router.post('/register', register)
router.post('/login', login)
//Area Privada -Requiere un JWT

router.get('/user', authMiddleware, user)


export default router