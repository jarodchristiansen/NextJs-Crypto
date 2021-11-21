import { MongoClient, ObjectId } from 'mongodb';



export default async (req, res) => {


    let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

    let id = req.body

    if (id === "BTC") {
        id = "WBTC"
    }
    const db = client.db('Crypto_Watch');
    // let assetCollection = db.collection(`Crypto_Watch.Uniswap_Volume_Sum.${id}Volume`)
    //

    // console.log('this is db', db)
    // if (asset-details) {
    //     res.json(asset-details)
    // } else {
    //     res.json('')
    // }



    if (db) {
        let uniswap = await db.collection(`Uniswap_Volume_Sum.${id}Volume`)
            .find({_id: ObjectId('6199b9108e142bf14dc2dbe6')})
            .toArray();


        res.json('would be uniswap');



        const assets = await db.collection("Crypto_Assets")
            .find({})
            .sort((a, b) => a.id - b.id)
            .limit(20)
            .toArray();
        // res.json(assets);



        console.log('assets----', assets)
        console.log('uniswap-----', uniswap)

    } else {
        console.log("no db")
        res.json('')
    }

};
