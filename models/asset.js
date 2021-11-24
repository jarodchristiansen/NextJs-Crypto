import mongoose from 'mongoose'
import {ObjectId} from "mongodb";

/* PetSchema will correspond to a collection in your MongoDB database. */
const Crypto_Asset = new mongoose.Schema({
    t: {
        type: Date
    },
    v: {
        type: Number
    },
    symbol: {
        type: String
    }
})

export default mongoose.models.Crypto_Asset || mongoose.model('Crypto_Asset', Crypto_Asset)