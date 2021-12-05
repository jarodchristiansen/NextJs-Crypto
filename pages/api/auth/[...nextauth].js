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
  callbacks: {
    async session(session, token) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.accessToken = user._id;
        token.user = user;
      }
      return token;
    },
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
      async authorize(credentials) {
        let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

        const db = client.db("Crypto_Watch");

        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        console.log("this is the user", user);

        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log you in");
        }

        let userCopy = JSON.parse(JSON.stringify(user));

        delete userCopy["password"];

        console.log("user/userCopy ----", user, userCopy);

        return userCopy;

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
