import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import BerryList from './components/BerryList';
import MachineList from './components/MachineList';
import Pokemon from './components/Pokemon';
import Berry from './components/Berry';
import Machine from './components/Machine';
import './App.css';
import logo from './image/pokeapi_256.png';
import NotFound from './components/NotFound';
import Landing from './components/Landing';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome Pokedex api!</h1>

          <Link className="link" to="/pokemon/page/0">pokemons</Link>
          <Link className="link" to="/berries/page/0">berries</Link>
          <Link className="link" to="/machines/page/0">machines</Link>
        </header>
        <h2>
          At Site you can search for the pokemon you like to check the character of it.
        </h2>
        <h2>
          Or you check the berry to feed them some have special effect some can restore the Hp of pokemon.
        </h2>
        <h2>
          Also you can check the Machine.
        </h2>
        <br />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/pokemon/page/:page' component={PokemonList} />
          <Route exact path='/berries/page/:page' component={BerryList} />
          <Route exact path='/machines/page/:page' component={MachineList} />
          <Route exact path='/pokemon/:id' component={Pokemon} />
          <Route exact path='/berries/:id' component={Berry} />
          <Route exact path='/machines/:id' component={Machine} />
          <Route path="*" component = {NotFound}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;