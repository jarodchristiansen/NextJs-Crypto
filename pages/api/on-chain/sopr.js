import { MongoClient, ObjectId } from 'mongodb';



export default async (req, res) => {


    let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);


    const db = client.db('Crypto_Watch');
    let sopr = await db.collection(`BTC_SOPR`)

    let placeholderArray = []

    if (sopr) {
        // if (time) {
        //     let uniswap = await assetCollection.find({}).limit(time).toArray()
        //
        //     res.json(uniswap)
        // }
        let data = await sopr.find({}).toArray();


        for (let i=0; i <= data.length; i++) {
            if (i % 7 === 0) {
                placeholderArray.push(data[i])
            }
        }


        console.log("this is the weekly sopr data", placeholderArray)

        res.json(placeholderArray)

        // res.json({data: assetCollection})
    } else {
        res.status(400).json("no assetCollection")
    }
};