import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import cookie from 'cookie'

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required']
    },
    email:{
        type:String,
         required:[true,'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[8, 'Password must be atleast 8 characters long']
    },
    customerId:{
       type:String,
       default:"" 
    },
    subscription:{
        type:String,
        default:""
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password, salt)
    next();
})

userSchema.methods.matchPassword= async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getSignedToken= function(response){
    const accessToken=JWT.sign({id:this._id}, process.env.JWT_ACCESS_SECRET, {expiresIn:JWT_ACCESS_EXPIREIN})
    const refreshToken=JWT.sign({id:this._id}, process.env.JWT_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_EXPIREIN})
    res.cookie('refreshToken', `${refreshToken}`, {
        maxAge:86400*7000,
        httpOnly:true,
    });
};

const model=mongoose.model('User', userSchema)
export default model
