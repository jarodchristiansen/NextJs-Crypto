import Link from 'next/link'
import fetch from 'unfetch'
import {useState, useEffect} from 'react';
import {Line, Bar} from 'react-chartjs-2';
import FinancialData from './financial-data';

import useSWR from 'swr'
import classes from './financial-chart.module.css';
import CardChart from "../../events/card-chart";
import {useMediaQuery} from "react-responsive";
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Scatter,
  ResponsiveContainer
} from "recharts";
import {Accordion, Col} from "react-bootstrap";




function FinancialChart(props) {
  let responseData;
  let volume = [];
  let timeArray = [];
  let volatility = [];
  let closes = [];
  let percentChange = [];
  let maxSupply = '';
  let oneDay = '';
  let sevenDay = '';
  let thirtyDay = '';
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const id = props.id;
  let key = '688o9wuzvzst3uybpg6eh';
  const fetcher = url => fetch(url).then(r => r.json());
  const { data, error } = useSWR(`https://api.lunarcrush.com/v2?data=assets&key=${key}&symbol=${id}&data_points=90&interval=day`, fetcher)



  //For onChain metrics (BTC/ETh)

  useEffect(() => {

}, [])

  // let data2 = [];

  if(data) {
  responseData = data.data[0].timeSeries;
  console.log('responsedata ----', responseData)
  maxSupply = data.data[0].max_supply;
  oneDay = data.data[0].percent_change_24h;
  sevenDay = data.data[0].percent_change_7d;
  thirtyDay = data.data[0].percent_change_30d;
    responseData.map((y) => {
    //   data2.push({
    //     date: new Date(y.time * 1000).toLocaleDateString(),
    //     volatility: y.volatility,
    //     close: y.close,
    //     open: y.open,
    //     high: y.high,
    //     low: y.low,
    //     volume: y.volume / 1000000,
    //   })


    volatility.push(((y.volatility * 10) * y.close));
    closes.push((y.close));
    timeArray.push(new Date(y.time * 1000).toLocaleDateString());
    percentChange.push((y.percent_change_24h * y.close) / 100);
    // contribArray.push(y.social_contributors)
    // urlArray.push(y.url_shares)
  })
  }



  const data2 = {
    labels: timeArray,
    datasets: [
      {
        type: 'line',
        label: 'Volatility % Scaled to Price',
        // backgroundColor: 'rgba(0, 0, 0, 0.56)',
        backgroundColor: 'white',
        data: volatility,
        borderColor: 'white',
        pointRadius: 1,
      },
      {
        type: 'line',
        label: 'Percent Change',
        backgroundColor: 'teal',
        data: percentChange,
        borderColor: 'teal',
        pointRadius: 1,
      },
      {
        type: 'bar',
        label: `Closing Price`,
        fill: false,
        lineTension: 0.1,
        // backgroundColor: 'rgba(75,192,192,0.4)',
        backgroundColor: 'rgba(264,0,0,0.5)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: closes
      },
    //   {
    //     type: 'line',
    //     label: 'Url Shares',
    //     backgroundColor: 'blue',
    //     data: urlArray,
    //     borderColor: 'blue',
    //     pointRadius: 1,
    //   }
    ],
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: `(max-width: 920px)`
  })

  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: 'center', textAlign: "center"}}>
    <h1>Financial Metrics</h1>

  <div className={'social1'}>
    {data && (
        <Accordion defaultActiveKey="0" >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Price & Volatility</Accordion.Header>
            <Accordion.Body style={{display: "flex", flexDirection: "row", width: '100%', justifyContent: "center", alignItems: "center", textAlign: "center"}}>
              <Bar
                  data={data2}
                  height={isDesktopOrLaptop ? 400 : 125}
                  style={{backgroundColor: "black"}}
              />
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
    )}


    {/* <ul>
    {socialGlobalArray.map((y) => {
      return <li key={y}>{y}</li>
    })}
    </ul> */}
  </div>

      <div>
        <div className={classes.dataHolder}>
          <FinancialData supply={maxSupply} one={oneDay} seven={sevenDay} thirty={thirtyDay}/>
        </div>





        {data && (
            <Accordion defaultActiveKey="0" >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Fib Retracements</Accordion.Header>
                <Accordion.Body style={{display: "flex", flexDirection: "row", width: '100%', alignItems: "center", textAlign: "center"}}>
                  <div className={classes.chart}>
                    <CardChart price={data} time_scale={90} symbol={id}/>
                  </div>
                  <div className={classes.chart}>
                    <CardChart price={data} time_scale={90} symbol={id}/>
                  </div>
                  <div className={classes.chart}>
                    <CardChart price={data} time_scale={90} symbol={id}/>
                  </div>
                  <div className={classes.chart}>
                    <CardChart price={data} time_scale={90} symbol={id}/>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
        )}

      </div>
  </div>
  )
}

export default FinancialChart;