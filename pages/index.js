import Link from "next/link";
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import LandingExplainer from "../components/landing/landing-explainer";
import SignUpOrIn from "../components/landing/sign-up-or-in";
import { useSession, getSession } from "next-auth/client";
import { useMediaQuery } from "react-responsive";
import clientPromise from "../lib/mongodb";
import { initializeStore, useStore } from "../store";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function HomePage({ isConnected, initialReduxState }) {
  const [session, loading, status] = useSession();
  const [containerVisible, setContainerVisible] = useState(false);

  const { dispatch } = useStore();

  const isDesktopOrLaptop = useMediaQuery({
    query: `(max-width: 620px)`,
  });

  const textBlocks = {
    mainExplainer: {
      headerText: "Affordable Metrics For Decentralized Assets",
      subHeaderText: "Affordable Prices for helpful insights",
      description:
        "Metrics that benefit everyone, not just those that can afford thousands of dollars in subscriptions to make better investment choices",
      modalHeader: "Useful Metrics for Crypto Assets",
      modalBodyText:
        "Insightful metrics at affordable prices to make crypto available to everyone, not just those who already have an advantage.",
      modalBodyImage: "",
    },
    userProfiles: {
      headerText: "User Profile Customization",
      subHeaderText: "Portfolio Building",
      description:
        "Track your favorite assets and build your portfolio using our portfolio tracker, engage based on favorited assets",
      modalHeader: "User Profile Dashboard",
      modalBodyText: "",
      modalBodyImage: "",
    },
    socialMetrics: {
      headerText: "Realtime Social Metrics",
      subHeaderText: "Social Media Metrics To Track Engagement",
      description:
        "Social media and search engine metrics to help identify the hottest assets as they start ot trend",
      modalHeader: "Social Metrics",
      modalBodyText: "",
      modalBodyImage: "",
    },
    financialMetrics: {
      headerText: "Financial Metrics",
      subHeaderText: "Stastical Models Made For You",
      description:
        "Ready made statistical models to quickly view some of the most important components of an asset before investing.",
      modalHeader: "Useful Metrics for Crypto Assets",
      modalBodyText: "",
      modalBodyImage: "",
    },
    onChainMetrics: {
      headerText: "On-chain Metrics",
      subHeaderText: "Fundamental Analysis",
      description:
        "Fundamental metrics of asset usage and flows to give you insight into market movements",
      modalHeader: "Useful Metrics for Crypto Assets",
      modalBodyText: "",
      modalBodyImage: "",
    },
  };

  useEffect(() => {
    console.log("this is continaerVisible", containerVisible);
    !containerVisible && setContainerVisible(true);
  }, []);

  return (
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
              title: "ETH/USD",
            },
            {
              proName: "BITSTAMP:BTCUSD",
              title: "BTC/USD",
            },
            {
              proName: "BINANCE:BNBUSDT",
              title: "BNB/USDT",
            },
            {
              proName: "BINANCE:ADAUSD",
              title: "ADA/USD",
            },
            {
              proName: "BINANCE:DOTUSDT",
              title: "DOT/USDT",
            },
            {
              proName: "BINANCE:UNIUSDT",
              title: "UNI/USDT",
            },
          ],
        }}
      />

      <div className="screener">
        <div>
          {/*<TradingViewEmbed*/}
          {/*  widgetType={widgetType.SCREENER_CRYPTOCURRENCY}*/}
          {/*  widgetConfig={{*/}
          {/*    width: 97 + "%",*/}
          {/*    height: isDesktopOrLaptop ? 650 : 800,*/}
          {/*    defaultColumn: "overview",*/}
          {/*    screener_type: "crypto_mkt",*/}
          {/*    displayCurrency: "USD",*/}
          {/*    colorTheme: "dark",*/}
          {/*    locale: "en",*/}
          {/*  }}*/}
          {/*/>*/}
          <div className="container">
            <div className={"row row-cols-1"}>
              <div className="col">
                <div className="explainer">
                  {<LandingExplainer text={textBlocks.mainExplainer} />}
                </div>
              </div>
            </div>
            <div className="row row-cols-2">
              <div className="col">
                <div className="explainer">
                  {<LandingExplainer text={textBlocks.userProfiles} />}
                </div>
              </div>
              <div className="col">
                <div className="explainer">
                  {<LandingExplainer text={textBlocks.socialMetrics} />}
                </div>
              </div>
              <div className="col">
                <div className="explainer">
                  {<LandingExplainer text={textBlocks.financialMetrics} />}
                </div>
              </div>
              <div className="col">
                <div className="explainer">
                  {<LandingExplainer text={textBlocks.onChainMetrics} />}
                </div>
              </div>
            </div>
          </div>
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
  );
}
export async function getServerSideProps(context, req) {
  const client = await clientPromise;
  const session = await getSession({ req });
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  //
  // console.log('this is the client', client)
  // console.log("this is the session", session)
  // // dispatch({
  // //     type: 'TICK',
  // //     light: false,
  // //     lastUpdate: Date.now(),
  // // })
  //
  // dispatch({
  //     type: "RESET"
  // })

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}

export default HomePage;
