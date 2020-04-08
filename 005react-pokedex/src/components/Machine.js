import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import NotFound from './NotFound';

function Machine(props) {
    const [machineData, setMachineData] = useState(undefined);
    const [id, setId] = useState(1);
    const [error, setError] = useState(false);

    useEffect(
        () => {
            async function fetchData() {
                try {
                    setId(props.match.params.id);
                    const { data } = await axios.get(`https://pokeapi.co/api/v2/machine/${id}/`);
                    setMachineData(data);
                } catch (e) {
                    console.log(e);
                    setError(true)
                }
            }
            fetchData();
        },
        [props.match.params.id, id]
    );

    if (!error) {
        return (
            <div className='body'>
            <h1>This is machine Detail!</h1>
            <br />
            <h1 className='cap-first-letter'>item: {machineData && machineData.item.name}</h1>
            <br />
            <h1 className='cap-first-letter'>move: {machineData && machineData.move.name}</h1>
            <br />
            <h1 className='cap-first-letter'>version_group: {machineData && machineData.version_group.name}</h1>
            <br />
        </div>
        );
    } else {
        return (
            <NotFound message="machine Not Found! Find some!" />
        );
    }
}

export default Machine;