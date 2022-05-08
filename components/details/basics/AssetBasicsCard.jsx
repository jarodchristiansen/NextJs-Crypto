// const basicAssetDataObject = {
//     block_time_in_minutes: data?.block_time_in_minutes,
//     coingecko_score: data?.coingecko_score,
//     community_data: data?.community_data,
//     description: data?.description?.en,
//     developer_data: data?.developer_data,
//     developer_score: data?.developer_score,
//     genesis_date: data?.genesis_date,
//     hashing_algorithm: data?.hashing_algorithm,
//     image: data?.image?.small || data?.image?.thumb,
//     links: data?.links,
//     liquidity_score: data?.liquidity_score,
// };

import { useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";
import axios from "axios";

const AssetBasicsCard = ({ id }) => {
  const [basicAssetData, setBasicAssetData] = useState();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchGeckoData();
    checkDescriptionForLinks();
  }, []);

  async function fetchGeckoData() {
    axios
      .get(
        `/api/coinGeckoData/?requestType=specifiedAsset&requestedAsset=${id.toLowerCase()}`
      )
      .then((res) => {
        // loadFavorited(res?.data);
        // console.log("this is results on the assets page", results);
        console.log(
          "this is the res.data from assets in fetchGeckoData",
          res.data.data
        );
        let data = res.data.data;
        const basicAssetDataObject = {
          block_time_in_minutes: data?.block_time_in_minutes,
          coingecko_score: data?.coingecko_score,
          community_data: data?.community_data,
          description: data?.description?.en,
          developer_data: data?.developer_data,
          developer_score: data?.developer_score,
          genesis_date: data?.genesis_date,
          hashing_algorithm: data?.hashing_algorithm,
          image: data?.image?.small || data?.image?.thumb,
          links: data?.links,
          liquidity_score: data?.liquidity_score,
        };
        setBasicAssetData(basicAssetDataObject);
        // setData(res.data.data);
        // if (res.data.data) {
        //   console.log("setting events with res.data.data", res.data.data);
        //   setEvents(res.data.data);
        //   setIsSearching(false);
        // } else {
        //   console.log("No data was found");
        // }
      })
      .catch((error) => {
        console.log("this is the error on fetchPriceData", error);
      });
  }

  // const {
  //   block_time_in_minutes,
  //   coingecko_score,
  //   community_data,
  //   description,
  //   developer_data,
  //   developer_score,
  //   genesis_date,
  //   hashing_algorithm,
  //   image,
  //   links,
  //   liquidity_score,
  // } = basicAssetData;

  const checkDescriptionForLinks = () => {
    const descriptionSpan = document.getElementById("descriptionContainer");
    if (basicAssetData?.description) {
      descriptionSpan.innerHTML = basicAssetData?.description;
    }
  };

  return (
    <div className={"card p-4"}>
      <div className={"row"}>
        <div className={"my-2"}>
          <img src={basicAssetData?.image} />
        </div>
        <div className={"row row-cols-3"}>
          <div className={"col"}>
            <p>
              Block Time (minutes):{" "}
              <span>{basicAssetData?.block_time_in_minutes}</span>
            </p>
          </div>
          <div className={"col"}>
            <p>
              Coin Gecko Score: <span>{basicAssetData?.coingecko_score}</span>
            </p>
          </div>
          <div className={"col"}>
            <p>
              Genesis Date: <span>{basicAssetData?.genesis_date}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={"row"}>
        <div className={"row row-cols-3"}>
          <div className={"col"}>
            <p>
              Developer Score: <span>{basicAssetData?.developer_score}</span>
            </p>
          </div>
          <div className={"col"}>
            <p>
              Hashing Algorithm:{" "}
              <span>{basicAssetData?.hashing_algorithm}</span>
            </p>
          </div>
          <div className={"col"}>
            <p>
              Liquidity Score: <span>{basicAssetData?.liquidity_score}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={"row"}>
        <div className={"row"}>
          <div>
            <h4 onClick={() => setOpen(!open)}>
              Toggle Description : {open ? "Close" : "Open"}
            </h4>
            <span></span>
          </div>

          <p>
            <Collapse in={open}>
              <div>
                <span id={"descriptionContainer"}>{""}</span>
              </div>
            </Collapse>
            <span id={"descriptionContainer"}>{""}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetBasicsCard;
