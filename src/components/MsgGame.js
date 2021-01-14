import React from 'react'
import Fade from 'react-reveal/Fade'

const MsgGame = (msg) => {
  return (
    <Fade>
      <div
        className='d-flex align-items-center msg-game'
        dangerouslySetInnerHTML={{ __html: Object.values(msg) }}
      />
    </Fade>
  )
}

export default MsgGame
