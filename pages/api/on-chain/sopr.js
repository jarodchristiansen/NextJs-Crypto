import { MongoClient, ObjectId } from 'mongodb';



export default async (req, res) => {


    let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);


    const db = client.db('Crypto_Watch');
    let sopr = await db.collection(`BTC_SOPR`)



    if (sopr) {
        // if (time) {
        //     let uniswap = await assetCollection.find({}).limit(time).toArray()
        //
        //     res.json(uniswap)
        // }
        let data = await sopr.find({}).toArray();

        console.log("this is the sopr data", data)
        res.json(data)

        // res.json({data: assetCollection})
    } else {
        res.status(400).json("no assetCollection")
    }
};