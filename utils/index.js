import mongoose from "mongoose"
import jwt from 'jsonwebtoken'



function validarObjectId(id, res){
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('El Id no es válido')
        return res.status(400).json({
            msg: error.message
        })
    }
}
function handleNotFoundError(message, res){
    const error = new Error(message)
    return res.status(404).json({
        msg: error.message
    })
}
const uniqueId = () => Date.now().toString(32)+Math.random().toString(32).substring(2)

const generateJWT = (id) => {
    const token = jwt.sign( { id }, process.env.JWT_SECRET , {
        expiresIn: '30d', //2h.. etc
    })
    return token
}



export {
    validarObjectId,
    handleNotFoundError,
    uniqueId,
    generateJWT,

}