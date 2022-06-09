import React, { useState } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

function FavoriteAssetCard({ title, itemId, image, isEditing, removeAsset }) {
  const visibility = React.useContext(VisibilityContext);
  return (
    <div
      // onClick={() => onClick(visibility)}
      style={{
        width: "160px",
      }}
      className={"px-3 py-4"}
      tabIndex={0}
    >
      <div className="card text-center container">
        <div>
          <span className={"pe-2"}>{title}</span>

          {isEditing && (
            <span
              className={"position-absolute top-0 end-0 pe-2"}
              onClick={() => removeAsset(itemId)}
              value={itemId}
            >
              X
            </span>
          )}
        </div>

        <img src={image} className={"p-4"} />
        {/*<div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>*/}
        {/*<div>selected: {JSON.stringify(!!selected)}</div>*/}
      </div>
    </div>
  );
}
export default FavoriteAssetCard;
