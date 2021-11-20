import { MongoClient } from 'mongodb';



export default async (req, res) => {


    let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

    const db = client.db();
    let assetCollection = db.collection("Crypto_Assets")

    console.log('this is client', client)
    console.log('this is assetCollection', assetCollection)
    // console.log('this is db', db)
    // if (assets) {
    //     res.json(assets)
    // } else {
    //     res.json('')
    // }


    //
    // try {
    //     await client.connect();
    // } catch (error) {
    //     res.status(500).json({ message: 'Could not connect to database.' });
    //     return;
    // }

    // console.log("this is client", client)
    // // const { db } = await connectToDatabase();
    // const { db } = client.db();
    //
    if (db) {
        const assets = await db.collection("Crypto_Assets")
            .find({})
            .sort((a, b) => a.id - b.id)
            .limit(20)
            .toArray();
        res.json(assets);
        console.log('assets----', assets)
    } else {
        console.log("no db")
        res.json('')
    }

};
