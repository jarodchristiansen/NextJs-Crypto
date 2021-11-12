import { useRouter, withRouter } from 'next/router';
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import SocialChart from '../../components/details/social-chart-';

function AssetDetails() {
    const router = useRouter();

    let id = router.query.id || 'BTC'
    console.log(router.query)

    return (
        <div>
            {id}
            <div className="socialBar">
                <SocialChart id={id || 'BTC'}/>
            </div>
            <div className="priceChart">
                <TradingViewEmbed
                    widgetType={widgetType.ADVANCED_CHART}
                    widgetConfig={{
                        interval: "1D",
                        colorTheme: "dark",
                        width: "95%",
                        symbol: id + "USD" || 'BTCUSD',
                        studies: [
                            "MACD@tv-basicstudies",
                            "StochasticRSI@tv-basicstudies",
                            "TripleEMA@tv-basicstudies"
                        ]
                    }}
                />
            </div>
        </div>
    )
}

export default AssetDetails;