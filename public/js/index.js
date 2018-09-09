var socket = io();

socket.on('connect',function (){
  console.log('connected to server');

 
    
});

   
 
// socket.emit('createMessage',{name:"Ali",text:"salam"},function(data){

//     console.log("Got it",data)

// });

socket.on('newMessage', function(message){

    var li= jQuery('<li></li>');
    li.text(`${message.name} : ${message.text}`);

    jQuery('#messages').append(li);
    console.log(message);

})


jQuery('#message-form').on('submit', function(e){

    e.preventDefault();

    socket.emit('createMessage',{
        name:'User',
        text:jQuery('[name=message]').val()
    } ,function (){
        
    });

   // jQuery('')
});


socket.on('disconnect',function (){
    console.log("Disconnected from server.")

});

