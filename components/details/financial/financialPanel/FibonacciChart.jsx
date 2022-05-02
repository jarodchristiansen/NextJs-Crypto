import Link from "next/link";
import fetch from "unfetch";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
// import FinancialData from "./financial-data";

import useSWR from "swr";
// import classes from "./financial-chart.module.css";
// import CardChart from "../../events/card-chart";
import { useMediaQuery } from "react-responsive";
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Scatter,
  ResponsiveContainer,
  Brush,
  Label,
} from "recharts";
import { Accordion, Col } from "react-bootstrap";
// import UniswapVolChart from "./uniswapVolChart";

function FibonacciChart(props) {
  let responseData;
  let volume = [];
  let timeArray = [];
  let volatility = [];
  let closes = [];
  let percentChange = [];
  let maxSupply = "";
  let oneDay = "";
  let sevenDay = "";
  let thirtyDay = "";

  const [chartData, setChartData] = useState();
  const [labels, setLabels] = useState();
  const [time, setTimeScale] = useState(90);

  let labelHolder = [];
  let chartHolder = [];
  let day;

  let fib1;
  let fib2;
  let fib3;
  let fib4;
  let data2 = [];
  let level1;
  let level2;
  let level3;
  let level4;
  let priceMax;
  let priceMin;
  let diff;

  let key = "1";

  const [data, setData] = useState(props.priceData);
  const [error, setError] = useState();

  useEffect(() => {
    setData(props.priceData);
    setChartData(props.priceData);
  }, [props]);

  useEffect(() => {
    if (data) {
      responseData = data.data[0].timeSeries.slice(time * -1);
      // console.log('responsedata ----', responseData)
      maxSupply = data.data[0].max_supply;
      oneDay = data.data[0].percent_change_24h;
      sevenDay = data.data[0].percent_change_7d;
      thirtyDay = data.data[0].percent_change_30d;

      let tempCloses = [];

      //Notes to calc fib levels
      for (let item of responseData) {
        tempCloses.push(item.close);
      }

      priceMax = Math.max(...tempCloses);
      priceMin = Math.min(...tempCloses);
      diff = priceMax - priceMin;

      level1 = priceMax - 0.236 * diff;
      level2 = priceMax - 0.382 * diff;
      level3 = priceMax - 0.5 * diff;
      level4 = priceMax - 0.618 * diff;

      // fib1 = new Array(time).fill(level1).flat()
      // fib2 = new Array(time).fill(level2).flat()
      // fib3 = new Array(time).fill(level3).flat()
      // fib4 = new Array(time).fill(level4).flat()

      responseData.map((y) => {
        data2.push({
          date: new Date(y.time * 1000).toLocaleDateString(),
          volatility: y.volatility,
          close: y.close,
          open: y.open,
          high: y.high,
          low: y.low,
          volume: y.volume / 1000000,
          fib1: level1,
          fib2: level2,
          fib3: level3,
          fib4: level4,
        });

        volatility.push(y.volatility * 10 * y.close);
        closes.push(y.close);
        timeArray.push(new Date(y.time * 1000).toLocaleDateString());
        percentChange.push(y.percent_change_24h * 100);
      });
      // processPrice(closes, time)
      console.log("this is data2", data2);
      setChartData(data2);
    }
  }, [data, time]);

  function processPrice(closes, time) {
    if (closes) {
      closes.map((y) => {
        chartHolder.push(y);
      });

      console.log("this is chartHolder", chartHolder);
      // setChartData(chartHolder)
      // setLabels(labelHolder)
      let priceMax = Math.max(...chartHolder);
      let priceMin = Math.min(...chartHolder);
      let diff = priceMax - priceMin;

      let level1 = priceMax - 0.236 * diff;
      let level2 = priceMax - 0.382 * diff;
      let level3 = priceMax - 0.5 * diff;
      let level4 = priceMax - 0.618 * diff;

      fib1 = new Array(time).fill(level1).flat();
      fib2 = new Array(time).fill(level2).flat();
      fib3 = new Array(time).fill(level3).flat();
      fib4 = new Array(time).fill(level4).flat();
      // setFib1(new Array(90).fill(level1).flat());
      // setFib2(new Array(90).fill(level2).flat());
      // setFib3(new Array(90).fill(level3).flat());
      // setFib4(new Array(90).fill(level4).flat());
    }
  }

  const isDesktopOrLaptop = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  const currencyFormat = (num) => {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <div>
        {data && (
          <div className={"border border-1"}>
            <h6>Fibonacci Retracement Chart</h6>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                className="standardized-button px-3"
                onClick={() => setTimeScale(90)}
              >
                90
              </button>
              <button
                type="button"
                className="standardized-button px-3"
                onClick={() => setTimeScale(30)}
              >
                30
              </button>
              <button
                type="button"
                className="standardized-button px-3"
                onClick={() => setTimeScale(14)}
              >
                14
              </button>
            </div>
            <h3 className={"my-2"}>{time} Day View</h3>
            <ResponsiveContainer height={!isDesktopOrLaptop ? 400 : 350}>
              <ComposedChart
                data={chartData}
                // margin={{
                //   top: 20,
                //   right: 20,
                //   bottom: 20,
                //   left: 20,
                // }}
              >
                {/*This is the background gradient*/}
                <svg x={0} y={1} fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient
                      id={key}
                      x1="50%"
                      y1="0%"
                      x2="50%"
                      y2="100%"
                    >
                      {/*<stop offset="0%" stopColor={'rgb(0,159,213)'} stopOpacity={1}/>*/}
                      {/*<stop offset="50%" stopColor={'rgb(0,113,160)'} stopOpacity={1}/>*/}
                      {/*<stop offset="99%" stopColor={'rgb(0,53,137)'} stopOpacity={1}/>*/}

                      <stop
                        offset="0%"
                        stopColor={"rgb(0,0,0)"}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="50%"
                        stopColor={"rgb(0,0,0)"}
                        stopOpacity={0.9}
                      />
                      <stop
                        offset="99%"
                        stopColor={"rgb(0,0,0)"}
                        stopOpacity={1}
                      />

                      {/*<stop offset="0%" style="stop-color:rgb(0,159,213);stop-opacity:1.00" />*/}
                      {/*<stop offset="50%" style="stop-color:rgb(0,113,160);stop-opacity:1.00" />*/}
                      {/*<stop offset="99%" style="stop-color:rgb(0,53,137);stop-opacity:1.00" />*/}
                    </linearGradient>
                  </defs>
                  <rect
                    fill={`url(#${key})`}
                    width={"100%"}
                    height={!isDesktopOrLaptop ? 400 : 350}
                  />
                </svg>

                {/*This is the area chart gradient*/}
                <defs>
                  <linearGradient
                    id="areaChartGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgb(12,0,220)"
                      stopOpacity={1}
                    />
                    <stop
                      offset="50%"
                      stopColor="rgb(0,131,255)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(130,210,238)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                {/*Buy level gradient*/}
                <defs>
                  <linearGradient id="BuyLevel" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="rgb(265,0,0)"
                      stopOpacity={1}
                    />
                    <stop
                      offset="50%"
                      stopColor="rgb(135,0,0)"
                      stopOpacity={1}
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(0,0,0)"
                      stopOpacity={1}
                    />
                  </linearGradient>
                </defs>

                {/*<defs>*/}
                {/*  <linearGradient id="MidZone" x1="0" y1="0" x2="0" y2="1">*/}
                {/*    <stop offset="0%" stopColor="rgb(220,194,0)" stopOpacity={1}/>*/}
                {/*    <stop offset="50%" stopColor="rgb(265,0,0)" stopOpacity={0.7}/>*/}
                {/*    <stop offset="100%" stopColor="rgb(265,0,0)" stopOpacity={0.2}/>*/}
                {/*  </linearGradient>*/}
                {/*</defs>*/}

                {/*Purple Gradient*/}
                <defs>
                  <linearGradient id="BuyLevel" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="rgb(265,0,0)"
                      stopOpacity={1}
                    />
                    <stop
                      offset="50%"
                      stopColor="rgb(135,0,0)"
                      stopOpacity={0.7}
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(0,0,0)"
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                </defs>

                {!isDesktopOrLaptop ? (
                  <XAxis
                    dataKey="date"
                    scale="band"
                    label={"Date"}
                    tick={{ fill: "white" }}
                    height={50}
                  />
                ) : (
                  <XAxis
                    dataKey="date"
                    scale="band"
                    label={"Date"}
                    tick={{ fill: "white" }}
                    height={0}
                  />
                )}

                {!isDesktopOrLaptop ? (
                  <YAxis
                    dataKey="close"
                    domain={["auto", "auto"]}
                    allowDataOverflow={true}
                    tick={{ fill: "white" }}
                    width={85}
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(value)
                    }
                  />
                ) : (
                  <YAxis
                    dataKey="close"
                    domain={["auto", "auto"]}
                    allowDataOverflow={true}
                    tick={{ fill: "white" }}
                    width={0}
                  />
                )}

                {/*<Brush dataKey="date" height={30} stroke="#8884d8" />*/}
                <Tooltip
                  position={isDesktopOrLaptop ? { x: 0, y: 350 } : { y: -100 }}
                  offset={300}
                  wrapperStyle={
                    isDesktopOrLaptop
                      ? { zIndex: 1, minWidth: "260px" }
                      : { zIndex: 1, minWidth: "300px" }
                  }
                  labelStyle={{
                    fontSize: "1.5rem",
                    color: "white",
                  }}
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 1)",
                  }}
                  formatter={(value) =>
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(value)
                  }
                />
                {!isDesktopOrLaptop && (
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconSize={30}
                    layout={"horizontal"}
                    align={"center"}
                  />
                )}

                <Area
                  type="monotone"
                  name="Take Profit 2"
                  dataKey="fib1"
                  fill="rgba(144, 60, 247, 1)"
                  legendType={"plainline"}
                  stroke="rgba(144, 60, 247, 1)"
                />
                <Area
                  type="monotone"
                  name="Take Profit 1"
                  dataKey="fib2"
                  fill="lime"
                  legendType={"plainline"}
                  stroke="lime"
                />
                <Area
                  type="monotone"
                  name="Mid Zone"
                  dataKey="fib3"
                  fill="yellow"
                  legendType={"plainline"}
                  stroke="yellow"
                />
                <Area
                  type="monotone"
                  name="Buy Area"
                  dataKey="fib4"
                  legendType={"plainline"}
                  fill="url(#BuyLevel)"
                  stroke="red"
                />
                {/*<Bar dataKey="close" barSize={20} fill="#413ea0" />*/}
                {/*<Line type="linear" dataKey="fib1" fill="#ff7300" />*/}
                <Area
                  type="natural"
                  name={"Daily Closing Price"}
                  dataKey="close"
                  fill="url(#areaChartGradient)"
                  legendType={"plainline"}
                  stroke={"rgb(12,0,220)"}
                  strokeWidth={1.25}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* <ul>
    {socialGlobalArray.map((y) => {
      return <li key={y}>{y}</li>
    })}
    </ul> */}
      </div>
    </div>
  );
}

export default FibonacciChart;
