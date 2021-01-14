import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import ComputerStandByPoke from './ComputerStandByPoke'
import ComputerImgPoke from './ComputerImgPoke'

const ComputerBox = (pokeComputer, computerSelectedPoke, pokeComputerHpNow, computerState) => {
  const pokeComputerState = pokeComputer.computerState
  const { name, image, maxHP } = pokeComputer.pokeComputer
  const nowHP = pokeComputer.pokeComputerHpNow
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
    <div className='box-computer d-flex justify-content-between align-items-start'>

      <div className='card box-computer-info p-2'>
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

        <ComputerStandByPoke
          pokeComputer={pokeComputer.pokeComputer}
          computerSelectedPoke={pokeComputer.computerSelectedPoke}
        />

      </div>

      <div className='card box-computer-pokemon p-4'>
        <ComputerImgPoke
          src={image}
          alt={name}
          pokeComputerState={pokeComputerState}
        />
      </div>

    </div>

  )
}

export default ComputerBox
