import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
import User from "../models/users.js"
import jwt from 'jsonwebtoken'


const controller = {
    signup: async (req, res, next) => {
        try {
            req.body.verified_code = crypto.randomBytes(10).toString('hex');
            req.body.password = bcryptjs.hashSync(req.body.password, 10);

            const user = await User.create(req.body)

            return res.status(201).json({
                success: true,
                message: 'Usuario registrado'
            })
        } catch (error) {
            next(error)
        }
    },

    signin: async (req, res, next) => {
        try {
            let user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: true },
                { new: true }
            )

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname
                },
                process.env.SECRET,
                { expiresIn: '8h' }
            )

            user.password = null;

            return res.status(200).json({
                succes: 'true',
                message: 'Usuario logueado correctamente',
                response: {
                    token,
                    user: {
                        name: user.name,
                        lastname: user.lastname,
                        email: user.email,
                        image: user.image
                    }
                }
            })

        } catch (error) {
            next(error)
        }
    },

    signout: async (req, res, next) => {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: false },
                { new: true }
            )
            return res.status(200).json({
                succes: true,
                message: 'Usuario deslogueado'
            })
        } catch (error) {
            next(error)
        }
    },

    token: async (req, res, next) => {
        const { user } = req
        try {
            return res.status(200).json({
                user: {
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    image: user.image
                },
            })
        } catch (error) {
            next(error)
        }
    },
}

export default controller;