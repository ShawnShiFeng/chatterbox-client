$(document).ready(function() {
  app.init();
});

var app = {

  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',

  rooms: {},

  friends: {},

  messages: [],

  currentRoom: undefined,

  init: () => {
  	
	app.fetch();

	app.handleSubmit();

	$('.submit').on('click', function(event) {
	  event.preventDefault();
	  var text = $('input[name=message]').val();
	  var index = window.location.search.indexOf('username=');
	  var username = window.location.search.slice(index + 9, window.location.search.length);
	  var message = {
	    username: username,
	    text: text,
	    room: app.currentRoom
	  }
	  app.send(message);
	  $('form')[0].reset();
	});

	// $('#roomSelect').on('click', function(event) {
	// 	console.log("hi");
	// });
	$('select').on('focus', function() {}).change(function() {
		app.currentRoom = this.value;
		app.clearMessages();
		console.log(this.value);
		console.log(app.messages);
		var filtered = app.messages.filter(function(x) {
		  return x.roomname === this.value;
		});
		console.log(filtered[0].username);
		filtered.forEach(function(x) { app.renderMessage(x); });
	});

	$('.addRoom').on('click', function(event) {
		var roomname = prompt('What is the name of the new room?');
		app.currentRoom = roomname;
        app.renderRoom(roomname);
	});

	$('.username').on('click', function(event) {
		console.log('hi');
        app.handleUsernameClick();
	});

	
	// setInterval( function() {
	// 	app.clearMessages();
	// 	app.fetch();}, 10000);
  },
  
  send: message => {
	$.ajax({
	  url: app.server,
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
	    window.location.reload(false);
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
	  	  app.renderMessage(x);
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
  	console.log(message);
  	var generateMessage = {
  	  username: message.username,
  	  text: message.text,
  	  roomname: message.roomname
  	}
    app.messages.push(generateMessage);

  	var text = message.text;
  	var $text = $('<div class="message">'+ text +'</div>');
  	text = app.sanitize($text.text());
  	$text = $('<div class="message">'+ text +'</div>');

  	var room = message.roomname;
  	var $room = $('<p class="room">'+ room +'</p>');
  	room = app.sanitize($room.text());
  	$room = $('<p class="room" value="'+ room +'">'+ room +'</p>');

  	var name = message.username;
  	var $name = $('<div class="username">'+ name +'</div>');
  	name = app.sanitize($name.text());
  	$name = $('<div class="username" value="'+ name +'">'+ name +'</div>');

  	if (!app.rooms.hasOwnProperty(room)) {
  	  app.renderRoom(room);
  	}

  	var $box = $('<div class="box"></div>');

    $box.append($name);
    $box.append($text);
    $('#chats').append($box);
    //$('.room').append($box);
    
    // $('#chats').append($name);
    // $('#chats').append($text);

    $('form')[0].reset();
  },

  renderRoom: roomname => {
  	app.rooms[roomname] = roomname;
  	var $room = $('<option class="existingRoom" value="'+ roomname +'">'+ roomname +'</option>');
    $('#roomSelect').append($room);
  },

  handleUsernameClick: () => {
    app.friends[this.value] = this.value;
    //console.log(friends);
  },

  handleSubmit: () => {
  	
  },

  sanitize: text => {
  	text.replace(/&/g, '&#38');
  	text.replace(/</g, '&#60');
  	text.replace(/>/g, '&#62');
  	text.replace(/\"/g, '&#34');
  	text.replace(/\'/g, '&#39');
  	text.replace(/'/g, '&#96');
  	text.replace(/,/g, '&#44');
  	text.replace(/!/g, '&#33');
  	text.replace(/@/g, '&#64');
  	text.replace(/$/g, '&#36');
  	text.replace(/%/g, '&#37');
  	// text.replace(/'('/g, '&#40');
  	// text.replace(/')'/g, '&#41');
  	text.replace(/=/g, '&#61');
  	//text.replace(/+/g, '&#43');
  	text.replace(/{/g, '&#123');
  	text.replace(/}/g, '&#125');
  	// text.replace(/'['/g, '&#91');
  	text.replace(/]/g, '&#93');

  	return text;
  }
};

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };



