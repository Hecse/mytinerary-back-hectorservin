import User from "../models/Users.js";

const controller = {
    getUsers: (req, res) => {
        res.json({
            user: 'Hector Servin'
        });
    },

    createUser: async(req, res) => {
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
                message: 'error creating user'
            })            
        }
    },

    deletetUser: () => {},
}

export default controller;