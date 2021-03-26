import React, { useContext } from 'react'

import Image from 'react-bootstrap/Image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Pane from './Pane'
import Search from './Search'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../sass/App.scss'
import '../sass/loader.scss'
import '../sass/Search.scss'

import { PokemonContext } from '../context/'

function Browse () {
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
    handleSearch
  } = useContext(PokemonContext)

  if (loading) return <div className='preloader'><div className='pokeball-spinner' /> </div>
  if (error) return `Error! ${error.message}`

  return (
    <div className='App'>
      <ToastContainer />

      {/* Searching area */}
      <Search
        data={data || ''}
        allPokeFound={allPokeFound || ''}
        handleSearch={handleSearch || ''}
      />

      {/* Pokemons list */}

      <div id='lstpokeContainer' className='container lstpoke mt-2'>
        {data &&
          data.pokemons &&
          data.pokemons
            .map((pokemon, index) => (

              <div id={pokemon.name} key={pokemon.id}>
                <div
                  id={pokemon.name}
                  className={`card poke-card ${multiSelectedPoke.includes(pokemon) ? 'pokeactive' : ''}`}
                  role='button'
                  onDoubleClick={() => handleDblClick(pokemon)}
                  onClick={() => handleClick(pokemon, this)}
                >
                  <Image
                    className='poke-item align-middle '
                    src={pokemon.image}
                    alt={pokemon.name}
                    fluid
                  />
                </div>
                <div className='card-body poke-name'>
                  <span>{pokemon.name}</span>
                </div>
              </div>

            ))}

        {/* Pokemons panel details */}
        {selectedPoke.length !== 0
          ? <SlidingPane
              closeIcon={<FontAwesomeIcon icon={faWindowClose} size='2x' className='closeico' />}
              isOpen={state.isPaneOpen}
              title={selectedPoke.name}
              subtitle={selectedPoke.types.map((type, index) => (
                <h6 className='d-inline' key={type} role='button'>
                  <span class={`badge badge-light type-${type}`}>{type}</span>
                </h6>
              )).reduce((prev, curr) => [prev, ' - ', curr])}
              onRequestClose={() => {
                setState({ isPaneOpen: false })
              }}
            >

            {/* Pokemons details */}
            <Pane
              pokemon={selectedPoke}
              handleDblClick={handleDblClick}
            />

            </SlidingPane>

          : ''}
      </div>
    </div>
  )
}

export default Browse
