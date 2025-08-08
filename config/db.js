import mongoose from 'mongoose'
import colors from 'colors'

const connectedDB=async()=>{
   try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log(`Connected to mongodb database ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
      console.log(`Mongodb database error ${error}`.bgRed.white)
   }
}

export default connectedDB