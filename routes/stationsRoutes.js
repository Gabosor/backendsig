import express from 'express'
import { createStation, getStations } from '../controllers/stationController.js'

const router = express.Router()

router.post('', createStation)
router.get('/', getStations)



export default router