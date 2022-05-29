import { useState, useEffect } from "react";
import fetch from "unfetch";
import FibonacciChart from "./FibonacciChart";
import FinancialChart from "../financial-chart";
import axios from "axios";
import * as stats from "simple-statistics";
import VolatilityChart from "../../../financialCharts/VolatilityChart";
import MarketDominanceChart from "../../../financialCharts/MarketDominanceChart";
import VolumeChart from "../../../financialCharts/VolumeChart";
import { useFetch } from "../../../../hooks/useFetch";

const FinancialPanel = ({ id }) => {
  const [time, setTime] = useState(180);
  const [daysAgoDate, setDaysAgoDate] = useState();

  const [lunarData, setLunarData] = useState();
  const [tradData, setTradData] = useState();
  const [formattedCryptoData, setFormattedCryptoData] = useState([]);

  const formatFinancialData = async (cryptoData) => {
    console.log("this is cryptoData in formatFInancialData", cryptoData);
    let financeDataArray = [];
    if (cryptoData && cryptoData.length > 1) {
      for (let i of cryptoData) {
        financeDataArray.push({
          time: new Date(i?.time * 1000).toLocaleDateString(),
          high: i.high,
          low: i.low,
          close: i.close,
          volatility: i.volatility,
          market_dominance: i.market_dominance,
          volume: i.volume,
        });
      }
      setFormattedCryptoData(financeDataArray.slice(time * -1));
    }
  };

  let key = "688o9wuzvzst3uybpg6eh";

  const fetchLunarData = async () => {
    let priceData = await fetch(
      `/api/asset-details/lunardata?key=${key}&symbol=${id}&time=${time}`
    ).then((r) => r.json());
    if (priceData?.data) {
      let test = priceData?.data?.data[0]?.timeSeries.slice(time * -1);
      console.log("this is the testTime", priceData?.data);
      setLunarData(priceData?.data);
      formatFinancialData(priceData?.data?.data[0]?.timeSeries);
    } else {
      console.log("unable to load data from endpoint");
      setError("unable to load data from endpoint");
    }
  };

  const fetchTradHistory = async (date) => {
    console.log("this is fetchTradeHistoryDate", date);
    let traditionalData = await fetch(
      `/api/trad-asset-data/?time=${date}`
    ).then((r) => r.json());
    // console.log("this is priceData in fetchTradHistory", traditionalData);

    if (traditionalData.data) {
      setTradData(traditionalData.data);
    } else {
      console.log("fetchTradHistory Failing");
    }

    // if (priceData?.data) {
    //   // let test = priceData?.data?.data[0]?.timeSeries.slice(time * -1);
    //   if (Object.values(priceData?.data).length) {
    //     let sortedData = Object.values(priceData?.data)[0].sort((a, b) =>
    //       a.date > b.date ? 1 : -1
    //     );
    //     console.log("this is the sortedData in fetchTradHistory", sortedData);
    //     setTradData(sortedData);
    //   }
    //   // setLunarData(priceData?.data);
    //   // calcFinancialData(priceData?.data?.data[0]?.timeSeries);
    // } else {
    //   console.log("unable to load data from trad endpoint");
    //   // setError("unable to load data from endpoint");
    // }
  };

  const fetchUniswap = async () => {
    let uniValues = await fetch(
      `/api/asset-details/uniswap?id=${id}&time=${time}`
    ).then((r) => r.json());

    // for (let i of uniValues) {
    //   if (i["t"]) {
    //       i["t"] = new Date(i["t"]).getTime() / 10000
    //   } else {
    //     console.log("no time in this object")
    //   }
    // }

    if (uniValues.length > 1) {
      setUniswapData([...uniValues]);
    }
  };

  function getDateXDaysAgo(numOfDays, date = new Date()) {
    let daysAgo = new Date(date.getTime());

    daysAgo.setDate(date.getDate() - numOfDays);
    let startDate =
      daysAgo.getMonth() +
      1 +
      "/" +
      daysAgo.getDate() +
      "/" +
      daysAgo.getFullYear();

    console.log({ startDate });

    return startDate;
  }

  useEffect(() => {
    fetchLunarData();
    getDateXDaysAgo(time);
    // daysAgoDate && fetchTradHistory(daysAgoDate);
    // fetchUniswap();
    console.log({ time });
  }, [time]);

  return (
    <div className={"col"}>
      <div className={"my-4"}>
        {/*<btn className={"standardized-button"}>Get Trad Charts</btn>*/}
      </div>

      <div
        className="btn-group mb-3"
        role="group"
        aria-label="Basic outlined example"
      >
        <button
          type="button"
          className="standardized-button px-3"
          onClick={() => setTime(3)}
        >
          3
        </button>

        <button
          type="button"
          className="standardized-button px-3"
          onClick={() => setTime(7)}
        >
          7
        </button>

        <button
          type="button"
          className="standardized-button px-3"
          onClick={() => setTime(14)}
        >
          14
        </button>

        <button
          type="button"
          className="standardized-button px-3"
          onClick={() => setTime(30)}
        >
          30
        </button>
        <button
          type="button"
          className="standardized-button px-3"
          onClick={() => setTime(90)}
        >
          90
        </button>

        <button
          type="button"
          className="standardized-button px-3"
          onClick={() => setTime(180)}
        >
          180
        </button>

        <button
          type="button"
          className="standardized-button px-3"
          onClick={() => setTime(365)}
        >
          365
        </button>
      </div>

      {lunarData && (
        <FibonacciChart
          priceData={lunarData}
          time={time}
          setTime={(e) => setTime(e)}
        />
      )}

      {formattedCryptoData && <VolatilityChart data={formattedCryptoData} />}
      {formattedCryptoData && (
        <MarketDominanceChart data={formattedCryptoData} />
      )}
      {formattedCryptoData && <VolumeChart data={formattedCryptoData} />}
    </div>
  );
};

export default FinancialPanel;
