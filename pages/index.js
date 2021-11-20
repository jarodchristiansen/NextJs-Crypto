import Link from 'next/link';
import {TradingViewEmbed, widgetType} from "react-tradingview-embed";
import LandingExplainer from '../components/landing/landing-explainer';
import SignUpOrIn from '../components/landing/sign-up-or-in';
import { useSession } from 'next-auth/client'
import { useMediaQuery } from "react-responsive";
import clientPromise from '../lib/mongodb'



function HomePage({isConnected}) {
  const [session, loading, status] = useSession();

  const isDesktopOrLaptop = useMediaQuery({
    query: `(max-width: 620px)`
  })

  console.log('session info', status)

  return(
      <div>
        {/*{isConnected ? (*/}
        {/*    <h2 className="subtitle">You are connected to MongoDB</h2>*/}
        {/*) : (*/}
        {/*    <h2 className="subtitle">*/}
        {/*      You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}*/}
        {/*      for instructions.*/}
        {/*    </h2>*/}
        {/*)}*/}
        <TradingViewEmbed
            widgetType={widgetType.TICKER_TAPE}
            widgetConfig={{
              showSymbolLogo: true,
              isTransparent: false,
              displayMode: "adaptive",
              colorTheme: "dark",
              autosize: true,
              symbols: [
                {
                  proName: "BITSTAMP:ETHUSD",
                  title: "ETH/USD"
                },
                {
                  proName: "BITSTAMP:BTCUSD",
                  title: "BTC/USD"
                },
                {
                  proName: "BINANCE:BNBUSDT",
                  title: "BNB/USDT"
                },
                {
                  proName: "BINANCE:ADAUSD",
                  title: "ADA/USD"
                },
                {
                  proName: "BINANCE:DOTUSDT",
                  title: "DOT/USDT"
                },
                {
                  proName: "BINANCE:UNIUSDT",
                  title: "UNI/USDT"
                }
              ]
            }}
        />

        <div className="explainer">
          {/*<LandingExplainer />*/}
        </div>

        <div className="screener">



          <div style={{marginLeft:"5%"}}>
            <TradingViewEmbed
                widgetType={widgetType.SCREENER_CRYPTOCURRENCY}
                widgetConfig={{
                  "width":97 + "%",
                    "height": isDesktopOrLaptop ? 650 : 500,
                  "defaultColumn": "overview",
                  "screener_type": "crypto_mkt",
                  "displayCurrency": "USD",
                  "colorTheme": "dark",
                  "locale": "en"
                }}/>
          </div>


          {/*<div>*/}
          {/*    {!isDesktopOrLaptop ? (*/}
          {/*        <div style={{marginLeft:"5%"}}>*/}
          {/*            <TradingViewEmbed*/}
          {/*                widgetType={widgetType.SCREENER_CRYPTOCURRENCY}*/}
          {/*                widgetConfig={{*/}
          {/*                    "width":97 + "%",*/}
          {/*                    "defaultColumn": "overview",*/}
          {/*                    "screener_type": "crypto_mkt",*/}
          {/*                    "displayCurrency": "USD",*/}
          {/*                    "colorTheme": "dark",*/}
          {/*                    "locale": "en"*/}
          {/*                }}/>*/}
          {/*        </div>*/}
          {/*    ) : (*/}
          {/*        <div style={{marginLeft:"4%"}}>*/}
          {/*            <div>*/}
          {/*                (Horizontal scrolling is enabled for mobile)*/}
          {/*            </div>*/}
          {/*            <TradingViewEmbed*/}
          {/*                widgetType={widgetType.SCREENER_CRYPTOCURRENCY}*/}
          {/*                widgetConfig={{*/}
          {/*                    "width":"100" + "%",*/}
          {/*                    "height": "600",*/}
          {/*                    "defaultColumn": "overview",*/}
          {/*                    "screener_type": "crypto_mkt",*/}
          {/*                    "displayCurrency": "USD",*/}
          {/*                    "colorTheme": "dark",*/}
          {/*                    "locale": "en"*/}
          {/*                }}/>*/}
          {/*            Mobile Flow*/}
          {/*            <div style={{height: '400px'}}></div>*/}
          {/*        </div>*/}

          {/*    )}*/}
          {/*</div>*/}
        </div>

      </div>
  )
}
export async function getServerSideProps(context) {
  console.log('this is clientPromise', clientPromise)
  const client = await clientPromise

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}



export default HomePage;