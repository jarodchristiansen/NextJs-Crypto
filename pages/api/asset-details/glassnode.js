import axios from "axios";
var cache = require("memory-cache");

export default async (req, res) => {
  let id = req.query.symbol;
  let requestType = req.query.requestType;
  let timeSince = req.query.timeSince;
  let timeTil = req.query.timeTil;

  let GLASSNODE_KEY = "1pzEImQbuhq9Qj0LynC5b4oqQog";

  let data;
  let testData = cache.get(
    `Data: glassNode:${id} - requestType:${requestType}`,
    43200000,
    function (key, value) {
      console.log(key + " did " + value);
    }
  );
  if (testData) {
    data = testData;
    console.log("testDta is there, setting from cache");
  } else {
    data = await fetch(
      `https://api.glassnode.com/v1/metrics/addresses/active_count?a=${id}&timestamp_format=humanized&api_key=${GLASSNODE_KEY}`
    ).then((response) => response.json());

    // Hits this area if the value is no longer in the cache to prevent the data from being hit too frequently. currently 12 hours as it is on a daily UI
    cache.put(
      `Data: glassNode:${id} - requestType:${requestType}`,
      data,
      43200000,
      function (key, value) {
        console.log(key + " did " + value);
      }
    );
  }

  res.json({ data: data });
};
