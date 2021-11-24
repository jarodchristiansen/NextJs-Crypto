
import useSWR from "swr";
import {useState, useEffect} from 'react';
import { getEventById, getFeaturedEvents, getEventsById } from '../../dummy-data';

import { getSearchEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import { Input, Space } from 'antd';
import axios from "axios";

const { Search } = Input;

import {InputGroup, Button, FormControl} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";

function AssetsPage(props) {

    const [startingAssets, setStartingAssets] = useState([])
    const [events, setEvents] = useState()
    const [query, setQuery] = useState()
    const [selected, setSelected] = useState([]);
    const [listOfTitles, setListOfTitles] = useState()

    // const fetcher = (url) => fetch(url).then((res) => res.json())

    // const { data, error } = useSWR('/api/all', fetcher)


    useEffect(() => {

        axios.get('/api/all').then(res => {
            setStartingAssets(res.data)
            setEvents(res.data)
        })

    }, [])


    // if (error) return <div>Failed to load</div>
    // if (!data) return <div>No data</div>
    // setEvents(data)
    // let featuredEvent = data

    // const featuredEvents = getFeaturedEvents();
    // const featuredEvent = getEventById('BTC');
    // const eventsById = getEventsById('BTC');

    // console.log('this is featuredEvents', featuredEvents)


async function searchTitles(query) {
    let returnedEvents = await getSearchEvents(query.toUpperCase())
    if (returnedEvents.length > 0) {
        setListOfTitles(returnedEvents)
    } else {
        setListOfTitles(['No matching assets found'])
    }
}


  
async function searchQuery() {

    let returnedEvents = await getSearchEvents(query.toUpperCase())
    if (returnedEvents.length > 0) {
        setEvents(returnedEvents)
    } else {
        setEvents(startingAssets)
    }

}


    const handleKeyPress = (target) => {
        if (target.charCode == 13) {
            alert('Enter Clicked')
        }
    }

    return (
    <div>


        {/*<div>*/}
        {/*    {listOfTitles && (*/}
        {/*        <ul style={{width: '80%', minHeight: "300px"}}>*/}
        {/*            {listOfTitles.map((asset) => {*/}
        {/*                {console.log("this is the asset ------", asset)}*/}
        {/*                <li key={asset.symbol} style={{width: '200px', color: "black"}}><p>{asset.title}</p></li>*/}
        {/*            })}*/}
        {/*        </ul>*/}
        {/*    )*/}
        {/*    }*/}
        {/*</div>*/}

        <div style={{margin:"2% 0 0 10%", width: "100%"}}>
            <Search
                placeholder="Search for an Asset"
                onPressEnter={searchQuery}
                size="large"
                style={{width: "100%"}}
                onSearch={searchQuery}
                onChange={(e) => {
                    setQuery(e.target.value)

                }}
                loading={false}
                enterButton="Search" />





            {/*<Typeahead*/}
            {/*    id="basic-example"*/}
            {/*    onChange={(e) => {*/}
            {/*        setQuery(e.target.value)*/}
            {/*    }}*/}
            {/*    labelKey={"symbol"}*/}
            {/*    options={events}*/}
            {/*    placeholder="choose an asset"*/}
            {/*    selected={selected}*/}
            {/*/>*/}


        </div>




        {/*<div style={{justifyContent: "center", alignItems: "center", display: "flex", width: "100%"}}>*/}
        {/*    <div>*/}
        {/*        <form onSubmit={searchQuery} >*/}
        {/*            <input id="name" type="text" autoComplete="name" required />*/}
        {/*            <button type="submit">Search</button>*/}
        {/*        </form>*/}
        {/*    </div>*/}
        {/*</div>*/}

        {events && (

            <EventList items={events.length > 1 ? events : props.events}/>
        )}

    </div>
    )
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


export default AssetsPage;