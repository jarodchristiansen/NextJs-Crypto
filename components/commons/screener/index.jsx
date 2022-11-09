import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import styled from "styled-components";

const PriceScreener = () => {
  return (
    <ScreenerContainer>
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
              proName: "BITSTAMP:BTCUSD",
              title: "BTC/USD",
            },
            {
              proName: "BITSTAMP:ETHUSD",
              title: "ETH/USD",
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
              proName: "COINBASE:SOLUSD",
              title: "SOL/USDT",
            },
            {
              proName: "BINANCE:DOGEUSDT",
              title: "DOGE/USDT",
            },
            {
              proName: "COINBASE:DOTUSD",
              title: "DOT/USD",
            },
          ],
        }}
      />
    </ScreenerContainer>
  );
};

const ScreenerContainer = styled.div`
  position: sticky;
  top: 0;
`;

export default PriceScreener;
