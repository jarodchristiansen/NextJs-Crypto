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

function AssetsPage(props) {
  const [startingAssets, setStartingAssets] = useState([]);
  const [events, setEvents] = useState();
  const [query, setQuery] = useState();
  const [selected, setSelected] = useState([]);
  const [listOfTitles, setListOfTitles] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [loadedUser, setLoadedUser] = useState();

  const router = useRouter();

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

  useEffect(() => {
    axios.get("/api/all").then((res) => {
      setStartingAssets(res.data);
      setEvents(res.data);
    });
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

  async function searchQuery() {
    let returnedEvents = await getSearchEvents(query.toUpperCase());
    if (returnedEvents.length > 0) {
      setEvents(returnedEvents);
    } else {
      setEvents(startingAssets);
    }
  }

  const handleKeyPress = (target) => {
    if (target.charCode == 13) {
      alert("Enter Clicked");
    }
  };

  return (
    <div>
      <div style={{ margin: "2% 0 0 10%", width: "100%" }}>
        <Search
          placeholder="Search for an Asset"
          onPressEnter={searchQuery}
          size="large"
          style={{ width: "100%" }}
          onSearch={searchQuery}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          loading={false}
          enterButton="Search"
        />
      </div>

      <Favorites
        path={router.pathname}
        loadedUser={loadedUser}
        setLoadedUser={setLoadedUser}
      />

      {events && (
        <EventList items={events.length > 1 ? events : props.events} />
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
