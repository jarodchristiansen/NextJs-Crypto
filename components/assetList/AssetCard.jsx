import { Button, Modal } from "react-bootstrap";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { addFavoriteUtil, removeFavoriteUtil } from "../../lib/favorites";
import { StarFill } from "react-bootstrap-icons";
import Link from "next/link";
import {
  currencyFormat,
  internationalFormatter,
  standardThousandsFormatter,
} from "../../helpers/formatters";
import styles from "./AssetCard.module.css";
import { useRouter } from "next/router";

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
    loadedUser,
  } = props;

  const { dispatch, getState } = useStore();
  const [session, loading, status] = useSession();
  const [favorite, setFavorite] = useState();
  // const [favoritesUpdated, setFavoritesUpdated] = useState(false);
  const [sessionUser, setSessionUser] = useState();

  const router = useRouter();
  const state = getState();

  useEffect(() => {
    checkFavorites();
  }, [updateFavorites]);

  async function checkFavorites() {
    // let user = JSON.parse(sessionStorage.getItem("user"));
    let user = loadedUser
      ? loadedUser
      : JSON.parse(sessionStorage.getItem("user"));
    loadedUser
      ? setSessionUser(loadedUser)
      : setSessionUser(JSON.parse(sessionStorage.getItem("user")));

    if (user?.favorites) {
      for (let i of user?.favorites) {
        if (i?.symbol === symbol) {
          setFavorite(true);
        }
      }
    }
  }
  const addToFavorites = async (title, symbol, image) => {
    let token = { title, symbol, image };
    let updateSessionFavorites = sessionUser.favorites;

    updateSessionFavorites.push(token);

    // let result = favorites.filter((obj) => {
    //   return obj.symbol !== itemId;
    // });
    //
    // setItems(result);
    //
    let replaceDemoUser = {
      ...sessionUser,
      favorites: updateSessionFavorites,
    };

    await addFavoriteUtil(token);
    sessionStorage.setItem("user", JSON.stringify(replaceDemoUser));
    setUpdateFavorites(true);
    // router.reload(window.location.pathname);
  };

  const exploreLink = `/assets/${symbol}`;
  return (
    <div
      className={`card text-center mb-3 border border-dark border-1 rounded shadow`}
    >
      {/* <div className={"flex flex-row flex-end"}>
        {!favorite ? (
          <StarFill
            color={"gray"}
            size={32}
            // onClick={() => addFavorite(title, symbol, image)}
            onClick={() => addToFavorites(title, symbol, image)}
          />
        ) : (
          <StarFill color={"gold"} size={32} />
        )}
      </div> */}
      <div className="card-body py-4">
        <h5 className="card-title">{title || "Card Title"}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {symbol || "Card subtitle"}
        </h6>
        <div>
          <img src={image} style={{ maxHeight: "60px" }} />
          <p className={"card-text mt-2"}>
            <b>Daily Price - </b>
            {currencyFormat(price)}
          </p>
          <p className={"card-text mt-2"}>
            <b>Market Cap - </b>
            {currencyFormat(marketCap)}
          </p>
          <p className={"card-text mt-2"}>
            <b>Circulating Supply- </b>
            {standardThousandsFormatter.format(circulatingSupply)}
          </p>
          <p className={"card-text mt-2"}>
            <b>Total Supply-</b>
            {standardThousandsFormatter.format(totalSupply)}
          </p>
        </div>

        <hr className={"bg-dark"} />
        <Link href={exploreLink}>
          <button className={"standardized-button"}>Explore</button>
        </Link>
      </div>
    </div>
  );
};

export default AssetCard;
