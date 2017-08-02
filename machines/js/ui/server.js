const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const { createCpu } = require('../shared/create-cpu');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/js', (req, res) => {
  res.sendFile(__dirname + '/public/js/app.js');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('conneted');
  socket.on('run_asm', data => {
    setImmediate(() => {
      const cpu = createCpu(data.asm);

      cpu.events.on('update', (registers, memory, stack) => {
        socket.emit('registers_update', {
          registers
        });

        socket.emit('stack_update', {
          stack: Array.from(stack.raw)
        });
      });

      cpu.run();
    });
  });
});

http.listen(8080, () => console.log('Listening on Port:', 8080));
