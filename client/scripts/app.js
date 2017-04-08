var app = {
  server: 'http://parse.sfm6.hackreactor.com/',

  init: () => {
  	$(document).ready(function() {
	  app.fetch();
		
	  $('.sendMessage').on('click', function(event) {
	  	event.preventDefault();
	    var message = $('input[name=message]').val();
	    //debugger;
	    app.renderMessage(message);
	    //debugger;
		console.log(message);
		//debugger;
	  })
    });
  },

  send: message => {
	$.ajax({
	  url: 'http://parse.sfm6.hackreactor.com/',
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
	  url: 'http://parse.sfm6.hackreactor.com/',
	  type: 'GET',
	  contentType: 'application/json',
	  success: function (data) {
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
    $('form')[0].reset()
  },

  renderRoom: () => {

  }




};



