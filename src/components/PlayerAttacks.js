import React from 'react'
import Fade from 'react-reveal/Fade'

const PlayerAttacks = (attack) => {
  return (
    <Fade>
      <div className='text-info' onClick={() => attack.handlePlayerAttack(attack.name, attack.damage)}>
        <b>{attack.name}</b>
      </div>
    </Fade>

  )
}

export default PlayerAttacks
