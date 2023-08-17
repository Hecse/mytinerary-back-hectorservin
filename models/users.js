import { Schema, model, Types } from "mongoose";

let collection = 'users';

let schema = new Schema({
    name: { type:String, required:true },
    image : { type:String },
}, {
    timestamps: true
})

let User = model(collection, schema);

export default User;