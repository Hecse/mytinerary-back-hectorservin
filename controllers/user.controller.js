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
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error getting user'
            })
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
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error creating user'
            })
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
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Error getting user'
            })
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
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Failed to update user'
            })
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
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Failed to delete user'
            })
        }
    },
}

export default controller;