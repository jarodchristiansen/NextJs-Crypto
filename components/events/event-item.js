import classes from "./event-item.module.css";
import Button from "../ui/button";
import CardChart from "./card-chart";
import { useState } from "react";
import addFavoriteUtil from "../../lib/favorites";
import StarButton from "../ui/starbutton";
import { useStore } from "../../store";

function EventItem(props) {
  const { title, image, id, symbol, description, price } = props;
  // console.log(price)
  // const humanReadableDate = new Date(date).toLocaleDateString('en-US', {day: 'numeric', month:'long', year:'numeric'})

  // const fomrattedAddress = location.replace(', ', '\n')
  const { dispatch } = useStore();

  function addFavorite(title, symbol, image) {
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

    addFavoriteUtil(favoriteObject);
  }

  const exploreLink = `/assets/${symbol}`;
  return (
    <li className={classes.item}>
      <div className={classes.imgRow}>
        <img className={classes.img} src={image} alt="" />
        <div className={classes.column}>
          <h3 className={classes.title}>
            {title} - {symbol}
          </h3>
          <Button link={exploreLink}>
            <span className={classes.explore}>Explore</span>
          </Button>
        </div>
        <div style={{ margin: "3% 0 0 12%" }}>
          {/*<StarButton symbol={symbol}/>*/}
          <p onClick={() => addFavorite(title, symbol, image)}>Test Add</p>
        </div>
      </div>
      <div className={classes.description}>{description}</div>
    </li>
  );
}

export default EventItem;
