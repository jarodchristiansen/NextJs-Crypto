import useSWR from "swr";
import { useSession, getSession } from "next-auth/client";
import { useState, useEffect } from "react";
import {
  getEventById,
  getFeaturedEvents,
  getEventsById,
} from "../../dummy-data";

import { getSearchEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import { Input, Space } from "antd";
import axios from "axios";

const { Search } = Input;

import { InputGroup, Button, FormControl } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import fetch from "unfetch";
import Favorites from "../../components/profile/favorites";
import { useRouter } from "next/router";
import { useStore } from "../../store";
import { useSelector } from "react-redux";
import AssetFavorites from "../../components/events/assets-favorites";
import AssetListContainer from "../../components/assetList/AssetListContainer";
import { useMediaQuery } from "react-responsive";
import CustomSearchComponent from "../../components/searchComponents/CustomSearchComponent";
import LoadingSpinner from "../../components/ui/loading-spinner";

function AssetsPage(props) {
  const [startingAssets, setStartingAssets] = useState([]);
  const [events, setEvents] = useState();
  const [lengthOfResults, setLengthOfResults] = useState(30);
  const [searchSelection, setSearchSelection] = useState("Assets");
  const [startingExchanges, setStartingExchanges] = useState([]);
  const [filterSelection, setFilterSelection] = useState("");

  const [query, setQuery] = useState();
  const [selected, setSelected] = useState([]);
  const [listOfTitles, setListOfTitles] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [loadedUser, setLoadedUser] = useState();
  const [favorites, setFavorites] = useState();
  const [updateFavorites, setUpdateFavorites] = useState();

  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  const { dispatch, getState } = useStore();
  const results = getState();
  // useEffect(() => {
  //   getSession().then((session) => {
  //     setIsLoading(false);
  //     if (!session) {
  //       window.location.href = "/auth";
  //     }
  //   });
  // }, []);

  // const [session, loading] = useSession();

  // const fetcher = (url) => fetch(url).then((res) => res.json())

  // const { data, error } = useSWR('/api/all', fetcher)

  // function dynamicSort(property) {
  //   var sortOrder = 1;
  //   if (property[0] === "-") {
  //     sortOrder = -1;
  //     property = property.substr(1);
  //   }
  //   return function (a, b) {
  //     /* next line works with strings and numbers,
  //      * and you may want to customize it to your needs
  //      */
  //     var result =
  //       a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  //     return result * sortOrder;
  //   };
  // }

  // async function loadFavorited(data) {
  //   if (results?.user?.favorites) {
  //     console.log("this is the results.favorites", results?.user?.favorites);
  //     for (let i of data) {
  //       if (results?.user?.favorites.filter((e) => e.symbol === i.symbol)) {
  //         /* vendors contains the element we're looking for */
  //         i["favorited"] = true;
  //       }
  //     }
  //   } else {
  //     console.log("loadFavorited not finding results");
  //   }
  //   console.log("this is the data in loadFavorited", data);
  // }

  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  useEffect(() => {
    // axios.get("/api/all").then((res) => {
    //   // loadFavorited(res?.data);
    //   // console.log("this is results on the assets page", results);
    //   console.log("this is the res.data from assets", res.data);
    //
    //   setEvents(res.data);
    //   setOgEvents(res.data);
    // });
    getOGAssets();
  }, []);

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>No data</div>
  // setEvents(data)
  // let featuredEvent = data

  // const featuredEvents = getFeaturedEvents();
  // const featuredEvent = getEventById('BTC');
  // const eventsById = getEventsById('BTC');

  // console.log('this is featuredEvents', featuredEvents)
  let fetchedUser;

  // const getUser = async () => {
  //   fetchedUser = await fetch(`/api/user/get-user?user=${username}`).then((r) =>
  //     r.json()
  //   );
  //   setLoadedUser(fetchedUser);
  //   console.log("this is fetchedUser", fetchedUser);
  // };

  async function searchTitles(query) {
    let returnedEvents = await getSearchEvents(query.toUpperCase());
    if (returnedEvents.length > 0) {
      setListOfTitles(returnedEvents);
    } else {
      setListOfTitles(["No matching assets found"]);
    }
  }

  async function searchQuery(e) {
    e.preventDefault();
    setIsSearching(true);
    // let returnedEvents = ogEvents.filter((event) => {
    //   return event.symbol.toUpperCase().includes(query.toUpperCase());
    // });
    let returnedEvents;

    if (searchSelection === "Assets") {
      console.log("searchSelection conditional console logs", searchSelection);
      returnedEvents = startingAssets.filter((event) => {
        return event.symbol.toUpperCase().includes(query.toUpperCase());
      });
    }
    // let returnedEvents = await getSearchEvents(query.toUpperCase());
    if (returnedEvents.length > 0) {
      setTimeout(() => {
        setIsSearching(false);
      }, [1000]);
      setEvents(returnedEvents);
    } else {
      setIsSearching(true);
      getUnpulledAsset(query);
      // setEvents("");
    }
  }

  async function getUnpulledAsset(query) {
    console.log("this is the query in getUnpulledAsset", query);
    axios
      .get(
        `/api/coinGeckoData/?requestType=specifiedAsset&requestedAsset=${query.toLowerCase()}`
      )
      .then((res) => {
        // loadFavorited(res?.data);
        // console.log("this is results on the assets page", results);
        console.log(
          "this is the res.data from assets in getUnpulledAsset",
          res.data.data
        );
        if (res.data.data) {
          console.log("setting events with res.data.data", res.data.data);
          setEvents(res.data.data);
          setIsSearching(false);
        } else {
          console.log("No data was found");
        }
      });
  }

  async function getExchangeData(e) {
    console.log("this is select change", e);
    let exchanges = axios
      .get(
        `/api/coinGeckoData/?requestType=exchangeData&numberOfResults=${lengthOfResults}`
      )
      .then((res) => {
        // loadFavorited(res?.data);
        // console.log("this is results on the assets page", results);
        console.log(
          "this is the res.data from assets in getExchangeData",
          res.data.data
        );
        //
        setEvents(res.data.data);
        setStartingExchanges(res.data.data);
      });
    return exchanges;
  }

  async function getOGAssets() {
    axios
      .get(
        `/api/coinGeckoData/?requestType=allData&numberOfResults=${lengthOfResults}`
      )
      .then((res) => {
        // loadFavorited(res?.data);
        // console.log("this is results on the assets page", results);
        console.log(
          "this is the res.data from assets in getOGAssets",
          res.data.data
        );

        setEvents(res.data.data);
        // setOgEvents(res.data.data);
        setStartingAssets(res.data.data);
      });
  }

  async function getAssetData(e) {}

  const handleKeyPress = (target) => {
    if (searchSelection === "Assets") {
      if (target.charCode == 13) {
        searchQuery(target.value);
      } else {
        setQuery(target.value);
      }
    } else if (searchSelection === "Exchanges") {
      console.log(
        "this is the startingExchanges in exchanges handleKeyPress",
        startingExchanges,
        target.value
      );
      let returnedEvents = startingExchanges.filter((event) => {
        return event.name.toUpperCase().includes(target.value.toUpperCase());
      });
      if (returnedEvents.length > 0) {
        setEvents(returnedEvents);
      } else {
        returnedEvents = startingExchanges.filter((event) => {
          return event.name.toUpperCase() === target.value.toUpperCase();
        });
        setEvents(returnedEvents);
      }
    }
  };

  async function filterEventsByCondition(condition) {
    switch (condition) {
      case "Year Established":
        // code block
        if (events) {
          console.log("this is the Year Established switch case");
          let filteredEvents = events.sort((a, b) =>
            a.year_established > b.year_established ? 1 : -1
          );
          setEvents("");
          // setEvents(filteredEvents);
        }
        break;
      case "Trust Score":
        return events.sort((a, b) => (a.trust_score > b.trust_score ? 1 : -1));
        break;
      default:
      // code block
    }
  }

  return (
    <div className={"container"}>
      <div
        // className={
        //   !isMobile
        //     ? "position-absolute top-0 end-0 mt-2 me-0"
        //     : "my-3 mx-auto ms-5"
        // }
        className={
          isMobile ? "my-3 mx-auto ms-5" : "d-flex justify-content-center mt-3"
        }
      >
        <CustomSearchComponent
          onTextChange={(e) => {
            if (searchSelection === "Assets") {
              e.target.value.length > 1
                ? handleKeyPress(e.target)
                : setEvents(startingAssets);
            } else if (searchSelection) {
              e.target.value.length > 1
                ? handleKeyPress(e.target)
                : setEvents(startingExchanges);
            }
          }}
          onSelectionChange={(e) => {
            console.log("this is onSelectionChange", e);
            // setEvents(getExchangeData());
            setIsSearching(false);
            setSearchSelection(e);
            e === "Exchanges" ? getExchangeData() : setEvents(startingAssets);
          }}
          onFilterChange={(e) => {
            filterEventsByCondition(e);
          }}
          filterSelection={filterSelection}
          searchSelection={searchSelection}
          handleSubmit={(e) => searchQuery(e)}
        />
      </div>

      {/*{updateFavorites ? (*/}
      {/*  // <Favorites*/}
      {/*  //   path={router.pathname}*/}
      {/*  //   loadedUser={loadedUser}*/}
      {/*  //   setLoadedUser={setLoadedUser}*/}
      {/*  // />*/}
      {/*  <AssetFavorites*/}
      {/*    path={router.pathname}*/}
      {/*    loadedUser={loadedUser}*/}
      {/*    setLoadedUser={setLoadedUser}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  // <Favorites*/}
      {/*  //   path={router.pathname}*/}
      {/*  //   loadedUser={loadedUser}*/}
      {/*  //   setLoadedUser={setLoadedUser}*/}
      {/*  //   />*/}
      {/*  <AssetFavorites*/}
      {/*    path={router.pathname}*/}
      {/*    loadedUser={loadedUser}*/}
      {/*    setLoadedUser={setLoadedUser}*/}
      {/*    updateFavorites={updateFavorites}*/}
      {/*  />*/}
      {/*)}*/}

      {events && !isSearching && (
        <div className={"mx-auto"}>
          <AssetListContainer
            items={events ? events : props.events}
            setUpdateFavorites={setUpdateFavorites}
            updateFavorites={updateFavorites}
            searchSelection={searchSelection}
          />
        </div>
      )}

      {isSearching && (
        <div className={"container text-center mt-5"}>
          <h1 className={"card-text "}>Searching For {searchSelection}</h1>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
// export async function getStaticProps() {
//   const featuredEvents = await getFeaturedEvents();
//   return {
//       props: {
//           events: featuredEvents
//       }
//
//   }
// }

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// }

export default AssetsPage;
