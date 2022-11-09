import Link from "next/link";
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import { useSession, getSession } from "next-auth/client";
import { useMediaQuery } from "react-responsive";
import clientPromise from "../lib/mongodb";
import { initializeStore, useStore } from "../store";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import FadeIn from "react-fade-in";
import styled from "styled-components";
import InfoCard from "../components/commons/info-cards/info-card";
import PriceScreener from "../components/commons/screener";

function HomePage({ isConnected, initialReduxState }) {
  const [session, loading, status] = useSession();

  // const { dispatch } = useStore();

  // const isDesktopOrLaptop = useMediaQuery({
  //   query: `(max-width: 620px)`,
  // });

  // const textBlocks = {
  //   mainExplainer: {
  //     headerText: "Affordable Metrics For Decentralized Assets",
  //     subHeaderText: "Affordable Prices for helpful insights",
  //     description:
  //       "Metrics that benefit everyone, not just those that can afford thousands of dollars in subscriptions to make better investment choices",
  //     modalHeader: "Useful Metrics for Crypto Assets",
  //     modalBodyText:
  //       "Insightful metrics at affordable prices to make crypto available to everyone, not just those who already have an advantage.",
  //     modalBodyImage: "/../ModalImages/Assets.jpg",
  //   },
  //   userProfiles: {
  //     headerText: "User Profile Customization",
  //     subHeaderText: "Portfolio Building",
  //     description:
  //       "Track your favorite assets and build your portfolio using our portfolio tracker, engage based on favorited assets",
  //     modalHeader: "User Profile Dashboard",
  //     modalBodyText: "",
  //     modalBodyImage: "",
  //   },
  //   socialMetrics: {
  //     headerText: "Realtime Social Metrics",
  //     subHeaderText: "Social Media Metrics To Track Engagement",
  //     description:
  //       "Social media and search engine metrics to help identify the hottest assets as they start ot trend",
  //     modalHeader: "Social Metrics",
  //     modalBodyText: "",
  //     modalBodyImage: "",
  //   },
  //   financialMetrics: {
  //     headerText: "Financial Metrics",
  //     subHeaderText: "Stastical Models Made For You",
  //     description:
  //       "Ready made statistical models to quickly view some of the most important components of an asset before investing.",
  //     modalHeader: "Useful Metrics for Crypto Assets",
  //     modalBodyText: "",
  //     modalBodyImage: "",
  //   },
  //   onChainMetrics: {
  //     headerText: "On-chain Metrics",
  //     subHeaderText: "Fundamental Analysis",
  //     description:
  //       "Fundamental metrics of asset usage and flows to give you insight into market movements",
  //     modalHeader: "On-chain analytics",
  //     modalBodyText:
  //       "Analytics utilizing the benefits of blockchain. Analytics and data tracking transaction volume, address averages, network difficulty, hashrate etc",
  //     modalBodyImage: "/../ModalImages/Charts.jpg",
  //   },
  // };

  return (
    <div>
      <PriceScreener />

      <HomePageWrapper className="text-center">
        {/* <LoadingSpinner /> */}
        {/* <HeroImage>Text</HeroImage> */}

        <div className="grid-template">
          <InfoCard
            headerText={"Historical Insights"}
            bodyText="History doesn't always repeat, but it often rhymes. Using historical data to find insights into existing markets"
          />
          <InfoCard
            headerText={"Community Analytics"}
            bodyText="A view of the market from the community's own eyes. Insights into some of the most popular current assets"
          />

          <InfoCard
            headerText={"OnChain Data"}
            bodyText="With a resource as beautiful as a decentralized immulatable ledger, why not use it for real time insights? "
          />
          <InfoCard
            headerText={"User Profiles"}
            bodyText="Web3 isn't as `Webby` without you. Allowing you to show off what makes you an individual in the space."
          />
        </div>
      </HomePageWrapper>
    </div>
  );
}

const HeroImage = styled.div`
  width: 95%;
  min-height: 12rem;
  background-color: green;
  border-radius: 17px;
`;

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  .hero-image {
    width: 100%;
    background-color: green;
    margin-top: 4rem;
  }

  .grid-template {
    animation: fadeIn 2s;
    margin: 0 auto;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

export async function getServerSideProps(context, req) {
  const client = await clientPromise;
  const session = await getSession({ req });
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

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
