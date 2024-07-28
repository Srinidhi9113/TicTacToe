# Multiplayer Tic-Tac-Toe Game

Welcome to the Multiplayer Tic-Tac-Toe Game! This game allows you and a friend to connect over the same network and enjoy a classic game of Tic-Tac-Toe together. Follow the instructions below to get started.

## Getting Started

### Step 1: Start the Server

First, you need to start the server. Open a terminal window and navigate to the `Server` directory. Then, run the following command:

```sh
cd Server
node server.js
```

### Step 2: Start the Frontend Server
In a separate terminal window, start the frontend server. Navigate to the TicTacToe_Game directory and run the following command:
```sh
cd TicTacToe_Game
npm run dev -- --host
```

### Step 3: Access the Game
Once the frontend server is running, the URLs for accessing the game will be displayed in the terminal. Follow one of these URLs to open the game in your browser.

### Step 4: Join a Room
To play with your friend, both players need to enter the same room ID. This will allow you to join the same game room and start playing against each other.

## Gameplay
- Enter a unique room ID to create or join a game room.
- Once both players are in the same room, the game will start.
- Take turns placing your marks (X or O) on the game board.
- The first player to get three marks in a row (horizontally, vertically, or diagonally) wins the game.

## Troubleshooting
- Ensure both the server and frontend server are running without errors.
- Make sure both players are connected to the same network.
- Double-check that both players enter the exact same room ID.

Enjoy your game of Tic-Tac-Toe!
