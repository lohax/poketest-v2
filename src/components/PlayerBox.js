import React from 'react'
// import Image from 'react-bootstrap/Image'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import PlayerStandByPoke from './PlayerStandByPoke'
import '../sass/Battle.scss'
import PlayerImgPoke from './PlayerImgPoke'

const PlayerBox = (pokePlayer, multiSelectedPoke, pokePlayerHpNow, playerState) => {
  const pokePlayerState = pokePlayer.playerState
  const { name, image, maxHP } = pokePlayer.pokePlayer
  const nowHP = pokePlayer.pokePlayerHpNow
  const pcent = ((nowHP / maxHP) * 100).toFixed(0)

  let pcentColor
  if (pcent <= 25) {
    pcentColor = 'danger'
  } else if (pcent <= 50) {
    pcentColor = 'warning'
  } else if (pcent > 50) {
    pcentColor = 'success'
  }

  return (
    <div className='box-player d-flex justify-content-between align-items-start'>

      <div className='card box-player-pokemon p-4'>
        <PlayerImgPoke
          src={image}
          alt={name}
          pokePlayerState={pokePlayerState}
        />
      </div>

      <div className='card box-player-info p-2'>
        <h3>{name}</h3>
        <div className='progressBar'>
          <div className='d-flex justify-content-between align-items-center '>
            <span className='mr-2'>
              <FontAwesomeIcon icon={faHeart} style={{ color: '#c82333' }} />
            </span>
            <div className='progressBar'>
              <ProgressBar variant={pcentColor} now={pcent} label={`${pcent}%`} />
            </div>
          </div>
        </div>
        <h4>{nowHP}/{maxHP}</h4>

        <PlayerStandByPoke
          pokePlayer={pokePlayer.pokePlayer}
          multiSelectedPoke={pokePlayer.multiSelectedPoke}
        />

      </div>

    </div>

  )
}

export default PlayerBox
