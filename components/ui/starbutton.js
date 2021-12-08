// import { FaStar } from "react-icons/all";
import { useState, useEffect } from "react";

function StarButton(props) {
  const { symbol } = props;

  const [isFavorited, setIsFavorited] = useState();

  return (
    <div>
      {symbol}
      {props && (
        // <FaStar
        //   color={!isFavorited ? "rgba(0,0,0, 0.15)" : "rgba(255, 233, 0, 1)"}
        //   size={28}
        //   onClick={() => setIsFavorited(!isFavorited)}
        //   style={{ cursor: "pointer", stroke: "black", strokeWidth: "30" }}
        // />
        <button>Favorite</button>
      )}
    </div>
  );
}

export default StarButton;
