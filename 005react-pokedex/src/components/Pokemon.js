import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import noImage from '../image/noImage.jpeg';
import NotFound from './NotFound';

function Pokemon(props) {
    const [pokemonData, setPokemonData] = useState(undefined);
    const [id, setId] = useState(1);
    const [error, setError] = useState(false);

    useEffect(
        () => {
            async function fetchData() {
                try {
                    setId(props.match.params.id);
                    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
                    setPokemonData(data);
                } catch (e) {
                    console.log(e);
                    setError(true);
                }
            }
            fetchData();
        },
        [props.match.params.id, id]
    );

    let img = null;
    if (pokemonData && pokemonData.sprites) {
        img = <img alt='front of pokemon' src={pokemonData.sprites.front_default} />;
    } else {
        img = <img alt='imafront of pokemonge' src={noImage} />;
    }

    if (!error) {
        return (
            <div className='body'>
            <h1>This is Pokemon Detail!</h1>
            <h1 className='cap-first-letter'>{pokemonData && pokemonData.name}</h1>
            <br />
            {img}
            <br />
            <h1 className='title'>weight: </h1>
            <h2>
                {pokemonData && pokemonData.weight}
            </h2>
            <br />
            <h1 className='title'>height:</h1>
            <h2>
                {pokemonData && pokemonData.height}
            </h2>
            <br />
            <h1 className='title'>abilities:</h1>
            <ul className='list_attribute'>
                {pokemonData &&
                    pokemonData.abilities.map((ability) => {
                        return <h2 key={ability.ability.name}>{ability.ability.name}</h2>;
                    })}
            </ul>
            <h1 className='title'>types:</h1>
            <ul className='lilist_attributest'>
                {pokemonData &&
                    pokemonData.types.map((type) => {
                        return <h2 key={type.type.name}>{type.type.name}</h2>;
                    })}
            </ul>
        </div>
        );
    } else {
        return (
            <NotFound message="pokemon Not Found! Gotcha some!" />
        );
    }
}

export default Pokemon;