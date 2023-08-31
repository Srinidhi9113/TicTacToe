import React, { useEffect, useRef, useState } from 'react'
import { GameLogic } from './GameLogic'
import Tile from './Tile'
import io from 'socket.io-client'
import PopUp from './PopUp'

const socket = io.connect('http://localhost:3000')

export default function App() {
    const player = useRef('x')
    const board = useRef([['','',''],['','',''],['','','']])
    const [winner,setWinner] = useState(false)
    const [room,setRoom] = useState("")
    const [turn,setTurn] = useState(false)

    useEffect(()=>{
      socket.on("turn",(data)=>{
        setTurn(data)
        const popUp = document.getElementById("pop-up")
        popUp.style.transform = "scale(0)"
      })
      socket.on("error",(data)=>{

      })
    },[])

    useEffect(()=>{
      socket.on("recv-move",(data)=>{
        const tile = document.getElementById(data)
        const tile_back = tile.querySelector(".tile-back")
        tile.classList.add("clicked")
        const [k1,k2] = data
        let newBoard = board.current
        if(newBoard[parseInt(k1)-1][parseInt(k2)-1]==''){
          tile_back.innerHTML = player.current
          tile_back.style.backgroundColor = player.current==='x'?'#f83e4b':'dodgerblue'
          newBoard[parseInt(k1)-1][parseInt(k2)-1] = player.current
          board.current = newBoard
          player.current = player.current=='x'?'o':'x'
        }
        const win = GameLogic(board.current)
        if(win) setWinner(win)
      })
    },[turn])

    const playerClick = (event) => {
      if(!winner && player.current===turn){
        const tile = event.currentTarget
        const tile_back = document.getElementById(tile.id).querySelector(".tile-back")
        tile.classList.add("clicked")
        const [k1,k2] = tile.id
        let newBoard = board.current
        if(newBoard[parseInt(k1)-1][parseInt(k2)-1]==''){
          tile_back.innerHTML = player.current
          tile_back.style.backgroundColor = player.current==='x'?'#f83e4b':'dodgerblue'
          newBoard[parseInt(k1)-1][parseInt(k2)-1] = player.current
          board.current = newBoard
          player.current = player.current=='x'?'o':'x'
        }
        const win = GameLogic(board.current)
        if(win) setWinner(win)
        socket.emit("send-move",{room:room,move:tile.id})
      }
    }

    const refresh = (event) => {
      const tiles = Array.from(document.getElementsByClassName("clicked"))
      tiles.forEach(tile => {
        tile.classList.remove("clicked")
      })
      player.current = 'x'
      setWinner(false)
      board.current = [['','',''],['','',''],['','','']]
      setTurn((turn)=>turn==='x'?'o':'x')
    }

    const roomValue = (event) => {
      setRoom(event.target.value)
    }

    const joinRoom = (event) => {
      socket.emit('join-room',room)
    }

  return (
    <div className='app'>
      <PopUp onChange={roomValue} onClick={joinRoom}/>
      <div className='title'>
        <h1>TicTacToe</h1>
      </div>
      {turn && <h3>{turn==='x'?"You Start":"Opponent Starts"}</h3>}
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
