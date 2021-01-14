import React from 'react'
import Image from 'react-bootstrap/Image'
import Fade from 'react-reveal/Fade'

const PlayerImgPoke = (image, name, pokePlayerState) => {
  const src = image.src
  const alt = image.alt
  const action = image.pokePlayerState
  let animated
  if (action === 'start') {
    animated = 'animated fadeInLeft'
  } else if (action === 'damage') {
    animated = 'animated-shake shake'
  } else if (action === 'attack') {
    animated = 'attack attack-launch'
  } else if (action === 'loose') {
    animated = 'animated fadeOutLeft'
  } else {
    animated = ''
  }

  return (
    <>
      <Image
        className={`poke-item align-middle ${animated}`}
        src={src}
        alt={alt}
        fluid
      />
      <Fade>
        <div className='floor' />
      </Fade>
    </>
  )
}

export default PlayerImgPoke
