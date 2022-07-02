import React, { useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import FavoriteAssetCard from "./FavoriteAssetCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function FavoriteAssetRow({ loadedUser, setFavorites, setUserHasUpdated }) {
  const { favorites } = loadedUser;
  const [items, setItems] = useState(favorites);
  const [isEditing, setIsEditing] = useState(false);

  const removeAssetFromFavorites = (itemId) => {
    let result = favorites.filter((obj) => {
      return obj.symbol !== itemId;
    });

    setItems(result);

    let replaceDemoUser = {
      ...loadedUser,
      favorites: result,
    };
    sessionStorage.setItem("user", JSON.stringify(replaceDemoUser));
    setUserHasUpdated();
  };

  useEffect(() => {}, [loadedUser]);

  return (
    <div className={"p-2"}>
      <div className={"d-flex justify-content-end"}>
        <h4 onClick={() => setIsEditing(!isEditing)}>Edit</h4>
      </div>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {items.map((asset) => (
          <FavoriteAssetCard
            // itemId={id} // NOTE: itemId is required for track items
            // title={id}
            // key={id}
            // onClick={handleClick(id)}
            // selected={isItemSelected(id)}
            isEditing={isEditing}
            symbol={asset.symbol}
            itemId={asset.symbol}
            title={asset.title}
            key={asset.symbol}
            image={asset.image}
            removeAsset={removeAssetFromFavorites}
          />
        ))}
      </ScrollMenu>
    </div>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <p
      className={"px-2 mt-5 pointer-link"}
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
    >
      <FaArrowLeft size={24} color={"black"} />
    </p>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <p
      className={"px-2 mt-5 pointer-link"}
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
    >
      <FaArrowRight size={24} color={"black"} />
    </p>
  );
}

export default FavoriteAssetRow;
