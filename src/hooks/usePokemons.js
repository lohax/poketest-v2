import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POKEMON_INFO } from '../graphql/getPokemons'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const usePokemons = () => {
  // const [searchFilter, setFearchFilter] = useState('')
  const myFirst = 151
  // const myPokeFilter = "Bulbasaur"

  const { data, loading, error } = useQuery(GET_POKEMON_INFO, {
    variables: { first: myFirst }
    // variables: { name: searchFilter }
  })

  console.log(typeof data)

  // const [executeSearch, { data, loading, error, refetch }] = useLazyQuery(GET_POKEMON_INFO)

  // useEffect(() => {
  //   if (myFirst) {
  //     executeSearch({
  //       variables: { first: myFirst }
  //     })
  //   }
  // }, [myFirst, executeSearch])

  // useEffect(() => {
  //   executeSearch({
  //     // variables: { first: myFirst }
  //     variables: { first: myFirst, name: 'Bulbasaur' }
  //   })
  // }, [])

  // useEffect(() => {
  //   executeSearch({
  //     // variables: { first: myFirst }
  //     variables: { name: `%${searchFilter}%` }
  //   })
  // }, [searchFilter])

  const [allPokeFound, setallPokeFound] = useState([])

  const [state, setState] = useState({
    isPaneOpen: false
  })

  const [selectedPoke, setSelectedPoke] = useState([])
  const [multiSelectedPoke, setMultiSelectedPoke] = useState([])
  const [computerSelectedPoke, setComputerSelectedPoke] = useState([])

  useEffect(() => {
    console.info('allPokeFound', allPokeFound)
  }, [allPokeFound])

  useEffect(() => {
    // console.log('selectedPoke', selectedPoke)
  }, [selectedPoke])

  useEffect(() => {
    // console.log('multiSelectedPoke', multiSelectedPoke)
  }, [multiSelectedPoke])

  useEffect(() => {
    // console.log('computerSelectedPoke ', computerSelectedPoke)
  }, [computerSelectedPoke])

  function notify (typ) {
    toast.error(
      typ === 'max' ? 'You have reach the maximum of 5 pokemons' : 'You haven\'t reach the minimun of 3 pokemons'
      , {
        toastId: 'maxpoke',
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
  }

  const randomPokeLst = (typ) => {
    if (typ === 'add') {
      // filter the selected and computerSelected and choose randomly
      const randomPoke = data.pokemons.filter(item => !multiSelectedPoke.includes(item)).filter(item => !computerSelectedPoke.includes(item))[Math.floor(Math.random() * data.pokemons.length)]
      setComputerSelectedPoke(computerSelectedPoke => [...computerSelectedPoke, randomPoke])
    } else {
      const array = [...computerSelectedPoke]
      array.pop()
      setComputerSelectedPoke(computerSelectedPoke => array)
    }
  }

  const handleClick = (pokemon, el) => {
    if (!multiSelectedPoke.includes(pokemon)) {
      if (multiSelectedPoke.length <= 4) {
        setMultiSelectedPoke(multiSelectedPoke => [...multiSelectedPoke, pokemon])
        randomPokeLst('add')
      } else {
        notify('max')
      }
    } else {
      const index = multiSelectedPoke.indexOf(pokemon)
      const array = [...multiSelectedPoke]
      if (index > -1) {
        array.splice(index, 1)
        setMultiSelectedPoke(multiSelectedPoke => array)
        randomPokeLst('splice')
      }
    }
  }

  const handleDblClick = (pokemon) => {
    setSelectedPoke(pokemon)
    setState({ isPaneOpen: true })
  }

  const handleSearch = (filtered, searchFilter) => {
    // console.log('searchFilter', searchFilter)
    // executeSearch({
    //   variables: { name: searchFilter }
    // })
    // setFearchFilter(searchFilter)
    setallPokeFound(allPokeFound => [])
    filtered.map((key, index) => (
      setallPokeFound(allPokeFound => [...allPokeFound, key.item])
    ))

    const lstpokeName = []
    filtered.map((key, index) => (
      lstpokeName.push(key.item.name)
    ))

    // list of div container. If id equal to search fadeIn else out
    const lstdiv = Array.from(document.querySelector('#lstpokeContainer').childNodes)
    for (let i = 0; i < lstdiv.length; ++i) {
      const pokeDiv = lstdiv[i]
      if (typeof pokeDiv.id !== 'undefined') {
        if (searchFilter === '') {
          document.getElementById(pokeDiv.id).className = 'animated animatedFadein'
        } else {
          if (!lstpokeName.includes(pokeDiv.id)) {
            document.getElementById(pokeDiv.id).className = 'animated animatedFadeOut'
          } else {
            document.getElementById(pokeDiv.id).className = 'animated animatedFadein'
          }
        }
      }
    }
  }

  return {
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
  }
}

export default usePokemons
