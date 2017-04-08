$(document).ready(function() {
  app.init();
});

var app = {

  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',

  rooms: {},

  friends: {},

  init: () => {
  	
	app.fetch();
	//app.renderRoom('superLobby');

	$('#send .submit').on('click', function(event) {
	  event.preventDefault();
	   app.renderMessage(x);
	  var text = $('input[name=message]').val();
	  var index = window.location.search.indexOf('username=');
	  var username = window.location.search.slice(index + 9, window.location.search.length);
	  var message = {
	    username: username,
	    text: text,
	    room: undefined
	  }
	  app.send(message);
	  $('form')[0].reset();
	});

	$('#roomSelect').on('click', function(event) {
		console.log("hi");
	});

	$('.addRoom').on('click', function(event) {
		var roomname = prompt('What is the name of the new room?');
        app.renderRoom(roomname);
	});

	$('.username').on('click', function(event) {
        app.handleUsernameClick();
	});
  },
  
  send: message => {
	$.ajax({
	  url: app.server,
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
	    app.handleSubmit();
	  },
	  error: function (data) {
	    console.error('chatterbox: Failed to send message', data);
	  }
	});
  },

  fetch: () => {
	$.ajax({
	  url: app.server,
	  type: 'GET',
	  data: {order :'-createdAt'},
	  contentType: 'application/json',
	  success: function (data) {
	  	var messageArray = data.results;
	  	messageArray.forEach(function(x) {
	  	 
	  	});
	    console.log('chatterbox: Message received');
	  },
	  error: function (data) {
	    console.error('chatterbox: Failed to load message', data);
	  }
	});  	
  },

  clearMessages: () => {
    $("#chats").children().remove();
  },

  renderMessage: message => {
  	var text = message.text;
  	var room = message.roomname;
  	var name = message.username;

  	// if (!app.rooms.hasOwnProperty(room)) {
  	//   app.renderRoom(room);
  	// }

  	var $box = $('<div class="messageBox"></div>');
  	var $message = $('<div class="message">'+ text +'</div>');
  	text = decodeURI(escape($message.text()));
  	var $text = $('<div class="message">'+ text +'</div>');

  	var $name = $('<div class="username" value="'+ name +'">'+ name +'</div>');
  	//var $room = $('<p class="room">'+ room +'</p>');

    $('.messageBox').append($name);
    $('.messageBox').append($text);
    $('#chats').append($box);
    //$('.room').append($box);


    $('form')[0].reset();
  },

  renderRoom: roomname => {
  	app.rooms[roomname] = roomname;
  	var $room = $('<option class="existingRoom" value="'+ roomname +'">'+ roomname +'</option>');
    $('#roomSelect').append($room);
  },

  handleUsernameClick: () => {

  },

  handleSubmit: () => {
  	
  }
};

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };



