const socket = io('http://localhost:8600');

// get DOM element in respective js variables 
const form=document.getElementById('send-container');
const message=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");

//audio that will play on receiving message
var audio=new Audio("ting.mp3");
 
// function which will append event info to the container 
const append=(message,position)=>{
     const messageElement = document.createElement('div');
     messageElement.innerText= message;
     messageElement.classList.add('message');
     messageElement.classList.add(position);
     messageContainer.append(messageElement);
     if(position=='left'){
        audio.play();
     }
}

//  ask new user for his/her name and let the server know
const name=prompt("enter your name to join ");
socket.emit('new-user-joined',name)

// if the new user join ,receive the event from the server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
})
 

// if the form get submitted ,send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`you: ${message}`,'right');

    socket.emit('send',message);
    messageInp.value=''
})


// if server send a message,receive it 
socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left');
})


// if user leave the chat , append the info to the container
socket.on('left',name=>{
    append(`${name}: left the chat`,'right');
}) 
