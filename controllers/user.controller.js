import User from "../models/users.js";

const controller = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find(req.body);

            return res.status(200).json({
                success: true,
                users: users,
            })
        } catch (error) {
            next(error)
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            return res.status(200).json({
                success: true,
                message: 'User created',
            })

        } catch (error) {
            next(error)
        }
    },

    getUserById: async (req, res) => {
        try {
            console.log(req.params)
            const oneUser = await User.findById(req.params.id)

            if (oneUser) {
                return res.status(200).json({
                    success: true,
                    user: oneUser
                })
            }

            return res.status(404).json({
                success: false,
                message: 'User not found'
            })

        } catch (error) {
            next(error)
        }
    },

    updateUser: async (req, res) => {
        try {
            await User.updateOne({_id: req.params.id}, req.body)

            return res.status(200).json({
                success: true,
                message: 'Updated user',
            })

        } catch (error) {
            next(error)
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.deleteOne({_id: req.params.id}, req.body)

            return res.status(200).json({
                success: true,
                message: 'Deleted user',
            })

        } catch (error) {
            next(error)
        }
    },
}

export default controller;