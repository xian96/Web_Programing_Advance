import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import NotFound from './NotFound';

function Berry(props) {
    const [berryData, setBerryData] = useState(undefined);
    const [id, setId] = useState(1);
    const [error, setError] = useState(false);

    useEffect(
        () => {
            async function fetchData() {
                try {
                    setId(props.match.params.id);
                    // setError(false); when this is happend?
                    const { data } = await axios.get(`https://pokeapi.co/api/v2/berry/${id}/`);
                    setBerryData(data);
                } catch (e) {
                    console.log(e);
                    setError(true);
                }
            }
            fetchData();
        },
        [props.match.params.id, id]
    );

    if (!error) {
        return (
            <div className='body'>
                <h1>This is berry Detail!</h1>
                <br />
                <h1 className='cap-first-letter'>{berryData && berryData.name}</h1>
                <h1 className='title'>size: </h1>
                <h2>
                    {berryData && berryData.size}
                </h2>
                <h1 className='title'>max_harvest:</h1>
                <h2>
                    {berryData && berryData.max_harvest}
                </h2>
                <h1 className='title'>growth_time:</h1>
                <h2>
                    {berryData && berryData.growth_time}
                </h2>
                <h1 className='title'>natural_gift_type:</h1>
                <h2>
                    {berryData && berryData.natural_gift_type && berryData.natural_gift_type.name}
                </h2>
            </div>
        );
    } else {
        return (
            <NotFound message="berry Not Found! Find some!" />
        );
    }
}

export default Berry;