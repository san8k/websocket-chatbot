const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = 9000;

// /chatbot-server/ws
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('[CHAT] > Connected');

  socket.on('disconnect', () => {
    console.log('[CHAT] > Disconnected');
  });

  socket.on('sendMsg', (data) => {
    switch (data.type) {
      case 'CHATBOT':
        socket.emit('addMsg', {...data});
        socket.emit('addMsg', {
          type: 'CHATBOT',
          author: 'client',
          value: `И тебе ${data.value}`,
        });
        break;
      case 'CHATBOT_BZ':
        socket.emit('addMsg', {
          type: 'CHATBOT',
          author: 'client',
          value: `Я получил новые знания!`,
        });
        break;
      case 'BUTTONS':
        socket.emit('addMsg', {
          type: 'CHATBOT',
          author: 'client',
          value: `Получены кнопки: ${data.value}`,
        });
        break;
      default:
        socket.emit('addMsg', {
          type: 'CHATBOT',
          author: 'client',
          value: `Повторите, не понятно`,
        });
        break;
    }
  });
});

http.listen(PORT, () => {
  console.log(`[CHAT] > Listening ${PORT} port`);
});
