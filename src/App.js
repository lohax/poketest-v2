import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Browse from './components/Browse'
import Battle from './components/Battle'
// import Search from './components/Search'

import PokemonContext from './context/context'
import usePokemons from './hooks/usePokemons'

import 'bootstrap/dist/css/bootstrap.min.css'
import './sass/loader.scss'

function App () {
  const {
    data,
    loading,
    error,
    allPokeFound,
    state,
    setState,
    selectedPoke,
    setSelectedPoke,
    multiSelectedPoke,
    setMultiSelectedPoke,
    handleClick,
    handleDblClick,
    handleSearch,
    computerSelectedPoke,
    setComputerSelectedPoke
  } = usePokemons()
  // console.log('pokedata', pokeData)
  // console.log('multiSelectedPoke', multiSelectedPoke)
  // console.log('data usePokemons', data)
  return (
    <PokemonContext.Provider value={{
      data,
      loading,
      error,
      allPokeFound,
      state,
      setState,
      selectedPoke,
      setSelectedPoke,
      multiSelectedPoke,
      setMultiSelectedPoke,
      handleClick,
      handleDblClick,
      handleSearch,
      computerSelectedPoke,
      setComputerSelectedPoke
    }}
    >
      <Router>
        <div className='App'>
          <Header />
          <div>
            <Switch>
              {/* <Route exact path='/' component={Browse} /> */}
              <Route exact path='/'>
                <Browse />
              </Route>
              <Route exact path='/battle' component={Battle} />
              {/* <Route exact path='/search' component={Search} /> */}
              {/* <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} /> */}
            </Switch>
          </div>
        </div>
      </Router>
    </PokemonContext.Provider>
  )
}

export default App
