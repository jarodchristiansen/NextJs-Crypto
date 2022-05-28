import axios from "axios";
var cache = require("memory-cache");
var yahooFinance = require("yahoo-finance");
var util = require("util");
var _ = require("lodash");

export default async (req, res) => {
  // let time = parseInt(req.query.time);
  //
  let time = req.query.time;
  // let testData = cache.get(`lunarData: ${id}`);
  // var SYMBOLS = ["AAPL", "AMZN", "GOOGL", "NDX", "DXY"];
  var SYMBOLS = ["NDX"];
  let currentDate = new Date();
  let currentFormattedDate =
    currentDate.getMonth() +
    1 +
    "/" +
    currentDate.getDate() +
    "/" +
    currentDate.getFullYear();

  let data = await yahooFinance
    .historical({
      symbols: SYMBOLS,
      from: time,
      to: currentFormattedDate,
      period: "d",
    })
    .then(function (result) {
      // _.each(result, function (quotes, symbol) {
      //   console.log(util.format("=== %s (%d) ===", symbol, quotes.length));
      //   if (quotes[0]) {
      //     console.log(
      //       "%s\n...\n%s",
      //       JSON.stringify(quotes[0], null, 2),
      //       JSON.stringify(quotes[quotes.length - 1], null, 2)
      //     );
      //   } else {
      //     console.log("N/A");
      //   }
      // });

      result = Object.values(result)[0].sort((a, b) => {
        if (a.date === null) {
          return 1;
        }

        if (b.date === null) {
          return -1;
        }

        if (a.date === b.date) {
          return 0;
        }
        return a.date > b.date ? 1 : -1;
      });

      return result;
    });

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
  res.json({ data });
};
