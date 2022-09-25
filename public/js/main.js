const chatForm = document.getElementById('chat-form');
//Scroll
const chatMessages = document.querySelector('.chat-messages');
const socket = io();
//Show message
socket.on('message',message=>{
    console.log(message);
//Show message-design
    outputMessage(message);
//Scroll
chatMessages.scrollTop = chatMessages.scrollHeight;
})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage',msg);
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
   
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