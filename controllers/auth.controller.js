import express from "express";
import crypto from 'crypto'
import bcryptjs from 'bcrypt'
import User from "../models/users.js";


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
            res.status(500)
        }
    } 
}

export default controller;