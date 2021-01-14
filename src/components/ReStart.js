import React from 'react'

const ReStart = (props) => {
  return (
    <div onClick={() => props.handleReStart()} className='restart' role='button'>
      Click here to start a new game
    </div>
  )
}

export default ReStart
