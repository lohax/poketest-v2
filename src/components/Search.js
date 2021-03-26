import React, { useState, useEffect } from 'react'
import '../sass/Search.scss'
import Fuse from 'fuse.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = ({ data, allPokeFound, handleSearch }) => {
  const [searchFilter, setSearchFilter] = useState('')
  const [dataPoke, setDataPoke] = useState(data)

  useEffect(() => {
    setDataPoke(dataPoke => [data][0].pokemons)
  }, [])

  const handleKeyUp = event => {
    if (event.key === 'Enter') {
      search(event)
    }
  }

  const search = (e) => {
    const options = {
      minMatchCharLength: 3,
      keys: [
        'name',
        'classification',
        'types'
      ]
    }
    const fuse = new Fuse(dataPoke, options)
    // Resultat de recherche
    const result = fuse.search(searchFilter)
    handleSearch(result, searchFilter)
  }

  const resetSearch = () => {
    setSearchFilter('')
    search('')
  }

  return (

    <div className='input-group mb-3 fixpos'>
      <input
        id='inpFilter'
        type='text'
        className='inpSearch flex-fill'
        placeholder='Search pokemon, classification or type'
        value={searchFilter}
        onChange={e => setSearchFilter(e.target.value)}
        onKeyUp={e => handleKeyUp(e)}
      />
      <div className='input-group-append'>
        <button
          className='inpSearch btn-search'
          type='button'
          onClick={() => search(searchFilter)}
        >
          <FontAwesomeIcon icon={faSearch} size='2x' className='align-middle mr-2' />
        </button>
        <button
          className='inpSearch'
          type='button'
          onClick={() => resetSearch()}
        >
          <FontAwesomeIcon icon={faTimes} size='2x' className='align-middle mr-2' />
        </button>
      </div>

    </div>

  )
}

export default Search
