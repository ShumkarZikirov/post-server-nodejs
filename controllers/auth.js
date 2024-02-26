import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// register
export const register = async (req,res) => {
    try {
        const {username,password} = req.body
        const isUsed = await User.findOne({username})
        if(isUsed){
            return res.json({
                message:'Данный username занять!!!'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)

        const newUser = new User({
            username,
            password: hash,
        })

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            {expiresIn:'30d'}
        )
        await newUser.save()

        res.json({
            newUser,
            message: 'Регистрация прошло успешно'
        })

    }catch (e) {
        res.json({message:'Ошибка при создании пользователя'})
    }
}
//login
export const login = async (req,res) => {
    try {
        const {username,password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return  res.json({
                message: 'Такого user не существует'
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.json({
                message:'Неверный пароль'
            })
        }
        const token = jwt.sign({
            id: user._id,
        },
           process.env.JWT_SECRET,
            {expiresIn: '30d'},
        )

        res.json({
            token,
            user,
            message:'Вы вошли в систему'
        })
    }catch (e) {
        return res.json({
            message:'Ошибка при авторизации'
        })
    }
}
// getMe
export const getMe = async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return  res.json({
                message: 'Такого user не существует'
            })
        }
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {expiresIn:'30d'}
        )
        res.json({
            user,
            token
        })
    }catch (e) {
        res.json({message:'Нет доступа'})
    }
}