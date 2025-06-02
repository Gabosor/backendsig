import Stations from "../models/station.js"

const createStation = async (req, res) => {
    if(Object.values(req.body).includes(''))
    {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }
    try {
        const station = new Stations(req.body) 
         await station.save()
        res.json({
            "msg": "La estación se registro correctamente."
        })
    } catch (error) {
        console.log(error)
    }
}
const getStations = async (req, res) => {
    try {
        const stations = await Stations.find()
        res.json(stations)
    } catch (error) {
        console.log(error)   
    }
}

const actualizarFuelDisponible = async (req, res) => {
    console.log("Actualizando....")
    const { id } = req.params
    const { fuelType, available } = req.body
  
    // Validaciones iniciales
    if (!fuelType || typeof available !== 'number') {
      return res.status(400).json({
        mensaje: 'Debes proporcionar fuelType (string) y available (number)'
      })
    }
  
    if (available < 0) {
      return res.status(400).json({ mensaje: 'El valor disponible no puede ser negativo' })
    }
  
    try {
      const station = await Stations.findById(id)
      if (!station) {
        return res.status(404).json({ mensaje: 'Estación no encontrada' })
      }
  
      // Buscar el tipo de combustible específico
      const fuel = station.fuels.find(f => f.type === fuelType)
      if (!fuel) {
        return res.status(404).json({ mensaje: `No se encontró el tipo de combustible "${fuelType}" en esta estación` })
      }
  
      // Validar que no exceda la capacidad
      if (available > fuel.capacity) {
        return res.status(400).json({
          mensaje: `El valor disponible (${available}) no puede superar la capacidad máxima (${fuel.capacity})`
        })
      }
  
      // Actualizar
      fuel.available = available
      station.last_updated = Date.now()
      await station.save()
  
      return res.status(200).json({
        mensaje: 'Disponibilidad actualizada correctamente',
        station
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ mensaje: 'Error del servidor' })
    }
  }

export {
    createStation,
    getStations,
    actualizarFuelDisponible

}