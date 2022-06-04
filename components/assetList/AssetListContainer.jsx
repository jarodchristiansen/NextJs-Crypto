import AssetCard from "./AssetCard";
import EventItem from "../events/event-item";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import ExchangeCard from "./ExchangeCard";
import FadeIn from "react-fade-in";

const AssetListContainer = (props) => {
  const { items, searchSelection, updateFavorites, setUpdateFavorites } = props;

  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });
  // const [items, setItems] = useState(assets);

  // useEffect(() => {
  //   if (items && items.length > 10) {
  //     isMobile ? items.slice(0, 10) : items.slice(0, 9);
  //   }
  // }, [isMobile]);

  // {items ? (
  //     items.map((event) => (
  //         <EventItem
  //             key={event.id}
  //             id={event.id}
  //             title={event.title}
  //             symbol={event.symbol}
  //             description={event.description}
  //             image={event.imageUrl}
  //             price={event.price}
  //             favorited={event?.liked}
  //             updateFavorites={updateFavorites}
  //             setUpdateFavorites={setUpdateFavorites}
  //         />

  return (
    <div className={"col col-rows-3"}>
      <FadeIn transitionDuration={2000}>
        <div
          className={isMobile ? "row row-cols-2 my-3" : "row row-cols-3 my-3"}
        >
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
                  // price={event?.market_data?.current_price.usd}
                  // marketCap={event?.market_data?.market_cap.usd}
                  // circulatingSupply={event?.market_data?.circulating_supply}
                  // totalSupply={event?.market_data?.totalSupply}
                />
              )}
            </div>
          )}
          {items &&
            items.length > 1 &&
            items.map((event, idx) => (
              <div>
                {/*<AssetCard*/}
                {/*  key={event.id}*/}
                {/*  id={event.id}*/}
                {/*  title={event.title}*/}
                {/*  symbol={event.symbol}*/}
                {/*  image={event.imageUrl}*/}
                {/*  price={event.price}*/}
                {/*  favorited={event?.liked}*/}
                {/*  tags={event?.tags}*/}
                {/*  urls={event?.urls}*/}
                {/*  updateFavorites={updateFavorites}*/}
                {/*  setUpdateFavorites={setUpdateFavorites}*/}
                {/*/>*/}
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
                    // price={event?.market_data?.current_price.usd}
                    // marketCap={event?.market_data?.market_cap.usd}
                    // circulatingSupply={event?.market_data?.circulating_supply}
                    // totalSupply={event?.market_data?.totalSupply}
                  />
                )}
              </div>
            ))}
        </div>
      </FadeIn>
    </div>
  );
};

export default AssetListContainer;
