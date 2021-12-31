import axios from "axios";

export default async (req, res) => {
  // `https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${id}&data_points=${time}&interval=day`,

  let key = req.query.key;
  let id = req.query.symbol;
  let time = parseInt(req.query.time);

  let data = await fetch(
    `https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${id}&data_points=${time}&interval=day`
  ).then((response) => response.json());

  console.log("lunardata endpoint hit yyeeeeeeeet", data);
  res.json({ data: data });

  // if (assetCollection) {
  //   if (time) {
  //     let uniswap = await assetCollection.find({}).limit(time).toArray();
  //
  //     res.json(uniswap);
  //   }
  //   console.log("time is not defined", time);
  //   // res.json({data: assetCollection})
  // } else {
  //   res.status(400).json("no assetCollection");
  // }
};
