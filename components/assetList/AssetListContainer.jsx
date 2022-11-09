import AssetCard from "./AssetCard";
import { useMediaQuery } from "react-responsive";
import ExchangeCard from "./ExchangeCard";
import styled from "styled-components";

const AssetListContainer = (props) => {
  const {
    items,
    searchSelection,
    loadedUser,
    updateFavorites,
    setUpdateFavorites,
  } = props;

  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  return (
    <AssetWrapper>
      {items && items.id && (
        <div>
          {searchSelection === "Assets" && (
            <AssetCard
              key={items?.id}
              id={items?.id}
              title={items?.name}
              symbol={items?.symbol?.toUpperCase()}
              image={items?.image?.small}
              price={items?.market_data?.current_price.usd}
              marketCap={items.market_data?.market_cap.usd}
              circulatingSupply={items.market_data?.circulating_supply}
              totalSupply={items.market_data?.total_supply}
              loadedUser={loadedUser}
              updateFavorites={updateFavorites}
              setUpdateFavorites={setUpdateFavorites}
            />
          )}

          {searchSelection === "Exchanges" && (
            <ExchangeCard
              key={items[0].id}
              id={items[0].id}
              title={items[0].name}
              image={items[0].image}
              country={items[0].country}
              yearEstablished={items[0].year_established}
              url={items[0].url}
              trustScore={items[0].trust_score}
              btcTradeVolume={items[0].trade_volume_24h_btc}
            />
          )}
        </div>
      )}
      {items &&
        items.length > 1 &&
        items.map((event, idx) => (
          <div>
            {searchSelection === "Assets" && (
              <AssetCard
                key={event?.id + idx}
                id={event?.id}
                title={event?.name}
                symbol={event?.symbol?.toUpperCase()}
                image={event?.image?.small}
                price={event?.market_data?.current_price.usd}
                marketCap={event?.market_data?.market_cap.usd}
                circulatingSupply={event?.market_data?.circulating_supply}
                totalSupply={event?.market_data?.total_supply}
                loadedUser={loadedUser}
                updateFavorites={updateFavorites}
                setUpdateFavorites={setUpdateFavorites}
              />
            )}

            {searchSelection === "Exchanges" && (
              <ExchangeCard
                key={event?.id + idx}
                id={event?.id}
                title={event?.name}
                image={event?.image}
                country={event?.country}
                yearEstablished={event?.year_established}
                url={event?.url}
                trustScore={event?.trust_score}
                btcTradeVolume={event?.trade_volume_24h_btc}
              />
            )}
          </div>
        ))}
    </AssetWrapper>
  );
};

const AssetWrapper = styled.div`
  position: relative;
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
`;

export default AssetListContainer;
