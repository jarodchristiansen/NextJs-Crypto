import { Button, Modal } from "react-bootstrap";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import addFavoriteUtil from "../../lib/favorites";
import { StarFill } from "react-bootstrap-icons";
import Link from "next/link";
import {
  currencyFormat,
  internationalFormatter,
} from "../../helpers/formatters";

const AssetCard = (props) => {
  const {
    id,
    circulatingSupply,
    title,
    image,
    marketCap,
    price,
    urls,
    country,
    url,
    trustScore,
    btcTradeVolume,
    yearEstablished,
  } = props;

  const { dispatch, getState } = useStore();

  const state = getState();

  useEffect(() => {}, []);

  return (
    <div className="card text-center mb-3 border border-dark border-1 rounded shadow">
      <div className={"flex flex-row flex-end"}></div>
      <div className="card-body py-4">
        <h5 className="card-title">{title || "Card Title"}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {country || "Card subtitle"}
        </h6>
        <div>
          <img src={image} style={{ maxHeight: "60px" }} />
          <p className={"card-text mt-2"}>
            Year Established- {yearEstablished}
          </p>
          <p className={"card-text mt-2"}>
            Relative Trust Score - {trustScore}
          </p>
          <p className={"card-text mt-2"}>
            Bitcoin Trading Volume 24hr-{" "}
            {internationalFormatter.format(btcTradeVolume) || "N/A"}
          </p>
        </div>

        <hr className={"bg-dark"} />
        <a href={url || ""} target={"#"}>
          <button className={"standardized-button"}>Explore</button>
        </a>
      </div>
    </div>
  );
};

export default AssetCard;
