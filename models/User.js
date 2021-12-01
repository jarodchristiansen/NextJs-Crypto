// models/User.js
import Adapters from "next-auth/adapters";

// Extend the built-in models using class inheritance
export default class User extends Adapters.TypeORM.Models.User.model {
  // You can extend the options in a model but you should not remove the base
  // properties or change the order of the built-in options on the constructor
  constructor(name, email, image, emailVerified) {
    super(name, email, image, emailVerified);
  }
}

export const UserSchema = {
  name: "User",
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    // Add your own properties to the User schema
  },
};

//
// //Not currently being used, just in testing to add with other authentication
//
// import mongoose from 'mongoose';
// var Schema = mongoose.Schema;
//
// var user = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     since: {
//         type: Date,
//         default: Date.now
//     }
// });
//
// // mongoose.models = {};
//
// let User = mongoose.model('User', user);
//
// export default mongoose.models.Pet || mongoose.model('User', user)
