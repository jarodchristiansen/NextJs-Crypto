import axios from "axios";
var cache = require("memory-cache");

export default async (req, res) => {
  let id = req.query.symbol;
  let requestType = req.query.requestType;
  let timeSince = req.query.timeSince;
  let timeTil = req.query.timeTil;

  let GLASSNODE_KEY = "1pzEImQbuhq9Qj0LynC5b4oqQog";

  let data;
  // let testData = cache.get(
  //   `Data: assetAnalytics:${id} - requestType:${requestType}`,
  //   43200000,
  //   function (key, value) {
  //     console.log(key + " did " + value);
  //   }
  // );
  let testData = undefined;

  if (testData) {
    data = testData;
    console.log("testDta is there, setting from cache");
  } else {
    // data = await fetch(
    //   `https://api.glassnode.com/v1/metrics/transactions/count?a=${id}&api_key=${GLASSNODE_KEY}`
    // ).then((response) => response.json());
    await Promise.all([
      fetch(
        `https://api.glassnode.com/v1/metrics/indicators/difficulty_ribbon?a=${id}&api_key=${GLASSNODE_KEY}`
      ).then((resp) => resp.json()),
      fetch(
        `https://api.glassnode.com/v1/metrics/indicators/sopr?a=${id}&api_key=${GLASSNODE_KEY}`
      ).then((resp) => resp.json()),
      // fetch(
      //     `https://api.glassnode.com/v1/metrics/transactions/size_mean?a=${id}&api_key=${GLASSNODE_KEY}`
      // ).then((resp) => resp.json()),
      // fetch(
      //     `https://api.glassnode.com/v1/metrics/transactions/size_sum?a=${id}&api_key=${GLASSNODE_KEY}`
      // ).then((resp) => resp.json()),
    ]).then((result) => {
      console.log("this is the result in indicators", result);
      data = result;
    });
    // Hits this area if the value is no longer in the cache to prevent the data from being hit too frequently. currently 12 hours as it is on a daily UI
    // cache.put(
    //   `Data: assetAnalytics:${id} - requestType:${requestType}`,
    //   data,
    //   43200000,
    //   function (key, value) {
    //     console.log(key + " did " + value);
    //   }
    // );
  }

  res.json({ data: data });
};
