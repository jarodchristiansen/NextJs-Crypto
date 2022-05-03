import { Button, Modal } from "react-bootstrap";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import addFavoriteUtil from "../../lib/favorites";
import { StarFill } from "react-bootstrap-icons";
import Link from "next/link";

const AssetCard = (props) => {
  const {
    id,
    circulatingSupply,
    title,
    symbol,
    image,
    marketCap,
    price,
    favorited,
    tags,
    totalSupply,
    updateFavorites,
    urls,
    setUpdateFavorites,
  } = props;

  const { dispatch, getState } = useStore();
  const [favorites, setFavorites] = useState();
  const [session, loading, status] = useSession();
  const [favorite, setFavorite] = useState();

  const state = getState();

  useEffect(() => {
    checkFavorites();
  }, [state]);

  async function checkFavorites() {
    if (state?.user?.favorites) {
      for (let i of state?.user?.favorites) {
        if (i?.symbol === symbol) {
          setFavorite(true);
        }
      }
    }
  }

  async function addFavorite(title, symbol, image) {
    console.log("this is addFavorite firing ---", title, symbol, image);

    let favoriteObject = {
      title,
      symbol,
      image,
    };

    dispatch({
      type: "ADD_FAVORITE",
      favorite: favoriteObject,
    });
    await addFavoriteUtil(favoriteObject);
    setUpdateFavorites(!updateFavorites);
  }

  const exploreLink = `/assets/${symbol}`;
  return (
    <div className="card text-center mb-3 border border-dark border-1 rounded shadow">
      <div className={"flex flex-row flex-end"}>
        {/*{!favorite ? (*/}
        {/*  <StarFill*/}
        {/*    color={"gray"}*/}
        {/*    size={32}*/}
        {/*    onClick={() => addFavorite(title, symbol, image)}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  <StarFill color={"gold"} size={32} />*/}
        {/*)}*/}
      </div>
      <div className="card-body py-4">
        <h5 className="card-title">{title || "Card Title"}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {symbol || "Card subtitle"}
        </h6>
        <div>
          <img src={image} style={{ maxHeight: "60px" }} />
          <p className={"card-text mt-2"}>Daily Price - {price} USD</p>
          <p className={"card-text mt-2"}>Market Cap - {marketCap} USD</p>
          <p className={"card-text mt-2"}>
            Circulating Supply- {circulatingSupply}
          </p>
          <p className={"card-text mt-2"}>Total Supply- {circulatingSupply}</p>
        </div>

        <hr className={"bg-dark"} />
        {/*<p className="card-text">*/}
        {/*  {"            Some quick example text to build on the card title and make up the\n" +*/}
        {/*    "            bulk of the card's content."}*/}
        {/*</p>*/}
        {/*<p className={"card-text"}>{urls?.website}</p>*/}
        {/*<p className={"card-text"}>{urls?.source_code}</p>*/}
        {/*<p className={"card-text"}>{urls?.technical_doc}</p>*/}
        {/*<div className={"card-text"}>*/}
        {/*  {tags &&*/}
        {/*    tags.map((tag) => {*/}
        {/*      return <p key={tag}>{tag}</p>;*/}
        {/*    })}*/}
        {/*</div>*/}
        <Link href={exploreLink}>
          <button className={"standardized-button"}>Explore</button>
        </Link>
      </div>
    </div>
  );
};

export default AssetCard;
