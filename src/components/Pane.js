import React from 'react'
import Image from 'react-bootstrap/Image'
import '../sass/App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

const Pane = (props) => {
  const { pokemon, handleDblClick } = props

  return (
    <div>
      <div className='card poke-card-pane'>
        <Image
          className='poke-item align-middle'
          src={pokemon.image}
          alt={pokemon.name}
          fluid
        />
      </div>
      <div className='card mt-3'>
        <div className='card-body'>
          <div className='d-flex justify-content-between flex-wrap'>
            <h5><span className='badge badge-danger badge-pill'>Max CP : {pokemon.maxCP}</span></h5>
            <h5><span className='badge badge-success badge-pill'>Max HP : {pokemon.maxHP}</span></h5>
          </div>
          <h5 className='card-title mt-3'>Characteristics</h5>
          <ul className='characteristics'>

            <li className='font-weight-bold'>Classification :</li>
            <li><button type='button' className='btn btn-outline-dark btn-sm mb-2 '>{pokemon.classification}</button></li>

            <li className='mt-2 font-weight-bold '>Weakness :</li>
            <li className='d-flex justify-content-start flex-wrap'>
              {pokemon.weaknesses.map((weaknesse, index) => (
                <button key={index} type='button' className={`btn btn-light btn-sm mr-2 mb-2 type-${weaknesse}`}>{weaknesse}</button>
              ))}
            </li>

            <li className='mt-2 font-weight-bold'>Resistant :</li>
            <li className='d-flex justify-content-start flex-wrap'>
              {pokemon.resistant.map((resist, index) => (
                <button key={index} type='button' className={`btn btn-light btn-sm mr-2 mb-2 type-${resist}`}>{resist}</button>
              ))}
            </li>

            <li className='mt-2 font-weight-bold'>Attacks (fast) :</li>
            <li className='d-flex justify-content-start flex-wrap'>
              {pokemon && pokemon.attacks && pokemon.attacks.fast
                .slice(0, 2)
                .map(attack => (
                  <button key={`${attack.name}-${attack.damage}`} type='button' className='btn btn-light btn-sm mr-2 mb-2 att-fast'>
                    {attack.name}
                    <span className='ml-2 badge badge-secondary'>{attack.damage}</span>
                  </button>
                ))}
            </li>

            <li className='mt-2 font-weight-bold'>Attacks (special) :</li>
            <li className='d-flex justify-content-start flex-wrap'>
              {pokemon && pokemon.attacks && pokemon.attacks.special
                .slice(0, 2)
                .map(attack => (
                  <button key={`${attack.name}-${attack.damage}`} type='button' className='btn btn-light btn-sm mr-2 mb-2 att-special'>
                    {attack.name}
                    <span className='ml-2 badge badge-secondary'>{attack.damage}</span>
                  </button>
                ))}
            </li>

            {pokemon.evolutions !== null
              ? <>
                <li className='mt-2 font-weight-bold'>Evolutions :</li>
                <li className='d-flex justify-content-start flex-wrap'>
                  {pokemon && pokemon.evolutions.map((evo, index) => (
                    <div key={evo.name}>
                      <div className='card poke-card-pane-small mr-2'>
                        <Image
                          className='poke-item align-middle'
                          src={evo.image}
                          alt={evo.name}
                          fluid
                          onClick={() => handleDblClick(evo)}
                        />
                      </div>
                      <div className='card-body poke-name-small'>
                        <span>{evo.name}</span>
                      </div>

                    </div>
                  ))}
                </li>
                </>
              : ''}

          </ul>
        </div>
      </div>

    </div>

  )
}

export default Pane
