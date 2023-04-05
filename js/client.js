
const socket=io()

const form =document.getElementById('send-container')
const messageInp=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")

const name2 =prompt("Enter your name to join");
socket.emit('new-user-joined',name2)
