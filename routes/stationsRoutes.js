import express from 'express'
import { createStation, getStations, actualizarFuelDisponible  } from '../controllers/stationController.js'

const router = express.Router()

router.post('', createStation)
router.get('/', getStations)
router.patch('/:id/fuel', actualizarFuelDisponible)


export default router