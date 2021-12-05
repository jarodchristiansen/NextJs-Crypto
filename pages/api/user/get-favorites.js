import { getSession } from "next-auth/client";
import { MongoClient } from "mongodb";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const userEmail = session.user.email;
  const favorite = req.body.data;

  let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

  const db = client.db("Crypto_Watch");

  const usersCollection = db.collection("users");

  const user = await usersCollection?.findOne({ email: userEmail });

  console.log("this is the user", user);

  if (!user) {
    res.status(400).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentFavorites = user?.favorites;

  if (currentFavorites) {
    res
      .status(200)
      .json({ message: "Favorites Data Gathered", data: currentFavorites });
  } else {
    res.status(402).json({ message: "No favorites data found" });
  }
  client.close();
}

export default handler;
