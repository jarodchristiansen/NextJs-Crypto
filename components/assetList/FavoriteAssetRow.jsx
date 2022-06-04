import Link from "next/link";
import EducationContainerCard from "../education/EducationContainerCard";
import FavoriteAssetCard from "./FavoriteAssetCard";

const FavoriteAssetRow = ({ favorites }) => {
  console.log({ favorites });
  return (
    <div className={"container"}>
      <h2>Favorite Assets</h2>
      <div className="row row-cols-lg-3 g-2 g-lg-3 mt-3">
        <div className="col">
          <div className="p-3 bg-light">
            <FavoriteAssetCard />
          </div>
        </div>
        <div className="col">
          <div className="p-3 bg-light">
            <FavoriteAssetCard />
          </div>
        </div>
        <div className="col">
          <div className="p-3 bg-light">
            <FavoriteAssetCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteAssetRow;
