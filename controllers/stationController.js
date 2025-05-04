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
            "msg": "La estación se creó correctamente."
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


export {
    createStation,
    getStations,

}