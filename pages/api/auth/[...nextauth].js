import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb";





const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        Providers.Twitter({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
        }),
    ],
    pages: {
        signIn: '/login',
    },

}
//
// export default async function auth(req, res, options) {
//     return await NextAuth(req, res, options, {
//         adapter: MongoDBAdapter({
//             db: (await clientPromise).db("your-database")
//         }),
//     })
// }


export default async (req, res) => NextAuth(req, res, options, {
    adapter: MongoDBAdapter({
        db: (await clientPromise).db("Crypto_Watch")
    }),
})