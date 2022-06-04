import React, { useState, useEffect } from "react";
import fetch from "unfetch";
import FibonacciChart from "./FibonacciChart";
import FinancialChart from "../financial-chart";
import axios from "axios";
import * as stats from "simple-statistics";
import VolatilityChart from "../../../financialCharts/VolatilityChart";
import MarketDominanceChart from "../../../financialCharts/MarketDominanceChart";
import VolumeChart from "../../../financialCharts/VolumeChart";
import { useFetch } from "../../../../hooks/useFetch";
import { Accordion } from "react-bootstrap";
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import FadeIn from "react-fade-in";

const FinancialPanel = ({ id }) => {
  const [time, setTime] = useState(365);
  const [startDate, setStartDate] = useState();

  const [lunarData, setLunarData] = useState();
  const [tradData, setTradData] = useState();
  const [formattedCryptoData, setFormattedCryptoData] = useState([]);
  const [geckoData, setGeckoData] = useState([]);

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

      sessionStorage.setItem(
        `lunarData:${id}`,
        JSON.stringify(priceData?.data)
      );
    } else {
      console.log("unable to load data from endpoint");
      // setError("unable to load data from endpoint");
      fetchGeckoData();
    }
  };

  async function fetchGeckoData() {
    console.log("this is fetchGeckoData running", time);
    axios
      .get(
        `/api/coinGeckoData/?requestType=assetHistory&requestedAsset=${id.toLowerCase()}&startDate=${time}`
      )
      .then((res) => {
        // loadFavorited(res?.data);
        // console.log("this is results on the assets page", results);
        console.log("fetchGeckoData in financialPanel", res.data.data);

        if (res?.data?.data?.total_volumes) {
          let objs = res.data.data.total_volumes.map((x) => ({
            time: x[0],
            volume: x[1],
          }));
          console.log({ objs });
          setGeckoData(objs);
        }

        // if (res?.data?.data?.prices) {
        //   let objs = res.data.data.prices.map((x) => ({
        //     time: x[0],
        //     price: x[1],
        //   }));
        //   console.log({ objs });
        //   setGeckoData(objs);
        // }

        // let data = res.data.data;
        // const basicAssetDataObject = {
        //   block_time_in_minutes: data?.block_time_in_minutes,
        //   coingecko_score: data?.coingecko_score,
        //   community_data: data?.community_data,
        //   description: data?.description?.en,
        //   developer_data: data?.developer_data,
        //   developer_score: data?.developer_score,
        //   genesis_date: data?.genesis_date,
        //   hashing_algorithm: data?.hashing_algorithm,
        //   image: data?.image?.small || data?.image?.thumb,
        //   links: data?.links,
        //   liquidity_score: data?.liquidity_score,
        // };
        // setBasicAssetData(basicAssetDataObject);
        // setData(res.data.data);
        // if (res.data.data) {
        //   console.log("setting events with res.data.data", res.data.data);
        //   setEvents(res.data.data);
        //   setIsSearching(false);
        // } else {
        //   console.log("No data was found");
        // }
      })
      .catch((error) => {
        console.log("this is the error on fetchPriceData", error);
      });
  }

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
    let start =
      daysAgo.getMonth() +
      1 +
      "/" +
      daysAgo.getDate() +
      "/" +
      daysAgo.getFullYear();

    console.log({ start });

    setStartDate(start);
    return start;
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
          onClick={() => setTime(7)}
        >
          7
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

      <h3 className={"my-2"}>{time} Day View</h3>

      {lunarData && (
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Fibonacci Retracement Chart</Accordion.Header>
            <Accordion.Body>
              <FibonacciChart
                priceData={lunarData}
                time={time}
                setTime={(e) => setTime(e)}
              />
            </Accordion.Body>
          </Accordion.Item>

          {formattedCryptoData && formattedCryptoData?.length > 1 && (
            <>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Volatility Chart</Accordion.Header>
                <Accordion.Body>
                  <VolatilityChart data={formattedCryptoData} />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Market Dominance Chart</Accordion.Header>
                <Accordion.Body>
                  <MarketDominanceChart data={formattedCryptoData} />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>Volume Chart</Accordion.Header>
                <Accordion.Body>
                  <VolumeChart data={formattedCryptoData} />
                </Accordion.Body>
              </Accordion.Item>
            </>
          )}

          {geckoData && geckoData?.length > 1 && (
            <Accordion.Item eventKey="5">
              <Accordion.Header>Volume Chart</Accordion.Header>
              <Accordion.Body>
                <VolumeChart data={geckoData} />
              </Accordion.Body>
            </Accordion.Item>
          )}

          <Accordion.Item eventKey="6">
            <Accordion.Header>TradingView Chart</Accordion.Header>
            <Accordion.Body>
              <TradingViewEmbed
                widgetType={widgetType.ADVANCED_CHART}
                widgetConfig={{
                  interval: "1D",
                  colorTheme: "dark",
                  width: "100%",
                  symbol: id + "USD" || "BTCUSD",
                  studies: [
                    "MACD@tv-basicstudies",
                    "StochasticRSI@tv-basicstudies",
                    "TripleEMA@tv-basicstudies",
                  ],
                }}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}

      {/*{formattedCryptoData && formattedCryptoData?.length > 1 && (*/}
      {/*  <Accordion defaultActiveKey="0">*/}
      {/*    <Accordion.Item eventKey="1">*/}
      {/*      <Accordion.Header>Volatility Chart</Accordion.Header>*/}
      {/*      <Accordion.Body>*/}
      {/*        <VolatilityChart data={formattedCryptoData} />*/}
      {/*      </Accordion.Body>*/}
      {/*    </Accordion.Item>*/}
      {/*  </Accordion>*/}
      {/*)}*/}

      {/*{formattedCryptoData && formattedCryptoData?.length > 1 && (*/}
      {/*  <Accordion defaultActiveKey="0">*/}
      {/*    <Accordion.Item eventKey="1">*/}
      {/*      <Accordion.Header>Market Dominance Chart</Accordion.Header>*/}
      {/*      <Accordion.Body>*/}
      {/*        <MarketDominanceChart data={formattedCryptoData} />*/}
      {/*      </Accordion.Body>*/}
      {/*    </Accordion.Item>*/}
      {/*  </Accordion>*/}
      {/*)}*/}

      {/*{formattedCryptoData && formattedCryptoData?.length > 1 && (*/}
      {/*  <Accordion defaultActiveKey="0">*/}
      {/*    <Accordion.Item eventKey="1">*/}
      {/*      <Accordion.Header>Volume Chart</Accordion.Header>*/}
      {/*      <Accordion.Body>*/}
      {/*        <VolumeChart data={formattedCryptoData} />*/}
      {/*      </Accordion.Body>*/}
      {/*    </Accordion.Item>*/}
      {/*  </Accordion>*/}
      {/*)}*/}

      {/*{geckoData && geckoData?.length > 1 && (*/}
      {/*  <Accordion defaultActiveKey="0">*/}
      {/*    <Accordion.Item eventKey="1">*/}
      {/*      <Accordion.Header>Volume Chart</Accordion.Header>*/}
      {/*      <Accordion.Body>*/}
      {/*        <VolumeChart data={geckoData} />*/}
      {/*      </Accordion.Body>*/}
      {/*    </Accordion.Item>*/}
      {/*  </Accordion>*/}
      {/*)}*/}

      {/*{formattedCryptoData && formattedCryptoData?.length > 1 && (*/}
      {/*  <VolatilityChart data={formattedCryptoData} />*/}
      {/*)}*/}
      {/*{formattedCryptoData && formattedCryptoData?.length > 1 && (*/}
      {/*  <MarketDominanceChart data={formattedCryptoData} />*/}
      {/*)}*/}
      {/*{formattedCryptoData && formattedCryptoData?.length > 1 && (*/}
      {/*  <VolumeChart data={formattedCryptoData} />*/}
      {/*)}*/}

      {/*{geckoData && geckoData?.length > 1 && <VolumeChart data={geckoData} />}*/}
    </div>
  );
};

export default FinancialPanel;
