
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import stationsRoutes from './routes/stationsRoutes.js'
import { db } from './config/db.js'
import uploadRoutes from './routes/uploadRoutets.js'
import servicesRoutes from './routes/servicesRoutes.js'
//Variables d entorno
dotenv.config()
//Configurar la app
const app = express()
//Lerr datos via body
app.use(express.json())

db()
const whitelist = [
    process.env.FRONTEND_URL, undefined

]
const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            //permite la conexcion
            callback(null, true)
        }else{
            //no permitir
            callback(new Error('Error de cors'))
        }
    }
}
app.use(cors(corsOptions))


//definir una ruta
app.use('/uploads', express.static('uploads'))
app.use('/api/upload', uploadRoutes)

app.use('/api/stations', stationsRoutes)
app.use('/api/services', servicesRoutes)





//definir puerto
const PORT = process.env.PORT || 4000

//arrancar la app
app.listen(PORT, () => {
    console.log(colors.blue('el servidor se esta ejecutando en el puerto: ', PORT))
})

