$(document).ready(function() {
  app.init();
});

var app = {

  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  
  init: () => {
  	
	  app.fetch();

	  $('.sendMessage').on('click', function(event) {
	  	event.preventDefault();
	    var text = $('input[name=message]').val();
	    var message = {
	      username: undefined,
	      text: text,
	      room: undefined
	    }
	    app.send(message);
	    $('form')[0].reset();
	  })
  },
  
  send: message => {
	$.ajax({
	  url: app.server,
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
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
	  	  app.renderMessage(x.text);
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
  	var $message = $('<div>'+ message +'</div>')
    $('#chats').append($message);
    $('form')[0].reset();
  },

  renderRoom: () => {

  }




};



