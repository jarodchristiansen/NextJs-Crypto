import { useState, useEffect } from 'react';
import fetch from "unfetch";
import useSWR from "swr";
import {Accordion} from "react-bootstrap";
import classes from "../financial-chart.module.css";
import StockToFlowChart from "./StockToFlowChart";

export default function OnChainMetrics (props) {

    const { id } = props

    // const fetcher = (url, token) =>  axios
    //     .get(url, { headers: { Authorization: "Bearer " + token } })
    //     .then((res) => res.data);
    //
    // const { data, error } = useSWR(`https://api.cryptoquant.com/v1/`, fetcher)
    const [stockToFlow, setStockToFlow] = useState()


    useEffect(() => {
        fetchStockToFlow()
    }, [])

    let s2fData;

    const fetchStockToFlow = async () => {
        console.log("fetchStockToFlow running")
        s2fData = await fetch(`/api/on-chain/stock-to-flow`).then(r => r.json())

        // for (let i of uniValues) {
        //   if (i["t"]) {
        //       i["t"] = new Date(i["t"]).getTime() / 10000
        //   } else {
        //     console.log("no time in this object")
        //   }
        // }

        if (s2fData) {
            console.log("this is s2fData", s2fData)
            let tempDataHolder = []
            s2fData.map((y) => {
                tempDataHolder.push({'time': y.t, 'halvingDays': y.o.daysTillHalving, 'ratio': y.o.ratio})
            })

            setStockToFlow(tempDataHolder)
        } else {
            console.log("no s2f found")
        }

    }


    // console.log("this is the data", data)

    return (
        <div>
            {id === "BTC"  && (
                <Accordion defaultActiveKey="0" >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>BTC Stats</Accordion.Header>
                        <Accordion.Body style={{display: "flex", flexDirection: "row", width: '100%', alignItems: "center", textAlign: "center"}}>
                            <div className={classes.chart}>

                                <StockToFlowChart data={stockToFlow}/>
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
    )

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