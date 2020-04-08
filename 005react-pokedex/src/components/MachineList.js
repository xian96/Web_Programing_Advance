import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
import NotFound from './NotFound';

function MachineList(props) {
    const [machineData, setMachineData] = useState(undefined);
    const [page, setPage] = useState(0);
    let pagination = null;
    let li = null;

    useEffect(
        () => {
            async function fetchData() {
                try {
                    setPage(props.match.params.page);
                    const { data } = await axios.get(`https://pokeapi.co/api/v2/machine/?offset=${page * 20}&limit=20`);
                    setMachineData(data)
                } catch (e) {
                    console.log(e);
                }
            }
            fetchData();
        },
        [props.match.params.page, page]
    );

    const buildListItem = (machine) => {
        const regex = 'https://pokeapi.co/api/v2/machine/';
        const id = machine.url.substring(regex.length, machine.url.length - 1);
        return (
            <li key={id}>
                <Link to={`/machines/${id}`}>
                    Machine No.{id}
                </Link>
            </li>
        );
    };

    li =
        machineData &&
        machineData.results &&
        machineData.results.map((machines) => {
            return buildListItem(machines);
        });

    const buildPagination = () => {
        if (machineData && machineData.count) {
            if (page > 0 && page < Math.floor(machineData.count / 20)) {
                return (
                    <div>
                        <Link className="link" to={`/machines/page/${parseInt(page) - 1}`}>previous</Link>
                        <Link className="link" to={`/machines/page/${parseInt(page) + 1}`}>next</Link>
                    </div>
                );
            }
            else if (parseInt(page) === 0) {
                return (
                    <div>
                        <Link className="link" to={`/machines/page/${parseInt(page) + 1}`}>next</Link>
                    </div>
                );
            } else if (parseInt(page) === Math.floor(machineData.count / 20)) {
                return (
                    <div>
                        <Link className="link" to={`/machines/page/${parseInt(page) - 1}`}>previous</Link>
                    </div>
                );
            } else return null;
        }
        else return null;
    }
    pagination = buildPagination();


    if (machineData && machineData.count && page >= 0 && page <= Math.floor(machineData.count / 20)) {
        return (
            <div className='body'>
                <h1>this is MachineList!</h1>
                {pagination}
                <br />
                <ul className='list-unstyled'>{li}</ul>
            </div>
        );
    } else {
        return (
            <NotFound message="No more machine!" />
        );
    }
}

export default MachineList;