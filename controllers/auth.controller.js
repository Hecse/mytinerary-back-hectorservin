import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
import User from "../models/users.js"
import jwt from 'jsonwebtoken'
import { verify } from '../helpers/google_verify.js'

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

    googlesignin: async (req, res, next) => {
        const { token_id } = req.body;

        try {
            const { name, lastname, image, email } = await verify(token_id)

            // si encuentra el usuario trae los datos de google 
            let user = await User.findOne({ email });

            // si el usuario no existe lo crea
            if (!user) {
                const data = {
                    name,
                    lastname,
                    image,
                    email,
                    password: bcryptjs.hashSync(process.env.STANDARD_PASS, 10),
                    google: true,
                    verified_code: crypto.randomBytes(10).toString('hex')
                }

                user = await User.create(data)
            }

            user.online = true;
            await user.save()

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

            res.status(200).json({
                succes: 'true',
                message: 'Usuario logueado correctamente con Google',
                response: {
                    token,
                    user: {
                        name: user.name,
                        lastname: user.lastname,
                        email: user.email,
                        image: user.image
                    },
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