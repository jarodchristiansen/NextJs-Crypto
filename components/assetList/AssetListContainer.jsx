import AssetCard from "./AssetCard";
import EventItem from "../events/event-item";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import ExchangeCard from "./ExchangeCard";

const AssetListContainer = (props) => {
  const { items, searchSelection, updateFavorites, setUpdateFavorites } = props;

  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });
  console.log("this is the items", items);
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
      <div className={isMobile ? "row row-cols-2 my-3" : "row row-cols-3 my-3"}>
        {console.log("this is items", items)}
        {items &&
          items.map((event) => (
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
                  key={event?.id}
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
                  key={event?.id}
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
    </div>
  );
};

export default AssetListContainer;
