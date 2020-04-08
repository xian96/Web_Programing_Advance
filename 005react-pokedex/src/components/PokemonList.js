import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
import NotFound from './NotFound';

function PokemonList(props) {
    const [pokemonData, setPokemonData] = useState(undefined);
    const [page, setPage] = useState(0);
    let pagination = null;
    let li = null;

    useEffect(
        () => {
            async function fetchData() {
                try {
                    setPage(props.match.params.page);
                    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${page * 20}&limit=20`);
                    setPokemonData(data)
                } catch (e) {
                    console.log(e);
                }
            }
            fetchData();
        },
        [props.match.params.page, page]
    );

    const buildListItem = (pokemon) => {
        const regex = 'https://pokeapi.co/api/v2/pokemon/';
        const id = pokemon.url.substring(regex.length, pokemon.url.length - 1);
        return (
            <li key={id}>
                <Link to={`/pokemon/${id}`}>
                    {pokemon.name}
                </Link>
            </li>
        );
    };

    li =
        pokemonData &&
        pokemonData.results &&
        pokemonData.results.map((pokemons) => {
            return buildListItem(pokemons);
        });

    const buildPagination = () => {
        if (pokemonData && pokemonData.count) {
            if (page > 0 && page < Math.floor(pokemonData.count / 20)) {
                return (
                    <div>
                        <Link className="link" to={`/pokemon/page/${parseInt(page) - 1}`}>previous</Link>
                        <Link className="link" to={`/pokemon/page/${parseInt(page) + 1}`}>next</Link>
                    </div>
                );
            }
            else if (parseInt(page) === 0) {
                return (
                    <div>
                        <Link className="link" to={`/pokemon/page/${parseInt(page) + 1}`}>next</Link>
                    </div>
                );
            } else if (parseInt(page) === Math.floor(pokemonData.count / 20)) {
                return (
                    <div>
                        <Link className="link" to={`/pokemon/page/${parseInt(page) - 1}`}>previous</Link>
                    </div>
                );
            } else return null;
        } else {
            return null;
        }
    }
    pagination = buildPagination();


    if (pokemonData && pokemonData.count && page >= 0 && page <= Math.floor(pokemonData.count / 20)) {
        return (
            <div className='body'>
                <h1>this is PokemonList!</h1>
                {pagination}
                <br />
                <ul className='list-unstyled'>{li}</ul>
            </div>
        );
    }else{
        return (
            <NotFound message="No more pokemon!" />
        );
    }
}

export default PokemonList;