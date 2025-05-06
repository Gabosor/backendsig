import User from '../models/User.js'

import { generateJWT, uniqueId } from '../utils/index.js'

const register = async (req, res) => {
     const {email, password, name} = req.body
     const userExists = await User.findOne({email})
     if(userExists){
        const error = new Error('Usario ya registrado')
        return res.status(400).json({ msg: error.message   })
     }
     try {
        const user = new User(req.body)
        await user.save()
        res.json({
            msg: "El usuario se creo correctamente"
        })
     } catch (error) {
        console.log(error)
     }
}
const login = async (req, res) => {
    const {email , password } = req.body
    const user = await User.findOne({email})
    if(!user){
        const error = new Error('El usuario no existe')
        return res.status(401).json({
            msg: error.message
        })
    }
    if(await user.checkPassword(password)){
        const token = generateJWT(user._id)
        return res.json({
           token
        })
    }else{
       const error = new Error('El password es incorrecto')
        return res.status(401).json({
            msg: error.message
        }) 
    }
}
const user = async (req, res) => {
    const { user } = req
    res.json(user)
}


export {
    register,
    login,
    user,
}