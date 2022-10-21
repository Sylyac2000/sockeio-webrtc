
const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const{username, room} =Qs.parse(location.search, {ignoreQueryPrefix: true});

console.log(username, room);

//join chat room
socket.emit('joinRoom', {username, room});

socket.on('message', message=>{
  console.log(message);
  //show message on chat screen
  outputMessage(message);
  //Scroll down chat screen

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  //console.log($('#msg').val());
  const msg = e.target.elements.msg.value;

  //Emit message to server
  socket.emit('chatMessage', msg)
  document.querySelector('#msg').value = '';
  e.target.elements.msg.focus();
});


function outputMessage(message){
  /* show message on chat screen */

  const div = document.createElement('div');
  //list of classes to add
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.msgtext}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}