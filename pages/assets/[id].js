import { useRouter, withRouter } from 'next/router';
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import SocialChart from '../../components/details/social-chart-';
import {Accordion, Button, ButtonGroup, Col, Row} from "react-bootstrap";
import { useState, useEffect } from 'react';
import FinancialChart from "../../components/details/financial/financial-chart";
import FinancialData from "../../components/details/financial/financial-data";
import OnChainMetrics from "../../components/details/financial/onChain/OnChainMetrics";
import classes from "../../components/details/financial/financial-data.module.css";
import SocialPosts from "../../components/details/social-posts";
import {ResponsiveContainer} from "recharts";


function AssetDetails() {
    const router = useRouter();




    let id = router.query.id || 'BTC'
    console.log(router.query)


    const [tabState, setTabState] = useState(id === "BTC" ? 'onChain' : "Financial")



    return (
        <div style={{width: "80%", marginLeft: "10%"}}>
            <Row>
                <Col>
                    <ButtonGroup aria-label="Basic example" size={"md"}>
                        <Button variant="primary" onClick={() => {
                            setTabState("Social")
                        }}>Social</Button>
                        <Button variant="primary" onClick={() => {
                            setTabState("Financial")
                        }}>Financial</Button>
                        <Button variant="primary" onClick={() => {
                            setTabState("onChain")
                        }}>OnChain</Button>
                    </ButtonGroup>

                    {/*<div className="socialBar">*/}
                    {/*    <SocialChart id={id || 'BTC'}/>*/}
                    {/*</div>*/}
                </Col>
            </Row>


            <Row>
                <Col >
                    {tabState === "Financial" && (
                        <div>
                            <div>
                                <FinancialChart  id={id}/>
                            </div>


                            <div>

                            </div>


                            <div className="priceChart">

                                <Accordion defaultActiveKey="0" >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>TradingView Chart</Accordion.Header>
                                        <Accordion.Body>
                                            <TradingViewEmbed
                                                widgetType={widgetType.ADVANCED_CHART}
                                                widgetConfig={{
                                                    interval: "1D",
                                                    colorTheme: "dark",
                                                    width: "100%",
                                                    symbol: id + "USD" || 'BTCUSD',
                                                    studies: [
                                                        "MACD@tv-basicstudies",
                                                        "StochasticRSI@tv-basicstudies",
                                                        "TripleEMA@tv-basicstudies"
                                                    ]
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
                        <Accordion defaultActiveKey="0" >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Social Share Metrics</Accordion.Header>
                                <Accordion.Body >
                                    <ResponsiveContainer>
                                        <div className="socialBar">
                                            <SocialChart id={id || 'BTC'}/>
                                        </div>
                                    </ResponsiveContainer>

                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>


                        <Accordion defaultActiveKey="0" >
                        <Accordion.Item eventKey="0">
                        <Accordion.Header>Top Tweets</Accordion.Header>
                            <Accordion.Body>
                                <SocialPosts id={id}/>
                            </Accordion.Body>

                        </Accordion.Item>

                        </Accordion>

    </>
                    )}


                    {tabState === "onChain" && (
                        <div>
                            <OnChainMetrics  id={id}/>
                        </div>
                    )}

                </Col>




            </Row>



        </div>
    )
}

export default AssetDetails;