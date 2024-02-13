const socket = io();
const sendBtn = document.getElementById('sendBtn');
const messageIP = document.getElementById('msg');
const chatWindow = document.getElementById('chat-window');

socket.on('message', (message) => {
  const p = document.createElement('p');
  p.textContent = message;
  console.log(`Sender: ${message}`);
  chatWindow.appendChild(p); // Correctly append to chatWindow
});

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const message = messageIP.value;
  console.log(`ME: ${message}`);
  socket.emit('chatMessage', message);
  messageIP.value = '';
});