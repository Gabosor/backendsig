import mongoose from "mongoose";
import colors from 'colors'
export const db = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log(colors.bgGreen.black("MongoDB se conectó correctamente"))
    } catch (error) {
        console.log(`Error ${error}`)
        process.exit(1)
    }
}