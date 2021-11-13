import {useState} from 'react';
import { getEventById, getFeaturedEvents, getEventsById } from '../../dummy-data';

import { getSearchEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import { Input, Space } from 'antd';


const { Search } = Input;

import {InputGroup, Button, FormControl} from "react-bootstrap";


function AssetsPage(props) {
    const featuredEvents = getFeaturedEvents();
    // const featuredEvent = getEventById('BTC');
    // const eventsById = getEventsById('BTC');

    const [events, setEvents] = useState([...featuredEvents])
    const [query, setQuery] = useState()

  
async function searchQuery() {

    let returnedEvents = await getSearchEvents(query.toUpperCase())
    setEvents(returnedEvents)
}


    const handleKeyPress = (target) => {
        if (target.charCode == 13) {
            alert('Enter Clicked')
        }
    }

    return (
    <div>
        <div style={{margin:"2% 0 0 10%"}}>
            <Search placeholder="Search for an Asset" onPressEnter={searchQuery} size="large" onSearch={searchQuery} onChange={(e) => setQuery(e.target.value)} loading={false} enterButton="Search" />
        </div>




        {/*<div style={{justifyContent: "center", alignItems: "center", display: "flex", width: "100%"}}>*/}
        {/*    <div>*/}
        {/*        <form onSubmit={searchQuery} >*/}
        {/*            <input id="name" type="text" autoComplete="name" required />*/}
        {/*            <button type="submit">Search</button>*/}
        {/*        </form>*/}
        {/*    </div>*/}
        {/*</div>*/}


     <EventList items={events.length > 1 ? events : props.events}/>
    </div>
    )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
      props: {
          events: featuredEvents
      }

  }
}


export default AssetsPage;