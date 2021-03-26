import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Image from 'react-bootstrap/Image'

import Pokeball from '../images/pokeball_icon.png'

const ComputerStandByPoke = (pokeComputer, computerSelectedPoke) => {
  const { name, image } = pokeComputer.pokeComputer
  return (
    <>
      {/* LST POKEBALL */}
      <div className='d-flex justify-content-start align-items-center '>

        <OverlayTrigger
          trigger={['hover', 'focus']}
          key={name}
          placement='top'
          overlay={
            <Popover id='popover-positioned-top'>
              <Popover.Title as='h3'>{name}</Popover.Title>
              <Popover.Content className='d-flex flex-column align-items-center'>
                <Image
                  id={name}
                  className='align-top ml-1'
                  style={{ width: '40px' }}
                  src={image}
                  alt={name}
                  fluid
                  role='button'
                />
                <br />
                <strong>Figthing</strong>
              </Popover.Content>
            </Popover>
                }
        >
          <Image
            id={name}
            className='align-top ml-1 '
            style={{ width: '22px' }}
            src={Pokeball}
            alt={name}
            fluid
          />
        </OverlayTrigger>

        {pokeComputer.computerSelectedPoke.map((pokemon, index) => (
          <OverlayTrigger
            trigger={['hover', 'focus']}
            key={`${pokemon.name}-${pokemon.index}`}
            placement='top'
            overlay={
              <Popover id='popover-positioned-top'>
                <Popover.Title as='h3'>{pokemon.name}</Popover.Title>
                <Popover.Content className='d-flex flex-column align-items-center'>
                  <Image
                    id={pokemon.name}
                    className='align-top ml-1'
                    style={{ width: '40px' }}
                    src={pokemon.image}
                    alt={pokemon.name}
                    fluid
                    role='button'
                  />
                  <br />
                  <strong>Stand by</strong>
                </Popover.Content>
              </Popover>
                }
          >
            <Image
              id={pokemon.name}
              className='align-top ml-1'
              style={{ width: '22px' }}
              src={Pokeball}
              alt={pokemon.name}
              fluid
              role='button'
            />
          </OverlayTrigger>

        ))}

      </div>
    </>
  )
}

export default ComputerStandByPoke
