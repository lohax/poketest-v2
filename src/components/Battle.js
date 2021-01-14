import React, { useState, useEffect, useContext } from 'react'
import '../sass/Battle.scss'
import { PokemonContext } from '../context/'

import ComputerBox from './ComputerBox'
import PlayerBox from './PlayerBox'
import PlayerAttacks from './PlayerAttacks'
import ReStart from './ReStart'
import MsgGame from './MsgGame'

import ListGroup from 'react-bootstrap/ListGroup'

const Battle = () => {
  const {
    multiSelectedPoke,
    computerSelectedPoke,
    setMultiSelectedPoke,
    setComputerSelectedPoke
  } = useContext(PokemonContext)

  const [pokePlayer, setPokePlayer] = useState([])
  const [pokeComputer, setPokeComputer] = useState([])

  const [pokePlayerHpNow, setPokePlayerHpNow] = useState('')
  const [pokeComputerHpNow, setPokeComputerHpNow] = useState('')

  const [computerAttack, setComputerAttack] = useState('')

  const [msgGame, setMsgGame] = useState('')

  const [computerState, setComputerState] = useState('start')
  const [playerState, setPlayerState] = useState('start')

  const [gameOver, setGameOver] = useState(false)

  const [isStart, setIsStart] = useState(true)

  const [prevPlayerTeam, setPrevPlayerTeam] = useState([])
  const [prevComputerTeam, setPrevComputerTeam] = useState([])

  let nowHpPlayer = ''
  let nowHpComputer = ''

  // Set Pokemon for player
  useEffect(() => {
    const pickPokePlayer = multiSelectedPoke.shift()
    // setPrevPlayerTeam([...prevPlayerTeam, pickPokePlayer])
    setPokePlayer(...pokePlayer, pickPokePlayer)
  }, [])

  useEffect(() => {
    setPokePlayerHpNow(pokePlayerHpNow => pokePlayer.maxHP)
  }, [pokePlayer.maxHP])

  // Set Pokemon for computer
  useEffect(() => {
    const pickPokeComputer = computerSelectedPoke.shift()
    // setPrevComputerTeam([...prevComputerTeam, pickPokeComputer])
    setPokeComputer(pokeComputer => pickPokeComputer)
  }, [])

  useEffect(() => {
    setPokeComputerHpNow(pokeComputerHpNow => pokeComputer.maxHP)
  }, [pokeComputer.maxHP])

  useEffect(() => {
    // console.log('useEffect', pokeComputerHpNow)
  }, [pokeComputerHpNow])

  useEffect(() => {
    // console.log('useEffect', pokeComputerHpNow)
  }, [pokePlayerHpNow])

  // useEffect(() => {
  // }, [pokeComputer])

  // Start management
  useEffect(() => {
    if (typeof pokeComputer.name !== 'undefined') {
      pickComputerAttack()
    }

    // ready for battle
    if (isStart && typeof pokeComputer.name !== 'undefined') {
      // console.info(prevPlayerTeam)
      // console.info(prevComputerTeam)
      start()
    }
  }, [pokeComputer])

  useEffect(() => {
    // setShowFading(showFading => false)
  }, [setMsgGame])

  // useEffect(() => {
  //   setPrevPlayerTeam(multiSelectedPoke)
  // }, [])
  // useEffect(() => {
  //   setPrevComputerTeam(computerSelectedPoke)
  // }, [])

  const start = () => {
    setIsStart(false)
    setTimeout(() => {
      setMsgGame(msgGame => `Computer defy you with ${pokeComputer.name} !`)
      setTimeout(() => {
        setMsgGame(msgGame => `Go ${pokePlayer.name}!`)
        setTimeout(() => {
          setMsgGame(msgGame => '')
        }, 2000)
      }, 3000)
    }, 1)
  }

  const handlePlayerAttack = (name, damage) => {
    const pokeDefWeakness = pokePlayer.weaknesses
    const pokeDefResistant = pokePlayer.resistant
    const pokeAttTypes = pokeComputer.types

    // HANDLE ANIMATE
    setPlayerState(playerState => 'attack')
    setTimeout(() => {
      setComputerState(setComputerState => 'damage')
    }, 500)
    // END ANIMATE

    // TODO Random esquive 1/5
    // TODO Extract damage calcul

    // set initial damage
    damage = (damage * 2) + Math.floor(Math.random() * 50)
    // search for weakness
    if (pokeDefWeakness.some(Weakness => pokeAttTypes.includes(Weakness))) { damage *= 2 }
    // search for resistance
    if (pokeDefResistant.some(Resistant => pokeAttTypes.includes(Resistant))) { damage /= 2 }
    // set new damage
    damage = Math.floor(damage)

    nowHpComputer = ((pokeComputerHpNow - damage) < 0 ? 0 : (pokeComputerHpNow - damage))

    // setPokeComputer(pokeComputer => {
    //   return { ...pokeComputer, maxHP: nowHP }
    // })
    setPokeComputerHpNow(pokeComputerHpNow => nowHpComputer)

    setMsgGame(msgGame => `${pokePlayer.name} used ${name} <br> and make ${damage} damage !`)
    setTimeout(() => {
      if (nowHpComputer === 0 && computerSelectedPoke.length === 0) {
        setMsgGame(msgGame => `${pokeComputer.name} fainted ! <br> Your ${pokePlayer.name} wins !`)
        setComputerState(setComputerState => 'loose')
        setTimeout(() => {
          setGameOver(gameOver => true)
        }, 2000)
      } else if (nowHpComputer === 0 && computerSelectedPoke.length > 0) {
        setComputerState(setComputerState => 'loose')
        // Launch next pokemon
        nextPokeComputer()
      } else {
        setMsgGame(msgGame => '')

        // Computer turn to fight
        handleComputerAttack()
      }
    }, 2000)
  }

  const pickComputerAttack = () => {
    // pick random attack type
    const attackType = Math.floor(Math.random() * 2)
    // pick random attack from type
    if (attackType === 0) {
      const attackIndex = Math.floor(Math.random() * pokeComputer.attacks.fast.length)
      setComputerAttack(computerAttack => pokeComputer.attacks.fast[attackIndex])
    } else {
      const attackIndex = Math.floor(Math.random() * pokeComputer.attacks.special.length)
      setComputerAttack(computerAttack => pokeComputer.attacks.special[attackIndex])
    }
  }

  const handleComputerAttack = () => {
    const pokeDefWeakness = pokePlayer.weaknesses
    const pokeDefResistant = pokePlayer.resistant
    const pokeAttTypes = pokeComputer.types

    // HANDLE ANIMATE
    setComputerState(computerState => 'attack')
    setTimeout(() => {
      setPlayerState(playerState => 'damage')
    }, 500)
    // END ANIMATE

    pickComputerAttack()
    // TODO Random esquive
    // TODO Extract damage calcul

    // set initial damage
    let { name, damage } = computerAttack
    damage = (damage * 2) + Math.floor(Math.random() * 50)
    // search for weakness
    if (pokeDefWeakness.some(Weakness => pokeAttTypes.includes(Weakness))) { damage *= 2 }
    // search for resistance
    if (pokeDefResistant.some(Resistant => pokeAttTypes.includes(Resistant))) { damage /= 2 }
    // set new damage
    damage = Math.floor(damage)

    // Set new hp level for player
    nowHpPlayer = ((pokePlayerHpNow - damage) < 0 ? 0 : (pokePlayerHpNow - damage))
    setPokePlayerHpNow(pokePlayerHpNow => nowHpPlayer)

    setMsgGame(msgGame => `${pokeComputer.name} used ${name} <br> and make ${damage} damage !`)

    setTimeout(() => {
      if (nowHpPlayer === 0 && multiSelectedPoke.length === 0) {
        // Current poke loose and no more stand by
        setMsgGame(msgGame => `Your ${pokePlayer.name} fainted ! <br> You loose !`)
        setPlayerState(playerState => 'loose')
        setTimeout(() => {
          setGameOver(gameOver => true)
        }, 2000)
      } if (nowHpPlayer === 0 && multiSelectedPoke.length > 0) {
        // Current poke loose but more stand by
        setPlayerState(setPlayerState => 'loose')
        // Launch next pokemon
        nextPokePlayer()
      } else {
        setMsgGame(msgGame => '')
      }
    }, 2000)
  }

  const nextPokeComputer = () => {
    setMsgGame(msgGame => `${pokeComputer.name} fainted !`)
    setTimeout(() => {
      setComputerState(setComputerState => 'start')
      const pickPokeComputer = computerSelectedPoke.shift()
      setPrevComputerTeam([...prevComputerTeam, pickPokeComputer])
      setPokeComputer(pokeComputer => pickPokeComputer)
      setMsgGame(msgGame => `Computer call ${pickPokeComputer.name} !`)
      setTimeout(() => {
        setMsgGame(msgGame => '')
      }, 2000)
    }, 2000)
  }

  const nextPokePlayer = () => {
    setMsgGame(msgGame => `Your ${pokePlayer.name} fainted !`)
    setTimeout(() => {
      setPlayerState(setPlayerState => 'start')
      const pickPokePlayer = multiSelectedPoke.shift()
      setPrevPlayerTeam([...prevPlayerTeam, pickPokePlayer])
      setPokePlayer(pokePlayer => pickPokePlayer)
      setMsgGame(msgGame => `Go ${pickPokePlayer.name} !`)
      setTimeout(() => {
        setMsgGame(msgGame => '')
      }, 2000)
    }, 2000)
  }

  const handleReStart = () => {
    setMultiSelectedPoke([...prevPlayerTeam, ...multiSelectedPoke])
    setComputerSelectedPoke([...prevComputerTeam, ...computerSelectedPoke])
    setPokeComputerHpNow(pokeComputerHpNow => pokeComputer.maxHP)
    setPokePlayerHpNow(pokePlayerHpNow => pokePlayer.maxHP)
    setComputerState(computerSate => 'start')
    setPlayerState(playerState => 'start')
    setGameOver(gameOver => false)
    setMsgGame(msgGame => '')
    setIsStart(true)
  }

  return (

    <div className='container vh100'>
      <div className='row row vh100 justify-content-center align-items-center'>
        <div className='col-sm-12'>
          {/* BATTLE SCREEN CONTAINER */}
          <div className='card px-2 mx-auto battleField'>

            <ComputerBox
              pokeComputer={pokeComputer}
              computerSelectedPoke={computerSelectedPoke}
              pokeComputerHpNow={pokeComputerHpNow}
              computerState={computerState}
            />

            <PlayerBox
              pokePlayer={pokePlayer}
              multiSelectedPoke={multiSelectedPoke}
              pokePlayerHpNow={pokePlayerHpNow}
              playerState={playerState}
            />

            {/* TEXT BOX BOTTOM */}
            <div className='card box-bottom'>

              <div className='card-body d-flex justify-content-between m-0 p-1'>

                {gameOver === false && msgGame !== '' && (
                  <MsgGame
                    msgGame={msgGame}
                  />
                )}

                {msgGame === '' && gameOver === false && typeof pokeComputer.name !== 'undefined' && (
                  <>

                    <ListGroup className='lstAttacks'>
                      {pokePlayer.attacks && pokePlayer.attacks.fast
                        .slice(0, 2)
                        .map((attack, index) => (
                          <ListGroup.Item key={attack.name} role='button' className='item-attack-fast' action>
                            <PlayerAttacks
                              name={attack.name}
                              damage={attack.damage}
                              type={attack.type}
                              handlePlayerAttack={handlePlayerAttack}
                            />
                          </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <ListGroup className='lstAttacks'>
                      {pokePlayer.attacks && pokePlayer.attacks.special
                        .slice(0, 2)
                        .map((attack, index) => (
                          <ListGroup.Item key={attack.name} role='button' className='item-attack-spe' action>
                            <PlayerAttacks
                              name={attack.name}
                              damage={attack.damage}
                              type={attack.type}
                              handlePlayerAttack={handlePlayerAttack}
                            />
                          </ListGroup.Item>
                        ))}
                    </ListGroup>

                  </>
                )}

                {gameOver === true && (
                  <ReStart handleReStart={handleReStart} />
                )}

              </div>
            </div>
            {/* END TEXT BOX BOTTOM */}
          </div>
          {/* END BATTLE SCREEN CONTAINER */}
        </div>
      </div>
    </div>

  )
}

export default Battle
