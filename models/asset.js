import mongoose from "mongoose";
import { ObjectId } from "mongodb";

/* PetSchema will correspond to a collection in your MongoDB database. */
const Crypto_Asset = new mongoose.Schema({
  t: {
    type: Date,
  },
  v: {
    type: Number,
  },
});

// {"_id":{"$oid":"619ea375d6dfa3077a95f46e"},"t":{"$date":{"$numberLong":"1279324800000"}},"v":{"$numberDouble":"1.0"}}

export default mongoose.models.Crypto_Asset ||
  mongoose.model("Crypto_Asset", Crypto_Asset);
