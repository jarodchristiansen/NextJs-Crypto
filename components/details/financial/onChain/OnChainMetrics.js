import { useState, useEffect } from "react";
import fetch from "unfetch";
import useSWR from "swr";
import { Accordion } from "react-bootstrap";
import classes from "../financial-chart.module.css";
import StockToFlowChart from "./StockToFlowChart";
import SOPRChart from "./SOPRChart";
import VolumeChart from "../../../financialCharts/VolumeChart";
import ActiveAddressChart from "../../../onChainCharts/ActiveAddressChart";

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

  const isBTCorETH = (id && id === "BTC") || id === "ETH" || id === "LTC";
  useEffect(() => {
    // fetchStockToFlow()
    // if (id === "BTC") {
    //     fetchSOPR()
    // }
    fetchActiveAddresses();
    isBTCorETH && fetchTransactionData();
  }, []);

  let s2fData;

  const fetchActiveAddresses = async () => {
    let data = await fetch(
      `/api/asset-details/glassnode?symbol=${id}&requestType="active_addresses"`
    ).then((r) => r.json());

    data?.data && setActiveAddressData(data.data);
  };

  const fetchTransactionData = async () => {
    let data = await fetch(
      `/api/asset-details/transactionAnalytics?symbol=${id}`
    ).then((r) => r.json());
    console.log("this is fetchTransactions data", data);
    // data?.data && setActiveAddressData(data.data);
  };

  const fetchStockToFlow = async () => {
    console.log("fetchStockToFlow running");
    s2fData = await fetch(`/api/on-chain/stock-to-flow`).then((r) => r.json());

    // for (let i of uniValues) {
    //   if (i["t"]) {
    //       i["t"] = new Date(i["t"]).getTime() / 10000
    //   } else {
    //     console.log("no time in this object")
    //   }
    // }

    if (s2fData) {
      console.log("this is s2fData", s2fData);
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
      {activeAddressData && activeAddressData.length > 1 && (
        <ActiveAddressChart data={activeAddressData.splice(-365)} />
      )}

      {id === "BTC" && soprData && (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>BTC Stats</Accordion.Header>
            <Accordion.Body
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div className={classes.chart}>
                <SOPRChart data={soprData} />
              </div>
              {/*<div className={classes.chart}>*/}
              {/*  <CardChart price={data} time_scale={90} symbol={id}/>*/}
              {/*</div>*/}
              {/*<div className={classes.chart}>*/}
              {/*  <CardChart price={data} time_scale={90} symbol={id}/>*/}
              {/*</div>*/}
              {/*<div className={classes.chart}>*/}
              {/*  <CardChart price={data} time_scale={90} symbol={id}/>*/}
              {/*</div>*/}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
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
