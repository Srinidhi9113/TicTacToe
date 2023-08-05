import React from 'react'

export default function Tile(props) {
  return (
    <div className='tile'>
      <div className='tile-inner' id={props.id} onClick={props.onClick}>
            <div className='tile-front'></div>
            <div className='tile-back'></div>
          </div>
    </div>
  )
}
