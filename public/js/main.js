const chatForm = document.getElementById('chat-form');

const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
// console.log(username,room);
const socket = io();
socket.emit('joinRoom',{username,room})
socket.on('message',message=>{
    console.log(message)
    outputMessage(message)
})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg =e.target.elements.msg.value;
    socket.emit('chatMessage',msg)
})

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div)
    }