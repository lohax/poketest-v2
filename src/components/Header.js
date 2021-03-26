import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../sass/App.scss'
import logo from '../images/logo.png'
import { PokemonContext } from '../context/'
import { ToastContainer, toast } from 'react-toastify'
import Image from 'react-bootstrap/Image'

const Header = () => {
  const { multiSelectedPoke } = useContext(PokemonContext)

  const [state, setState] = useState({
    isToggleOn: true,
    canLink: false
  })

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

  // Button figth/quit handle
  const handleClick = () => {
    if (multiSelectedPoke.length < 3) {
      setState({ canLink: false, isToggleOn: !state.isToggleOn })
      notify('min')
    } else {
      setState({ canLink: true, isToggleOn: !state.isToggleOn })
    }
  }

  const btnFight = <button className='mr-2 btn btn-primary'>Fight</button>
  const btnBrowse = <button className='mr-2 btn btn-danger'>Quit</button>

  return (
    <>
      {/* Notification component */}
      <ToastContainer />

      <header className='App-header'>

        <Link to='/'>
          <Image
            className='logo ml-2'
            title='Reset Game'
            src={logo}
            alt='Pokemon'
            fluid
          />
        </Link>

        <div onClick={handleClick}>
          {state.isToggleOn
            ? <Link to='/Battle'>{btnFight}</Link>
            : <Link to='/'>{btnBrowse}</Link>}
        </div>

      </header>
    </>
  )
}

export default Header
