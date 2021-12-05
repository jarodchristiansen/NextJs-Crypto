import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { MongoClient } from "mongodb";
import { verifyPassword } from "../../../lib/auth";

const options = {
  // site: process.env.NEXTAUTH_URL,
  session: {
    jwt: true,
  },
  providers: [
    // Providers.Email({
    //   server: {
    //     port: 465,
    //     host: "smtp.gmail.com",
    //     secure: true,
    //     auth: {
    //       user: process.env.EMAIL_USERNAME,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //     tls: {
    //       rejectUnauthorized: false,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    Providers.Credentials({
      async authorize(credentials, req) {
        let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

        const db = client.db();

        const usersCollection = db.collection("Crypto_Watch.users");

        console.log("this is usersCollection", usersCollection);

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        console.log("this is credentials.email", credentials.email);

        console.log("this is the user", user);

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          users.password
        );

        if (!isValid) {
          throw new Error("Could not log you in");
        }

        return { email: user.email };

        client.close();
      },
    }),
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // Providers.Google({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // Providers.Facebook({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // Providers.Twitter({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
  ],
  // database: process.env.MONGODB_URI,
  // pages: {
  //   signIn: "/login",
  // },
};
//
// export default async function auth(req, res, options) {
//     return await NextAuth(req, res, options, {
//         adapter: MongoDBAdapter({
//             db: (await clientPromise).db("your-database")
//         }),
//     })
// }

export default async (req, res) => NextAuth(req, res, options);
