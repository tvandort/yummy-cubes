// The first import here has to be a relative import as module aliasing
// is not yet set up.
import './moduleAliases';

// Now we can use module aliasing if we want.
import next from 'next';
import socketio from 'socket.io';
import { createServer } from 'http';
import express from 'express';

import createRouter from './routes';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const app = express();
const nextHandler = nextApp.getRequestHandler();
const server = createServer(app);
const io = socketio(server);

const gameState: {
  players: { name: string; position: { x: number; y: number } }[];
} = {
  players: []
};

const random = () => Math.random() * 1000;

// sockets
io.on('connection', (socket) => {
  console.log('someone connected');
  io.emit('message', { name: 'system', message: 'user joined' });

  socket.on('message', (args) => {
    io.emit('message', args);
  });

  socket.on('add_player', (name) => {
    console.log(`adding ${name}`);
    if (!gameState.players.some((player) => player.name === name)) {
      gameState.players.push({ name, position: { x: random(), y: random() } });
    }

    io.emit('game', gameState);
  });

  socket.on('move', (move) => {
    const player = gameState.players.filter(
      (player) => player.name === move.name
    )[0];
    if (player) {
      player.position = move.position;
    }

    io.emit('game', gameState);
  });
});

nextApp.prepare().then(() => {
  // Parse application/json content and put it in the body as a JSON object.
  app.use(express.json());

  app.use('/api', createRouter({ server: io }));

  app.all('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
