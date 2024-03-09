const socket = io();
const sendBtn = document.getElementById('sendBtn');
const messageIP = document.getElementById('msg');
const imageInput = document.getElementById('imageInput');
const chatWindow = document.getElementById('chat-window');

socket.on('message', (data) => {
  const { message, sender, type } = data;
  if (type === 'text') {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    
    if (sender === 'me') {
      messageElement.classList.add('message', 'message--me');
    } else {
      messageElement.classList.add('message', 'message--sender');
    }
    
    chatWindow.appendChild(messageElement);
  } else if (type === 'image') {
    const imageElement = document.createElement('img');
    imageElement.src = message;
    imageElement.classList.add('message-image');
    
    if (sender === 'me') {
      imageElement.classList.add('message-image--me');
    } else {
      imageElement.classList.add('message-image--sender');
    }
    
    chatWindow.appendChild(imageElement);
  }
});

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const message = messageIP.value;
  socket.emit('chatMessage', { message, sender: 'me', type: 'text' });
  messageIP.value = '';
});

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageBase64 = reader.result;
      socket.emit('chatMessage', { message: imageBase64, sender: 'me', type: 'image' });
    };
  }
});
