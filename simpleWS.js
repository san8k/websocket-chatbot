const WebSocket = require('ws');

const WS_PORT = 9001;

const wsServer = new WebSocket.Server({ port: WS_PORT });

const onConnect = (ws, req) => {
  console.log('[WSS] > Соединение открыто');
  console.log(req.headers);
  ws.send('Hi!');
  ws.on('message', (message) => {
    console.log('[WSS][Received] >', message);
    ws.send(`[WSS][Sent] > ${message}`);
  });
  ws.on('close', () => {
    console.log('[WSS] > Соединение закрыто');
  })
};

wsServer.on('connection', onConnect);

console.log(`[WSS] > Сервер запущен на ${WS_PORT} порту`);
