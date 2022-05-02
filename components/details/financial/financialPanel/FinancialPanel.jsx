import { useState, useEffect } from "react";
import fetch from "unfetch";
import FibonacciChart from "./FibonacciChart";
import FinancialChart from "../financial-chart";

const FinancialPanel = ({ id }) => {
  const [time] = useState(90);
  const [data, setData] = useState();

  let key = "688o9wuzvzst3uybpg6eh";

  const fetchPriceData = async () => {
    let priceData = await fetch(
      `/api/asset-details/lunardata?key=${key}&symbol=${id}&time=${time}`
    ).then((r) => r.json());
    if (priceData?.data) {
      let test = priceData?.data?.data[0]?.timeSeries.slice(time * -1);
      console.log("this is the testTime", priceData?.data);
      setData(priceData?.data);
      console.log("this is running fetchPriceData", priceData?.data);
    } else {
      console.log("unable to load data from endpoint");
      setError("unable to load data from endpoint");
    }
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

  useEffect(() => {
    fetchPriceData();
    // fetchUniswap();
  }, [time]);

  return (
    <div className={"col"}>
      <FibonacciChart priceData={data} />
    </div>
  );
};

export default FinancialPanel;