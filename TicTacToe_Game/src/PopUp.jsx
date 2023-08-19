import React from 'react'

export default function PopUp(props) {
  return (
    <div className='pop-up' id="pop-up">
      <h2>Enter Room ID</h2>
      <input placeholder='room-id' onChange={props.onChange}/>
      <button onClick={props.onClick}>Enter</button>
    </div>
  )
}
