import { useRouter, withRouter } from "next/router";
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import SocialChart from "../../components/details/social-chart-";
import { Accordion, Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import FinancialChart from "../../components/details/financial/financial-chart";
import FinancialData from "../../components/details/financial/financial-data";
import OnChainMetrics from "../../components/details/financial/onChain/OnChainMetrics";
import classes from "../../components/details/financial/financial-data.module.css";
import SocialPosts from "../../components/details/social-posts";
import { ResponsiveContainer } from "recharts";
import { getSession } from "next-auth/client";
import FinancialPanel from "../../components/details/financial/financialPanel/FinancialPanel";

function AssetDetails() {
  const router = useRouter();

  let id = router.query.id || "BTC";

  const [tabState, setTabState] = useState("Financial");
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = "/auth";
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  return (
    <div className={"container text-center"}>
      <div
        className="btn-group my-4"
        role="group"
        aria-label="Basic outlined example"
      >
        <button
          type="button"
          className="standardized-button px-3"
          onClick={() => {
            setTabState("Social");
          }}
        >
          Social
        </button>
        <button
          type="button"
          className="standardized-button px-3"
          onClick={() => {
            setTabState("Financial");
          }}
        >
          Financial
        </button>
        <button
          type="button"
          className="standardized-button px-3"
          onClick={() => {
            setTabState("onChain");
          }}
        >
          On-chain
        </button>
      </div>
      {tabState === "Financial" && (
        <div>
          <div>
            <h1>Financial Metrics</h1>
            <FinancialPanel id={id} className={"my-5"} />
            <div className={"card"}></div>
          </div>

          <div className="priceChart">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
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
          </div>
        </div>
      )}

      {tabState === "Social" && (
        <>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Social Share Metrics</Accordion.Header>
              <Accordion.Body>
                <ResponsiveContainer>
                  <div className="socialBar">
                    <SocialChart id={id || "BTC"} />
                  </div>
                </ResponsiveContainer>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Top Tweets</Accordion.Header>
              <Accordion.Body>
                <SocialPosts id={id} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      )}

      {tabState === "onChain" && (
        <div>
          <OnChainMetrics id={id} />
        </div>
      )}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// }

export default AssetDetails;
