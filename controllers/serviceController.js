import Services from '../models/Service.js'

const createService =  async (req, res) => {
    if(Object.values(req.body).includes(''))
    {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }
    try {
        const service = new Services(req.body)
        await service.save()
        res.json({
            "msg": "El servicio se registro correctamente."
        })
    } catch (error) {
        console.log(error)
    }
}
const getServices = async (req, res) => {
    try {
        const services = await Services.find()
        res.json(services)
    } catch (error) {
        console.log(error)   
    }
}
export {
    createService,
    getServices,
}