import React, { useEffect, useRef, useState } from 'react'
import { GameLogic } from './GameLogic'
import Tile from './Tile'
import io from 'socket.io-client'
import PopUp from './PopUp'

const socket = io.connect('http://localhost:3000')

export default function App() {
    const [player,setPlayer] = useState('o')
    const [board,setBoard] = useState([['','',''],['','',''],['','','']])
    const [winner,setWinner] = useState(false)
    const [room,setRoom] = useState("")
    const turnRef = useRef(false)

    useEffect(()=>{
      socket.on("turn",(data)=>{
        turnRef.current = data
        const popUp = document.getElementById("pop-up")
        popUp.style.transform = "scale(0)"
      })
      socket.on("error",(data)=>{

      })
      socket.on("recv-move",(data)=>{
        console.log("Player:"+player,"turn:"+turnRef.current)
        const tile = document.getElementById(data)
        const tile_back = tile.querySelector(".tile-back")
        tile.classList.add("clicked")
        const [k1,k2] = data
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
      })
    },[])

    const playerClick = (event) => {
      console.log("Player:"+player,"turn:"+board)
      if(!winner && player===turnRef.current){
        const tile = event.currentTarget
        const tile_back = document.getElementById(tile.id).querySelector(".tile-back")
        tile.classList.add("clicked")
        const [k1,k2] = tile.id
        let newBoard = board
        if(newBoard[parseInt(k1)-1][parseInt(k2)-1]==''){
          tile_back.innerHTML = player
          tile_back.style.backgroundColor = player==='x'?'#f83e4b':'dodgerblue'
          newBoard[parseInt(k1)-1][parseInt(k2)-1] = player          
          socket.emit("send-move",{room:room,move:tile.id})
          setPlayer((player)=> player==='x'?'o':'x')
          setBoard(newBoard)
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
      {turnRef && <h3>{turnRef.current=='x'?"You Start":"Opponent Starts"}</h3>}
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
