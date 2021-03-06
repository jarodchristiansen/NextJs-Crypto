import axios from "axios";
const CoinGecko = require("coingecko-api");
var cache = require("memory-cache");

export default async (req, res) => {
  // `https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${id}&data_points=${time}&interval=day`,

  // let key = req.query.key;
  // let id = req.query.symbol;
  // let time = parseInt(req.query.time);
  //
  // let testData = cache.get(`lunarData: ${id}`);
  //
  // let data;
  // if (testData) {
  //     data = testData;
  //     console.log("testDta is there, setting from cache");
  // } else {
  //     data = await fetch(
  //         `https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${id}&data_points=${time}&interval=day`
  //     ).then((response) => response.json());
  //
  //     //Hits this area if the value is no longer in the cache to prevent the data from being hit too frequently. currently 12 hours as it is on a daily UI
  //     cache.put(`lunarData: ${id}`, data, 43200000, function (key, value) {
  //         console.log(key + " did " + value);
  //     });
  // }
  const CoinGeckoClient = new CoinGecko();
  let requestType = req.query?.requestType;
  let numberOfResults = req.query?.numberOfResults;
  let requestedAsset = req.query?.requestedAsset;
  let startDate = req.query?.startDate;

  let data;
  if (requestType === "allData") {
    // coins.all()
    // List all coins with data (name, price, market, developer, community, etc) - paginated by 50.
    //
    // Official documentation: https://www.coingecko.com/api/docs/v3#/coins/get_coins
    //
    //     Params:
    //
    //         params: Object - Parameters to pass through to the request
    // params.order: String - Order results by CoinGecko.ORDER[*]
    // params.per_page: Number - Total results per page
    // params.page: Number - Page through results
    // params.localization: Boolean [default: true] - Set to false to exclude localized languages in response
    // params.sparkline: Boolean [default: false] - Include sparkline 7 days data

    data = await CoinGeckoClient.coins.all({ per_page: numberOfResults });

    cache.put(
      `coinGecko: ${requestType} - ${numberOfResults}`,
      data,
      43200000,
      function (key, value) {
        console.log(key + " did " + value);
      }
    );
  } else if (requestType === "specifiedAsset") {
    let assetList = await CoinGeckoClient.coins.list();
    assetList = assetList?.data;
    cache.put(`coinGeckoAssetList`, assetList, 43200000, function (key, value) {
      console.log(key + " did " + value);
    });

    let filteredList = assetList.filter((obj) => {
      return obj.symbol === requestedAsset;
    });

    if (filteredList.length) {
      let filteredObject = filteredList[0];
      console.log("this is the filteredObject", filteredObject);
      console.log("this is filteredObject.id", filteredObject.id);
      data = await CoinGeckoClient.coins.fetch(filteredObject.id, {
        market_data: true,
      });
    }
  } else if (requestType === "assetHistory") {
    let assetList = await CoinGeckoClient.coins.list();
    assetList = assetList?.data;
    cache.put(`coinGeckoAssetList`, assetList, 43200000, function (key, value) {
      console.log(key + " did " + value);
    });

    let filteredList = assetList.filter((obj) => {
      return obj.symbol === requestedAsset;
    });

    if (filteredList.length) {
      let filteredObject = filteredList[0];
      console.log("startDate from endpoint", startDate);
      data = await CoinGeckoClient.coins.fetchMarketChart(filteredObject.id, {
        days: startDate,
      });
      console.log("data from assetHistory", data);
    }
  } else if (requestType === "exchangeData") {
    data = await CoinGeckoClient.exchanges.all({ per_page: numberOfResults });
    cache.put(
      `coinGecko: ${requestType} - ${numberOfResults}`,
      data,
      43200000,
      function (key, value) {
        console.log(key + " did " + value);
      }
    );
  }
  // data = await CoinGeckoClient.exchanges.all({ per_page: numberOfResults });

  res.json(data);

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
