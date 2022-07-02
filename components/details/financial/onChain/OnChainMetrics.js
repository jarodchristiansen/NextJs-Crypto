import { useState, useEffect } from "react";
import fetch from "unfetch";
import useSWR from "swr";
import { Accordion } from "react-bootstrap";
import classes from "../financial-chart.module.css";
import StockToFlowChart from "./StockToFlowChart";
import SOPRChart from "./SOPRChart";
import VolumeChart from "../../../financialCharts/VolumeChart";
import ActiveAddressChart from "../../../onChainCharts/ActiveAddressChart";
import TransactionCountChart from "../../../onChainCharts/TransactionCountChart";
import TransactionMeanChart from "../../../onChainCharts/TransactionMeanChart";
import DifficultyRibbonChart from "../../../onChainCharts/DifficultyRibbonChart";
import PiCycleTopChart from "../../../onChainCharts/PiCycleTopChart";
import { getSession } from "next-auth/client";
import FadeIn from "react-fade-in";

export default function OnChainMetrics(props) {
  const { id } = props;

  // const fetcher = (url, token) =>  axios
  //     .get(url, { headers: { Authorization: "Bearer " + token } })
  //     .then((res) => res.data);
  //
  // const { data, error } = useSWR(`https://api.cryptoquant.com/v1/`, fetcher)
  const [stockToFlow, setStockToFlow] = useState();
  const [soprData, setSoprData] = useState();
  const [activeAddressData, setActiveAddressData] = useState([]);
  const [transactionData, setTransactionData] = useState({});
  const [difficultyRibbonData, setDifficultyRibbonData] = useState([]);
  const [piCycleData, setPiCycleData] = useState([]);
  const [isBTCorETH, setIsBTCorETH] = useState(
    (id && id === "BTC") || id === "ETH" || id === "LTC"
  );
  const [isBTC, setIsBTC] = useState(id && id === "BTC");
  const [lunarPriceData, setLunarPriceData] = useState();

  useEffect(() => {
    // fetchStockToFlow()
    // if (id === "BTC") {
    //     fetchSOPR()
    // }
    fetchActiveAddresses();
    isBTCorETH && fetchTransactionData();
    isBTC && fetchIndicatorData();
  }, []);

  useEffect(() => {
    let rawLunarData = sessionStorage.getItem(`lunarData:${id}`);
    if (rawLunarData) {
      rawLunarData = JSON.parse(rawLunarData);
      let priceData = rawLunarData?.data[0]?.timeSeries;
      priceData && setLunarPriceData(priceData);
    }
  }, []);

  let s2fData;

  const fetchActiveAddresses = async () => {
    let data = await fetch(
      `/api/asset-details/glassnode?symbol=${id}&requestType="active_addresses"`
    ).then((r) => r.json());

    data?.data && setActiveAddressData(data.data.splice(-365));
  };

  const fetchIndicatorData = async () => {
    let data = await fetch(`/api/indicators/indicators?symbol=${id}`).then(
      (r) => r.json()
    );

    // data?.data && setActiveAddressData(data.data);
    if (data && data?.data.length > 1) {
      let difficultyData = [];
      for (let i of data.data[0]) {
        difficultyData.push({
          t: new Date(i?.t * 1000).toLocaleDateString(),
          ma9: i.o.ma9 / 1000000000000000000,
          ma14: i.o.ma14 / 1000000000000000000,
          ma25: i.o.ma25 / 1000000000000000000,
          ma40: i.o.ma40 / 1000000000000000000,
          ma60: i.o.ma60 / 1000000000000000000,
          ma90: i.o.ma90 / 1000000000000000000,
          ma128: i.o.ma128 / 1000000000000000000,
          ma200: i.o.ma200 / 1000000000000000000,
        });
      }
      setDifficultyRibbonData(difficultyData.splice(-365));
      setSoprData(data.data[1].splice(-365));

      let s2fData = [];
      for (let i of data?.data[2]) {
        s2fData.push({
          t: new Date(i?.t * 1000).toLocaleDateString(),
          daysTillHalving: i.o.daysTillHalving,
          ratio: i.o.ratio,
        });
      }
      setStockToFlow(s2fData.splice(-365));

      let piData = [];
      for (let i of data?.data[3]) {
        piData.push({
          t: new Date(i?.t * 1000).toLocaleDateString(),
          ma111: i.o.ma111,
          ma350x2: i.o.ma350x2,
        });
      }
      setPiCycleData(piData.splice(-365));
    }
  };

  const fetchTransactionData = async () => {
    let data = await fetch(
      `/api/asset-details/transactionAnalytics?symbol=${id}`
    ).then((r) => r.json());

    // data?.data && setActiveAddressData(data.data);
    if (data && data?.data.length > 3) {
      let transactionsObject = {
        count: data.data[0].splice(-365),
        rate: data.data[1].splice(-365),
        size_mean: data.data[2].splice(-365),
        size_sum: data.data[3].splice(-365),
      };
      setTransactionData(transactionsObject);
    }
  };

  const fetchStockToFlow = async () => {
    s2fData = await fetch(`/api/on-chain/stock-to-flow`).then((r) => r.json());

    // for (let i of uniValues) {
    //   if (i["t"]) {
    //       i["t"] = new Date(i["t"]).getTime() / 10000
    //   } else {
    //     console.log("no time in this object")
    //   }
    // }

    if (s2fData) {
      let tempDataHolder = [];
      s2fData.map((y) => {
        tempDataHolder.push({
          time: y.t,
          halvingDays: y.o.daysTillHalving,
          ratio: y.o.ratio,
          e: 0.4 * y.o.ratio * 3.3,
          f: 0.28 * y.o.ratio * 3.3,
        });
      });

      setStockToFlow(tempDataHolder);
    } else {
      console.log("no s2f found");
    }
  };

  // const fetchSOPR = async () => {
  //     console.log('fetching sopr data ----')
  //     let sopr = await fetch(`/api/on-chain/sopr`).then(r => r.json())
  //     setSoprData(sopr)
  //     console.log("this is soprData", soprData)
  // }

  // console.log("this is the data", data)

  return (
    <div>
      <FadeIn transitionDuration={2000}>
        <Accordion defaultActiveKey={"1"}>
          {activeAddressData && activeAddressData.length > 1 && (
            <Accordion.Item eventKey="1">
              <Accordion.Header>Active Address Chart</Accordion.Header>
              <Accordion.Body>
                <ActiveAddressChart data={activeAddressData} />
              </Accordion.Body>
            </Accordion.Item>
          )}

          {transactionData && isBTCorETH && (
            <>
              <Accordion.Item eventKey={"2"}>
                <Accordion.Header>Transaction Count Chart</Accordion.Header>
                <Accordion.Body>
                  <TransactionCountChart data={transactionData.count} />{" "}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey={"3"}>
                <Accordion.Header>Transaction Mean Chart</Accordion.Header>
                <Accordion.Body>
                  <TransactionMeanChart data={transactionData.size_mean} />
                </Accordion.Body>
              </Accordion.Item>
            </>
          )}

          {difficultyRibbonData &&
            difficultyRibbonData.length > 1 &&
            lunarPriceData && (
              <Accordion.Item eventKey={"4"}>
                <Accordion.Header>Difficulty Ribbon Chart</Accordion.Header>
                <Accordion.Body>
                  <DifficultyRibbonChart
                    data={difficultyRibbonData}
                    lunarPriceData={lunarPriceData}
                  />
                </Accordion.Body>
              </Accordion.Item>
            )}

          {id === "BTC" && soprData && (
            <>
              <Accordion.Item eventKey={"5"}>
                <Accordion.Header>SOPR Chart</Accordion.Header>
                <Accordion.Body>
                  <SOPRChart data={soprData} />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey={"6"}>
                <Accordion.Header>Stock To Flow Chart</Accordion.Header>
                <Accordion.Body>
                  <StockToFlowChart data={stockToFlow} />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey={"7"}>
                <Accordion.Header>Pi Cycle top Indicator</Accordion.Header>
                <Accordion.Body>
                  <PiCycleTopChart
                    data={piCycleData}
                    lunarPriceData={lunarPriceData}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </>
          )}
        </Accordion>
      </FadeIn>
    </div>
  );
}

//
// export async function getStaticProps () {
//     const request = await fetch('/api/on-chain/stock-to-flow')
//     const json = await request.json()
//
//     return {
//         props: {
//             data: json.data
//         }
//     }
// }

// export default OnChainMetrics
