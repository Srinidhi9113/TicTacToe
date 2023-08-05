import React, { useState } from 'react'
import { GameLogic } from './GameLogic'
import Tile from './Tile'

export default function App() {
    const [player,setPlayer] = useState('x')
    const [board,setBoard] = useState([['','',''],['','',''],['','','']])
    const [winner,setWinner] = useState(false)

    const playerClick = (event) => {
      if(!winner){
        const tile = event.currentTarget
        const tile_back = document.getElementById(tile.id).querySelector(".tile-back")
        tile.classList.add("clicked")
        const [k1,k2] = tile.id
        let newBoard = board
        if(newBoard[parseInt(k1)-1][parseInt(k2)-1]==''){
          tile_back.innerHTML = player
          tile_back.style.backgroundColor = player==='x'?'#f83e4b':'dodgerblue'
          newBoard[parseInt(k1)-1][parseInt(k2)-1] = player
          setBoard(newBoard)
          setPlayer((player)=> player==='x'?'o':'x')
        }
        const win = GameLogic(board)
        if(win) setWinner(win)
      }
    }

    const refresh = (event) => {
      const tiles = Array.from(document.getElementsByClassName("clicked"))
      tiles.forEach(tile => {
        tile.classList.remove("clicked")
      })
      setPlayer(player=>player==='x'?'o':'x')
      setWinner(false)
      setBoard([['','',''],['','',''],['','','']])
    }

  return (
    <div className='app'>
      <div className='title'>
        <h1>TicTacToe</h1>
      </div>
      <div className="play-board">
        <Tile id="11" onClick={playerClick}/>
        <Tile id="12" onClick={playerClick}/>
        <Tile id="13" onClick={playerClick}/>
        <Tile id="21" onClick={playerClick}/>
        <Tile id="22" onClick={playerClick}/>
        <Tile id="23" onClick={playerClick}/>
        <Tile id="31" onClick={playerClick}/>
        <Tile id="32" onClick={playerClick}/>
        <Tile id="33" onClick={playerClick}/>
      </div>
      {winner==='draw' && <div className='result'>
        It's a DRAW!!!
        <div>
          <button onClick={refresh}>Refresh</button>
        </div>
      </div>}
      {winner && winner!=='draw' && <div className='result'>
        The winner is {winner}
        <div>
          <button onClick={refresh}>Refresh</button>
        </div>
      </div>}
    </div>
  )
}
