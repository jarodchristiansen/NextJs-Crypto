import { useSate, useEffect } from 'react';
import fetch from "unfetch";
import useSWR from "swr";




const OnChainMetrics = (props) => {

    const { id } = props

    const fetcher = (url, token) =>  axios
        .get(url, { headers: { Authorization: "Bearer " + token } })
        .then((res) => res.data);

    const { data, error } = useSWR(`https://api.cryptoquant.com/v1/`, fetcher)

    console.log("this is the data", data)

    return (
        <div>
            This is onChianmEtrics {id}





        </div>
    )

}


export default OnChainMetrics