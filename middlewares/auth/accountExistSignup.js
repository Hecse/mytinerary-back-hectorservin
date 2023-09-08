import User from "../../models/users.js"

export const accountExistSignup = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).json({
            success: false,
            message: 'El usuario ya esta registrado'
        })
    }

    return next()
}