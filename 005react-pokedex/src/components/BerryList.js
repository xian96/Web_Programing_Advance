import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
import NotFound from './NotFound';

function BerryList(props) {
    const [berryData, setBerryData] = useState(undefined);
    const [page, setPage] = useState(props.match.params.page);
    let pagination = null;
    let li = null;

    useEffect(
        () => {
            async function fetchData() {
                try {
                    setPage(props.match.params.page);
                    const { data } = await axios.get(`https://pokeapi.co/api/v2/berry/?offset=${page * 20}&limit=20`);
                    setBerryData(data)
                } catch (e) {
                    console.log(e);
                }
            }
            fetchData();
        },
        [props.match.params.page, page]
    );

    const buildListItem = (berry) => {
        const regex = 'https://pokeapi.co/api/v2/berry/';
        const id = berry.url.substring(regex.length, berry.url.length-1);
        return (
            <li key={berry.name}>
                <Link to={`/berries/${id}`}>
                    {berry.name}
                </Link>
            </li>
        );
    };

    li =
        berryData &&
        berryData.results &&
        berryData.results.map((berries) => {
            return buildListItem(berries);
        });

    const buildPagination = () => {
        if (berryData && berryData.count) {
            if (page > 0 && page < Math.floor(berryData.count / 20)) {
                return (
                    <div>
                        <Link className="link" to={`/berries/page/${parseInt(page) - 1}`}>previous</Link>
                        <Link className="link" to={`/berries/page/${parseInt(page) + 1}`}>next</Link>
                    </div>
                );
            }
            else if (parseInt(page) === 0) {
                return (
                    <div>
                        <Link className="link" to={`/berries/page/${parseInt(page) + 1}`}>next</Link>
                    </div>
                );
            } else if (parseInt(page) === Math.floor(berryData.count / 20)) {
                return (
                    <div>
                        <Link className="link" to={`/berries/page/${parseInt(page) - 1}`}>previous</Link>
                    </div>
                );
            } else return null;
        }
        else return null;
    }
    pagination = buildPagination();


    if (berryData && berryData.count && page >= 0 && page <= Math.floor(berryData.count / 20)) {
        return (
            <div className='body'>
            <h1>this is berryList!</h1>
            {pagination}
            <br />
            <ul className='list-unstyled'>{li}</ul>
        </div>
        );
    } else {
        return (
            <NotFound message="No more berry!" />
        );
    }
}

export default BerryList;